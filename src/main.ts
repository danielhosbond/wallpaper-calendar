import { getState, subscribe } from './state';
import { render } from './renderer/renderer';
import { buildControls } from './ui/controls';
import { setupDragHandler } from './ui/drag-handler';
import './styles/main.css';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const controlsEl = document.getElementById('controls') as HTMLElement;

function resizeCanvas() {
  const state = getState();
  const aspect = state.resolution.width / state.resolution.height;
  const container = canvas.parentElement!;
  const maxW = container.clientWidth;
  const maxH = container.clientHeight;

  let displayW: number, displayH: number;
  if (maxW / maxH > aspect) {
    displayH = maxH;
    displayW = maxH * aspect;
  } else {
    displayW = maxW;
    displayH = maxW / aspect;
  }

  canvas.style.width = `${displayW}px`;
  canvas.style.height = `${displayH}px`;

  // Internal resolution for preview (capped for performance)
  const scale = Math.min(1, 1200 / state.resolution.width);
  canvas.width = Math.round(state.resolution.width * scale);
  canvas.height = Math.round(state.resolution.height * scale);
}

function draw() {
  resizeCanvas();
  render(ctx, getState(), canvas.width, canvas.height);
}

buildControls(controlsEl);
setupDragHandler(canvas);
subscribe(draw);

window.addEventListener('resize', draw);

// Initial draw
draw();
