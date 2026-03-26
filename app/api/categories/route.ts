import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://supaskins-backend.azurewebsites.net/api/v1/casino/categories-with-games",
      { next: { revalidate: 60 } } // cache for 60 seconds
    );

    if (!res.ok) {
      return NextResponse.json(
        { status: false, message: "Failed to fetch categories" },
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
    console.error("Categories proxy error:", error);
    return NextResponse.json(
      { status: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
