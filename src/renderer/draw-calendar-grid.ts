import { ElementPosition, ElementBounds, GridStyle, ElementStyle } from '../types';
import { getCalendarGrid, getWeekNumbers } from '../calendar/calendar-math';
import { font } from './text-utils';

const DAY_HEADERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

export function drawCalendarGrid(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  month: number,
  year: number,
  pos: ElementPosition,
  gridStyle: GridStyle,
  style: ElementStyle,
  showWeekNumbers: boolean,
): ElementBounds {
  const grid = getCalendarGrid(year, month);
  const weekNums = showWeekNumbers ? getWeekNumbers(year, month, grid) : [];
  const scale = Math.min(w, h);
  const cellSize = scale * 0.018 * style.size;
  const gap = cellSize * 1.6;
  const dotRadius = cellSize * 0.3;

  const cols = 7;
  const rows = grid.length;
  const weekColW = showWeekNumbers ? gap * 1.2 : 0;
  const gridW = cols * gap + weekColW;
  const gridH = (rows + 1) * gap;

  const originX = pos.x * w - gridW / 2;
  const originY = pos.y * h - gridH / 2;
  const dayOriginX = originX + weekColW;

  const { r, g, b } = hexToRgb(style.color);

  const baseAlpha = style.opacity;

  ctx.save();

  const headerFont = font(400, cellSize * 0.65);
  const weekFont = font(300, cellSize * 0.55);

  // Draw "Wk" header if week numbers enabled
  if (showWeekNumbers) {
    ctx.font = weekFont;
    ctx.fillStyle = `rgba(${r},${g},${b},${0.35 * baseAlpha})`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('W', originX + weekColW / 2, originY + gap / 2);
  }

  // Draw day headers
  ctx.font = headerFont;
  ctx.fillStyle = `rgba(${r},${g},${b},${0.5 * baseAlpha})`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let c = 0; c < cols; c++) {
    const cx = dayOriginX + c * gap + gap / 2;
    const cy = originY + gap / 2;
    ctx.fillText(DAY_HEADERS[c], cx, cy);
  }

  // Draw week numbers
  if (showWeekNumbers) {
    ctx.font = weekFont;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let ri = 0; ri < rows; ri++) {
      const cy = originY + (ri + 1) * gap + gap / 2;
      ctx.fillStyle = `rgba(${r},${g},${b},${0.35 * baseAlpha})`;
      ctx.fillText(String(weekNums[ri]), originX + weekColW / 2, cy);
    }
  }

  // Draw days
  const numFont = font(400, cellSize * 0.6);

  for (let ri = 0; ri < rows; ri++) {
    for (let c = 0; c < cols; c++) {
      const day = grid[ri][c];
      if (day === null) continue;

      const cx = dayOriginX + c * gap + gap / 2;
      const cy = originY + (ri + 1) * gap + gap / 2;
      const isWeekend = c >= 5;
      const alpha = (isWeekend ? 0.4 : 0.7) * baseAlpha;

      if (gridStyle === 'dots') {
        ctx.beginPath();
        ctx.arc(cx, cy, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      } else {
        ctx.font = numFont;
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(day), cx, cy);
      }
    }
  }

  ctx.restore();

  return { x: originX, y: originY, width: gridW, height: gridH };
}
