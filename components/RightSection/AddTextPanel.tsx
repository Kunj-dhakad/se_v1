"use client";
import React from "react";
import useEditorStore from "@/app/Store/editorStore";

const AddTextPanel = () => {
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, type: string, sample?: string) => {
        e.dataTransfer.setData("application/element", type);
        if (sample) e.dataTransfer.setData("application/sample", sample);
    };

    const addElement = useEditorStore((s) => s.addElement);
    const addTextQuick = () => {
        // addElement({
        //     type: "text",
        //     text: "New Text",
        //     x: 40,
        //     y: 120,
        //     width: 300,
        //     height: 50,
        //     fontSize: 24,
        //     fontFamily: "Inter",
        //     color: "#ffffff",
        // })

        addElement({
            type: "text",

            // --- Transform ---
            x: 40,
            y: 120,
            width: 300,
            height: 50,
            rotation: 0,
            opacity: 1,
            zIndex: 1,

            // --- Text Core ---
            text: "New Text",
            fontSize: 24,
            fontFamily: "Inter",
            fontWeight: "normal",
            color: "#ffffff",

            // --- Text Extra Props ---
            textAlign: "left",
            textColor: "#ffffff",
            textTransform: "none",
            textDecorationLine: "none",
            align: "left",
            lineHeight: 1.2,
            letterSpacing: 0,
            textDecoration: "none",
            fontStyle: "normal",

            // --- Border ---
            stroke: undefined,
            strokeWidth: 0,
            BorderborderRadius: 0,

            // --- Shadow ---
            offsetX: 0,
            offsetY: 0,
            Shadowblur: 0,
            isDragging: false,

            animation: {
                in: {
                    type: "None",
                    duration: 0,
                    slideDistanceX: 0,
                    slideDistanceY: 0,
                    degrees: 0
                },
                out: {
                    type: "None",
                    duration: 0,
                    slideDistanceX: 0,
                    slideDistanceY: 0,
                    degrees: 0
                }
            }
        });

    }

    return (
        <div className="grid grid-cols-3 gap-3">

            {/* TITLE */}
            <div
                onClick={addTextQuick}
                draggable
                onDragStart={(e) => handleDragStart(e, "text-title", "Big Title")}
                className="bg-[#1a1a26] border border-[#2c2c38] rounded-lg p-3 text-center 
        hover:bg-[#232334] cursor-grab active:cursor-grabbing"
            >
                <div className="font-medium text-white text-sm">Title</div>
            </div>

            {/* H1 */}
            <div
                draggable
                onDragStart={(e) => handleDragStart(e, "text-h1", "Heading 1")}
                className="bg-[#1a1a26] border border-[#2c2c38] rounded-lg p-3 text-center 
        hover:bg-[#232334] cursor-grab active:cursor-grabbing"
            >
                <div className="font-medium text-white text-sm">H1</div>
            </div>

            {/* H2 */}
            <div
                draggable
                onDragStart={(e) => handleDragStart(e, "text-h2", "Heading 2")}
                className="bg-[#1a1a26] border border-[#2c2c38] rounded-lg p-3 text-center 
        hover:bg-[#232334] cursor-grab active:cursor-grabbing"
            >
                <div className="font-medium text-white text-sm">H2</div>
            </div>

            {/* H3 */}
            <div
                draggable
                onDragStart={(e) => handleDragStart(e, "text-h3", "Heading 3")}
                className="bg-[#1a1a26] border border-[#2c2c38] rounded-lg p-3 text-center 
        hover:bg-[#232334] cursor-grab active:cursor-grabbing"
            >
                <div className="font-medium text-white text-sm">H3</div>
            </div>

            {/* PARAGRAPH */}
            <div
                draggable
                onDragStart={(e) => handleDragStart(e, "text-p", "Sample paragraph text")}
                className="bg-[#1a1a26] border border-[#2c2c38] rounded-lg p-3 text-center 
        hover:bg-[#232334] cursor-grab active:cursor-grabbing"
            >
                <div className="font-medium text-white text-sm">Paragraph</div>
            </div>

            {/* QUOTE */}
            <div
                draggable
                onDragStart={(e) => handleDragStart(e, "text-quote", "Quote text")}
                className="bg-[#1a1a26] border border-[#2c2c38] rounded-lg p-3 text-center 
        hover:bg-[#232334] cursor-grab active:cursor-grabbing"
            >
                <div className="font-medium text-white text-sm">Quote</div>
            </div>

        </div>
    );
};

export default AddTextPanel;
