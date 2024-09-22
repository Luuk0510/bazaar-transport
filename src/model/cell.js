export default class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.occupied = false;
        this.package = null;
    }
}

