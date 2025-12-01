export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import PptxGenJS from "pptxgenjs";

const pxToIn = (px: number) => px / 96;

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;


async function fetchImageAsBase64(url: string): Promise<string> {
  try {
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const mime = res.headers.get("content-type") || "image/png";
    return `data:${mime};base64,${base64}`;
  } catch (e) {
    console.error("Image fetch failed →", url,e);
    return ""; 
  }
}


export async function POST(req: NextRequest) {
    try {
        const { slides } = await req.json();

        if (!slides || !Array.isArray(slides)) {
            return NextResponse.json({ error: "Slides missing" }, { status: 400 });
        }

        const pptx = new PptxGenJS();

        pptx.defineLayout({
            name: "CUSTOM",
            width: pxToIn(CANVAS_WIDTH),
            height: pxToIn(CANVAS_HEIGHT),
        });

        pptx.layout = "CUSTOM";

        for (const slide of slides) {
            const sld = pptx.addSlide();

            sld.background = { color: slide.background || "000000" };

            for (const el of slide.elements) {
                const data = el.data;

                if (data.type === "text") {
                    sld.addText(data.text || "", {
                        x: pxToIn(data.x),
                        y: pxToIn(data.y),
                        w: pxToIn(data.width || 500),
                        h: pxToIn(data.height || 50),
                        fontSize: data.fontSize || 24,
                        color: data.color || "FFFFFF",
                        fontFace: data.fontFamily || "Arial",
                        bold: data.fontWeight ? true : false,
                    });
                }

                // if (data.type === "image" && data.src) {
                //     const x = pxToIn(data.x);
                //     const y = pxToIn(data.y);
                //     const w = data.width ? pxToIn(data.width) : undefined;
                //     const h = data.height ? pxToIn(data.height) : undefined;

                //     sld.addImage({
                //         data: data.src,
                //         x,
                //         y,
                //         w,
                //         h,
                //     });
                // }

                if (data.type === "image" && data.src) {
                    let base64 = data.src;

                    // If not base64, convert
                    if (!data.src.startsWith("data:image")) {
                        base64 = await fetchImageAsBase64(data.src);
                    }

                    if (base64) {
                        sld.addImage({
                            data: base64,
                            x: pxToIn(data.x),
                            y: pxToIn(data.y),
                            w: pxToIn(data.width),
                            h: pxToIn(data.height),
                        });
                    }
                }




                if (data.type === "shape") {
                    sld.addShape(pptx.ShapeType.rect, {
                        x: pxToIn(data.x),
                        y: pxToIn(data.y),
                        w: pxToIn(data.width),
                        h: pxToIn(data.height),
                        fill: { color: data.fill },
                        line: { color: data.stroke || "FFFFFF", width: data.strokeWidth || 0 },
                    });
                }

                if (data.type === "svg") {
                    sld.addImage({
                        data: data.svg,
                        x: pxToIn(data.x),
                        y: pxToIn(data.y),
                        w: pxToIn(data.width),
                        h: pxToIn(data.height),
                    });
                }
            }
        }

        /* GENERATE PPT ARRAYBUFFER */
        // const pptArrayBuffer = await pptx.write("arraybuffer");
        // return new NextResponse(pptArrayBuffer, {
        //     headers: {
        //         "Content-Type":
        //             "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        //         "Content-Disposition": 'attachment; filename="slides.pptx"',
        //     },
        // });

        const result = await pptx.stream();
        let buffer: Buffer;
        if (typeof result === "string") {
            buffer = Buffer.from(result, "base64");
        } else if (typeof Buffer !== "undefined" && Buffer.isBuffer(result)) {
            buffer = result as Buffer;
        } else if (result instanceof ArrayBuffer) {
            buffer = Buffer.from(new Uint8Array(result));
        } else if (result instanceof Uint8Array) {
            buffer = Buffer.from(result);
        } else if (typeof Blob !== "undefined" && result instanceof Blob) {
            const ab = await result.arrayBuffer();
            buffer = Buffer.from(new Uint8Array(ab));
        } else {
            buffer = Buffer.from(String(result));
        }

        const uint8 = new Uint8Array(buffer);

        return new Response(uint8, {
            headers: {
                "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                "Content-Disposition": 'attachment; filename="slides.pptx"',
            },
        });


    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Internal Server Error";

        return NextResponse.json({ error: message }, { status: 500 });
    }
}
