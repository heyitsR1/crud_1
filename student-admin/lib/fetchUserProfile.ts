import { authenticatedFetch } from "./api";

export default async function fetchUserProfile () {
    try {
        const res = await authenticatedFetch('/auth/profile');
        
        if (!res.ok) {
            // If unauthorized, clear token and return null
            if (res.status === 401) {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('auth_token');
                }
                return null;
            }
            throw new Error(`Failed to fetch profile: ${res.status}`);
        }
        
        const user = await res.json();
        return user;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        // Clear token on error
        if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
        }
        return null;
    }
}


