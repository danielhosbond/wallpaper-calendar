const FONT_FAMILY = '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';

export function font(weight: number, sizePx: number): string {
  return `${weight} ${sizePx}px ${FONT_FAMILY}`;
}

export function drawTextCentered(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontStr: string,
  color: string,
  alpha: number = 1,
) {
  ctx.save();
  ctx.font = fontStr;
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
  ctx.restore();
}

export function measureText(ctx: CanvasRenderingContext2D, text: string, fontStr: string): TextMetrics {
  ctx.save();
  ctx.font = fontStr;
  const m = ctx.measureText(text);
  ctx.restore();
  return m;
}
