import TruckFormView from './truckFormView.js';

export default class MainView {
    constructor() {
        this.conveyorBeltContainer = document.getElementById('conveyor-belt-container');
        this.truckContainer = document.getElementById('truck-container');
        this.addTruckButton = document.getElementById('add-truck');
        this.switchLoadingBayButton = document.getElementById('switch-loading-bay');

        if (this.addTruckButton) {
            this.addTruckButton.addEventListener('click', this.showTruckForm.bind(this));
        } else {
            console.error('Add Truck button not found');
        }
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

    showTruckForm() {
        const truckFormView = new TruckFormView();
        document.body.appendChild(truckFormView.getFormContainer());
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
}
