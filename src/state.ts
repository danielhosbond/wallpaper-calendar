import { WallpaperConfig } from './types';
import { getDefaultGradient } from './ui/color-presets';
import { PRESETS } from './ui/preset-positions';
import { RESOLUTIONS } from './ui/controls';

type Listener = () => void;

const now = new Date();

const defaultConfig: WallpaperConfig = {
  month: now.getMonth() + 1,
  year: now.getFullYear(),
  resolution: RESOLUTIONS[6],
  gradient: getDefaultGradient(now.getMonth() + 1),
  elements: PRESETS[0].positions,
  styles: {
    monthNumber: { size: 1, color: '#000000', opacity: 0.12 },
    monthName: { size: 1, color: '#ffffff', opacity: 0.85 },
    year: { size: 1, color: '#ffffff', opacity: 0.7 },
    calendarGrid: { size: 1, color: '#ffffff', opacity: 1 },
  },
  gridStyle: 'dots',
  showWeekNumbers: false,
  dividers: { enabled: false, positions: [], color: '#000000', opacity: 0.15 },
  customGradient: false,
};

let config: WallpaperConfig = { ...defaultConfig };
const listeners: Listener[] = [];
let frameRequested = false;

export function getState(): WallpaperConfig {
  return config;
}

export function setState(partial: Partial<WallpaperConfig>) {
  config = { ...config, ...partial };
  if (!frameRequested) {
    frameRequested = true;
    requestAnimationFrame(() => {
      frameRequested = false;
      listeners.forEach((fn) => fn());
    });
  }
}

export function subscribe(fn: Listener) {
  listeners.push(fn);
}
