export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import puppeteer from "puppeteer";

/* ---------------- TYPES ---------------- */
interface SlideElementData {
  type: "text" | "image";
  x: number;
  y: number;
  width: number;
  height: number;

  // text
  text?: string;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string | number;

  // image
  src?: string;
}

interface SlideElement {
  data: SlideElementData;
}

interface Slide {
  width?: number;
  height?: number;
  background?: string;
  elements: SlideElement[];
}

/* ---------------------------------------- */

export async function POST(req: NextRequest) {
  try {
    const { slides } = await req.json();

    if (!slides || !Array.isArray(slides)) {
      return NextResponse.json(
        { error: "Slides missing" },
        { status: 400 }
      );
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const zip = new JSZip();

    /* ----------- PROCESS EACH SLIDE ---------- */
    for (let i = 0; i < slides.length; i++) {
      const slide: Slide = slides[i];
      const page = await browser.newPage();

      await page.setViewport({
        width: slide.width || 1280,
        height: slide.height || 720,
        deviceScaleFactor: 2,
      });

      /* ----------- GENERATE HTML FOR SLIDE ---------- */
      const html = `
        <html>
          <body style="margin:0; padding:0; background:${
            slide.background || "#ffffff"
          };">
            ${slide.elements
              .map((el: SlideElement) => {
                const d = el.data;

                if (d.type === "text") {
                  return `
                    <div style="
                      position:absolute;
                      left:${d.x}px;
                      top:${d.y}px;
                      width:${d.width}px;
                      height:${d.height}px;
                      color:${d.color || "#000"};
                      font-size:${d.fontSize || 24}px;
                      font-family:${d.fontFamily || "Arial"};
                      font-weight:${d.fontWeight || "normal"};
                      white-space:pre-wrap;
                    ">
                      ${d.text || ""}
                    </div>
                  `;
                }

                if (d.type === "image" && d.src) {
                  return `
                    <img 
                      src="${d.src}"
                      style="
                        position:absolute;
                        left:${d.x}px;
                        top:${d.y}px;
                        width:${d.width}px;
                        height:${d.height}px;
                      "
                    />
                  `;
                }

                return "";
              })
              .join("")}
          </body>
        </html>
      `;

      await page.setContent(html, {
        waitUntil: "networkidle0",
      });

      /* ----------- SCREENSHOT SLIDE ---------- */
      const pngBuffer = await page.screenshot({ type: "png" });

      zip.file(`slide-${i + 1}.png`, pngBuffer);

      await page.close();
    }

    await browser.close();

    /* ----------- ZIP OUTPUT ---------- */
    const zipFile = await zip.generateAsync({ type: "uint8array" });
    const buffer = Buffer.from(zipFile);

    return new Response(buffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="slides.zip"',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
