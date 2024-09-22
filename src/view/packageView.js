export default class PackageView {
    constructor(pkg) {
        this.pkg = pkg;
        this.container = document.createElement('div');
        this.container.classList.add('package-container');
    }

    render() {
        this.container.innerHTML = '';

        this.pkg.blocks.forEach((block) => {
            const blockDiv = document.createElement('div');
            blockDiv.classList.add('block');
            blockDiv.classList.add(`type-${this.pkg.type}`);
            blockDiv.style.left = `${block.coordinate.x * 20}px`;
            blockDiv.style.top = `${block.coordinate.y * 20}px`;

            this.container.appendChild(blockDiv);
        });
    }

    getContainer() {
        return this.container;
    }
}
