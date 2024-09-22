import Grid from './grid.js';

export default class Truck {
    constructor(length, width, interval, type) {
        this.length = length;
        this.width = width;
        this.interval = interval;
        this.type = type;
        this.packages = [];
        this.grid = new Grid(length, width);
    }

     addPackage(pkg) {
        const position = this.findBestPlacement(pkg);
        if (position) {
            this.grid.placePackage(pkg, position.row, position.col);
            this.packages.push(pkg);
            return position; 
        }
        return null;
    }

    findBestPlacement(pkg) {
        for (let row = this.length - 1; row >= 0; row--) {
            for (let col = 0; col < this.width; col++) {
                if (this.grid.canAccommodate(pkg, row, col)) {
                    return { row, col };
                }
            }
        }
        return null;
    }
}
