import W from './w.esm.js';
import dungeonData from './dungeon-data.json' assert { type: 'json' }
import Dungeon from './Dungeon.js';

const dungeon = new Dungeon(dungeonData);
console.log(dungeon);

// Start the framework
const canvasElement = document.getElementById('canvas');
W.reset(canvasElement);
W.clearColor('#000'); // Set clear color ("#fff" by default)
W.camera({ x: 1, y: 1, z: 25 }); // Set camera: position (x, y, z), angle (rx, ry, rz), fov
W.light({ x: -1, y: -1, z: 0 }); // Set light direction: vector direction x, y, z
W.ambient(0.7); // Set ambient light's force (between 0 and 1)

W.group({ n: 'floor', rx: -40, ry: 0, x: - dungeon.size.x / 1.5, y: - dungeon.size.y / 2 });
const BLOCK_SIZE = 2;
const blockShapeSettings = {
	g: 'floor',
	// n,
	size: BLOCK_SIZE,
	x: 0, 
	y: 0,
	z: 0,
	// rx, ry, rz,
	b: '#557799FF', // background
	// t, // texture
	// mix,
	s: false,
	// ns, mode
};

const pc = {
	name: 'Hero',
	renderAs: 'sphere',
	x: 6,
	y: 6,
	color: '#ffff99ff',
};
const renderAsShapeMap = {
	cube: 'cube',
	plane: 'plane',
	sphere: 'sphere',
};

function createShapes(blocks = []) {
	blocks.forEach((block) => {
		const shape = renderAsShapeMap[block.renderAs];
		const red = (Math.floor(Math.random() * 20) + 1).toString(16).padStart(2, '0');
		const blue = (Math.floor(Math.random() * 20) + 60).toString(16).padStart(2, '0');
		const b = block.color || ((shape === 'plane') ? `#${red}11${blue}FF` : `#${red}33${blue}FF`);
		W[shape]({
			...blockShapeSettings,
			x: block.x * BLOCK_SIZE,
			y: block.y * BLOCK_SIZE,
			n: block.name,
			z: (shape === 'plane') ? -(BLOCK_SIZE / 2) : 0,
			b,
		});
	});
}

createShapes([ ...dungeon.blocks, ...dungeon.floorPlanes, pc ]);
