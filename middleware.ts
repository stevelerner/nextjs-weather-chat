import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const res = NextResponse.next();
  res.headers.set("x-powered-by", "Vercel Edge Middleware");
  return res;
}
