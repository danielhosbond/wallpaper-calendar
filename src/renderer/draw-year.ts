import { ElementPosition, ElementBounds, ElementStyle } from '../types';
import { font, drawTextCentered, measureText } from './text-utils';

export function drawYear(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  year: number,
  pos: ElementPosition,
  style: ElementStyle,
): ElementBounds {
  const text = String(year);
  const size = Math.min(w, h) * 0.025 * style.size;
  const f = font(300, size);
  const px = pos.x * w;
  const py = pos.y * h;

  drawTextCentered(ctx, text, px, py, f, style.color, style.opacity);

  const m = measureText(ctx, text, f);
  return { x: px - m.width / 2, y: py - size / 2, width: m.width, height: size };
}
