import { DividerConfig } from '../types';

export function drawDividers(ctx: CanvasRenderingContext2D, w: number, h: number, config: DividerConfig) {
  if (!config.enabled || config.positions.length === 0) return;

  ctx.save();
  ctx.strokeStyle = config.color;
  ctx.globalAlpha = config.opacity;
  ctx.lineWidth = Math.max(1, w * 0.0008);

  const marginY = h * 0.08;

  for (const xPos of config.positions) {
    const x = Math.round(xPos * w) + 0.5;
    ctx.beginPath();
    ctx.moveTo(x, marginY);
    ctx.lineTo(x, h - marginY);
    ctx.stroke();
  }

  ctx.restore();
}
