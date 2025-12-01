"use client";

import React from "react";
import MiniSlidePreview from "./MiniSlidePreview";

type Slide = {
  id: string;
  elements: unknown[];
  title?: string;
};

type SidebarSlidesProps = {
  slides: Slide[];
  activeSlide: number;
  addSlide: () => void;
  jumpToSlide: (i: number) => void;
};

export default function SidebarLeft({
  slides,
  activeSlide,
  addSlide,
  jumpToSlide,
}: SidebarSlidesProps) {
  return (
    <aside className="w-28 bg-[#11111c] border-r border-[#1f1f2b] flex flex-col p-3 overflow-y-auto">
      <button
        onClick={addSlide}
        className="w-full py-2 bg-[#1e1e2c] rounded-xl text-sm mb-4 hover:bg-[#2a2a3c]"
      >
        + New
      </button>

      <div className="flex flex-col gap-3 overflow-y-auto pr-1">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => jumpToSlide(i)}
            className={`h-20 p-2 rounded-md text-left ${i === activeSlide
                ? "border-l-4 border-blue-500 bg-[#141421]"
                : "bg-[#1b1b29]"
              } hover:scale-[1.01]`}
          >
            <div className="text-[11px] text-gray-400">
              <MiniSlidePreview slide={s} />
              {/* {s.elements.length} elements */}
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
