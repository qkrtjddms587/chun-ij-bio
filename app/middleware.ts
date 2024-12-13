import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next(); // 계속 진행할 수 있게 설정

  const corsOrigin = process.env.NEXT_PUBLIC_CORS_ORIGIN || "*";

  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // OPTIONS 요청에 대한 응답 처리 (Preflight Request)
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: res.headers });
  }

  return res;
}

export const config = {
  matcher: ["/api/*"],
};
