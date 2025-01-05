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
	gray: {
		50: '#F2F0E5',
		100: '#E6E4D9',
		150: '#DAD8CE',
		200: '#CECDC3',
		300: '#B7B5AC',
		400: '#9F9D96',
		500: '#878580',
		600: '#6F6E69',
		700: '#575653',
		800: '#403E3C',
		850: '#343331',
		900: '#282726',
		950: '#1C1B1A'
	},
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

	steps.forEach(step => {
		let color;
		if (step === 400) {
			color = KNOWN_VALUES[baseColor][400];
		} else if (step === 600) {
			color = KNOWN_VALUES[baseColor][600];
		} else {
			let lch;
			if (step < 400) {
				const t = step / 400;
				const curvePos = window.pre400Curve(t);
				const chromaPos = window.pre400ChromaCurve(t);
				
				lch = [
					paperLCH[0] + (color400[0] - paperLCH[0]) * curvePos.y,
					color400[1] * chromaPos.y,
					color400[2]
				];
			} else if (step > 600) {
				const t = (step - 600) / 400;
				const curvePos = window.post600Curve(t);
				const chromaPos = window.post600ChromaCurve(t);
				
				lch = [
					color600[0] + (blackLCH[0] - color600[0]) * (1 - curvePos.y),
					color600[1] * chromaPos.y,
					color600[2]
				];
			} else {
				const t = (step - 400) / 200;
				const curvePos = window.midCurve(t);
				
				lch = [
					color400[0] + (color600[0] - color400[0]) * curvePos.y,
					color400[1] + (color600[1] - color400[1]) * curvePos.y,
					color400[2] + (color600[2] - color400[2]) * curvePos.y
				];
			}
			color = LCHToHex(...lch);
		}

		// Always blend with paper color
		const blendedColor = blendWithPaper(color, KNOWN_VALUES.paper);

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

function generateGrayScale() {
	const scale = document.createElement('div');
	scale.className = 'color-scale-container';
	
	const label = document.createElement('div');
	label.className = 'color-scale-label';
	label.textContent = 'Gray';
	
	const swatches = document.createElement('div');
	swatches.className = 'color-scale';

	const steps = [50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 850, 900, 950];
	
	steps.forEach(step => {
		const color = KNOWN_VALUES.gray[step];
		const swatch = document.createElement('div');
		swatch.className = 'color-swatch';
		swatch.style.backgroundColor = color;
		swatch.innerHTML = `
			<span>
				gray-${step}<br>
				${color}
			</span>
		`;
		swatches.appendChild(swatch);
	});

	scale.appendChild(label);
	scale.appendChild(swatches);
	return scale;
}

function generateAllScales() {
	const container = document.getElementById('colorScales');
	container.innerHTML = '';
	
	// Add grayscale first
	container.appendChild(generateGrayScale());
	
	// Then add color scales
	Object.keys(KNOWN_VALUES).forEach(color => {
		if (color !== 'paper' && color !== 'black' && color !== 'gray') {
			container.appendChild(generateColorScale(color));
		}
	});
}

// Add curve editor class
class CurveEditor {
	constructor(canvasId, onChange) {
		this.canvas = document.getElementById(canvasId);
		this.ctx = this.canvas.getContext('2d');
		
		// Default curve points based on curve type
		const defaultPoints = {
			pre400: [
				{ x: 0, y: 0 },
				{ x: 0.5, y: 0.3 },
				{ x: 0.5, y: 0.7 },
				{ x: 1, y: 1 }
			],
			pre400Chroma: [
				{ x: 0, y: 0 },
				{ x: 0.1, y: 0.5 },
				{ x: 0.5, y: 0.9 },
				{ x: 1, y: 1 }
			],
			mid: [
				{ x: 0, y: 1 },
				{ x: 0.3, y: 0.5 },
				{ x: 0.7, y: 0.5 },
				{ x: 1, y: 0 }
			],
			post600: [
				{ x: 0, y: 1 },
				{ x: 0.5, y: 0.7 },
				{ x: 0.5, y: 0.3 },
				{ x: 1, y: 0 }
			],
			post600Chroma: [
				{ x: 0, y: 1 },
				{ x: 0.5, y: 0.9 },
				{ x: 0.9, y: 0.5 },
				{ x: 1, y: 0 }
			]
		};
		
		// Get curve type from canvas ID
		const curveType = Object.keys(defaultPoints).find(type => canvasId.includes(type));
		this.points = defaultPoints[curveType];
		
		this.activePoint = null;
		this.onChange = onChange;
		
		this.setupListeners();
		this.draw();
	}

	setupListeners() {
		this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
		this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
		this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
	}

	getMousePos(e) {
		const rect = this.canvas.getBoundingClientRect();
		return {
			x: (e.clientX - rect.left) / rect.width,
			y: 1 - (e.clientY - rect.top) / rect.height
		};
	}

	onMouseDown(e) {
		const pos = this.getMousePos(e);
		this.activePoint = this.points.findIndex(p => 
			Math.hypot(p.x - pos.x, p.y - pos.y) < 0.05
		);
	}

	onMouseMove(e) {
		if (this.activePoint === null || this.activePoint === 0 || this.activePoint === 3) return;
		
		const pos = this.getMousePos(e);
		this.points[this.activePoint] = {
			x: Math.max(0, Math.min(1, pos.x)),
			y: Math.max(0, Math.min(1, pos.y))
		};
		
		this.draw();
		updateCurveData();
		if (this.onChange) this.onChange(this.evaluate.bind(this));
	}

	onMouseUp() {
		this.activePoint = null;
	}

	draw() {
		const { ctx, canvas } = this;
		const w = canvas.width;
		const h = canvas.height;
		
		// Clear canvas
		ctx.clearRect(0, 0, w, h);
		
		// Draw grid
		ctx.strokeStyle = '#eee';
		ctx.beginPath();
		for (let i = 0; i <= 10; i++) {
			ctx.moveTo(i * w/10, 0);
			ctx.lineTo(i * w/10, h);
			ctx.moveTo(0, i * h/10);
			ctx.lineTo(w, i * h/10);
		}
		ctx.stroke();
		
		// Draw curve
		ctx.strokeStyle = '#000';
		ctx.beginPath();
		ctx.moveTo(this.points[0].x * w, (1 - this.points[0].y) * h);
		ctx.bezierCurveTo(
			this.points[1].x * w, (1 - this.points[1].y) * h,
			this.points[2].x * w, (1 - this.points[2].y) * h,
			this.points[3].x * w, (1 - this.points[3].y) * h
		);
		ctx.stroke();
		
		// Draw points
		this.points.forEach(p => {
			ctx.beginPath();
			ctx.arc(p.x * w, (1 - p.y) * h, 4, 0, Math.PI * 2);
			ctx.fill();
		});
	}

	evaluate(t) {
		const [p0, p1, p2, p3] = this.points;
		const t1 = 1 - t;
		
		return {
			x: Math.pow(t1, 3) * p0.x + 3 * Math.pow(t1, 2) * t * p1.x + 3 * t1 * Math.pow(t, 2) * p2.x + Math.pow(t, 3) * p3.x,
			y: Math.pow(t1, 3) * p0.y + 3 * Math.pow(t1, 2) * t * p1.y + 3 * t1 * Math.pow(t, 2) * p2.y + Math.pow(t, 3) * p3.y
		};
	}
}

function updateCurveData() {
	const curveData = {
		pre400: window.curves.pre400.points,
		pre400Chroma: window.curves.pre400Chroma.points,
		mid: window.curves.mid.points,
		post600: window.curves.post600.points,
		post600Chroma: window.curves.post600Chroma.points
	};
	
	const jsonData = JSON.stringify(curveData, null, 2);
	document.getElementById('curveOutput').value = jsonData;
	
	// Save to localStorage
	localStorage.setItem('flexoki-curves', jsonData);
}

// Add this function to handle textarea updates
function loadCurveDataFromTextarea() {
	try {
		const curveData = JSON.parse(document.getElementById('curveOutput').value);
		Object.entries(curveData).forEach(([key, points]) => {
			if (window.curves[key]) {
				window.curves[key].points = points;
				window.curves[key].draw();
			}
		});
		generateAllScales();
	} catch (error) {
		console.error('Error parsing curve data:', error);
	}
}

// Modify the DOMContentLoaded event handler
document.addEventListener('DOMContentLoaded', () => {
	// Store curves globally for access
	window.curves = {
		pre400: new CurveEditor('pre400CurveEditor', curve => {
			window.pre400Curve = curve;
			generateAllScales();
		}),
		pre400Chroma: new CurveEditor('pre400ChromaEditor', curve => {
			window.pre400ChromaCurve = curve;
			generateAllScales();
		}),
		mid: new CurveEditor('midCurveEditor', curve => {
			window.midCurve = curve;
			generateAllScales();
		}),
		post600: new CurveEditor('post600CurveEditor', curve => {
			window.post600Curve = curve;
			generateAllScales();
		}),
		post600Chroma: new CurveEditor('post600ChromaEditor', curve => {
			window.post600ChromaCurve = curve;
			generateAllScales();
		})
	};

	// Update color generation to use curves
	window.pre400Curve = window.curves.pre400.evaluate.bind(window.curves.pre400);
	window.pre400ChromaCurve = window.curves.pre400Chroma.evaluate.bind(window.curves.pre400Chroma);
	window.midCurve = window.curves.mid.evaluate.bind(window.curves.mid);
	window.post600Curve = window.curves.post600.evaluate.bind(window.curves.post600);
	window.post600ChromaCurve = window.curves.post600Chroma.evaluate.bind(window.curves.post600Chroma);

	// Try to load saved curves
	const savedCurves = localStorage.getItem('flexoki-curves');
	if (savedCurves) {
		try {
			const curveData = JSON.parse(savedCurves);
			Object.entries(curveData).forEach(([key, points]) => {
				if (window.curves[key]) {
					window.curves[key].points = points;
					window.curves[key].draw();
				}
			});
			generateAllScales();
		} catch (error) {
			console.error('Error loading saved curves:', error);
		}
	}

	// Initial generation if no saved curves
	generateAllScales();

	// Add input handler for textarea
	document.getElementById('curveOutput').addEventListener('input', () => {
		// Use a debounced version to avoid too frequent updates
		clearTimeout(window.curveUpdateTimeout);
		window.curveUpdateTimeout = setTimeout(loadCurveDataFromTextarea, 500);
	});
}); 