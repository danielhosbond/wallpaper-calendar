import { ElementPosition, ElementBounds, ElementStyle } from '../types';
import { font, drawTextCentered, measureText } from './text-utils';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function drawMonthName(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  month: number,
  pos: ElementPosition,
  style: ElementStyle,
): ElementBounds {
  const text = MONTH_NAMES[month - 1];
  const size = Math.min(w, h) * 0.035 * style.size;
  const f = font(400, size);
  const px = pos.x * w;
  const py = pos.y * h;

  drawTextCentered(ctx, text, px, py, f, style.color, style.opacity);

  const m = measureText(ctx, text, f);
  return { x: px - m.width / 2, y: py - size / 2, width: m.width, height: size };
}
