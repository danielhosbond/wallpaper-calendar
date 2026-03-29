export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/** Returns 0=Monday .. 6=Sunday (ISO week) */
export function getFirstDayOfWeek(year: number, month: number): number {
  const day = new Date(year, month - 1, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

/**
 * Returns a 2D grid of week rows.
 * Each cell is a day number or null (empty).
 */
export function getCalendarGrid(year: number, month: number): (number | null)[][] {
  const days = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const rows: (number | null)[][] = [];
  let row: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    row.push(null);
  }

  for (let d = 1; d <= days; d++) {
    row.push(d);
    if (row.length === 7) {
      rows.push(row);
      row = [];
    }
  }

  if (row.length > 0) {
    while (row.length < 7) row.push(null);
    rows.push(row);
  }

  return rows;
}

/** Returns the ISO 8601 week number for a given date. */
export function getISOWeekNumber(year: number, month: number, day: number): number {
  const date = new Date(year, month - 1, day);
  const thursday = new Date(date);
  thursday.setDate(date.getDate() + (3 - ((date.getDay() + 6) % 7)));
  const jan4 = new Date(thursday.getFullYear(), 0, 4);
  return 1 + Math.round(((thursday.getTime() - jan4.getTime()) / 86400000 - (3 - ((jan4.getDay() + 6) % 7))) / 7);
}

/**
 * Returns the week number for each row of the calendar grid.
 * Uses the first actual day in each row to compute the ISO week.
 */
export function getWeekNumbers(year: number, month: number, grid: (number | null)[][]): number[] {
  return grid.map((row) => {
    const firstDay = row.find((d) => d !== null);
    if (firstDay !== undefined && firstDay !== null) {
      return getISOWeekNumber(year, month, firstDay);
    }
    return 0;
  });
}
