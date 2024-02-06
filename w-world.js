import W from './w.esm.js';
// const { W } = window;

// Start the framework
const canvasElement = document.getElementById('canvas');
W.reset(canvasElement);

// Set clear color ("#fff" by default)
W.clearColor('#000');

// Set camera
// Settings: position (x, y, z), angle (rx, ry, rz), fov
// W.camera({ x, y, z, rx, ry, rz, fov});
W.camera({ x: 1, y: 1, z: 15 });

// Set light direction
// W.light({x, y, z});
W.light({x:-1,y:-1,z:0});

// Set ambient light's force (between 0 and 1)
W.ambient(0.7);

W.group({ n: 'floor' });
const settings = {
	g: 'floor',
	// n,
	size: 2,
	x: 0, 
	y: 0,
	z: 0,
	// rx, ry, rz,
	rx: 45,
	ry: 60,
	b: '#557799FF', // background
	// t, // texture
	// mix,
	s: false,
	// ns, mode
};
W.cube({ ...settings });
W.cube({ ...settings, x: 4, b: '#559966FF' });
W.plane({ ...settings, y: 4 });
W.billboard({ ...settings, x: -4 });
W.pyramid({ ...settings, y: -4 });
W.sphere({ ...settings, x: 4, y: 4 });
