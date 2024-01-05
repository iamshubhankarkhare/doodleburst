import React, { useLayoutEffect, useRef, useEffect, useState } from "react";

function DrawBoard() {
  const canvasRef: React.MutableRefObject<HTMLCanvasElement | null> =
    useRef(null);
  const isDrawing = useRef(false);
  const drawOffset = useRef({ x: 160, y: 80 }); // adjust this to match the offset of the canvas

  const getCanvas = (): HTMLCanvasElement => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (!canvas) throw new Error("Canvas is null");
    return canvas;
  };

  const getCanvasContext = (): CanvasRenderingContext2D => {
    const canvas = getCanvas();
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context is null");
    return ctx;
  };

  useLayoutEffect(() => {
    const canvas = getCanvas();
    const canvasContainer = document.querySelector(".canvasContainer");
    canvas.height = canvasContainer?.clientHeight || 0;
    canvas.width = canvasContainer?.clientWidth || 0;
    const ctx = getCanvasContext();

    const beginPath = (x: number, y: number) => {
      ctx.beginPath();
      ctx.moveTo(x - drawOffset.current.x, y - drawOffset.current.y);
    };

    const drawLine = (x: number, y: number) => {
      ctx.lineTo(x - drawOffset.current.x, y - drawOffset.current.y);
      ctx.stroke();
    };
    const onMouseDrag = (e: MouseEvent) => {
      if (!isDrawing.current) return;
      drawLine(e.x, e.y);
    };

    const onMouseDown = (e: MouseEvent) => {
      isDrawing.current = true;
      beginPath(e.x, e.y);
    };

    const onMouseUp = () => {
      isDrawing.current = false;
    };

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mousemove", onMouseDrag);

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mousemove", onMouseDrag);
    };
  }, []);

  return (
    <div className="canvasContainer  w-full h-full border-2 border-gray-300 shadow-lg rounded-md ">
      <canvas id="canvas" ref={canvasRef}></canvas>
    </div>
  );
}

export default DrawBoard;
