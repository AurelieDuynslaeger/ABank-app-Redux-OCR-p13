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

    const data = await response.json();
    console.log('Reponse API pour Le Login:', data);

    return data;
};

export const updateUserProfile = async (token, updatedData) => {
    console.log('Token:', token);
    if (!token) {
        throw new Error('Token manquant pour la mise à jour du profil');
    }

    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Echec de mise à jour du profil');
    }

    return response.json();
};