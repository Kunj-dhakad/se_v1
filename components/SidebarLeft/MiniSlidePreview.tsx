"use client";
import React, { memo } from "react";

import { SlideType, ElementType } from "@/app/Store/editorStore";
export default function MiniSlidePreview({ slide }: { slide: SlideType }) {
  
  const SCALE = 0.1;

  return (
    <div
      className="relative rounded bg-[#0d0d15] overflow-hidden"
      style={{
        width: 100 +'%',
        height: 70,
        position: "relative",
      }}
    >
      {slide.elements.map((el: ElementType, i: number) => (
        <PreviewElement key={el.id ?? i} el={el} SCALE={SCALE} />
      ))}
    </div>
  );
}

function PreviewElement({ el, SCALE }: { el: ElementType; SCALE: number }) {
  if (!el) return null;

  if (el.data.type === "text") {
    console.log("Rendering text element:", el.data.width * SCALE);
    return (
      <div
        style={{
          position: "absolute",
          left: el.data.x * SCALE,
          top: el.data.y * SCALE,
          height: el.data.height * SCALE,
          width: el.data.width * SCALE,
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
        alt="slide preview"
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
