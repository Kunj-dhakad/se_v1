"use client";
import React, { useEffect, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sparkles,
  Zap,
  // Move,
  Palette,
} from "lucide-react";

import useEditorStore from "@/app/Store/editorStore";
import { TextData } from "@/app/Store/editorStore";

interface ToolbarProps {
  target: HTMLElement | null;
}

const FloatingTextToolbar: React.FC<ToolbarProps> = ({ target }) => {
  const [pos, setPos] = useState({ top: 0, left: 0, visible: false });

  // === Store Access ===
  const selectedId = useEditorStore((s) => s.activeElementId);
  const updateElement = useEditorStore((s) => s.updateElement);
  const activeSlide = useEditorStore((s) => s.activeSlide);
  const slides = useEditorStore((s) => s.slides);

  const slide = slides[activeSlide];
  const element = slide?.elements.find((el) => el.id === selectedId);

  // Update only text elements
  const updateText = (patch: Partial<TextData>) => {
    if (!element) return;
    if (element.data.type !== "text") return;
    updateElement(element.id, patch);
  };

  // Positioning
  useEffect(() => {
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const toolbarHeight = 44;
    const margin = 10;

    let top = rect.top - toolbarHeight - margin;
    if (top < 60) top = rect.bottom + margin;

    const left = rect.left + rect.width / 2;

    requestAnimationFrame(() => setPos({ top, left, visible: true }));
  }, [target]);

  if (!pos.visible || !target) return null;

  return (
    <div
      className="
        fixed z-9999
        bg-white text-black
        rounded-2xl
        shadow-[0_4px_18px_rgba(0,0,0,0.15)]
        border border-gray-200
        flex items-center gap-1
        h-44px px-3 py-1.5
      "
      style={{
        top: pos.top,
        left: pos.left,
        transform: "translateX(-50%)",
      }}
    >

      {/* FONT FAMILY */}
      {/* <div className="flex items-center px-3 h-32px bg-gray-100 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-200"
        onClick={() => updateText({ fontFamily: "Inter" })}>
        Lato
      </div> */}
      {/* FONT FAMILY DROPDOWN */}
<div className="relative">
  <select
    className="
      px-3 h-32px 
      bg-gray-100 
      rounded-lg text-sm font-medium 
      cursor-pointer
      outline-none
    "
    value={(element?.data as TextData)?.fontFamily || "Inter"}
    onChange={(e) => updateText({ fontFamily: e.target.value })}
  >
    <option value="Inter">Inter</option>
    <option value="Lato">Lato</option>
    <option value="Poppins">Poppins</option>
    <option value="Roboto">Roboto</option>
    <option value="Montserrat">Montserrat</option>
    <option value="Open Sans">Open Sans</option>
  </select>
</div>


      {/* FONT SIZE */}
      <div className="flex items-center ml-1">
        <button
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200"
          onClick={() => updateText({ fontSize: ((element?.data as TextData)?.fontSize ?? 30) - 1 })}
        >
          -
        </button>

        <div className="px-3 h-32px flex items-center bg-gray-100 rounded-lg text-sm font-medium">
          {(element?.data as TextData)?.fontSize ?? 30}
        </div>

        <button
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200"
          onClick={() => updateText({ fontSize: ((element?.data as TextData)?.fontSize ?? 30) + 1 })}
        >
          +
        </button>
      </div>

      {/* DIVIDER */}
      <div className="w-1px h-5 bg-gray-300 mx-1" />

      {/* BOLD */}
      <button
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200"
        onClick={() =>
          updateText({
            fontWeight:
              (element?.data as TextData)?.fontWeight === "bold" ? "normal" : "bold",
          })
        }
      >
        <Bold size={18} />
      </button>

      {/* ITALIC */}
      <button
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200"
        onClick={() =>
          updateText({
            fontStyle:
              (element?.data as TextData)?.fontStyle === "italic" ? "normal" : "italic",
          })
        }
      >
        <Italic size={18} />
      </button>

      {/* UNDERLINE */}
      <button
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200"
        onClick={() =>
          updateText({
            textDecoration:
              (element?.data as TextData)?.textDecoration === "underline"
                ? "none"
                : "underline",
          })
        }
      >
        <Underline size={18} />
      </button>

      {/* DIVIDER */}
      <div className="w-1px h-5 bg-gray-300 mx-1" />

      {/* ALIGN LEFT */}
      <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200"
        onClick={() => updateText({ align: "left" })}
      >
        <AlignLeft size={18} />
      </button>

      {/* ALIGN CENTER */}
      <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200"
        onClick={() => updateText({ align: "center" })}
      >
        <AlignCenter size={18} />
      </button>

      {/* ALIGN RIGHT */}
      <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200"
        onClick={() => updateText({ align: "right" })}
      >
        <AlignRight size={18} />
      </button>

      {/* DIVIDER */}
      <div className="w-1px h-5 bg-gray-300 mx-1" />

      {/* EFFECTS */}
      <button className="text-sm px-2.5 py-1 rounded-lg hover:bg-gray-200 flex items-center gap-1">
        <Sparkles size={16} /> Effects
      </button>

      {/* ANIMATE */}
      {/* <button className="text-sm px-2.5 py-1 rounded-lg hover:bg-gray-200 flex items-center gap-1">
        <Zap size={16} /> Animate
      </button> */}

      {/* POSITION */}
      {/* <button className="text-sm px-2.5 py-1 rounded-lg hover:bg-gray-200 flex items-center gap-1">
        <Move size={16} /> Position
      </button> */}

      {/* COLOR PICKER */}
      <button
        className="text-xl px-2 py-1 rounded-lg hover:bg-gray-200"
      >
        {/* <Palette size={18} /> */}

        <input
          type="color"
          value={(element?.data as TextData)?.color || "#000000"}
          onChange={(e) => updateText({ color: e.target.value })}
          className="w-6 h-6 cursor-pointer"
        />
      </button>




    </div>
  );
};

export default FloatingTextToolbar;
