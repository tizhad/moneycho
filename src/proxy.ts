import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "nl"];
const defaultLocale = "nl";
export const LOCALE_COOKIE = "moneycho_locale";

function getLocale(request: NextRequest): string {
  // Only respect an explicit cookie set when the user clicks the language switcher.
  // Never infer from Accept-Language — NL is the default for all new visitors.
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && locales.includes(cookie)) return cookie;
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) return NextResponse.next();

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/|_vercel/|.*\\..*).*)"],
};
