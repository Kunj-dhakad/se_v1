// import React, { useEffect, useRef, useState } from "react";
// import useEditorStore, { TextData } from "@/app/Store/editorStore";
// import FloatingTextToolbar from "../TextToolbar";
// import { Rnd } from "react-rnd"

// const RenderText: React.FC<{
//     id: string; data: TextData,
//     slideIndex: number
// }> = ({ id, data, slideIndex }) => {

//     const editingRef = useRef<HTMLDivElement | null>(null);
//     const updateElement = useEditorStore((s) => s.updateElement);
//     const [targetEl, setTargetEl] = useState<HTMLElement | null>(null);
//     const setActiveSlide = useEditorStore(s => s.setActiveSlide);

//     const selectedId = useEditorStore((s) => s.activeElementId);
//     const setActiveElementId = useEditorStore((s) => s.setActiveElementId);

//     const [editingId, setEditingId] = useState<string | null>(null);

//     const [isTransforming, setIsTransforming] = useState(false);

//     useEffect(() => {
//         setTargetEl(editingRef.current);
//     }, [selectedId]);


//     // console.log("RENDER TEXT", { data });


//     /** 📌 Auto-resize height according to text */
//     const autoResize = () => {
//         if (!editingRef.current) return;

//         const el = editingRef.current;
//         el.style.height = "auto";
//         const newHeight = el.scrollHeight + 4;

//         updateElement(id, { height: newHeight });
//     };
//     return (
//         <>
//             <Rnd
//                 key={id}
//                 enableResizing={
//                     selectedId === id
//                         ? {
//                             // top: true,
//                             right: true,
//                             // bottom: true,
//                             left: true,
//                             topRight: true,
//                             bottomRight: true,
//                             bottomLeft: true,
//                             topLeft: true,
//                         }
//                         : false
//                 }
//                 resizeHandleStyles={
//                     selectedId === id && !isTransforming && editingId !== id
//                         ? {
//                             top: {
//                                 width: "20px",
//                                 height: "6px",
//                                 top: "-4px",
//                                 left: "50%",
//                                 transform: "translateX(-50%)",
//                                 background: "#ffffff",
//                                 cursor: "ns-resize",
//                             },
//                             bottom: {
//                                 width: "20px",
//                                 height: "6px",
//                                 bottom: "-4px",
//                                 left: "50%",
//                                 transform: "translateX(-50%)",
//                                 background: "#ffffff",
//                                 cursor: "ns-resize",
//                             },
//                             left: {
//                                 width: "6px",
//                                 height: "20px",
//                                 left: "-4px",
//                                 top: "50%",
//                                 transform: "translateY(-50%)",
//                                 background: "#ffffff",
//                                 cursor: "ew-resize",
//                             },
//                             right: {
//                                 width: "6px",
//                                 height: "20px",
//                                 right: "-4px",
//                                 top: "50%",
//                                 transform: "translateY(-50%)",
//                                 background: "#ffffff",
//                                 cursor: "ew-resize",
//                             },
//                             topLeft: {
//                                 width: "12px",
//                                 height: "12px",
//                                 top: "-6px",
//                                 left: "-6px",
//                                 background: "#ffffff",
//                                 cursor: "nwse-resize",
//                                 borderRadius: "50%",
//                             },
//                             topRight: {
//                                 width: "12px",
//                                 height: "12px",
//                                 top: "-6px",
//                                 right: "-6px",
//                                 background: "#ffffff",
//                                 cursor: "nesw-resize",
//                                 borderRadius: "50%",
//                             },
//                             bottomLeft: {
//                                 width: "12px",
//                                 height: "12px",
//                                 bottom: "-6px",
//                                 left: "-6px",
//                                 background: "#ffffff",
//                                 cursor: "nesw-resize",
//                                 borderRadius: "50%",
//                             },
//                             bottomRight: {
//                                 width: "12px",
//                                 height: "12px",
//                                 bottom: "-6px",
//                                 right: "-6px",
//                                 background: "#ffffff",
//                                 cursor: "nwse-resize",
//                                 borderRadius: "50%",
//                             }
//                         }
//                         : {}
//                 }

//                 onDragStart={() => setIsTransforming(true)}


//                 onResizeStart={() => setIsTransforming(true)}

