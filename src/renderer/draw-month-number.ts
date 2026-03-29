import { ElementPosition, ElementBounds, ElementStyle } from '../types';
import { font, drawTextCentered, measureText } from './text-utils';

export function drawMonthNumber(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  month: number,
  pos: ElementPosition,
  style: ElementStyle,
): ElementBounds {
  const text = String(month);
  const size = Math.min(w, h) * 0.55 * style.size;
  const f = font(700, size);
  const px = pos.x * w;
  const py = pos.y * h;

  drawTextCentered(ctx, text, px, py, f, style.color, style.opacity);

  const m = measureText(ctx, text, f);
  const textW = m.width;
  const textH = size;
  return { x: px - textW / 2, y: py - textH / 2, width: textW, height: textH };
}
