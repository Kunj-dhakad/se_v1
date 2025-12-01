import React, { useEffect, useRef, useState } from "react";
import useEditorStore, { TextData } from "@/app/Store/editorStore";
import FloatingTextToolbar from "../TextToolbar";
import { Rnd } from "react-rnd"

const RenderText: React.FC<{
    id: string; data: TextData,
}> = ({ id, data }) => {

    const editingRef = useRef<HTMLDivElement | null>(null);
    const updateElement = useEditorStore((s) => s.updateElement);
    const [targetEl, setTargetEl] = useState<HTMLElement | null>(null);

    const selectedId = useEditorStore((s) => s.activeElementId);
    const setActiveElementId = useEditorStore((s) => s.setActiveElementId);

    const [editingId, setEditingId] = useState<string | null>(null);

    const [isTransforming, setIsTransforming] = useState(false);

    useEffect(() => {
        setTargetEl(editingRef.current);
    }, [selectedId]);


    console.log("RENDER TEXT", { data });


    /** 📌 Auto-resize height according to text */
    const autoResize = () => {
        if (!editingRef.current) return;

        const el = editingRef.current;
        el.style.height = "auto";
        const newHeight = el.scrollHeight + 4;

        updateElement(id, { height: newHeight });
    };
    return (
        <>
            <Rnd
                key={id}
                enableResizing={
                    selectedId === id
                        ? {
                            // top: true,
                            right: true,
                            // bottom: true,
                            left: true,
                            topRight: true,
                            bottomRight: true,
                            bottomLeft: true,
                            topLeft: true,
                        }
                        : false
                }
                resizeHandleStyles={
                    selectedId === id && !isTransforming && editingId !== id
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




                // onResize={(e, dir, ref, delta, pos) => {
                //     let newWidth = parseFloat(ref.style.width);
                //     let newHeight = parseFloat(ref.style.height);

                //     // const aspectRatio = data.width / data.height;


                //     if (
                //         dir === "topLeft" ||
                //         dir === "topRight" ||
                //         dir === "bottomLeft" ||
                //         dir === "bottomRight"
                //     ) {

                //         const scale = newWidth / data.width;

                //         newWidth = data.width * scale;
                //         newHeight = data.height * scale;


                //         updateElement(id, {
                //             width: newWidth,
                //             height: newHeight,
                //             fontSize: (data.fontSize ?? 16) * scale,
                //             x: pos.x,
                //             y: pos.y,
                //         });

                //         return;
                //     }


                //     if (dir === "left" || dir === "right") {
                //         updateElement(id, {
                //             width: newWidth,
                //             x: pos.x,
                //             y: pos.y,
                //         });
                //         return;
                //     }


                //     if (dir === "top" || dir === "bottom") {
                //         return;
                //     }
                // }}







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
                {data.type === "text" && (

                    <div
                        ref={selectedId === id ? editingRef : undefined}
                        contentEditable={editingId === id}
                        suppressContentEditableWarning={true}
                        onDoubleClick={() => {
                            setEditingId(id);
                        }}
                        onBlur={(e) => {
                            updateElement(id, { text: e.target.innerText });
                            setEditingId(null);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                updateElement(id, { text: (e.target as HTMLElement).innerText });
                                setEditingId(null);
                            }
                        }}
                        onInput={() => autoResize()}
                        style={{
                            width: "100%",
                            // height: "100%",
                            color: data.color,
                            fontSize: data.fontSize,
                            fontFamily: data.fontFamily,
                            whiteSpace: "pre-wrap",
                            outline: "none",

                            cursor: editingId === id ? "text" : "",
                            pointerEvents: "auto",

                            // whiteSpace: "pre-wrap",
                            // overflow: "visible",
                            overflow: "hidden",
                            height: "auto",
                            textAlign: data.align,
                            fontWeight: data.fontWeight,
                            textDecorationLine: data.textDecoration,
                            textTransform: data.textTransform,
                            lineHeight: data.lineHeight,
                            letterSpacing: data.letterSpacing,
                            fontStyle: data.fontStyle,
                        }}
                    >
                        {data.text}
                    </div>
                )}
            </Rnd>
            {selectedId && !isTransforming && editingId == selectedId && (
                <FloatingTextToolbar target={targetEl} />
            )}        </>
    )
}
export default RenderText;