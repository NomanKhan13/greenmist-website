import { type NextRequest } from "next/server";
import { updateSession } from "./app/_lib/supabase-middleware";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files, images, etc.
     * This allows Supabase to passively refresh tokens everywhere.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
