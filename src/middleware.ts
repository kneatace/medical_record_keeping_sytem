import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextFetchEvent } from 'next/server';


/**
 * Middleware function to handle authentication in Next.js pages.
 * It uses the `withAuth` function from `next-auth/middleware` to add authentication.
 * The paths for sign-in, sign-out, error, verify request, and new user pages are specified.
 *
 * @param req - The incoming request object, with authentication added.
 * @param event - The fetch event.
 * @returns - The response from the `withAuth` function.
 */
export function middleware(req: NextRequestWithAuth, event: NextFetchEvent) {
  return withAuth({
    pages: {
      signIn: '/pages/auth/signin',
      signOut: '/pages/auth/signout',
      error: '/pages/auth/error',
      verifyRequest: '/pages/auth/verify-request',
      newUser: '/pages/auth/new-user',
    },
  })(req, event);
}