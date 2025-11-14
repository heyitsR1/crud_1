import { NextRequest, NextResponse } from "next/server";

async function getProfileFromBackend (request: NextRequest) { 
    const jwt = request.cookies.get('jwt')?.value;
    if (!jwt) {
        return null
    }
    try { 
        const response = await fetch ('http://localhost:3000/auth/profile', {
            method:'GET',
            headers: {
                'Cookie': `jwt=${jwt}`,
                'Authorization': `Bearer ${jwt}`,
            },
            cache:'no-store',
        });
        if (response.ok) {
            return await response.json()
        }

    }catch (err) {
        console.error("Middleware profile fetch error: ", err)
    }
    return null; 
}

export async function middleware (request: NextRequest) { 
    const path = request.nextUrl.pathname;
    
    // Check if this is a protected route
    const isProtectedRoute = path.startsWith('/students');
    
    if (isProtectedRoute) {
        const profile = await getProfileFromBackend(request);
        
        // If no profile (not authenticated), redirect to login
        if (!profile) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        
        // Check if user is admin
        const isAdmin = profile.roles && Array.isArray(profile.roles) && profile.roles.includes('admin');
        
        // Admin-only routes: create, update, delete pages
        const isAdminOnlyRoute = path.includes('/create') || 
                                 path.match(/\/students\/\d+$/) || // Edit page pattern
                                 path.match(/\/students\/\d+\/edit$/);
        
        if (isAdminOnlyRoute && !isAdmin) {
            // Non-admin trying to access admin routes - redirect to students list
            return NextResponse.redirect(new URL('/students', request.url));
        }
    }
    
    // Handle /admin routes (if they exist)
    if (path.startsWith('/admin')) { 
        return NextResponse.redirect(new URL('/', request.url));
    }
    
    return NextResponse.next()
}

export const config = { 
    matcher: [
        '/admin/:path*',
        '/students/:path*',
        '/students'
    ]
}