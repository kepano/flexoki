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

// Generate color scale
function generateColorScale(baseColor) {
    const baseL = parseFloat(document.getElementById('lightnessRange').value);
    const baseC = parseFloat(document.getElementById('chromaRange').value);
    const hueAdjust = parseFloat(document.getElementById('hueAdjust').value);

    // Update the display values
    document.getElementById('lightnessValue').textContent = baseL;
    document.getElementById('chromaValue').textContent = baseC;
    document.getElementById('hueValue').textContent = hueAdjust;

    const baseValues = getBaseColorValues(baseColor);
    const steps = [50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 850, 900, 950];
    
    const grid = document.getElementById('colorGrid');
    grid.innerHTML = '';

    steps.forEach(step => {
        // Adjust how we calculate lightness and chroma
        const stepL = Math.max(0, Math.min(100, baseL * (1 - step/1000)));
        const stepC = Math.max(0, Math.min(150, baseC * (1 - step/2000)));
        const hue = baseValues.hue + hueAdjust;

        const color = LCHToHex(stepL, stepC, hue);

        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;
        swatch.innerHTML = `
            <span>
                ${baseColor}-${step}<br>
                ${color}<br>
                L:${Math.round(stepL)} C:${Math.round(stepC)} H:${Math.round(hue)}
            </span>
        `;
        grid.appendChild(swatch);
    });
}

// Get base color LCH values
function getBaseColorValues(color) {
    const values = {
        red: { hue: 20, chroma: 50 },
        orange: { hue: 40, chroma: 60 },
        yellow: { hue: 85, chroma: 80 },
        green: { hue: 120, chroma: 40 },
        cyan: { hue: 190, chroma: 40 },
        blue: { hue: 250, chroma: 50 },
        purple: { hue: 280, chroma: 45 },
        magenta: { hue: 320, chroma: 50 }
    };
    return values[color];
}

// Event handling
document.addEventListener('DOMContentLoaded', () => {
    const controls = {
        baseColor: document.getElementById('baseColor'),
        lightness: document.getElementById('lightnessRange'),
        chroma: document.getElementById('chromaRange'),
        hue: document.getElementById('hueAdjust')
    };

    // Base color change
    controls.baseColor.addEventListener('change', () => {
        generateColorScale(controls.baseColor.value);
    });

    // Slider changes
    controls.lightness.addEventListener('input', () => generateColorScale(controls.baseColor.value));
    controls.chroma.addEventListener('input', () => generateColorScale(controls.baseColor.value));
    controls.hue.addEventListener('input', () => generateColorScale(controls.baseColor.value));

    // Initial generation
    generateColorScale('red');
}); 