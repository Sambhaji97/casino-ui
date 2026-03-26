import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://supaskins-backend.azurewebsites.net/api/v1/home/top-items/slots",
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return NextResponse.json(
        { status: false, message: "Failed to fetch top slots" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (error) {
    console.error("Top slots proxy error:", error);
    return NextResponse.json(
      { status: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
