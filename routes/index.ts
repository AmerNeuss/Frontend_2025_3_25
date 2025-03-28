export const publicRoutes = ['/'];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ['/', '/signup', '/login'];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT_USER = '/Projects';
export const DEFAULT_LOGIN_REDIRECT_ADMIN = '/Projects';
export const DEFAULT_NO_PERMISSION = '/no-permission';
export const testRoute = '/test';

export const adminRoutes = [
  // '/Projects',
  '/Projects/editProfile',
  // '/led'
];

export const protectedRoutes = [
  '/Projects',
  '/Projects/editProfile',
  '/Projects/user',
];
