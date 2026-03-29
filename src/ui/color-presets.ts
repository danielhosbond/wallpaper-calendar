import { GradientConfig } from '../types';

const MONTH_GRADIENTS: GradientConfig[] = [
  // January — icy blue to warm steel grey, winter chill
  { angle: 140, stops: [{ color: '#1b2e4a', position: 0 }, { color: '#4a6d8c', position: 0.5 }, { color: '#8badc4', position: 1 }] },
  // February — deep violet to soft lilac, Valentine's romance
  { angle: 155, stops: [{ color: '#4a1a6b', position: 0 }, { color: '#8b4dab', position: 0.5 }, { color: '#c9a0dc', position: 1 }] },
  // March — forest teal to spring green, first buds
  { angle: 130, stops: [{ color: '#1a4a3a', position: 0 }, { color: '#3d8b6e', position: 0.5 }, { color: '#7cc4a0', position: 1 }] },
  // April — fresh green to sky blue, spring showers
  { angle: 145, stops: [{ color: '#2a6b3a', position: 0 }, { color: '#5aab7a', position: 0.45 }, { color: '#a0d8e8', position: 1 }] },
  // May — vibrant magenta to soft pink, blooming flowers
  { angle: 160, stops: [{ color: '#8b1a4a', position: 0 }, { color: '#d44d7a', position: 0.5 }, { color: '#f0a0c0', position: 1 }] },
  // June — golden amber to warm cream, long sunny days
  { angle: 135, stops: [{ color: '#8b6a10', position: 0 }, { color: '#d4a830', position: 0.5 }, { color: '#f0e0a0', position: 1 }] },
  // July — fiery red-orange to peach, peak summer heat
  { angle: 150, stops: [{ color: '#9b2a10', position: 0 }, { color: '#e06030', position: 0.5 }, { color: '#f4b090', position: 1 }] },
  // August — burnt orange to sandy tan, late summer warmth
  { angle: 140, stops: [{ color: '#7a3a10', position: 0 }, { color: '#c47030', position: 0.5 }, { color: '#e8c098', position: 1 }] },
  // September — olive to warm amber, early autumn harvest
  { angle: 155, stops: [{ color: '#4a5a10', position: 0 }, { color: '#8a9a20', position: 0.45 }, { color: '#d0c850', position: 1 }] },
  // October — deep crimson to burnt sienna, falling leaves
  { angle: 140, stops: [{ color: '#6b1a10', position: 0 }, { color: '#b84020', position: 0.5 }, { color: '#e08050', position: 1 }] },
  // November — dark plum to dusky mauve, fading light
  { angle: 130, stops: [{ color: '#20102a', position: 0 }, { color: '#5a3070', position: 0.5 }, { color: '#9a70b0', position: 1 }] },
  // December — deep ocean teal to dark emerald, winter nights
  { angle: 150, stops: [{ color: '#0a2a2a', position: 0 }, { color: '#1a5050', position: 0.5 }, { color: '#308070', position: 1 }] },
];

export function getDefaultGradient(month: number): GradientConfig {
  const src = MONTH_GRADIENTS[month - 1];
  return { angle: src.angle, stops: src.stops.map((s) => ({ ...s })) };
}
