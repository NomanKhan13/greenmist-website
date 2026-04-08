import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
          Object.entries(headers).forEach(([key, value]) =>
            supabaseResponse.headers.set(key, value),
          );
        },
      },
    },
  );

  // This refreshes the session if expired
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = currentPath.startsWith("/account");
  const isAuthRoute =
    currentPath.startsWith("/login") || currentPath.startsWith("/register");

  // --- Add your custom redirect logic here ---
  // Case 1: If !user and visits protected route - Redirect to /login
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Case 1: If user and visits auth routes - Redirect to /accounts
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/account"; // Redirect to profile
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
