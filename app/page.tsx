"use client";
import React, {
    //  useEffect,
    useRef
} from "react";
import useEditorStore from "@/app/Store/editorStore";
import Header from "@/components/header/header";
import SidebarLeft from "@/components/SidebarLeft/SidebarLeft";
import ToolbarRight from "@/components/RightSection/ToolbarRight";
import PopupPanel from "@/components/RightSection/PopupPanel";
import MainCanvas from "@/components/editor/main";

export default function Home() {
    const slides = useEditorStore((s) => s.slides);
    const activeSlide = useEditorStore((s) => s.activeSlide);
    const addSlide = useEditorStore((s) => s.addSlide);
    const setActiveSlide = useEditorStore((s) => s.setActiveSlide);

    const containerRef = useRef<HTMLDivElement | null>(null);

    const slideHeight = 600;
    return (
        <div className="w-full h-screen bg-[#0d0d16] text-white flex flex-col overflow-hidden select-none">
            <Header />

            <div className="flex flex-1 overflow-hidden">
                <SidebarLeft
                    slides={slides}
                    activeSlide={activeSlide}
                    addSlide={addSlide}
                    jumpToSlide={(i) => {
                        containerRef.current?.scrollTo({
                            top: i * slideHeight,
                            behavior: "smooth",
                        });
                        setActiveSlide(i);
                    }}
                />

                {/* MAIN WORKSPACE */}
                <main className="flex-1 flex items-center justify-center bg-[#0d0d16]">
                    <MainCanvas containerRef={containerRef} />
                </main>
                <ToolbarRight />
                <PopupPanel />

            </div >
          
        </div >
    );
}
