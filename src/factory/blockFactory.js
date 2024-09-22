import Block from '../model/block.js';
import Coordinate from '../model/coordinate.js';

export default class BlockFactory {
    static createBlock(blockJson) {
        const coordinate = new Coordinate(blockJson.x, blockJson.y);
        return new Block(coordinate);
    }
}