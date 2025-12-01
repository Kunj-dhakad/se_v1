import React, { useState } from "react";
import ShareModal from "./ShareModal";
import useEditorStore from "../../app/Store/editorStore";


const Header: React.FC = () => {
    const [open, setOpen] = useState(false);
    // const activeSlide = useEditorStore((s) => s.activeElementId);
    // const updateElement = useEditorStore((s) => s.updateElement);
    const undo = useEditorStore((s) => s.undo);
    const redo = useEditorStore((s) => s.redo);
    return (
        <header className="w-full h-14 bg-[#11111c] border-b border-[#1f1f2b] flex items-center justify-between px-4 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#222233] rounded-lg flex items-center justify-center font-bold text-lg">G</div>
                <span className="text-sm text-gray-300">Editor</span>
            </div>

            <div className="flex items-center gap-4 text-gray-300">
                {/* <input
                    type="number"
                    onChange={(e) => updateElement(activeSlide, { width: Number(e.target.value) })}
                />

                <input
                    type="color"
                    onChange={(e) => updateElement(activeSlide, { stroke: e.target.value })}
                /> */}
                <button onClick={undo}>Undo</button>
                <button onClick={redo}>Redo</button>

                <button className="hover:text-white text-sm">Theme</button>
                <>
                    <button
                        onClick={() => setOpen(true)}
                        className="hover:text-white text-sm"
                    >
                        Export
                    </button>

                    <ShareModal open={open} setOpen={setOpen} />
                </>
                <div className="w-8 h-8 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold cursor-pointer">KD</div>
            </div>
        </header>
    )
}
export default Header;