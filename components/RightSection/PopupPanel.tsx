"use client";
import React from "react";
import useEditorStore from "@/app/Store/editorStore";
import AddTextPanel from "./AddTextPanel";
import AddImagePanel from "./AddImagePanel";
import AddTemplate from "./AddTemplate";

const PopupPanel = () => {
  const active = useEditorStore((s) => s.activeRightPanel);
  const setActive = useEditorStore((s) => s.setActiveRightPanel);

  if (!active) return null;

  return (
    <div className="absolute right-20 top-18 w-96 max-h-[80vh] bg-[#11111c] border border-[#2b2b3c] rounded-xl shadow-2xl overflow-hidden z-9999">

      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2b2b3c]">
        <h2 className="text-lg font-semibold capitalize">{active}</h2>
        <button
          onClick={() => setActive(null)}
          className="text-gray-300 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="p-4 overflow-y-auto max-h-[70vh] space-y-6">

        {active === "text" && (
          <AddTextPanel />
        )}


        {active === "image" && (
          <AddImagePanel />
        )}

         {active === "template" && (
          <AddTemplate />
        )}

      </div>
    </div>
  );
};

export default PopupPanel;


