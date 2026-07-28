import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import catalogData from "@/data/catalog.json";

type CatalogFile = {
  products: Array<{
    name: string;
    category: string;
    price: number;
    rating: number;
    owned: boolean;
    emoji: string;
  }>;
};

const catalog = (catalogData as CatalogFile).products;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = typeof body?.query === "string" ? body.query.trim() : "";
    if (!query) {
      return NextResponse.json({ error: true }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: true }, { status: 500 });
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const catalogJson = JSON.stringify(catalog);

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `A shopper's search returned no results. Their failed query was: "${query}"

Here is the full product catalog as JSON:
${catalogJson}

Return ONLY a JSON object — no prose, no markdown fences — with this exact shape:
{"intent": "one line describing what the user actually wanted", "substitutes": [{"name": "exact product name from catalog", "why": "one short line on why this is a reasonable alternative"}], "confidence": "high" | "low"}

Critical constraint: substitutes must be chosen ONLY from the products in the provided catalog. Use the exact product name string from the catalog. If no reasonable alternative exists in the catalog, return an empty substitutes array and "confidence": "low". Never invent a product that is not in the catalog.`,
        },
      ],
    });

    const raw = message.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n");

    const stripped = raw
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/g, "")
      .trim();

    try {
      const parsed = JSON.parse(stripped) as {
        intent?: string;
        substitutes?: Array<{ name: string; why: string }>;
        confidence?: string;
      };

      const names = new Set(catalog.map((p) => p.name));
      const substitutes = (parsed.substitutes ?? []).filter(
        (s) => s && typeof s.name === "string" && names.has(s.name),
      );

      return NextResponse.json({
        intent: parsed.intent ?? "",
        substitutes,
        confidence:
          parsed.confidence === "high" || parsed.confidence === "low"
            ? parsed.confidence
            : "low",
        catalogSize: catalog.length,
      });
    } catch {
      return NextResponse.json({ error: true });
    }
  } catch {
    return NextResponse.json({ error: true });
  }
}
