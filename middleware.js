import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const noAuthRouter = ["/login", "/signup"];

const isAuthRouter = [
  "/me",
  "/saved",
  "/wallet",
  "/wallet/resume",
  "/wallet/topup",
  "/wallet/transfer",
  "/purchases",
  "/purchases/orders",
  "/purchases/downloads",
  "/purchases/courses",
  "/settings",
];

const isAuthStartWith = ["/my-purchases/order/", "purchases/order/"];

export async function middleware(req) {
  const path = req.nextUrl.pathname;

  if (path.startsWith("/create") || path.startsWith("/dashboard")) {
    const session = await getToken({ req });
    if (!session && session?.user?.rol === "vendor") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (isAuthRouter.includes(path)) {
    const session = await getToken({ req });
    if (!session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}
