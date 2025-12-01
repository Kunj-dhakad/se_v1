"use client";
import React from "react";

export default function MiniSlidePreview({ slide }: any) {
  const SCALE = 0.1;

  return (
    <div
      className="relative rounded bg-[#0d0d15] overflow-hidden"
      style={{
        width: 100 + '%',
        height: 70,
        position: "relative",
      }}
    >
      {slide.elements.map((el: any, i: number) => (
        <PreviewElement key={i} el={el} SCALE={SCALE} />
      ))}
    </div>
  );
}

function PreviewElement({ el, SCALE }: any) {
  if (!el) return null;

  if (el.data.type === "text") {
    return (
      <div
        style={{
          position: "absolute",
          left: el.data.x * SCALE,
          top: el.data.y * SCALE,
          fontSize: (el.data.fontSize || 20) * SCALE,
          color: el.data.color || "#fff",
          whiteSpace: "nowrap",
        }}
      >
        {el.data.text}
      </div>
    );
  }

  if (el.data.type === "image") {
    return (
      <img
        src={el.data.src}
        style={{
          position: "absolute",
          left: el.data.x * SCALE,
          top: el.data.y * SCALE,
          width: el.data.width * SCALE,
          height: el.data.height * SCALE,
          objectFit: "cover",
        }}
      />
    );
  }

  return null;
}
