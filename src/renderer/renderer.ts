import { WallpaperConfig, ElementBounds, ElementKey } from '../types';
import { drawGradient } from './draw-gradient';
import { drawDividers } from './draw-dividers';
import { drawMonthNumber } from './draw-month-number';
import { drawMonthName } from './draw-month-name';
import { drawYear } from './draw-year';
import { drawCalendarGrid } from './draw-calendar-grid';
import { drawAdditionalTexts } from './draw-additional-texts';

export const elementBounds = new Map<ElementKey, ElementBounds>();

export function render(ctx: CanvasRenderingContext2D, config: WallpaperConfig, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
  elementBounds.clear();

  drawGradient(ctx, w, h, config.gradient);
  drawDividers(ctx, w, h, config.dividers);

  elementBounds.set('monthNumber', drawMonthNumber(ctx, w, h, config.month, config.elements.monthNumber, config.styles.monthNumber));
  elementBounds.set('calendarGrid', drawCalendarGrid(ctx, w, h, config.month, config.year, config.elements.calendarGrid, config.gridStyle, config.styles.calendarGrid, config.showWeekNumbers));
  elementBounds.set('monthName', drawMonthName(ctx, w, h, config.month, config.elements.monthName, config.styles.monthName));
  elementBounds.set('year', drawYear(ctx, w, h, config.year, config.elements.year, config.styles.year));
  drawAdditionalTexts(ctx, w, h, config.additionalTexts);
}
