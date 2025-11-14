# Authentication Fixes Summary

## Issues Found and Fixed

### 1. **Roles Type Mismatch (CRITICAL)**
   **Issue**: 
   - In `users.service.ts`, roles were defined as strings (`'admin'`, `'user'`)
   - The `RolesGuard` expects roles to be an array and uses `user.roles.includes(role)` to check permissions
   - This caused authentication to fail because `'admin'.includes('admin')` doesn't work as expected (string includes checks for substring, not exact match in array context)
   
   **Fix**:
   - Changed roles in `users.service.ts` from strings to arrays: `['admin']` and `['user']`
   - Updated `auth.service.ts` to handle both array and string roles (defensive coding) with: `Array.isArray(user.roles) ? user.roles : [user.roles].filter(Boolean)`
   
   **Files Changed**:
   - `crud/src/users/users.service.ts`
   - `crud/src/auth/auth.service.ts`

### 2. **Missing Authorization Header in authenticatedFetch (CRITICAL)**
   **Issue**:
   - The `authenticatedFetch` function in `lib/api.ts` was not sending the JWT token in the Authorization header
   - While the backend checks both cookies and Authorization headers, the cookie alone wasn't sufficient in all cases
   - The token was stored in an httpOnly cookie but wasn't accessible for the Authorization header
   
   **Fix**:
   - Modified login to return `access_token` in the response (in addition to setting the cookie)
   - Store the token in localStorage after successful login
   - Updated `authenticatedFetch` to read the token from localStorage and include it in the Authorization header as `Bearer <token>`
   - Added proper error handling to clear the token on 401 responses
   
   **Files Changed**:
   - `crud/src/auth/auth.controller.ts` - Now returns `access_token` in response
   - `student-admin/lib/api.ts` - Added token storage and Authorization header support

### 3. **Server-Side authenticatedFetch Issue**
   **Issue**:
   - The `[id]/page.tsx` is a Next.js server component, but was using the client-side `authenticatedFetch` function
   - Server components don't have access to localStorage or cookies in the same way client components do
   - This caused authentication to fail for server-side data fetching
   
   **Fix**:
   - Created a new `serverAuthenticatedFetch` function that accepts a cookie header string
   - Updated `[id]/page.tsx` to use Next.js `cookies()` API to get cookies and pass them to `serverAuthenticatedFetch`
   - The server function extracts the JWT from cookies and sends it in the Authorization header
   
   **Files Changed**:
   - `student-admin/lib/api.ts` - Added `serverAuthenticatedFetch` function
   - `student-admin/app/(admin)/students/[id]/page.tsx` - Updated to use server-side authentication

### 4. **ID Type Consistency**
   **Status**: ✅ Verified - No issues found
   - Backend expects numbers (uses `+id` conversion in controller)
   - Frontend properly converts string IDs to numbers using `Number.parseInt(form.id, 10)`
   - Student entity and types consistently use `number` for IDs
   - All API calls properly convert IDs before sending

### 5. **Token Storage and Retrieval**
   **Fix**:
   - Implemented proper token storage in localStorage for client-side requests
   - Token is stored after successful login
   - Token is cleared on 401 unauthorized responses
   - Both cookie (httpOnly) and Authorization header are now used for maximum compatibility

## Testing Checklist

After these fixes, verify the following:

1. **Login as Admin (john/changeme)**:
   - ✅ Should successfully log in
   - ✅ Should be able to view students (GET /students)
   - ✅ Should be able to create students (POST /students)
   - ✅ Should be able to update students (PATCH /students/:id)
   - ✅ Should be able to delete students (DELETE /students/:id)

2. **Login as User (maria/guess)**:
   - ✅ Should successfully log in
   - ✅ Should be able to view students (GET /students)
   - ✅ Should be able to view a single student (GET /students/:id)
   - ❌ Should NOT be able to create students (should get 403 Forbidden)
   - ❌ Should NOT be able to update students (should get 403 Forbidden)
   - ❌ Should NOT be able to delete students (should get 403 Forbidden)

3. **Authentication Flow**:
   - ✅ Token is stored in localStorage after login
   - ✅ Authorization header is sent with all authenticated requests
   - ✅ Cookie is sent with all authenticated requests (via credentials: 'include')
   - ✅ Server-side requests properly extract and send JWT token

## Additional Notes

- **CORS Configuration**: Backend CORS is configured for `http://localhost:3001`. Ensure your Next.js frontend runs on port 3001, or update the CORS origin in `crud/src/main.ts`
- **Cookie Configuration**: Cookies are set with `httpOnly: true` for security, `sameSite: 'lax'` for CSRF protection, and `maxAge: 120000` (2 minutes) for testing
- **Token Expiration**: The JWT token expiration is controlled by the cookie maxAge. Consider implementing proper JWT expiration in production

## Files Modified

### Backend (NestJS):
1. `crud/src/users/users.service.ts` - Fixed roles to be arrays
2. `crud/src/auth/auth.service.ts` - Added defensive role array handling
3. `crud/src/auth/auth.controller.ts` - Return access_token in login response

### Frontend (Next.js):
1. `student-admin/lib/api.ts` - Added token storage and Authorization header support, added serverAuthenticatedFetch
2. `student-admin/app/(admin)/students/[id]/page.tsx` - Updated to use server-side authentication

## Remaining Considerations

1. **Token Refresh**: Consider implementing token refresh mechanism for production
2. **Logout**: Implement proper logout that clears both cookie and localStorage
3. **Error Handling**: Add user-friendly error messages for 401/403 responses
4. **Security**: Consider using secure cookies in production (already configured)
5. **Token Expiration**: Implement proper JWT expiration handling

