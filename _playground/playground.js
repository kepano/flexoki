// LCH to RGB conversion functions
function LCHToLAB(l, c, h) {
	const hRad = (h * Math.PI) / 180;
	return [
		l,
		c * Math.cos(hRad),
		c * Math.sin(hRad)
	];
}

function LABToXYZ(l, a, b) {
	const y = (l + 16) / 116;
	const x = a / 500 + y;
	const z = y - b / 200;

	return [
		x * x * x > 0.008856 ? x * x * x : (x - 16/116) / 7.787,
		y * y * y > 0.008856 ? y * y * y : (y - 16/116) / 7.787,
		z * z * z > 0.008856 ? z * z * z : (z - 16/116) / 7.787
	].map((n, i) => n * [0.95047, 1, 1.08883][i]);
}

function XYZToRGB(x, y, z) {
	const r = x *  3.2406 + y * -1.5372 + z * -0.4986;
	const g = x * -0.9689 + y *  1.8758 + z *  0.0415;
	const b = x *  0.0557 + y * -0.2040 + z *  1.0570;

	return [r, g, b].map(n => {
		n = n > 0.0031308 ? 1.055 * Math.pow(n, 1/2.4) - 0.055 : 12.92 * n;
		return Math.max(0, Math.min(1, n));
	});
}

function LCHToRGB(l, c, h) {
	const [L, a, b] = LCHToLAB(l, c, h);
	const [x, y, z] = LABToXYZ(L, a, b);
	const [r, g, b_] = XYZToRGB(x, y, z);
	return [
		Math.round(r * 255),
		Math.round(g * 255),
		Math.round(b_ * 255)
	];
}

function RGBToHex(r, g, b) {
	return '#' + [r, g, b]
		.map(x => x.toString(16).padStart(2, '0'))
		.join('');
}

function LCHToHex(l, c, h) {
	const [r, g, b] = LCHToRGB(l, c, h);
	return RGBToHex(r, g, b);
}

// Add new functions for hex to RGB and RGB to LCH
function hexToRGB(hex) {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return [r, g, b];
}

function RGBToXYZ(r, g, b) {
	// Normalize RGB values
	r = r / 255;
	g = g / 255;
	b = b / 255;

	// Convert to linear RGB
	r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
	g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
	b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

	// Convert to XYZ
	return [
		r * 0.4124564 + g * 0.3575761 + b * 0.1804375,
		r * 0.2126729 + g * 0.7151522 + b * 0.0721750,
		r * 0.0193339 + g * 0.1191920 + b * 0.9503041
	];
}

function XYZToLAB(x, y, z) {
	// Normalize XYZ values
	x = x / 0.95047;
	y = y / 1.00000;
	z = z / 1.08883;

	// Convert to LAB
	x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
	y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
	z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;

	return [
		(116 * y) - 16,
		500 * (x - y),
		200 * (y - z)
	];
}

function LABToLCH(l, a, b) {
	const c = Math.sqrt(a * a + b * b);
	let h = Math.atan2(b, a) * 180 / Math.PI;
	if (h < 0) h += 360;
	return [l, c, h];
}

function hexToLCH(hex) {
	const rgb = hexToRGB(hex);
	const xyz = RGBToXYZ(...rgb);
	const lab = XYZToLAB(...xyz);
	return LABToLCH(...lab);
}

// Function to blend colors as if on paper
function blendWithPaper(color, paperColor) {
	const paperRGB = hexToRGB(paperColor);
	const colorRGB = hexToRGB(color);
	
	// Simulate multiplicative blending
	const blended = colorRGB.map((c, i) => {
		return Math.round((c * paperRGB[i]) / 255);
	});
	
	return RGBToHex(...blended);
}

const KNOWN_VALUES = {
	paper: '#FFFCF0',
	black: '#100F0F',
	red: {
		400: '#D14D41',
		600: '#AF3029'
	},
	orange: {
		400: '#DA702C',
		600: '#BC5215'
	},
	yellow: {
		400: '#D0A215',
		600: '#AD8301'
	},
	green: {
		400: '#879A39',
		600: '#66800B'
	},
	cyan: {
		400: '#3AA99F',
		600: '#24837B'
	},
	blue: {
		400: '#4385BE',
		600: '#205EA6'
	},
	purple: {
		400: '#8B7EC8',
		600: '#5E409D'
	},
	magenta: {
		400: '#CE5D97',
		600: '#A02F6F'
	}
};

