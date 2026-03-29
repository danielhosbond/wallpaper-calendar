import { ElementKey } from '../types';
import { getState, setState } from '../state';
import { elementBounds } from '../renderer/renderer';

const HIT_MARGIN = 15;

export function setupDragHandler(canvas: HTMLCanvasElement) {
  let dragging: ElementKey | null = null;
  let offsetX = 0;
  let offsetY = 0;

  function canvasCoords(e: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function hitTest(px: number, py: number): ElementKey | null {
    // Test in reverse visual order (top elements first)
    const keys: ElementKey[] = ['year', 'monthName', 'calendarGrid', 'monthNumber'];
    for (const key of keys) {
      const b = elementBounds.get(key);
      if (!b) continue;
      if (
        px >= b.x - HIT_MARGIN &&
        px <= b.x + b.width + HIT_MARGIN &&
        py >= b.y - HIT_MARGIN &&
        py <= b.y + b.height + HIT_MARGIN
      ) {
        return key;
      }
    }
    return null;
  }

  canvas.addEventListener('pointerdown', (e) => {
    const { x, y } = canvasCoords(e);
    const hit = hitTest(x, y);
    if (hit) {
      dragging = hit;
      const state = getState();
      const pos = state.elements[hit];
      offsetX = x - pos.x * canvas.width;
      offsetY = y - pos.y * canvas.height;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = 'grabbing';
    }
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!dragging) {
      const { x, y } = canvasCoords(e);
      const hit = hitTest(x, y);
      canvas.style.cursor = hit ? 'grab' : 'default';
      return;
    }

    const { x, y } = canvasCoords(e);
    const nx = (x - offsetX) / canvas.width;
    const ny = (y - offsetY) / canvas.height;

    const state = getState();
    setState({
      elements: {
        ...state.elements,
        [dragging]: { x: Math.max(0, Math.min(1, nx)), y: Math.max(0, Math.min(1, ny)) },
      },
    });
  });

  canvas.addEventListener('pointerup', () => {
    dragging = null;
    canvas.style.cursor = 'default';
  });
}
