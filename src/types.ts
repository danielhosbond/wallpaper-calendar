export interface Resolution {
  width: number;
  height: number;
  label: string;
}

export interface GradientStop {
  color: string;
  position: number;
}

export interface GradientConfig {
  angle: number;
  stops: GradientStop[];
}

export interface ElementPosition {
  x: number; // 0-1 normalized
  y: number; // 0-1 normalized
}

export interface ElementPositions {
  monthNumber: ElementPosition;
  monthName: ElementPosition;
  year: ElementPosition;
  calendarGrid: ElementPosition;
}

export type GridStyle = 'dots' | 'numbers';

export interface ElementStyle {
  size: number; // multiplier, 1 = default
  color: string;
  opacity: number; // 0-1
}

export interface ElementStyles {
  monthNumber: ElementStyle;
  monthName: ElementStyle;
  year: ElementStyle;
  calendarGrid: ElementStyle;
}

export interface DividerConfig {
  enabled: boolean;
  positions: number[]; // normalized x positions (0-1)
  color: string;
  opacity: number;
}

export interface WallpaperConfig {
  month: number; // 1-12
  year: number;
  resolution: Resolution;
  gradient: GradientConfig;
  elements: ElementPositions;
  styles: ElementStyles;
  gridStyle: GridStyle;
  showWeekNumbers: boolean;
  dividers: DividerConfig;
  customGradient: boolean;
}

export interface ElementBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type ElementKey = keyof ElementPositions;
