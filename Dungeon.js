export default class Dungeon {
	constructor(data) {
		this.floor = [ ...data.floor ];
		this.legend = { ...data.legend };
		const x = this.calcX();
		this.size = {
			x,
			y: this.floor.length,
		};
		this.floorCharactersArray = this.floor.join('').split('');
		this.blocks = this.makeBlocksArray();
		this.floorPlanes = this.makeFloorPlanes();
	}

	calcX() {
		const sizeRange = this.floor.reduce((range, floorStr) => {
			return [Math.min(range[0], floorStr.length), Math.max(range[1], floorStr.length)];
		}, [Infinity, -Infinity]);
		const [minX, maxX] = sizeRange;
		if (minX !== maxX) throw new Error('X dimensions are not consistent');
		return maxX;
	}

	indexToX(i) {
		return i % this.size.x;
	}

	indexToY(i) {
		return this.size.y - Math.floor(i / this.size.x);
	}

	makeBlocksArray() {
		return this.floorCharactersArray.map((letter, i) => {
			const x = this.indexToX(i);
			const y = this.indexToY(i);
			return {
				...this.legend[letter],
				x,
				y,
				name: `wall-${x}-${y}`,
			};
		}).filter((block) => block.renderAs);
	}

	makeFloorPlanes() {
		return this.floorCharactersArray.map((letter, i) => {
			const x = this.indexToX(i);
			const y = this.indexToY(i);
			return {
				x,
				y,
				renderAs: 'plane',
				name: `floor-${x}-${y}`,
			};
		})
	}
}
