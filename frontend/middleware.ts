import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Definir as rotas protegidas
const rotasProtegidas = ["/dashboard"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  if (rotasProtegidas.some((rota) => pathname.startsWith(rota))) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Informar ao Next.js onde o middleware deve atuar
export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"] // Pode adicionar mais rotas protegidas aqui
};