//                 position={{ x: data.x, y: data.y }}
//                 size={{ width: data.width, height: data.height }}
//                 // bounds="parent"
//                 onDragStop={(e, data) => {
//                     setIsTransforming(false);
//                     updateElement(id, {
//                         x: data.x,
//                         y: data.y,
//                     });
//                 }}
//                 onResizeStop={(e, dir, ref, delta, pos) => {
//                     updateElement(id, {
//                         width: parseInt(ref.style.width),
//                         height: parseInt(ref.style.height),
//                         x: pos.x,
//                         y: pos.y,
//                     });
//                 }}



//                 // onResize={(e, dir, ref, delta, pos) => {
//                 //     const newWidth = parseFloat(ref.style.width);
//                 //     const oldWidth = data.width;

//                 //     if (!oldWidth) return;

//                 //     // scale ratio
//                 //     const scale = newWidth / oldWidth;

//                 //     const newFontSize = (data.fontSize ?? 16) * scale;

//                 //     updateElement(id, {
//                 //         width: newWidth,
//                 //         height: parseFloat(ref.style.height),
//                 //         x: pos.x,
//                 //         y: pos.y,
//                 //         fontSize: newFontSize,
//                 //     });
//                 // }}

//                 onResize={(e, direction, ref, delta, position) => {
//                     const newWidth = parseFloat(ref.style.width);
//                     const oldWidth = data.width;

//                     if (!oldWidth) return;

//                     // Only scale based on width - Canva logic
//                     const scale = newWidth / oldWidth;

//                     updateElement(id, {
//                         width: newWidth,
//                         height: parseFloat(ref.style.height),
//                         x: position.x,
//                         y: position.y,
//                         fontSize: (data.fontSize ?? 20) * scale,  // ✔ only width-based scaling
//                         // DO NOT scale line-height or letter-spacing
//                     });
//                 }}


//                 onMouseDown={() => {
//                     setActiveSlide(slideIndex);
//                     setActiveElementId(id);
//                 }}

//                 style={{
//                     border:
//                         selectedId === id
//                             ? "2px solid #3b86"
//                             : "none",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     // overflow: "hidden",
//                     borderRadius: 6,
//                     background: "transparent",
//                 }}
//             >
//                 {/* TEXT ELEMENT */}
//                 {data.type === "text" && (

//                     <div
//                         ref={selectedId === id ? editingRef : undefined}
//                         contentEditable={editingId === id}
//                         suppressContentEditableWarning={true}
//                         onDoubleClick={() => {
//                             setEditingId(id);
//                         }}
//                         onBlur={(e) => {
//                             updateElement(id, { text: e.target.innerText });
//                             setEditingId(null);
//                         }}
//                         onKeyDown={(e) => {
//                             if (e.key === "Enter" && !e.shiftKey) {
//                                 e.preventDefault();
//                                 updateElement(id, { text: (e.target as HTMLElement).innerText });
//                                 setEditingId(null);
//                             }
//                         }}
//                         // onInput={() => autoResize()}
//                         style={{
//                             width: "100%",
//                             height: "100%",
//                             color: data.color,
//                             fontSize: data.fontSize,
//                             fontFamily: data.fontFamily,
//                             whiteSpace: "pre-wrap",
//                             outline: "none",
//                             cursor: editingId === id ? "text" : "",
//                             pointerEvents: "auto",
//                             textOverflow: "ellipsis",
//                             overflow: "hidden",
//                             display: "block",
//                             textAlign: data.align,
//                             fontWeight: data.fontWeight,
//                             textDecorationLine: data.textDecoration,
//                             textTransform: data.textTransform,
//                             lineHeight: data.lineHeight,
//                             letterSpacing: data.letterSpacing,
//                             fontStyle: data.fontStyle,
//                         }}
//                     >
//                         {data.text}
//                     </div>
//                 )}
//             </Rnd>
//             {selectedId && !isTransforming && (
//                 <FloatingTextToolbar target={targetEl} />
//             )}

//         </>
//     )
// }
// export default RenderText;














import React, { useEffect, useRef, useState } from "react";
import useEditorStore, { TextData } from "@/app/Store/editorStore";
import FloatingTextToolbar from "../TextToolbar";
import { Rnd } from "react-rnd";

