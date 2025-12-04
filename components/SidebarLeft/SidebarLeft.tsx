"use client";

import React, { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="z-50 bg-blue-600 hover:bg-blue-700 duration-500 text-white p-3 rounded-md toggle-btn cursor-pointer"
        >
          Open Panel
        </button>
      )}
      <aside
        className={`w-28 bg-[#11111c] border border-[#3C433C] flex flex-col overflow-y-auto left-sidebar transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-[calc(100%+10%)]"}
        `}
      >
        <div className="p-2 flex items-center justify-center gap-2 border-b border-[#3C433C] mb-2">
          <button
            onClick={addSlide}
            className="w-full p-2 bg-[#1e1e2c] rounded text-sm hover:bg-[#2a2a3c] cursor-pointer"
          >
            + New
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white text-sm p-2 flex items-center w-10 justify-center rounded bg-[#1e1e2c] hover:bg-[#2a2a3c] cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-3 overflow-y-auto pt-[0] p-[8px] custom-scrollbar">
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
    </>
  );
}
