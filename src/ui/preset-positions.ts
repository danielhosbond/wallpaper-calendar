import { ElementPositions, DividerConfig } from '../types';

export interface LayoutPreset {
  name: string;
  positions: ElementPositions;
  dividers?: DividerConfig;
}

export const PRESETS: LayoutPreset[] = [
  {
    name: 'Classic',
    positions: {
      monthNumber: { x: 0.55, y: 0.45 },
      monthName: { x: 0.15, y: 0.12 },
      year: { x: 0.15, y: 0.18 },
      calendarGrid: { x: 0.15, y: 0.78 },
    },
  },
  {
    name: 'Centered',
    positions: {
      monthNumber: { x: 0.5, y: 0.4 },
      monthName: { x: 0.5, y: 0.12 },
      year: { x: 0.5, y: 0.18 },
      calendarGrid: { x: 0.5, y: 0.78 },
    },
  },
  {
    name: 'Corner',
    positions: {
      monthNumber: { x: 0.78, y: 0.35 },
      monthName: { x: 0.2, y: 0.85 },
      year: { x: 0.2, y: 0.9 },
      calendarGrid: { x: 0.2, y: 0.25 },
    },
  },
  {
    name: 'Minimal',
    positions: {
      monthNumber: { x: 0.5, y: 0.5 },
      monthName: { x: 0.5, y: 0.08 },
      year: { x: 0.5, y: 0.94 },
      calendarGrid: { x: 0.5, y: 0.75 },
    },
  },
  {
    // 4 equal sections: Year | Calendar | Month Number | Month Name
    // Dividers at 0.25, 0.50, 0.75
    name: 'Sections',
    positions: {
      year: { x: 0.125, y: 0.5 },
      calendarGrid: { x: 0.375, y: 0.5 },
      monthNumber: { x: 0.625, y: 0.5 },
      monthName: { x: 0.875, y: 0.5 },
    },
    dividers: {
      enabled: true,
      positions: [0.25, 0.50, 0.75],
      color: '#000000',
      opacity: 0.15,
    },
  },
];
