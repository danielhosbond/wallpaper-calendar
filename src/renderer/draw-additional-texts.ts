import { AdditionalText } from '../types';
import { font, drawTextCentered } from './text-utils';

export function drawAdditionalTexts(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  texts: AdditionalText[],
) {
  for (const t of texts) {
    if (!t.text.trim()) continue;
    const size = Math.min(w, h) * 0.025 * t.size;
    drawTextCentered(ctx, t.text, t.x * w, t.y * h, font(400, size), t.color, t.opacity);
  }
}
