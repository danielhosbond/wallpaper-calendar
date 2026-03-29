import { WallpaperConfig } from '../types';
import { render } from '../renderer/renderer';

const MONTH_NAMES = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
];

export function exportWallpaper(config: WallpaperConfig) {
  const { width, height } = config.resolution;
  const offscreen = document.createElement('canvas');
  offscreen.width = width;
  offscreen.height = height;
  const ctx = offscreen.getContext('2d')!;

  render(ctx, config, width, height);

  offscreen.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wallpaper-${MONTH_NAMES[config.month - 1]}-${config.year}.png`;
    a.click();
    URL.revokeObjectURL(url);
  }, 'image/png');
}
