export const loginUser = async (email, password) => {
    const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Echec de connexion');
    }

    return response.json();
};
