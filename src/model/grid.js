import Cell from "./cell.js";

export default class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.cells = [];

        for (let row = 0; row < rows; row++) {
            const rowCells = [];
            for (let col = 0; col < cols; col++) {
                rowCells.push(new Cell(row, col));
            }
            this.cells.push(rowCells);
        }
    }

    canAccommodate(pkg, startRow, startCol) {
        return pkg.blocks.every(block => {
            const row = startRow + block.coordinate.y;
            const col = startCol + block.coordinate.x;
            if (
                row < this.rows &&
                col < this.cols &&
                row >= 0 &&
                col >= 0 &&
                !this.cells[row][col].occupied
            ) {
                return true;
            } else {
                console.log(`Cannot accommodate package at row ${row}, col ${col}`);
                return false;
            }
        });
    }
    
    placePackage(pkg, startRow, startCol) {
        pkg.blocks.forEach(block => {
            const row = startRow + block.coordinate.y;
            const col = startCol + block.coordinate.x;
            this.cells[row][col].occupied = true;
            this.cells[row][col].package = pkg;
        });
    }
}
