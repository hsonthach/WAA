// authService.ts

const baseUrl = 'http://localhost:8080'; // Replace with your actual base URL

export const loginUser = async (email: string, password: string) => {
    const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const data = await response.json();
    return data.token; // Assuming the response contains a "token" field
};

export const setAuthToken = (token: string) => {
    localStorage.setItem('token', token); // Store the token in localStorage
};

export const getAuthToken = () => {
    return localStorage.getItem('token');
};
