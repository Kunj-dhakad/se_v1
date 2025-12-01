import React from "react";
import useEditorStore from "@/app/Store/editorStore";
import {
    Search,
    Type,
    Image as ImgIcon,
    Square,
    Settings,
    BarChart3,
    Calendar,
    CreditCard,
    Pencil,
} from "lucide-react";

const ToolbarRight: React.FC = () => {
    const setActiveRightPanel = useEditorStore((s) => s.setActiveRightPanel);

    return (
        <aside
            className="w-20 bg-[#11111c] border-l border-[#1f1f2b] 
                            flex flex-col items-center p-4 gap-4"
        >

            <button className="w-12 h-12 bg-[#1c1c2a] rounded-xl flex items-center justify-center hover:bg-[#242436]">
                <Search size={18} />
            </button>

            <button onClick={() => setActiveRightPanel("text")} className="w-12 h-12 bg-[#1c1c2a] rounded-xl flex items-center justify-center hover:bg-[#242436]">
                <Type size={18} />
            </button>

            <button onClick={() => setActiveRightPanel("image")} className="w-12 h-12 bg-[#1c1c2a] rounded-xl flex items-center justify-center hover:bg-[#242436]">
                <ImgIcon size={18} />
            </button>

            <button onClick={() => setActiveRightPanel("template")} className="w-12 h-12 bg-[#1c1c2a] rounded-xl flex items-center justify-center hover:bg-[#242436]">
                <Square size={18} />
            </button>

            <button className="w-12 h-12 bg-[#1c1c2a] rounded-xl flex items-center justify-center hover:bg-[#242436]">
                <Settings size={18} />
            </button>

            <button className="w-12 h-12 bg-[#1c1c2a] rounded-xl flex items-center justify-center hover:bg-[#242436]">
                <BarChart3 size={18} />
            </button>

            <button className="w-12 h-12 bg-[#1c1c2a] rounded-xl flex items-center justify-center hover:bg-[#242436]">
                <Calendar size={18} />
            </button>

            <button className="w-12 h-12 bg-[#1c1c2a] rounded-xl flex items-center justify-center hover:bg-[#242436]">
                <CreditCard size={18} />
            </button>

            <button className="w-12 h-12 bg-[#1c1c2a] rounded-xl flex items-center justify-center hover:bg-[#242436]">
                <Pencil size={18} />
            </button>

            <div className="mt-auto flex flex-col items-center gap-4">
                <div className="px-3 py-1 rounded-xl bg-[#1c1c2a] text-sm">91%</div>

                <button className="w-10 h-10 rounded-full bg-[#1c1c2a] flex items-center justify-center text-xl">
                    ?
                </button>
            </div>
        </aside>
    );
};

export default ToolbarRight;
