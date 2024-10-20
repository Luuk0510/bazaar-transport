export default class TruckView {
    constructor(truck, removeTruckCallback) {
        this.truck = truck;
        this.removeTruckCallback = removeTruckCallback;
        this.container = document.createElement('div');
        this.container.classList.add('truck');
        this.container.setAttribute('data-truck-type', this.truck.type.toLowerCase().replace(/\s+/g, '-'));
        this.setDimensions();
        this.render();
    }

    setDimensions() {
        this.container.style.width = `${this.truck.width * 20}px`;
        this.container.style.height = `${this.truck.length * 20}px`;
    }

    render() {
        console.log('rendering truck');
        this.container.innerHTML = ''; 

        this.container.setAttribute('data-truck-index', this.truck.index);

        const grid = document.createElement('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = `repeat(${this.truck.width}, 20px)`;
        grid.style.gridTemplateRows = `repeat(${this.truck.length}, 20px)`;

        for (let row = 0; row < this.truck.length; row++) {
            for (let col = 0; col < this.truck.width; col++) {
                const block = document.createElement('div');
                block.classList.add('cell');
                const cell = this.truck.grid.cells[row][col];
                if (cell.occupied) {
                    block.classList.add(`type-${cell.package.type}`);
                }
                grid.appendChild(block);
            }
        }

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Vertrekken';
        removeButton.classList.add('remove-truck-button');
        removeButton.addEventListener('click', () => this.animateAndRemoveTruck(removeButton));

        this.container.appendChild(grid);
        this.container.appendChild(removeButton);
    }

    animateAndRemoveTruck(button) {
        button.remove();
        this.container.classList.add('drive-out');
        this.container.addEventListener('animationend', () => {
            if (this.removeTruckCallback) {
                this.removeTruckCallback(this.truck);
            }
            this.container.remove();
        });
    }
}
