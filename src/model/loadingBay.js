export default class LoadingBay {
    constructor(id) {
        this.id = id;
        this.conveyorBelts = [];
        this.trucks = [];
    }

    addConveyorBelt(conveyorBelt) {
        this.conveyorBelts.push(conveyorBelt);
    }

    removeConveyorBelt() {
        return this.conveyorBelts.pop();
    }

    addTruck(truck) {
        this.trucks.push(truck);
    }
}
