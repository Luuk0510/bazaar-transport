import PackageView from './packageView.js';

export default class ConveyorBeltView {
    constructor(index) { 
        this.index = index;
        this.container = document.createElement('div');
        this.container.classList.add('conveyor-belt');
    }

    render(packages) {
        this.container.innerHTML = '';

        packages.forEach((pkg, index) => {
            const packageView = new PackageView(pkg);
            packageView.render();
            const packageContainer = packageView.getContainer();

            packageContainer.draggable = true;
            packageContainer.addEventListener('dragstart', (event) => {
                event.dataTransfer.setData('package-index', index);
                event.dataTransfer.setData('conveyor-index', this.index); // Set the conveyor belt index
            });

            this.container.appendChild(packageContainer);

            // Move the package
            packageContainer.style.transform = `translateX(${pkg.position.x * 20}px)`;
        });
    }
}
