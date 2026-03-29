import { Resolution, ElementKey } from '../types';
import { getState, setState } from '../state';
import { getDefaultGradient } from './color-presets';
import { PRESETS } from './preset-positions';
import { exportWallpaper } from '../export/export';

export const RESOLUTIONS: Resolution[] = [
  { width: 1080, height: 1920, label: '1080 x 1920 (Phone)' },
  { width: 1170, height: 2532, label: '1170 x 2532 (iPhone)' },
  { width: 1440, height: 3200, label: '1440 x 3200 (Android)' },
  { width: 1920, height: 1080, label: '1920 x 1080 (Desktop)' },
  { width: 2560, height: 1440, label: '2560 x 1440 (QHD)' },
  { width: 3840, height: 2160, label: '3840 x 2160 (4K)' },
  { width: 7680, height: 4320, label: '7680 x 4320 (8K)' },
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const SHORT_MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

interface ElementStyleControl {
  key: ElementKey;
  label: string;
  minSize: number;
  maxSize: number;
  defaultSize: number;
}

const ELEMENT_STYLE_CONTROLS: ElementStyleControl[] = [
  { key: 'monthNumber', label: 'Month Number', minSize: 0.2, maxSize: 3, defaultSize: 1 },
  { key: 'monthName', label: 'Month Name', minSize: 0.3, maxSize: 4, defaultSize: 1 },
  { key: 'year', label: 'Year', minSize: 0.3, maxSize: 4, defaultSize: 1 },
  { key: 'calendarGrid', label: 'Calendar Grid', minSize: 0.3, maxSize: 3, defaultSize: 1 },
];

function buildElementStyleHTML(ctrl: ElementStyleControl): string {
  return `
    <div class="control-group element-style-group">
      <label>${ctrl.label}</label>
      <div class="style-row">
        <input type="color" id="ctrl-style-color-${ctrl.key}" class="style-color">
        <input type="range" id="ctrl-style-size-${ctrl.key}" min="${ctrl.minSize}" max="${ctrl.maxSize}" step="0.05" value="${ctrl.defaultSize}" class="style-slider">
        <span id="ctrl-style-size-val-${ctrl.key}" class="style-val"></span>
      </div>
      <div class="style-row">
        <span class="pos-label">Op</span>
        <input type="range" id="ctrl-style-opacity-${ctrl.key}" min="0" max="1" step="0.01" value="1" class="style-slider">
        <span id="ctrl-style-opacity-val-${ctrl.key}" class="style-val"></span>
      </div>
      <div class="style-row">
        <span class="pos-label">X</span>
        <input type="range" id="ctrl-style-posx-${ctrl.key}" min="0" max="1" step="0.01" value="0.5" class="style-slider">
        <span id="ctrl-style-posx-val-${ctrl.key}" class="style-val"></span>
      </div>
      <div class="style-row">
        <span class="pos-label">Y</span>
        <input type="range" id="ctrl-style-posy-${ctrl.key}" min="0" max="1" step="0.01" value="0.5" class="style-slider">
        <span id="ctrl-style-posy-val-${ctrl.key}" class="style-val"></span>
      </div>
    </div>
  `;
}

export function buildControls(container: HTMLElement) {
  container.innerHTML = `
    <div class="control-group">
      <label>Month</label>
      <select id="ctrl-month">
        ${MONTH_NAMES.map((n, i) => `<option value="${i + 1}">${n}</option>`).join('')}
      </select>
    </div>
    <div class="control-group">
      <label>Year</label>
      <input type="number" id="ctrl-year" min="2000" max="2100">
    </div>
    <div class="control-group">
      <label>Resolution</label>
      <select id="ctrl-resolution">
        ${RESOLUTIONS.map((r, i) => `<option value="${i}">${r.label}</option>`).join('')}
      </select>
    </div>

    <div class="section-divider"></div>
    <div class="section-label">Color Theme</div>

    <div class="control-group">
      <label>Presets</label>
      <div class="color-preset-grid">
        ${SHORT_MONTH_NAMES.map((n, i) => `<button class="color-preset-btn" data-color-preset="${i + 1}">${n}</button>`).join('')}
      </div>
    </div>
    <div class="control-group">
      <label>Custom Colors</label>
      <div class="color-row">
        <input type="color" id="ctrl-color1">
        <input type="color" id="ctrl-color2">
        <input type="color" id="ctrl-color3">
      </div>
    </div>
    <div class="control-group">
      <label>Gradient Angle</label>
      <input type="range" id="ctrl-angle" min="0" max="360" step="1">
      <span id="ctrl-angle-val"></span>
    </div>

    <div class="section-divider"></div>
    <div class="section-label">Element Styles</div>

    ${ELEMENT_STYLE_CONTROLS.map(buildElementStyleHTML).join('')}

    <div class="section-divider"></div>

    <div class="control-group">
      <label>Grid Style</label>
      <div class="toggle-row">
        <button id="ctrl-dots" class="toggle-btn active">Dots</button>
        <button id="ctrl-numbers" class="toggle-btn">Numbers</button>
      </div>
    </div>
    <div class="control-group">
      <label>Week Numbers</label>
      <div class="toggle-row">
        <button id="ctrl-weeknums-off" class="toggle-btn active">Off</button>
        <button id="ctrl-weeknums-on" class="toggle-btn">On</button>
      </div>
    </div>
    <div class="control-group">
      <label>Layout Preset</label>
      <div class="preset-row">
        ${PRESETS.map((p, i) => `<button class="preset-btn${i === 0 ? ' active' : ''}" data-preset="${i}">${p.name}</button>`).join('')}
      </div>
    </div>
    <button id="ctrl-export" class="export-btn">Export PNG</button>
  `;

  const monthSelect = container.querySelector('#ctrl-month') as HTMLSelectElement;
  const yearInput = container.querySelector('#ctrl-year') as HTMLInputElement;
  const resSelect = container.querySelector('#ctrl-resolution') as HTMLSelectElement;
  const color1 = container.querySelector('#ctrl-color1') as HTMLInputElement;
  const color2 = container.querySelector('#ctrl-color2') as HTMLInputElement;
  const color3 = container.querySelector('#ctrl-color3') as HTMLInputElement;
  const angleSlider = container.querySelector('#ctrl-angle') as HTMLInputElement;
  const angleVal = container.querySelector('#ctrl-angle-val') as HTMLSpanElement;
  const dotsBtn = container.querySelector('#ctrl-dots') as HTMLButtonElement;
  const numbersBtn = container.querySelector('#ctrl-numbers') as HTMLButtonElement;
  const weekNumsOff = container.querySelector('#ctrl-weeknums-off') as HTMLButtonElement;
  const weekNumsOn = container.querySelector('#ctrl-weeknums-on') as HTMLButtonElement;
  const exportBtn = container.querySelector('#ctrl-export') as HTMLButtonElement;
  const presetBtns = container.querySelectorAll('.preset-btn');
  const colorPresetBtns = container.querySelectorAll('.color-preset-btn');

  // Element style controls
  const styleControls = ELEMENT_STYLE_CONTROLS.map((ctrl) => ({
    key: ctrl.key,
    colorInput: container.querySelector(`#ctrl-style-color-${ctrl.key}`) as HTMLInputElement,
    sizeSlider: container.querySelector(`#ctrl-style-size-${ctrl.key}`) as HTMLInputElement,
    sizeVal: container.querySelector(`#ctrl-style-size-val-${ctrl.key}`) as HTMLSpanElement,
    opacitySlider: container.querySelector(`#ctrl-style-opacity-${ctrl.key}`) as HTMLInputElement,
    opacityVal: container.querySelector(`#ctrl-style-opacity-val-${ctrl.key}`) as HTMLSpanElement,
    posXSlider: container.querySelector(`#ctrl-style-posx-${ctrl.key}`) as HTMLInputElement,
    posXVal: container.querySelector(`#ctrl-style-posx-val-${ctrl.key}`) as HTMLSpanElement,
    posYSlider: container.querySelector(`#ctrl-style-posy-${ctrl.key}`) as HTMLInputElement,
    posYVal: container.querySelector(`#ctrl-style-posy-val-${ctrl.key}`) as HTMLSpanElement,
  }));

  function syncUI() {
    const s = getState();
    monthSelect.value = String(s.month);
    yearInput.value = String(s.year);
    const resIdx = RESOLUTIONS.findIndex((r) => r.width === s.resolution.width && r.height === s.resolution.height);
    if (resIdx >= 0) resSelect.value = String(resIdx);
    color1.value = s.gradient.stops[0].color;
    color2.value = s.gradient.stops[1]?.color ?? s.gradient.stops[0].color;
    color3.value = s.gradient.stops[2]?.color ?? s.gradient.stops[s.gradient.stops.length - 1].color;
    angleSlider.value = String(s.gradient.angle);
    angleVal.textContent = `${s.gradient.angle}\u00B0`;

    dotsBtn.classList.toggle('active', s.gridStyle === 'dots');
    numbersBtn.classList.toggle('active', s.gridStyle === 'numbers');
    weekNumsOff.classList.toggle('active', !s.showWeekNumbers);
    weekNumsOn.classList.toggle('active', s.showWeekNumbers);

    for (const sc of styleControls) {
      const es = s.styles[sc.key];
      sc.colorInput.value = es.color;
      sc.sizeSlider.value = String(es.size);
      sc.sizeVal.textContent = `${es.size.toFixed(1)}x`;
      sc.opacitySlider.value = String(es.opacity);
      sc.opacityVal.textContent = `${Math.round(es.opacity * 100)}%`;
      const pos = s.elements[sc.key];
      sc.posXSlider.value = String(pos.x);
      sc.posXVal.textContent = `${Math.round(pos.x * 100)}%`;
      sc.posYSlider.value = String(pos.y);
      sc.posYVal.textContent = `${Math.round(pos.y * 100)}%`;
    }
  }

  syncUI();

  monthSelect.addEventListener('change', () => {
    setState({ month: Number(monthSelect.value) });
  });

  yearInput.addEventListener('input', () => {
    setState({ year: Number(yearInput.value) });
  });

  resSelect.addEventListener('change', () => {
    setState({ resolution: RESOLUTIONS[Number(resSelect.value)] });
  });

  // Color theme presets
  colorPresetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const month = Number((btn as HTMLElement).dataset.colorPreset);
      const gradient = getDefaultGradient(month);
      setState({ gradient, customGradient: false });
      colorPresetBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      syncUI();
    });
  });

  color1.addEventListener('input', () => {
    const s = getState();
    const stops = [...s.gradient.stops];
    stops[0] = { color: color1.value, position: 0 };
    setState({ gradient: { ...s.gradient, stops }, customGradient: true });
    colorPresetBtns.forEach((b) => b.classList.remove('active'));
  });

  color2.addEventListener('input', () => {
    const s = getState();
    const stops = [...s.gradient.stops];
    stops[1] = { color: color2.value, position: 0.5 };
    setState({ gradient: { ...s.gradient, stops }, customGradient: true });
    colorPresetBtns.forEach((b) => b.classList.remove('active'));
  });

  color3.addEventListener('input', () => {
    const s = getState();
    const stops = [...s.gradient.stops];
    stops[2] = { color: color3.value, position: 1 };
    setState({ gradient: { ...s.gradient, stops }, customGradient: true });
    colorPresetBtns.forEach((b) => b.classList.remove('active'));
  });

  angleSlider.addEventListener('input', () => {
    const s = getState();
    setState({
      gradient: { ...s.gradient, angle: Number(angleSlider.value) },
      customGradient: true,
    });
    angleVal.textContent = `${angleSlider.value}\u00B0`;
  });

  // Element style bindings
  for (const sc of styleControls) {
    sc.colorInput.addEventListener('input', () => {
      const s = getState();
      setState({
        styles: {
          ...s.styles,
          [sc.key]: { ...s.styles[sc.key], color: sc.colorInput.value },
        },
      });
    });

    sc.sizeSlider.addEventListener('input', () => {
      const s = getState();
      const size = Number(sc.sizeSlider.value);
      setState({
        styles: {
          ...s.styles,
          [sc.key]: { ...s.styles[sc.key], size },
        },
      });
      sc.sizeVal.textContent = `${size.toFixed(1)}x`;
    });

    sc.opacitySlider.addEventListener('input', () => {
      const s = getState();
      const opacity = Number(sc.opacitySlider.value);
      setState({
        styles: {
          ...s.styles,
          [sc.key]: { ...s.styles[sc.key], opacity },
        },
      });
      sc.opacityVal.textContent = `${Math.round(opacity * 100)}%`;
    });

    sc.posXSlider.addEventListener('input', () => {
      const s = getState();
      const x = Number(sc.posXSlider.value);
      setState({
        elements: {
          ...s.elements,
          [sc.key]: { ...s.elements[sc.key], x },
        },
      });
      sc.posXVal.textContent = `${Math.round(x * 100)}%`;
    });

    sc.posYSlider.addEventListener('input', () => {
      const s = getState();
      const y = Number(sc.posYSlider.value);
      setState({
        elements: {
          ...s.elements,
          [sc.key]: { ...s.elements[sc.key], y },
        },
      });
      sc.posYVal.textContent = `${Math.round(y * 100)}%`;
    });
  }

  dotsBtn.addEventListener('click', () => {
    setState({ gridStyle: 'dots' });
    syncUI();
  });

  numbersBtn.addEventListener('click', () => {
    setState({ gridStyle: 'numbers' });
    syncUI();
  });

  weekNumsOff.addEventListener('click', () => {
    setState({ showWeekNumbers: false });
    syncUI();
  });

  weekNumsOn.addEventListener('click', () => {
    setState({ showWeekNumbers: true });
    syncUI();
  });

  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number((btn as HTMLElement).dataset.preset);
      const preset = PRESETS[idx];
      setState({
        elements: { ...preset.positions },
        dividers: preset.dividers
          ? { ...preset.dividers, positions: [...preset.dividers.positions] }
          : { enabled: false, positions: [], color: '#000000', opacity: 0.15 },
      });
      presetBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  exportBtn.addEventListener('click', () => {
    exportWallpaper(getState());
  });
}
