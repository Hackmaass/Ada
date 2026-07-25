"use client";

import React, { useEffect, useRef, useCallback } from 'react';

interface ShapeGridProps {
  speed?: number;
  squareSize?: number;
  direction?: 'diagonal' | 'horizontal' | 'vertical';
  borderColor?: string;
  hoverFillColor?: string;
  shape?: 'square' | 'circle';
  hoverTrailAmount?: number;
  className?: string;
  style?: React.CSSProperties;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 91, g: 115, b: 174 };
}

export default function ShapeGrid({
  speed = 0.5,
  squareSize = 40,
  direction = 'diagonal',
  borderColor = '#5B73AE',
  hoverFillColor = '#222222',
  shape = 'square',
  hoverTrailAmount = 0,
  className = '',
  style = {},
}: ShapeGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const rgb = hexToRgb(borderColor);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    if (W === 0 || H === 0) {
      rafRef.current = requestAnimationFrame(draw);
      return;
    }

    const cols = Math.ceil(W / squareSize) + 1;
    const rows = Math.ceil(H / squareSize) + 1;
    const t = timeRef.current;

    ctx.clearRect(0, 0, W, H);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * squareSize;
        const y = row * squareSize;

        let phase: number;
        if (direction === 'diagonal') {
          phase = (col + row) * 0.4 - t * speed * 1.5;
        } else if (direction === 'horizontal') {
          phase = col * 0.4 - t * speed * 1.5;
        } else {
          phase = row * 0.4 - t * speed * 1.5;
        }

        // Gentle sine wave between 0.06 and 0.22 opacity
        const wave = Math.sin(phase) * 0.5 + 0.5;
        const alpha = 0.06 + wave * 0.16;

        ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
        ctx.lineWidth = 0.75;
        ctx.beginPath();

        if (shape === 'circle') {
          const cx = x + squareSize / 2;
          const cy = y + squareSize / 2;
          const r = squareSize * 0.45;
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
        } else {
          ctx.rect(x + 0.5, y + 0.5, squareSize - 1, squareSize - 1);
        }

        ctx.stroke();
      }
    }

    timeRef.current += 0.016;
    rafRef.current = requestAnimationFrame(draw);
  }, [squareSize, direction, speed, shape, rgb.r, rgb.g, rgb.b]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    setSize();
    const ro = new ResizeObserver(setSize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  );
}
