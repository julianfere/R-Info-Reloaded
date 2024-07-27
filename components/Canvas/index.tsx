import { forwardRef } from 'react';
import { ICanvasProps } from './types';

const Canvas = forwardRef<HTMLCanvasElement, ICanvasProps>(function Canvas(
  { width = 950, height = 800 },
  ref
) {
  return <canvas ref={ref} width={width} height={height} />;
});

export default Canvas;
