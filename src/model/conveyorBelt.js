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
              pkg.position.x += 1;
          });
          callback(this.packages);
      }, 1000);
  }

  stopConveyorBelt() {
      clearInterval(this.intervalId);
  }
}
