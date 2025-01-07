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
	post600: [
		{ x: 0, y: 1 },
		{ x: 0.5, y: 0.8 },
		{ x: 0.5, y: 0.4 },
		{ x: 1, y: 0 }
	],
	post600Chroma: [
		{ x: 0, y: 1 },
		{ x: 0.5, y: 0.9 },
		{ x: 0.9, y: 0.5 },
		{ x: 1, y: 0 }
	]
};

// OKLCH conversion functions
function sRGBToLinear(x) {
	if (x <= 0.0031308) return x * 12.92;
	return 1.055 * Math.pow(x, 1/2.4) - 0.055;
}

function linearTosRGB(x) {
	if (x <= 0.04045) return x / 12.92;
	return Math.pow((x + 0.055) / 1.055, 2.4);
}

function OKLABToLRGB(L, a, b) {
	const l = L + 0.3963377774 * a + 0.2158037573 * b;
	const m = L - 0.1055613458 * a - 0.0638541728 * b;
	const s = L - 0.0894841775 * a - 1.2914855480 * b;

	return [
		Math.pow(l, 3),
		Math.pow(m, 3),
		Math.pow(s, 3)
	];
}

function LRGBToOKLAB(L, M, S) {
	const l = Math.cbrt(L);
	const m = Math.cbrt(M);
	const s = Math.cbrt(S);

	return [
		0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
		1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
		0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s
	];
}

function OKLCHToOKLAB(L, C, h) {
	const hRad = h * Math.PI / 180;
	return [L, C * Math.cos(hRad), C * Math.sin(hRad)];
}

function OKLABToOKLCH(L, a, b) {
	const C = Math.sqrt(a * a + b * b);
	let h = Math.atan2(b, a) * 180 / Math.PI;
	if (h < 0) h += 360;
	return [L, C, h];
}

function hexToRGB(hex) {
	const r = parseInt(hex.slice(1, 3), 16) / 255;
	const g = parseInt(hex.slice(3, 5), 16) / 255;
	const b = parseInt(hex.slice(5, 7), 16) / 255;
	return [r, g, b];
}

function RGBToHex(r, g, b) {
	const toHex = x => Math.round(x * 255).toString(16).padStart(2, '0');
	return '#' + toHex(r) + toHex(g) + toHex(b);
}

function hexToOKLCH(hex) {
	const [r, g, b] = hexToRGB(hex).map(linearTosRGB);
	const [L, a, b_] = LRGBToOKLAB(r, g, b);
	return OKLABToOKLCH(L, a, b_);
}

function OKLCHToHex(L, C, h) {
	const [l, a, b] = OKLCHToOKLAB(L, C, h);
	const [r, g, b_] = OKLABToLRGB(l, a, b);
	const rgb = [r, g, b_].map(sRGBToLinear);
	return RGBToHex(...rgb);
}

