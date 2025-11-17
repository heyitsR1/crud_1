export default async function logOut () {
    const response = await fetch('http://localhost:3000/auth/logout',{
            method: 'GET',
            credentials: 'include', 
        });
        if (response.ok) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('auth_token');
            }
            window.location.href = '/';
            console.log('Logout successful');
        } else {
            console.error('Logout failed on server');
        }
}
