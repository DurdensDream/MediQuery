import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    const apiBase = process.env.INTERNAL_API_URL ?? "http://localhost:4000";

    const proxyFormData = new FormData();
    proxyFormData.append("file", file);

    const response = await fetch(`${apiBase}/api/ingest`, {
      method: "POST",
      body: proxyFormData
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Ingest route error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
