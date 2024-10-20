import PackageFactory from '../factory/packageFactory.js';

export default class PackageService {
    constructor() {
        this.packageData = [];
    }

    async fetchPackageData() {
        try {
            const response = await fetch('src/data/packages.json');
            const data = await response.json();
            this.packageData = data;
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    }
    
    async getRandomPackage() {
        if (this.packageData.length === 0) {
            await this.fetchPackageData();
        }
        const randomIndex = Math.floor(Math.random() * this.packageData.length);
        const randomPackageData = this.packageData[randomIndex];
        return PackageFactory.createPackages([randomPackageData])[0];
    }
}