function generateColorScale(baseColor) {
	const color400 = hexToLCH(KNOWN_VALUES[baseColor][400]);
	const color600 = hexToLCH(KNOWN_VALUES[baseColor][600]);
	const paperLCH = hexToLCH(KNOWN_VALUES.paper);
	const blackLCH = hexToLCH(KNOWN_VALUES.black);
	
	const steps = [50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 850, 900, 950];
	
	const scale = document.createElement('div');
	scale.className = 'color-scale-container';
	
	const label = document.createElement('div');
	label.className = 'color-scale-label';
	label.textContent = baseColor.charAt(0).toUpperCase() + baseColor.slice(1);
	
	const swatches = document.createElement('div');
	swatches.className = 'color-scale';

	const blendStrength = parseFloat(document.getElementById('blendStrength').value) / 100;
	const pre400Curve = parseFloat(document.getElementById('pre400Curve').value) / 100;
	const midCurve = parseFloat(document.getElementById('midCurve').value) / 100;
	const post600Curve = parseFloat(document.getElementById('post600Curve').value) / 100;

	steps.forEach(step => {
		let color;
		if (step === 400) {
			color = KNOWN_VALUES[baseColor][400];
		} else if (step === 600) {
			color = KNOWN_VALUES[baseColor][600];
		} else {
			let lch;
			if (step < 400) {
				// Interpolate between paper and 400
				const t = Math.pow(step / 400, pre400Curve);
				lch = [
					paperLCH[0] + (color400[0] - paperLCH[0]) * t,
					color400[1] * t,
					color400[2]
				];
			} else if (step > 600) {
				// Interpolate between 600 and Flexoki black, treating black as step 1000
				const t = Math.pow((step - 600) / (1000 - 600), post600Curve);
				lch = [
					color600[0] + (blackLCH[0] - color600[0]) * t,
					color600[1] * (1 - t),
					color600[2]
				];
			} else {
				// Interpolate between 400 and 600
				const t = Math.pow((step - 400) / 200, midCurve);
				lch = [
					color400[0] + (color600[0] - color400[0]) * t,
					color400[1] + (color600[1] - color400[1]) * t,
					color400[2] + (color600[2] - color400[2]) * t
				];
			}
			color = LCHToHex(...lch);
		}

		// Blend with paper color based on blend strength
		const blendedColor = blendStrength === 1 ? 
			blendWithPaper(color, KNOWN_VALUES.paper) :
			blendColors(color, KNOWN_VALUES.paper, blendStrength);

		const swatch = document.createElement('div');
		swatch.className = 'color-swatch';
		swatch.style.backgroundColor = blendedColor;
		swatch.innerHTML = `
			<span>
				${baseColor}-${step}<br>
				${blendedColor}
			</span>
		`;
		swatches.appendChild(swatch);
	});

	scale.appendChild(label);
	scale.appendChild(swatches);
	return scale;
}

function blendColors(color1, color2, amount) {
	const rgb1 = hexToRGB(color1);
	const rgb2 = hexToRGB(color2);
	
	const blended = rgb1.map((c, i) => {
		return Math.round(c * amount + rgb2[i] * (1 - amount));
	});
	
	return RGBToHex(...blended);
}

function generateAllScales() {
	const container = document.getElementById('colorScales');
	container.innerHTML = '';
	
	Object.keys(KNOWN_VALUES).forEach(color => {
		// Skip paper and black when generating scales
		if (color !== 'paper' && color !== 'black') {
			container.appendChild(generateColorScale(color));
		}
	});
}

// Event handling
document.addEventListener('DOMContentLoaded', () => {
	const controls = ['blendStrength', 'pre400Curve', 'midCurve', 'post600Curve'];
	
	controls.forEach(id => {
		const element = document.getElementById(id);
		element.addEventListener('input', (e) => {
			document.getElementById(id + 'Value').textContent = e.target.value;
			generateAllScales();
		});
	});

	// Initial generation
	generateAllScales();
}); 