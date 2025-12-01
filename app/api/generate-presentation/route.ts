import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_KEY!,
});

export async function POST(req: Request) {
    const { prompt } = await req.json();

    const system = `
You are an expert presentation template generator. 
You ONLY return JSON in the exact structure below. 
Follow strictly:

{
  "modern": {
    "slides": [
      {
        "id": "1",
        "elements": [
          {
            "id": "1-1",
            "data": {
              "type": "text",
              "text": "",
              "x": 120,
              "y": 100,
              "width": 400,
              "height": 60,
              "color": "#ffffff",
              "fontSize": 40,
              "fontFamily": "Inter"
            }
          },
          {
            "id": "1-2",
            "data": {
              "type": "text",
              "text": "",
              "x": 120,
              "y": 180,
              "width": 600,
              "height": 200,
              "color": "#ffffff",
              "fontSize": 22,
              "fontFamily": "Inter"
            }
          },
          {
            "id": "1-3",
            "data": {
              "type": "image",
              "src": "https://images.unsplash.com/photo-xxxx",
              "x": 650,
              "y": 150,
              "width": 350,
              "height": 300,
              "fit": "cover"
            }
          }
        ]
      }
    ]
  }
}

RULES:
- Always create EXACTLY 10 slides.
- Every slide MUST contain: 
  1 heading text
  1 paragraph text
  1 image from unsplash.com (REAL LINK)
- No markdown.
- No extra text outside JSON.
- Slide IDs = "1" to "10".
- Element IDs = "slide-element".
- Use modern clean business tone.
`;

    const userMessage = `
Generate a 10-slide presentation based on this topic:

"${prompt}"

Return ONLY JSON.
`;

    const completion = await client.chat.completions.create({
        model: "gpt-4.1",
        response_format: { type: "json_object" },
        messages: [
            { role: "system", content: system },
            { role: "user", content: userMessage },
        ],
    });

    return NextResponse.json(completion.choices[0].message);
}

