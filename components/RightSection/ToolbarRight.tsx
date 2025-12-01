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
        <aside className="flex flex-col items-center right-menu">
            <div className="gap-2 bg-[#11111c] border border-[#eee] menu-tags flex items-center flex-col">
                <button className="w-8 h-8 bg-[#1c1c2a] rounded flex items-center justify-center hover:bg-[#242436]">
                    <Search size={18} />
                </button>

                <button onClick={() => setActiveRightPanel("text")} className="w-8 h-8 bg-[#1c1c2a] rounded flex items-center justify-center hover:bg-[#242436]">
                    <Type size={18} />
                </button>

                <button onClick={() => setActiveRightPanel("image")} className="w-8 h-8 bg-[#1c1c2a] rounded flex items-center justify-center hover:bg-[#242436]">
                    <ImgIcon size={18} />
                </button>

                <button onClick={() => setActiveRightPanel("template")} className="w-8 h-8 bg-[#1c1c2a] rounded flex items-center justify-center hover:bg-[#242436]">
                    <Square size={18} />
                </button>

                <button className="w-8 h-8 bg-[#1c1c2a] rounded flex items-center justify-center hover:bg-[#242436]">
                    <Settings size={18} />
                </button>

                <button className="w-8 h-8 bg-[#1c1c2a] rounded flex items-center justify-center hover:bg-[#242436]">
                    <BarChart3 size={18} />
                </button>

                <button className="w-8 h-8 bg-[#1c1c2a] rounded flex items-center justify-center hover:bg-[#242436]">
                    <Calendar size={18} />
                </button>

                <button className="w-8 h-8 bg-[#1c1c2a] rounded flex items-center justify-center hover:bg-[#242436]">
                    <CreditCard size={18} />
                </button>

                <button className="w-8 h-8 bg-[#1c1c2a] rounded flex items-center justify-center hover:bg-[#242436]">
                    <Pencil size={18} />
                </button>
            </div>
            <div className="fixed bottom-0 right-0 mt-auto flex flex-col items-center gap-4">
                <div className="px-3 py-1 rounded bg-[#1c1c2a] text-sm">91%</div>

                <button className="w-8 h-8 rounded-full bg-[#1c1c2a] flex items-center justify-center text-xl">
                    ?
                </button>
            </div>
        </aside>
    );
};

export default ToolbarRight;
