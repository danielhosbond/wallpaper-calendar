import { GradientConfig } from '../types';

export function drawGradient(ctx: CanvasRenderingContext2D, w: number, h: number, config: GradientConfig) {
  const angleRad = (config.angle * Math.PI) / 180;
  const cx = w / 2;
  const cy = h / 2;
  const len = Math.sqrt(w * w + h * h) / 2;

  const x0 = cx - Math.cos(angleRad) * len;
  const y0 = cy - Math.sin(angleRad) * len;
  const x1 = cx + Math.cos(angleRad) * len;
  const y1 = cy + Math.sin(angleRad) * len;

  const grad = ctx.createLinearGradient(x0, y0, x1, y1);
  for (const stop of config.stops) {
    grad.addColorStop(stop.position, stop.color);
  }

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}
