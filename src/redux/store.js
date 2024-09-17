import { configureStore } from '@reduxjs/toolkit';
import authReducer, { login, logout } from './slices/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

//infos utilisateur si un token est présent
const token = localStorage.getItem('authToken');

if (token) {
    //demande pour récup les détails de l'utilisateur en utilisant le token
    fetch('http://localhost:3001/api/v1/user/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }
            return response.json();
        })
        .then(user => {
            //met à jour l'état auth en utilisant l'action login
            store.dispatch(login({ token, user }));
        })
        .catch(error => {
            console.error('Failed to fetch user details:', error);
            //supprimer le token du localStorage s'il y a une erreur
            store.dispatch(logout());
        });
}
