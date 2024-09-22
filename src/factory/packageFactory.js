import Package from '../model/package.js';
import BlockFactory from './blockFactory.js';

export default class PackageFactory {
    static createPackages(jsonData) {
        return jsonData.map(item => {
            const blocks = item.blocks.map(blockJson => BlockFactory.createBlock(blockJson));
            return new Package(item.type, blocks);
        });
    }
}