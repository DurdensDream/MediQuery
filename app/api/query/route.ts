import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const querySchema = z.object({
  query: z.string().min(3, "Query must be at least 3 characters")
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = querySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Query must be at least 3 characters" },
        { status: 400 }
      );
    }

    const apiBase = process.env.INTERNAL_API_URL ?? "http://localhost:4000";

    const response = await fetch(`${apiBase}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: parsed.data.query })
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Query route error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
