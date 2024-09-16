import { configureStore } from '@reduxjs/toolkit';
import authReducer, { setUser } from './slices/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

//informations utilisateur si un token est présent
const token = localStorage.getItem('authToken');

if (token) {
    //demande pour récupérer les détails de l'utilisateur en utilisant le token
    fetch('http://localhost:3001/api/v1/user/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then(response => response.json())
        .then(user => store.dispatch(setUser({ user })))
        //Stock les informations utilisateur dans Redux
        .catch(error => {
            console.error('Failed to fetch user details:', error);
            localStorage.removeItem('authToken');
        });
}