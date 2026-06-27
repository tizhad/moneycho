import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "nl"];
const defaultLocale = "nl";
export const LOCALE_COOKIE = "moneycho_locale";

function getLocale(request: NextRequest): string {
  // 1. Cookie takes priority (user's explicit choice)
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && locales.includes(cookie)) return cookie;

  // 2. Browser Accept-Language header
  const acceptLang = request.headers.get("accept-language") ?? "";
  const preferred = acceptLang.split(",")[0].split("-")[0].toLowerCase().trim();
  return locales.includes(preferred) ? preferred : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) return NextResponse.next();

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/|_vercel/|.*\\..*).*)"],
};
