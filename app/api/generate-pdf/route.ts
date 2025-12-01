export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb } from "pdf-lib";

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

export async function POST(req: NextRequest) {
    try {
        const { slides } = await req.json();

        if (!slides || !Array.isArray(slides)) {
            return NextResponse.json({ error: "Slides missing" }, { status: 400 });
        }

        const pdfDoc = await PDFDocument.create();

        for (const slide of slides) {
            const page = pdfDoc.addPage([CANVAS_WIDTH, CANVAS_HEIGHT]);

            // BACKGROUND COLOR
            if (slide.background) {
                page.drawRectangle({
                    x: 0,
                    y: 0,
                    width: CANVAS_WIDTH,
                    height: CANVAS_HEIGHT,
                    color: rgb(
                        parseInt(slide.background.slice(0, 2), 16) / 255,
                        parseInt(slide.background.slice(2, 4), 16) / 255,
                        parseInt(slide.background.slice(4, 6), 16) / 255
                    ),
                });
            }

            /** ADD ELEMENTS **/
            for (const el of slide.elements) {
                const data = el.data;

                /** TEXT */
                if (data.type === "text") {
                    page.drawText(data.text || "", {
                        x: data.x,
                        y: CANVAS_HEIGHT - data.y - (data.height || 40),
                        size: data.fontSize || 24,
                        color: rgb(0, 0, 0),
                    });
                }

                /** IMAGE */
                if (data.type === "image" && data.src) {
                    const imgBytes = Buffer.from(data.src.split(",")[1], "base64");

                    let pdfImg;
                    if (data.src.includes("png")) {
                        pdfImg = await pdfDoc.embedPng(imgBytes);
                    } else {
                        pdfImg = await pdfDoc.embedJpg(imgBytes);
                    }

                    const w = data.width || pdfImg.width;
                    const h = data.height || pdfImg.height;

                    page.drawImage(pdfImg, {
                        x: data.x,
                        y: CANVAS_HEIGHT - data.y - h,
                        width: w,
                        height: h,
                    });
                }
            }
        }

        // const pdfBytes = await pdfDoc.save();

        // return new Response(pdfBytes, {
        //   headers: {
        //     "Content-Type": "application/pdf",
        //     "Content-Disposition": 'attachment; filename="slides.pdf"',
        //   },
        // });
        const pdfBytes = await pdfDoc.save();
        const buffer = Buffer.from(pdfBytes);

        return new Response(buffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": 'attachment; filename="slides.pdf"',
            },
        });

    } catch (err) {
        return NextResponse.json(
            { error: (err as Error).message },
            { status: 500 }
        );
    }
}