// Add this function for multiply-like blending in RGB space
function multiplyColors(color1, color2) {
	const rgb1 = hexToRGB(color1);
	const rgb2 = hexToRGB(color2);
	
	// Multiply RGB channels and handle the 0-1 range properly
	const blended = rgb1.map((c, i) => {
		// Since hexToRGB already gives us 0-1 values, we just multiply
		return c * rgb2[i];
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

// Add color order constant at the top of the file
const COLOR_ORDER = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple', 'magenta'];

function generateColorScale(baseColor) {
	const color400 = hexToOKLCH(KNOWN_VALUES[baseColor][400]);
	const color600 = hexToOKLCH(KNOWN_VALUES[baseColor][600]);
	const paperLCH = hexToOKLCH(KNOWN_VALUES.paper);
	const blackLCH = hexToOKLCH(KNOWN_VALUES.black);
	
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
				color = OKLCHToHex(...lch);
				// Add paper multiplication for pre-400 colors
				color = multiplyColors(color, KNOWN_VALUES.paper);
			} else if (step > 600) {
				const t = (step - 600) / 400;
				const curvePos = window.post600Curve(t);
				const chromaPos = window.post600ChromaCurve(t);
				
				lch = [
					color600[0] + (blackLCH[0] - color600[0]) * (1 - curvePos.y),
					color600[1] * chromaPos.y,
					color600[2]
				];
				color = OKLCHToHex(...lch);
			} else {
				const t = (step - 400) / 200;  // Linear t from 0 to 1
				
				lch = [
					color400[0] + (color600[0] - color400[0]) * t,
					color400[1] + (color600[1] - color400[1]) * t,
					color400[2] + (color600[2] - color400[2]) * t
				];
				color = OKLCHToHex(...lch);
			}
		}

		const swatch = document.createElement('div');
		swatch.className = 'color-swatch-container';

		const swatchColor = document.createElement('div');
		swatchColor.className = 'color-swatch';
		swatchColor.style.backgroundColor = `var(--flexoki-${baseColor}-${step})`;

		const swatchLabel = document.createElement('div');
		swatchLabel.className = 'color-swatch-label';
		swatchLabel.innerHTML = `
			<div class="color-swatch-label-name">${step}</div>
			<div class="color-swatch-label-hex">
				${color.toUpperCase()}
			</div>
		`;

		swatch.appendChild(swatchColor);
		swatch.appendChild(swatchLabel);
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
	label.textContent = 'Base';
	
	const swatches = document.createElement('div');
	swatches.className = 'color-scale';

	const steps = [50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 850, 900, 950];
	
	steps.forEach(step => {
		const color = KNOWN_VALUES.gray[step];  // Already blended, use directly

		const swatch = document.createElement('div');
		swatch.className = 'color-swatch-container';

		const swatchColor = document.createElement('div');
		swatchColor.className = 'color-swatch';
		swatchColor.style.backgroundColor = `var(--flexoki-${step})`;

		const swatchLabel = document.createElement('div');
		swatchLabel.className = 'color-swatch-label';
		swatchLabel.innerHTML = `
			<div class="color-swatch-label-name">${step}</div>
			<div class="color-swatch-label-hex">
				${color.toUpperCase()}
			</div>
		`;

		swatch.appendChild(swatchColor);
		swatch.appendChild(swatchLabel);
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

	updateCSSOutput();
}

class CurveEditor {
	constructor(canvasId, onChange) {
		this.canvas = document.getElementById(canvasId);
		this.ctx = this.canvas.getContext('2d');
		
		// Get curve type from canvas ID - more precise matching
		let curveType;
		if (canvasId.includes('Chroma')) {
			// Check for specific Chroma type instead of finding first match
			if (canvasId.includes('pre400')) {
				curveType = 'pre400Chroma';
			} else if (canvasId.includes('post600')) {
				curveType = 'post600Chroma';
			}
		} else {
			if (canvasId.includes('pre400')) {
				curveType = 'pre400';
			} else if (canvasId.includes('mid')) {
				curveType = 'mid';
			} else if (canvasId.includes('post600')) {
				curveType = 'post600';
			}
		}
		
		this.points = JSON.parse(JSON.stringify(defaultPoints[curveType]));
		
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
		const dpr = window.devicePixelRatio || 1;
		
		// Set canvas size accounting for device pixel ratio
		canvas.width = canvas.clientWidth * dpr;
		canvas.height = canvas.clientHeight * dpr;
		
		// Scale context to match device pixel ratio
		ctx.scale(dpr, dpr);
		
		const w = canvas.clientWidth;
		const h = canvas.clientHeight;
		
		// Clear canvas
		ctx.clearRect(0, 0, w, h);
		
		// Draw grid
		ctx.strokeStyle = '#eee';
		ctx.lineWidth = 1;
		ctx.beginPath();
		for (let i = 0; i <= 10; i++) {
			ctx.moveTo(i * w/10, 0);
			ctx.lineTo(i * w/10, h);
			ctx.moveTo(0, i * h/10);
			ctx.lineTo(w, i * h/10);
		}
		ctx.stroke();
		
		// Draw curve with more points for smoothness
		ctx.strokeStyle = '#000';
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(this.points[0].x * w, (1 - this.points[0].y) * h);
		
		// Draw curve with many small segments
		for (let t = 0; t <= 1; t += 0.01) {
			const pos = this.evaluate(t);
			ctx.lineTo(pos.x * w, (1 - pos.y) * h);
		}
		
		ctx.stroke();
		
		// Draw control points
		ctx.fillStyle = '#000';
		this.points.forEach(p => {
			ctx.beginPath();
			ctx.arc(p.x * w, (1 - p.y) * h, 4, 0, Math.PI * 2);
			ctx.fill();
		});
		
		// Draw control lines
		ctx.strokeStyle = '#0002';
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(this.points[0].x * w, (1 - this.points[0].y) * h);
		ctx.lineTo(this.points[1].x * w, (1 - this.points[1].y) * h);
		ctx.moveTo(this.points[2].x * w, (1 - this.points[2].y) * h);
		ctx.lineTo(this.points[3].x * w, (1 - this.points[3].y) * h);
		ctx.stroke();
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
	// On first load, use the default points
	if (!window.curves) {
		// Remove mid curve from default points when displaying
		const displayPoints = { ...defaultPoints };
		delete displayPoints.mid;
		document.getElementById('curveOutput').value = JSON.stringify(displayPoints, null, 2);
		return;
	}

	// Otherwise use the current curve points
	const curveData = {
		pre400: window.curves.pre400.points,
		pre400Chroma: window.curves.pre400Chroma.points,
		post600: window.curves.post600.points,
		post600Chroma: window.curves.post600Chroma.points
	};
	
	document.getElementById('curveOutput').value = JSON.stringify(curveData, null, 2);
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
	window.post600Curve = window.curves.post600.evaluate.bind(window.curves.post600);
	window.post600ChromaCurve = window.curves.post600Chroma.evaluate.bind(window.curves.post600Chroma);

	// Initial generation
	generateAllScales();
	updateCurveData();

	// Add input handler for textarea
	document.getElementById('curveOutput').addEventListener('input', () => {
		clearTimeout(window.curveUpdateTimeout);
		window.curveUpdateTimeout = setTimeout(loadCurveDataFromTextarea, 500);
	});
});

function updateCSSOutput() {
	const colors = {};
	
	// Add paper and black
	colors['paper'] = KNOWN_VALUES.paper;
	colors['black'] = KNOWN_VALUES.black;
	
	// Add grayscale - use values directly
	const graySteps = [50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 850, 900, 950];
	graySteps.forEach(step => {
		colors[`${step}`] = KNOWN_VALUES.gray[step];
	});
	
	// Add color scales
	Object.keys(KNOWN_VALUES).forEach(color => {
		if (color !== 'paper' && color !== 'black' && color !== 'gray') {
			const steps = [50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 850, 900, 950];
			steps.forEach(step => {
				let colorHex;
				if (step === 400 || step === 600) {
					// Use known values directly since they're already multiplied
					colorHex = KNOWN_VALUES[color][step];
				} else {
					const t = step < 400 ? step / 400 : 
							step > 600 ? (step - 600) / 400 : 
							(step - 400) / 200;
					
					const curvePos = step < 400 ? window.pre400Curve(t) :
									step > 600 ? window.post600Curve(t) :
									{ y: t };
					
					const chromaPos = step < 400 ? window.pre400ChromaCurve(t) :
										step > 600 ? window.post600ChromaCurve(t) :
										{ y: t };
					
					const color400 = hexToOKLCH(KNOWN_VALUES[color][400]);
					const color600 = hexToOKLCH(KNOWN_VALUES[color][600]);
					const paperLCH = hexToOKLCH(KNOWN_VALUES.paper);
					const blackLCH = hexToOKLCH(KNOWN_VALUES.black);
					
					let lch;
					if (step < 400) {
						lch = [
							paperLCH[0] + (color400[0] - paperLCH[0]) * curvePos.y,
							color400[1] * chromaPos.y,
							color400[2]
						];
						colorHex = OKLCHToHex(...lch);
						// Add paper multiplication for pre-400 colors
						colorHex = multiplyColors(colorHex, KNOWN_VALUES.paper);
					} else if (step > 600) {
						lch = [
							color600[0] + (blackLCH[0] - color600[0]) * (1 - curvePos.y),
							color600[1] * chromaPos.y,
							color600[2]
						];
						colorHex = OKLCHToHex(...lch);
					} else {
						lch = [
							color400[0] + (color600[0] - color400[0]) * t,
							color400[1] + (color600[1] - color400[1]) * t,
							color400[2] + (color600[2] - color400[2]) * t
						];
						colorHex = OKLCHToHex(...lch);
					}
				}
				colors[`${color}-${step}`] = colorHex;
			});
		}
	});
	
	// Generate CSS with multiplied colors
	let css = ':root {\n';
	css += `  --flexoki-black:           ${colors.black};\n`;
	css += `  --flexoki-paper:           ${colors.paper};\n\n`;
	
	// Add grayscale
	graySteps.forEach(step => {
		const spacing = step === 50 ? '              ' : '             ';
		css += `  --flexoki-${step}:${spacing}${colors[step].toUpperCase()};\n`;
	});
	css += '\n';
	
	// Group colors by base color
	const colorGroups = {};
	Object.keys(colors).forEach(key => {
		if (key.includes('-')) {
			const [color, step] = key.split('-');
			if (!colorGroups[color]) {
				colorGroups[color] = [];
			}
			colorGroups[color].push([step, colors[key]]);
		}
	});
	
	// Add each color group with spacing
	Object.keys(colorGroups)
		.sort((a, b) => COLOR_ORDER.indexOf(a) - COLOR_ORDER.indexOf(b))
		.forEach(color => {
			colorGroups[color].sort((a, b) => parseInt(a[0]) - parseInt(b[0])).forEach(([step, hex]) => {
				const paddingLength = 'magenta'.length - color.length;
				const basePadding = step === '50' ? '      ' : '     ';
				const extraPadding = ' '.repeat(paddingLength);
				const spacing = basePadding + extraPadding;
				
				css += `  --flexoki-${color}-${step}:${spacing}${hex.toUpperCase()};\n`;
			});
			css += '\n';
		});
	
	css += '}';
	
	// Update textarea
	document.getElementById('cssOutput').value = css;
	
	// Update or create style element
	let styleEl = document.getElementById('flexoki-variables');
	if (!styleEl) {
		styleEl = document.createElement('style');
		styleEl.id = 'flexoki-variables';
		document.head.appendChild(styleEl);
	}
	styleEl.textContent = css;
} 