const RenderText: React.FC<{
    id: string;
    data: TextData;
    slideIndex: number;
}> = ({ id, data, slideIndex }) => {

    const editingRef = useRef<HTMLDivElement | null>(null);
    const updateElement = useEditorStore((s) => s.updateElement);
    const [targetEl, setTargetEl] = useState<HTMLElement | null>(null);
    const setActiveSlide = useEditorStore((s) => s.setActiveSlide);
    const selectedId = useEditorStore((s) => s.activeElementId);
    const setActiveElementId = useEditorStore((s) => s.setActiveElementId);

    const [editingId, setEditingId] = useState<string | null>(null);
    const [isTransforming, setIsTransforming] = useState(false);

    useEffect(() => {
        setTargetEl(editingRef.current);
    }, [selectedId]);


    /** 📌 Auto-resize height like Canva when typing */
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
                            left: true,
                            right: true,
                            bottom: true,
                            top: false,
                            topLeft: true,
                            topRight: true,
                            bottomLeft: true,
                            bottomRight: true,
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



                onResizeStart={() => setIsTransforming(true)}
                onDragStart={() => setIsTransforming(true)}

                position={{ x: data.x, y: data.y }}
                size={{ width: data.width, height: data.height }}


                onResize={(e, direction, ref, delta, position) => {
                    const el = ref as HTMLDivElement;
                    const newWidth = parseFloat(el.style.width);

                    // 1️⃣ WIDTH always updates
                    updateElement(id, {
                        width: newWidth,
                        x: position.x,
                        y: position.y,
                    });

                    // 2️⃣ LIVE auto-height update like Canva
                    if (editingRef.current) {
                        editingRef.current.style.height = "auto";
                        const newHeight = editingRef.current.scrollHeight + 4;

                        updateElement(id, {
                            height: newHeight,
                        });
                    }
                }}

                onResizeStop={() => setIsTransforming(false)}

                onDragStop={(e, d) => {
                    setIsTransforming(false);
                    updateElement(id, { x: d.x, y: d.y });
                }}

                onMouseDown={() => {
                    setActiveSlide(slideIndex);
                    setActiveElementId(id);
                }}

                style={{
                    border: selectedId === id ? "2px solid #3b86" : "none",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    borderRadius: 6,
                    background: "transparent",
                    padding: 4,
                    // overflow: "hidden",
                }}
            >
                <div
                    ref={selectedId === id ? editingRef : null}
                    contentEditable={editingId === id}
                    suppressContentEditableWarning={true}

                    onDoubleClick={() => setEditingId(id)}

                    onBlur={(e) => {
                        updateElement(id, { text: e.target.innerText });
                        setEditingId(null);

                        // Auto height adjust after editing
                        if (editingRef.current) {
                            editingRef.current.style.height = "auto";
                            updateElement(id, {
                                height: editingRef.current.scrollHeight + 4,
                            });
                        }
                    }}

                    onInput={() => autoResize()}

                    style={{
                        width: "100%",
                        height: "100%",
                        color: data.color,
                        fontSize: data.fontSize,
                        fontFamily: data.fontFamily,
                        whiteSpace: "pre-wrap",
                        outline: "none",
                        overflow: "hidden",
                        textAlign: data.align,
                        lineHeight: data.lineHeight,
                        letterSpacing: data.letterSpacing,
                        fontWeight: data.fontWeight,
                        fontStyle: data.fontStyle,
                    }}
                >
                    {data.text}
                </div>
            </Rnd>

            {selectedId && !isTransforming && (
                <FloatingTextToolbar target={targetEl!} />
            )}
        </>
    );
};

export default RenderText;

















// import React, { useEffect, useRef, useState } from "react";
// import useEditorStore, { TextData } from "@/app/Store/editorStore";
// import FloatingTextToolbar from "../TextToolbar";
// import { Rnd } from "react-rnd";

// const RenderText: React.FC<{
//     id: string;
//     data: TextData;
//     slideIndex: number;
// }> = ({ id, data, slideIndex }) => {

//     const editingRef = useRef<HTMLDivElement | null>(null);
//     const updateElement = useEditorStore((s) => s.updateElement);
//     const [targetEl, setTargetEl] = useState<HTMLElement | null>(null);

//     const setActiveSlide = useEditorStore((s) => s.setActiveSlide);
//     const selectedId = useEditorStore((s) => s.activeElementId);
//     const setActiveElementId = useEditorStore((s) => s.setActiveElementId);

