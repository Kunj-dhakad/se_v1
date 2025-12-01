import React, { useState } from "react";
import useEditorStore, { ElementData } from "@/app/Store/editorStore";

import { Rnd } from "react-rnd"

const RenderImage: React.FC<{ id: string; data: ElementData }> = ({ id, data }) => {


    const updateElement = useEditorStore((s) => s.updateElement);

    const selectedId = useEditorStore((s) => s.activeElementId);
    const setActiveElementId = useEditorStore((s) => s.setActiveElementId);

    const [isTransforming, setIsTransforming] = useState(false);
    return (
        <Rnd
            key={id}
            enableResizing={
                selectedId === id
                    ? {
                        top: true,
                        right: true,
                        bottom: true,
                        left: true,
                        topRight: true,
                        bottomRight: true,
                        bottomLeft: true,
                        topLeft: true,
                    }
                    : false
            }
            resizeHandleStyles={
                selectedId === id && !isTransforming
                    ? {
                        top: {
                            width: "20px",
                            height: "6px",
                            top: "-4px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "#ffffff",
                            cursor: "ns-resize",
                        },
                        bottom: {
                            width: "20px",
                            height: "6px",
                            bottom: "-4px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "#ffffff",
                            cursor: "ns-resize",
                        },
                        left: {
                            width: "6px",
                            height: "20px",
                            left: "-4px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "#ffffff",
                            cursor: "ew-resize",
                        },
                        right: {
                            width: "6px",
                            height: "20px",
                            right: "-4px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "#ffffff",
                            cursor: "ew-resize",
                        },
                        topLeft: {
                            width: "12px",
                            height: "12px",
                            top: "-6px",
                            left: "-6px",
                            background: "#ffffff",
                            cursor: "nwse-resize",
                            borderRadius: "50%",
                        },
                        topRight: {
                            width: "12px",
                            height: "12px",
                            top: "-6px",
                            right: "-6px",
                            background: "#ffffff",
                            cursor: "nesw-resize",
                            borderRadius: "50%",
                        },
                        bottomLeft: {
                            width: "12px",
                            height: "12px",
                            bottom: "-6px",
                            left: "-6px",
                            background: "#ffffff",
                            cursor: "nesw-resize",
                            borderRadius: "50%",
                        },
                        bottomRight: {
                            width: "12px",
                            height: "12px",
                            bottom: "-6px",
                            right: "-6px",
                            background: "#ffffff",
                            cursor: "nwse-resize",
                            borderRadius: "50%",
                        }
                    }
                    : {}
            }

            onDragStart={() => setIsTransforming(true)}
            onResizeStart={() => setIsTransforming(true)}

            position={{ x: data.x, y: data.y }}
            size={{ width: data.width, height: data.height }}
            bounds="parent"
            onDragStop={(e, data) => {
                setIsTransforming(false);
                updateElement(id, {
                    x: data.x,
                    y: data.y,
                });
            }}
            onResizeStop={(e, dir, ref, delta, pos) => {
                updateElement(id, {
                    width: parseInt(ref.style.width),
                    height: parseInt(ref.style.height),
                    x: pos.x,
                    y: pos.y,
                });
            }}
            onMouseDown={() =>
                setActiveElementId(id)}
            style={{
                border:
                    selectedId === id
                        ? "2px solid #3b86"
                        : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // overflow: "hidden",
                borderRadius: 6,
                background: "transparent",
            }}
        >
            {/* TEXT ELEMENT */}
            {data.type === "image" && (
                <img
                    src={data.src}
                    style={{
                        width: data.width,
                        height: data.height,
                        objectFit: "contain",
                        pointerEvents: "none",
                    }}
                />

            )}
        </Rnd>
    )
}
export default RenderImage;