"use client";
import React, { useRef } from "react";
import useEditorStore from "@/app/Store/editorStore";

const AddImagePanel = () => {
  const addElement = useEditorStore((s) => s.addElement);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // File Upload → Add Image Element
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      // addElement({
      //   type: "image",
      //   src: reader.result as string,
      //   x: 80,
      //   y: 120,
      //   width: 300,
      //   height: 200,
      // });
      addElement({
        type: "image",
        src: reader.result as string,

        // Transform
        x: 80,
        y: 120,
        width: 300,
        height: 200,
        rotation: 0,
        opacity: 1,
        zIndex: 1,

        // Border
        stroke: "",
        strokeWidth: 0,
        borderRadius:"0",

        // Shadow
        offsetX: 0,
        offsetY: 0,
        blur: 0,
        color: "rgba(0,0,0,0)",

        // Extra Image Properties
        fit: "cover",
        maxWidth: 300,
        maxHeight: 200,
        objectFit: "cover",

        contrast: 100,
        hueRotate: 0,
        saturate: 100,

        grayscale: 0,
        sepia: 0,
        brightness: 100,

        transform: "none",

        isDragging: false,
        animationType: "None",

        animation: {
          in: {
            type: "None",
            duration: 0,
            slideDistanceX: 0,
            slideDistanceY: 0,
            degrees: 0,
          },
          out: {
            type: "None",
            duration: 0,
            slideDistanceX: 0,
            slideDistanceY: 0,
            degrees: 0,
          }
        }
      });

    };

    reader.readAsDataURL(file);
  };

  // Drag logic for other image sources
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, type: string) => {
    e.dataTransfer.setData("application/element", type);
  };

  return (
    <div className="grid grid-cols-3 gap-3">

      {/* UPLOAD IMAGE - NOT DRAGGABLE */}
      <div
        className="bg-[#1a1a26] border border-[#2c2c38] rounded-lg p-4 text-center 
          hover:bg-[#232334] cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="font-medium text-white text-sm">Upload</div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* UNSPLASH */}
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, "image-unsplash")}
        className="bg-[#1a1a26] border border-[#2c2c38] rounded-lg p-4 text-center 
          hover:bg-[#232334] cursor-grab active:cursor-grabbing"
      >
        <div className="font-medium text-white text-sm">Unsplash</div>
      </div>

      {/* AI IMAGE */}
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, "image-ai")}
        className="bg-[#1a1a26] border border-[#2c2c38] rounded-lg p-4 text-center 
          hover:bg-[#232334] cursor-grab active:cursor-grabbing"
      >
        <div className="font-medium text-white text-sm">AI Image</div>
      </div>

      {/* GIFS */}
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, "image-gif")}
        className="bg-[#1a1a26] border border-[#2c2c38] rounded-lg p-4 text-center 
          hover:bg-[#232334] cursor-grab active:cursor-grabbing"
      >
        <div className="font-medium text-white text-sm">GIFs</div>
      </div>

      {/* ICONS */}
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, "image-icon")}
        className="bg-[#1a1a26] border border-[#2c2c38] rounded-lg p-4 text-center 
          hover:bg-[#232334] cursor-grab active:cursor-grabbing"
      >
        <div className="font-medium text-white text-sm">Icons</div>
      </div>

      {/* STOCK */}
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, "image-stock")}
        className="bg-[#1a1a26] border border-[#2c2c38] rounded-lg p-4 text-center 
          hover:bg-[#232334] cursor-grab active:cursor-grabbing"
      >
        <div className="font-medium text-white text-sm">Stock</div>
      </div>

    </div>
  );
};

export default AddImagePanel;
