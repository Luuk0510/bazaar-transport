import PackageService from '../services/packageService.js';
import WeatherService from '../services/weatherService.js';
import TruckService from '../services/truckService.js';
import ConveyorBelt from '../model/conveyorBelt.js';
import LoadingBay from '../model/loadingBay.js';
import ConveyorBeltView from '../view/conveyorBeltView.js';
import Truck from '../model/truck.js';
import TruckView from '../view/truckView.js';
import TruckFormView from '../view/truckFormView.js';
import WeatherFormView from '../view/weatherFormView.js';

const API_KEY = 'f3500d75fca4725b12c2978ff64c7538';

export default class Controller {
    constructor(mainView) {
        this.mainView = mainView;
        this.mainView.setController(this);
        this.weatherFormView = new WeatherFormView();
        this.packageService = new PackageService();
        this.weatherService = new WeatherService(API_KEY); 
        this.loadingBays = [new LoadingBay(1), new LoadingBay(2)];
        this.currentLoadingBayIndex = 0;

        this.addConveyorBeltButton = document.getElementById('add-conveyor-belt');
        this.removeConveyorBeltButton = document.getElementById('remove-conveyor-belt');
        this.switchLoadingBayButton = document.getElementById('switch-loading-bay');

        this.addConveyorBeltButton.addEventListener('click', this.addConveyorBelt.bind(this));
        this.removeConveyorBeltButton.addEventListener('click', this.removeConveyorBelt.bind(this));
        this.switchLoadingBayButton.addEventListener('click', this.switchLoadingBay.bind(this));
        document.addEventListener('truckFormSubmit', this.handleTruckFormSubmit.bind(this));
        document.addEventListener('weatherFormSubmit', this.handleWeatherFormSubmit.bind(this));

        const truckContainer = document.getElementById('truck-container');

        truckContainer.addEventListener('dragover', this.handleDragOver.bind(this));
        truckContainer.addEventListener('drop', this.handleDrop.bind(this));

        this.renderCurrentLoadingBay();
    }

    getCurrentLoadingBay() {
        return this.loadingBays[this.currentLoadingBayIndex];
    }

    switchLoadingBay() {
        this.currentLoadingBayIndex = (this.currentLoadingBayIndex + 1) % 2;
        this.renderCurrentLoadingBay();
        console.log(`Switched to loading bay ${this.currentLoadingBayIndex + 1}`);
    }

    renderCurrentLoadingBay() {
        const currentLoadingBay = this.getCurrentLoadingBay();
        this.mainView.renderLoadingBay(currentLoadingBay);
    }

    handleDragOver(event) {
        event.preventDefault();
    }

    showTruckForm() {
        if (!this.currentCity) {
            this.mainView.showWeatherMessage('Vul eerst een stad/dorp in.');
            return;
        }
        const truckFormView = new TruckFormView(this.weatherService, this.weatherData);
        document.body.appendChild(truckFormView.getFormContainer());
    }

    handleDrop(event) {
        event.preventDefault();
        const packageIndex = parseInt(event.dataTransfer.getData('package-index'));
        const conveyorIndex = parseInt(event.dataTransfer.getData('conveyor-index'));
        const truckIndex = parseInt(event.target.closest('.truck').getAttribute('data-truck-index')); // Gebruik closest om de juiste truck te vinden
    
        const currentLoadingBay = this.getCurrentLoadingBay();
        const { belt } = currentLoadingBay.conveyorBelts[conveyorIndex];
    
        let droppedPackage = belt.packages[packageIndex];
        if (droppedPackage) {
            belt.removePackage(droppedPackage);
            const targetTruck = currentLoadingBay.trucks[truckIndex].truck;
            const position = targetTruck.addPackage(droppedPackage);
            if (position) {
                const truckView = currentLoadingBay.trucks[truckIndex].view;
                truckView.render(); 
                this.renderCurrentLoadingBay();
            } else {
                belt.addPackage(droppedPackage);
            }
        }
    }
    

    async addConveyorBelt() {
        const currentLoadingBay = this.getCurrentLoadingBay();
        if (currentLoadingBay.conveyorBelts.length < 5) {
            const conveyorBelt = new ConveyorBelt();
            const conveyorBeltView = new ConveyorBeltView(currentLoadingBay.conveyorBelts.length); 
            this.mainView.addConveyorBeltView(conveyorBeltView);
            currentLoadingBay.addConveyorBelt({ belt: conveyorBelt, view: conveyorBeltView });
            this.startConveyorBelt(conveyorBelt, conveyorBeltView);
        } else {
            console.log("Maximum number of conveyor belts reached.");
        }
    }

    removeConveyorBelt() {
        const currentLoadingBay = this.getCurrentLoadingBay();
        if (currentLoadingBay.conveyorBelts.length > 0) {
            const removedConveyorBelt = currentLoadingBay.removeConveyorBelt();
            removedConveyorBelt.belt.stopConveyorBelt();
            this.mainView.removeConveyorBeltView();
        } else {
            console.log("No conveyor belts to remove.");
        }
    }

    async startConveyorBelt(conveyorBelt, conveyorBeltView) {
        conveyorBelt.startConveyorBelt((packages) => {
            conveyorBeltView.render(packages);
            packages.forEach(pkg => {
                if (pkg.position.x > window.innerWidth / 20) {
                    conveyorBelt.removePackage(pkg);
                }
            });
        });

        setInterval(async () => {
            const randomPackage = await this.packageService.getRandomPackage();
            randomPackage.position = { x: 0, y: 0 };
            conveyorBelt.addPackage(randomPackage);
        }, 10000);
    }

    async handleWeatherFormSubmit(event) {
        const { city } = event.detail;
        if (!city) {
            this.mainView.showWeatherMessage('Vul een stad/dorp in.');
            return;
        }

        try {
            this.currentCity = city;
            this.weatherData = await this.weatherService.getWeather(this.currentCity);
            this.mainView.showWeatherInfo(this.weatherData);
            this.mainView.enableButtons();
        } catch (error) {
            this.mainView.showWeatherMessage(`Kon het weer niet ophalen, vul het opnieuw in: ` + error);
        }
    }

    handleTruckFormSubmit(event) {
        const truckData = event.detail;
        const currentLoadingBay = this.getCurrentLoadingBay();
        const truckIndex = currentLoadingBay.trucks.length; // Gebruik de lengte van de trucks array als index
        const truck = new Truck(
            parseInt(truckData.length),
            parseInt(truckData.width),
            parseInt(truckData.interval),
            truckData.type
        );
    
        truck.index = truckIndex; // Stel de index in voor de truck
    
        setTimeout(() => {
            const truckView = new TruckView(truck, this.removeTruck.bind(this));
            this.mainView.addTruckView(truckView);
            currentLoadingBay.addTruck({ truck, view: truckView });
        }, truckData.interval * 1000);
    }
    

    removeTruck(truck) {
        const currentLoadingBay = this.getCurrentLoadingBay();
        const truckIndex = currentLoadingBay.trucks.findIndex(t => t.truck === truck);
        if (truckIndex > -1) {
            currentLoadingBay.trucks.splice(truckIndex, 1);
            console.log("Truck removed.");
            this.renderCurrentLoadingBay();
        } else {
            console.log("Truck not found.");
        }
    }
}
