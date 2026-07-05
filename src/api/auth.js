const API_URL = import.meta.env.VITE_API_URL;

async function extractErrorMessage(response, fallback) {
    try {
        const data = await response.json();
        return data.message || fallback;
    } catch {
        return fallback;
    }
}

async function post(path, body) {
    let response;
    try {
        response = await fetch(`${API_URL}${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
    } catch {
        throw new Error('Błąd połączenia z serwerem.');
    }
    return response;
}

export async function login(email, password) {
    const response = await post('/api/auth/login', { email, password });

    if (!response.ok) {
        throw new Error(await extractErrorMessage(response, 'Nieprawidłowy email lub hasło.'));
    }

    return response.json();
}

export async function register(payload) {
    const response = await post('/api/clients', payload);

    if (!response.ok) {
        throw new Error(await extractErrorMessage(response, 'Błąd rejestracji. Taki email lub tag może już istnieć.'));
    }
}
