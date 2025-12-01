"use client";

import { useEffect, useRef } from "react";
import { X, Download, FileText, FileDown, Images } from "lucide-react";
import useEditorStore from "@/app/Store/editorStore";

// ---- TYPES ----
interface ShareModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

interface ExportItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export default function ShareModal({ open, setOpen }: ShareModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const slides = useEditorStore((s) => s.slides);



  const handlePpt = async () => {
    const res = await fetch("/api/generate-ppt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slides }),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "presentation.pptx";
    a.click();
  };




  const handlePdf = async () => {
    const res = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slides }),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "presentation.pdf";
    a.click();
  };

  const handlePngs = async () => {
    await fetch("/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slides }),
    })
      .then(res => res.blob())
      .then(blob => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "slides-images.zip";
        link.click();
      });

  }

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 animate-[fadeIn_0.2s_ease]"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-black text-xl font-semibold">
            Export Presentation
          </h2>
          <button onClick={() => setOpen(false)}>
            <X className="text-black w-5 h-5" />
          </button>
        </div>

        {/* EXPORT OPTIONS */}
        <div className="mt-6 space-y-3">
          <ExportItem icon={<FileText />} label="Export to PDF" onClick={handlePdf} />
          <ExportItem icon={<FileDown />} label="Export to PowerPoint" onClick={handlePpt} />
          <ExportItem icon={<Images />} label="Export as PNGs" onClick={handlePngs} />
        </div>
      </div>
    </div>
  );
}

function ExportItem({ icon, label, onClick }: ExportItemProps) {
  return (
    <div onClick={onClick} className="flex justify-between items-center border rounded-lg p-3 hover:bg-gray-100 cursor-pointer">
      <div className="flex items-center text-black gap-3">
        {icon}
        <span className="font-medium text-black">{label}</span>
      </div>
      <Download className="text-black w-5 h-5" />
    </div>
  );
}
