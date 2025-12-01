import { useState } from "react";
import useEditorStore from "@/app/Store/editorStore";

export default function AddTemplate() {
  const applyFullTemplate = useEditorStore((s) => s.applyFullTemplate);

  const [loading, setLoading] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");
  const loadTemplate = async (templateName: string) => {
    try {
      setLoading(true);

      const res = await fetch("/templates.json");
      const json = await res.json();

      if (!json[templateName]) {
        console.error("Template not found:", templateName);
        return;
      }

      applyFullTemplate(json[templateName].slides);

    } catch (err) {
      console.error("Error loading template:", err);
    } finally {
      setLoading(false);
    }
  };



  async function generatePresentation() {
    const res = await fetch("/api/generate-presentation", {
      method: "POST",
      body: JSON.stringify({
        prompt: userPrompt,   
      }),
    });

    const { content } = await res.json();
    const json = JSON.parse(content);

    useEditorStore.getState().applyFullTemplate(json.modern.slides);
  }





  return (
    <div className="p-4 flex flex-col gap-3">

      <button
        onClick={() => loadTemplate("modern")}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Loading..." : "Apply Modern Template"}
      </button>

      <input
        type="text"
        placeholder="Type your topic…"
        value={userPrompt}
        onChange={e => setUserPrompt(e.target.value)}
      />

      <button onClick={generatePresentation}>
        Generate Presentation
      </button>


    </div>
  );
}
