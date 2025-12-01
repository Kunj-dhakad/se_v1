"use client";
import React, {
  useEffect,
  // useRef, useState 
} from "react";
import useEditorStore, { ElementData } from "@/app/Store/editorStore";
// import { Rnd } from "react-rnd";
// import FloatingTextToolbar from "./TextToolbar";
import RenderText from "./RenderElement/RenderText";
import RenderImage from "./RenderElement/RenderImage";
// import Image from 'next/image'

const MainCanvas: React.FC<{ containerRef: React.RefObject<HTMLDivElement | null> }> = ({
  containerRef,
}) => {

  // const editingRef = useRef<HTMLDivElement | null>(null);

  const slides = useEditorStore((s) => s.slides);
  const activeSlide = useEditorStore((s) => s.activeSlide);

  const addElement = useEditorStore((s) => s.addElement);
  // const updateElement = useEditorStore((s) => s.updateElement);

  // const selectedId = useEditorStore((s) => s.activeElementId);
  const setActiveElementId = useEditorStore((s) => s.setActiveElementId);
  const activeElementId = useEditorStore((s) => s.activeElementId);
  const deleteElement = useEditorStore((s) => s.deleteElement);
  // const [editingId, setEditingId] = useState<string | null>(null);
  // const [targetEl, setTargetEl] = useState<HTMLElement | null>(null);

  // const [isTransforming, setIsTransforming] = useState(false);

  // useEffect(() => {
  //   setTargetEl(editingRef.current);
  // }, [selectedId]);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        if (activeElementId) {
          deleteElement(activeElementId);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeElementId, deleteElement]);





  const slideHeight =slides[activeSlide]?.height || 600;
  const canvasWidth = slides[activeSlide]?.width || 1000;
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        const scrollPos = container.scrollTop;

        const idx = Math.round(scrollPos / slideHeight);

        const bounded = Math.max(0, Math.min(slides.length - 1, idx));

        useEditorStore.getState().setActiveSlide(bounded);
      });
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, [slides.length, containerRef]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const type = e.dataTransfer.getData("application/element");
    const sample = e.dataTransfer.getData("application/sample");

    const slideRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - slideRect.left;
    const y = e.clientY - slideRect.top;

    // TEXT CREATE
    if (type.startsWith("text")) {
      addElement({
        type: "text",
        text: sample || "Text",
        x,
        y,
        width: 300,
        height: 60,
        color: "#ffffff",
        fontSize: type === "text-title" ? 42 :
          type === "text-h1" ? 36 :
            type === "text-h2" ? 30 :
              type === "text-h3" ? 26 : 18,
        fontFamily: "Inter",
      });
    }
  };

  return (
    <div className="relative w-[1100px] h-[650px] bg-[#0c0c1a]  rounded-xl shadow-xl overflow-hidden">
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-auto rounded-xl bg-[#0d0d16]"
      // style={{ scrollSnapType: "y mandatory" }}
      >
        <div style={{ width: canvasWidth }}>
          {slides.map((slide, idx) => (
            <div
              key={idx}
              onMouseDown={(e) => {
                if (e.target === e.currentTarget) {
                  setActiveElementId(null);
                }
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e)}

              style={{
                height: slideHeight,
                // background: slide.background || "#0c0c1a",
                position: "relative",
                border:
                  idx === activeSlide
                    ? "2px solid #3b82f6"
                    : "1px solid #222",
                // scrollSnapAlign: "start",
                borderRadius: 8,
                boxSizing: "content-box",
                // background: `
                //                           linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
                //                           url("https://kdmeditor.s3.us-east-1.amazonaws.com/kd_videoeditor/files/bg_image/snowy-winter-background.png") center/cover no-repeat
                //                         `

                background: slide.background || "#0c0c1a",
              }}
              className="transition-all duration-150 mb-20 mt-20"
            >
              {/* RENDER ELEMENTS */}
              {slide.elements.map((el) => {
                const d = el.data as ElementData;

                if (d.type === "text") {
                  return <RenderText key={el.id} id={el.id} data={d} />;
                }

                if (d.type === "image") {
                  return <RenderImage key={el.id} id={el.id} data={d} />;
                }

                return null;


                // return (
                //   <Rnd
                //     key={el.id}
                //     enableResizing={
                //       selectedId === el.id
                //         ? {
                //           top: true,
                //           right: true,
                //           bottom: true,
                //           left: true,
                //           topRight: true,
                //           bottomRight: true,
                //           bottomLeft: true,
                //           topLeft: true,
                //         }
                //         : false
                //     }
                //     resizeHandleStyles={
                //       selectedId === el.id && !isTransforming && editingId !== el.id
                //         ? {
                //           top: {
                //             width: "20px",
                //             height: "6px",
                //             top: "-4px",
                //             left: "50%",
                //             transform: "translateX(-50%)",
                //             background: "#ffffff",
                //             cursor: "ns-resize",
                //           },
                //           bottom: {
                //             width: "20px",
                //             height: "6px",
                //             bottom: "-4px",
                //             left: "50%",
                //             transform: "translateX(-50%)",
                //             background: "#ffffff",
                //             cursor: "ns-resize",
                //           },
                //           left: {
                //             width: "6px",
                //             height: "20px",
                //             left: "-4px",
                //             top: "50%",
                //             transform: "translateY(-50%)",
                //             background: "#ffffff",
                //             cursor: "ew-resize",
                //           },
                //           right: {
                //             width: "6px",
                //             height: "20px",
                //             right: "-4px",
                //             top: "50%",
                //             transform: "translateY(-50%)",
                //             background: "#ffffff",
                //             cursor: "ew-resize",
                //           },
                //           topLeft: {
                //             width: "12px",
                //             height: "12px",
                //             top: "-6px",
                //             left: "-6px",
                //             background: "#ffffff",
                //             cursor: "nwse-resize",
                //             borderRadius: "50%",
                //           },
                //           topRight: {
                //             width: "12px",
                //             height: "12px",
                //             top: "-6px",
                //             right: "-6px",
                //             background: "#ffffff",
                //             cursor: "nesw-resize",
                //             borderRadius: "50%",
                //           },
                //           bottomLeft: {
                //             width: "12px",
                //             height: "12px",
                //             bottom: "-6px",
                //             left: "-6px",
                //             background: "#ffffff",
                //             cursor: "nesw-resize",
                //             borderRadius: "50%",
                //           },
                //           bottomRight: {
                //             width: "12px",
                //             height: "12px",
                //             bottom: "-6px",
                //             right: "-6px",
                //             background: "#ffffff",
                //             cursor: "nwse-resize",
                //             borderRadius: "50%",
                //           }
                //         }
                //         : {}
                //     }

                //     onDragStart={() => setIsTransforming(true)}
                //     onResizeStart={() => setIsTransforming(true)}

                //     position={{ x: d.x, y: d.y }}
                //     size={{ width: d.width, height: d.height }}
                //     bounds="parent"
                //     onDragStop={(e, data) => {
                //       setIsTransforming(false);
                //       updateElement(el.id, {
                //         x: data.x,
                //         y: data.y,
                //       });
                //     }}
                //     onResizeStop={(e, dir, ref, delta, pos) => {
                //       updateElement(el.id, {
                //         width: parseInt(ref.style.width),
                //         height: parseInt(ref.style.height),
                //         x: pos.x,
                //         y: pos.y,
                //       });
                //     }}
                //     onMouseDown={() =>
                //       setActiveElementId(el.id)}
                //     style={{
                //       border:
                //         selectedId === el.id
                //           ? "2px solid #3b86"
                //           : "none",
                //       display: "flex",
                //       alignItems: "center",
                //       justifyContent: "center",
                //       // overflow: "hidden",
                //       borderRadius: 6,
                //       background: "transparent",
                //     }}
                //   >
                //     {/* TEXT ELEMENT */}
                //     {d.type === "text" && (

                //       <div
                //         ref={selectedId === el.id ? editingRef : undefined}
                //         contentEditable={editingId === el.id}
                //         suppressContentEditableWarning={true}
                //         onDoubleClick={() => {
                //           setEditingId(el.id);
                //         }}
                //         onBlur={(e) => {
                //           updateElement(el.id, { text: e.target.innerText });
                //           setEditingId(null);
                //         }}
                //         onKeyDown={(e) => {
                //           if (e.key === "Enter" && !e.shiftKey) {
                //             e.preventDefault();
                //             updateElement(el.id, { text: (e.target as HTMLElement).innerText });
                //             setEditingId(null);
                //           }
                //         }}
                //         style={{
                //           width: "100%",
                //           height: "100%",
                //           color: d.color,
                //           fontSize: d.fontSize,
                //           fontFamily: d.fontFamily,
                //           whiteSpace: "pre-wrap",
                //           outline: "none",

                //           cursor: editingId === el.id ? "text" : "",
                //           pointerEvents: "auto",
                //         }}
                //       >
                //         {d.text}
                //       </div>
                //     )}

                //     {/* IMAGE ELEMENT */}
                //     {d.type === "image" && (

                //       <img
                //         src={d.src}
                //         style={{
                //           width: "100%",
                //           height: "100%",
                //           objectFit: "contain",
                //           pointerEvents: "none",
                //         }}
                //       />
                //     )}
                //   </Rnd>


                // );
              })}
            </div>

          ))}
        </div>
      </div>

    </div>
  )



};
export default MainCanvas;
