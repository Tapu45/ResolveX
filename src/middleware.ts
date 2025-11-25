import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createLogger } from "@/lib/logger";

const logger = createLogger("Middleware");

// Define route matchers
const isPublicRoute = createRouteMatcher([
    "/",
    "/pricing",
    "/about",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhooks(.*)",
]);

const isAuthRoute = createRouteMatcher([
    "/sign-in(.*)",
    "/sign-up(.*)",
]);

// const isProtectedRoute = createRouteMatcher([
//     "/dashboard(.*)",
//     "/settings(.*)",
//     "/onboarding(.*)",
//     "/api/organizations(.*)",
//     "/api/workspaces(.*)",
// ]);

export default clerkMiddleware(async (auth, request) => {
    const { userId } = await auth();
    const pathname = request.nextUrl.pathname;

    logger.debug("Middleware check", { pathname, userId: userId || "unauthenticated" });

    // Public routes - allow without auth
    if (isPublicRoute(request)) {
        logger.debug("Public route accessed", { pathname });
        return NextResponse.next();
    }

    // If no user ID (unauthenticated)
    if (!userId) {
        logger.warn("Unauthenticated access attempt", { pathname });

        // Auth routes (sign-in, sign-up) - allow
        if (isAuthRoute(request)) {
            logger.debug("Auth route accessed without user", { pathname });
            return NextResponse.next();
        }

        // Protected routes - redirect to sign-in
        logger.info("Redirecting to sign-in", { pathname });
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // User is authenticated
    logger.debug("User authenticated", { userId, pathname });

    // If user tries to access auth routes while logged in, redirect to dashboard
    if (isAuthRoute(request)) {
        logger.debug("Authenticated user accessing auth route, redirecting to dashboard", {
            userId,
            pathname,
        });
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Allow protected routes (organization/workspace check happens in provider)
    logger.debug("Allowing access to protected route", { userId, pathname });
    return NextResponse.next();
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
};