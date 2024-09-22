export default class ConveyorBelt {
  constructor() {
      this.packages = [];
      this.intervalId = null;
  }

  addPackage(pkg) {
      this.packages.push(pkg);
  }

  removePackage(pkg) {
      const index = this.packages.indexOf(pkg);
      if (index > -1) {
          this.packages.splice(index, 1);
      }
  }

  startConveyorBelt(callback) {
      this.intervalId = setInterval(() => {
          this.packages.forEach(pkg => {
              pkg.position.x += 1; // Adjust movement speed as needed
          });
          callback(this.packages); // Callback to update the view
      }, 1000); // Update every second
  }

  stopConveyorBelt() {
      clearInterval(this.intervalId);
  }
}
