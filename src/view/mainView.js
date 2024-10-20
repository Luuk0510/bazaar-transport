import WeatherFormView from './weatherFormView.js';

export default class MainView {
    constructor() {
        this.conveyorBeltContainer = document.getElementById('conveyor-belt-container');
        this.truckContainer = document.getElementById('truck-container');
        this.addTruckButton = document.getElementById('add-truck');
        this.switchLoadingBayButton = document.getElementById('switch-loading-bay');
        this.addConveyorBeltButton = document.getElementById('add-conveyor-belt');
        this.removeConveyorBeltButton = document.getElementById('remove-conveyor-belt');

        this.weatherFormView = new WeatherFormView();
        document.body.insertBefore(this.weatherFormView.getWeatherContainer(), document.body.firstChild);

        this.disableButtons();
    }

    setController(controller) {
        this.controller = controller;
        this.weatherFormView.submitButton.addEventListener('click', () => {
            const city = this.weatherFormView.input.value.trim();
            const event = new CustomEvent('weatherFormSubmit', { detail: { city } });
            document.dispatchEvent(event);
        });

        if (this.addTruckButton) {
            this.addTruckButton.addEventListener('click', () => this.controller.showTruckForm());
        } else {
            console.error('Add Truck button not found');
        }
    }

    disableButtons() {
        this.addTruckButton.disabled = true;
        this.switchLoadingBayButton.disabled = true;
        this.addConveyorBeltButton.disabled = true;
        this.removeConveyorBeltButton.disabled = true;
    }

    enableButtons() {
        this.addTruckButton.disabled = false;
        this.switchLoadingBayButton.disabled = false;
        this.addConveyorBeltButton.disabled = false;
        this.removeConveyorBeltButton.disabled = false;
    }

    addConveyorBeltView(conveyorBeltView) {
        this.conveyorBeltContainer.appendChild(conveyorBeltView.container);
    }

    removeConveyorBeltView() {
        if (this.conveyorBeltContainer.lastChild) {
            this.conveyorBeltContainer.removeChild(this.conveyorBeltContainer.lastChild);
        }
    }

    addTruckView(truckView) {
        this.truckContainer.appendChild(truckView.container);
    }

    renderLoadingBay(loadingBay) {
        this.conveyorBeltContainer.innerHTML = '';
        this.truckContainer.innerHTML = '';

        loadingBay.conveyorBelts.forEach(({ view }) => {
            this.addConveyorBeltView(view);
        });

        loadingBay.trucks.forEach(({ view }) => {
            this.addTruckView(view);
        });
    }

    showWeatherMessage(message) {
        this.weatherFormView.showMessage(message);
    }

    clearWeatherMessage() {
        this.weatherFormView.clearMessage();
    }

    showWeatherInfo(data) {
        this.clearWeatherMessage(); 
        const weatherInfoContainer = this.weatherFormView.getWeatherInfoContainer();
        weatherInfoContainer.innerHTML = ''; 
        weatherInfoContainer.innerHTML = `
            <h2>Het weer in ${data.name}</h2>
            <p><strong>Weer:</strong> ${data.weather[0].description}</p>
            <p><strong>Temperatuur:</strong> ${data.main.temp}°C</p>
            <p><strong>Wind snelheid:</strong> ${data.wind.speed} m/s</p>
        `;
    }

}
