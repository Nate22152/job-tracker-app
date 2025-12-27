import { API_URL } from './api.js';

export async function loginOrRegister(isRegistering, userData) {
    const endpoint = isRegistering ? '/register' : '/login';
    
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Authentication failed');
    return data;
}