//     const [editingId, setEditingId] = useState<string | null>(null);
//     const [isTransforming, setIsTransforming] = useState(false);

//     useEffect(() => {
//         setTargetEl(editingRef.current);
//     }, [selectedId]);


//     /** AUTO HEIGHT WHEN TYPING */
//     const autoResize = () => {
//         if (!editingRef.current) return;

//         editingRef.current.style.height = "auto";

//         const h = editingRef.current.scrollHeight + 6;
//         updateElement(id, { height: h });
//     };


//     return (
//         <>
//             <Rnd
//                 key={id}
//                 position={{ x: data.x, y: data.y }}
//                 size={{ width: data.width, height: data.height }}

//                 /** ⭐ ONLY CORNERS ALLOWED (scaled mode) */
//                 enableResizing={
//                     selectedId === id
//                         ? {
//                             topLeft: true,
//                             topRight: true,
//                             bottomLeft: true,
//                             bottomRight: true,

//                             left: false,
//                             right: false,
//                             top: false,
//                             bottom: false,
//                         }
//                         : false
//                 }

//                 onResizeStart={() => setIsTransforming(true)}
//                 onDragStart={() => setIsTransforming(true)}

//                 /** ⭐ EXACT CANVA PROPORTIONAL SCALING */
//                 onResize={(e, direction, ref, delta, position) => {
//                     const el = ref as HTMLDivElement;

//                     const newW = parseFloat(el.style.width);
//                     const newH = parseFloat(el.style.height);

//                     const oldW = data.width;
//                     const oldH = data.height;

//                     // uniform scale ratio
//                     const scale = Math.min(newW / oldW, newH / oldH);

//                     const finalW = oldW * scale;
//                     const finalH = oldH * scale;

//                     updateElement(id, {
//                         width: finalW,
//                         height: finalH,
//                         x: position.x,
//                         y: position.y,

//                         /** proportional font scaling */
//                         fontSize: (data.fontSize ?? 20) * scale,
//                         lineHeight: (data.lineHeight ?? 1.2) * scale,
//                         letterSpacing: (data.letterSpacing ?? 0) * scale,
//                     });
//                 }}

//                 onResizeStop={() => setIsTransforming(false)}

//                 onDragStop={(e, d) => {
//                     setIsTransforming(false);
//                     updateElement(id, { x: d.x, y: d.y });
//                 }}

//                 onMouseDown={() => {
//                     setActiveSlide(slideIndex);
//                     setActiveElementId(id);
//                 }}

//                 style={{
//                     border: selectedId === id ? "2px solid #3b86" : "none",
//                     display: "flex",
//                     alignItems: "flex-start",
//                     justifyContent: "flex-start",
//                     background: "transparent",
//                     overflow: "hidden",
//                     padding: 4,
//                 }}
//             >

//                 <div
//                     ref={selectedId === id ? editingRef : null}
//                     contentEditable={editingId === id}
//                     suppressContentEditableWarning={true}

//                     onDoubleClick={() => setEditingId(id)}

//                     onBlur={(e) => {
//                         const t = e.target.innerText;
//                         updateElement(id, { text: t });
//                         setEditingId(null);

//                         // auto height adjust
//                         if (editingRef.current) {
//                             editingRef.current.style.height = "auto";
//                             updateElement(id, {
//                                 height: editingRef.current.scrollHeight + 4,
//                             });
//                         }
//                     }}

//                     onInput={() => autoResize()}

//                     style={{
//                         width: "100%",
//                         height: "100%",

//                         whiteSpace: "pre-wrap",
//                         overflow: "hidden",
//                         outline: "none",

//                         color: data.color,
//                         fontSize: data.fontSize,
//                         fontFamily: data.fontFamily,
//                         fontWeight: data.fontWeight,
//                         textAlign: data.align,
//                         lineHeight: data.lineHeight,
//                         letterSpacing: data.letterSpacing,
//                         fontStyle: data.fontStyle,
//                     }}
//                 >
//                     {data.text}
//                 </div>
//             </Rnd>

//             {!isTransforming && selectedId && (
//                 <FloatingTextToolbar target={targetEl!} />
//             )}
//         </>
//     );
// };

// export default RenderText;
