import { configureStore } from '@reduxjs/toolkit';
import authReducer, { login, logout } from './slices/authSlice';

/**
 * Création du store Redux.
 * Le store est configuré avec le réducteur d'authentification pour gérer l'état d'authentification.
 * @type {Object}
 */
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

//infos utilisateur si un token est présent
const token = localStorage.getItem('authToken');

/**
 * Si un token est présent, il est utilisé pour récupérer les détails de l'utilisateur.
 * Les détails de l'utilisateur sont ensuite utilisés pour mettre à jour l'état d'authentification.
 * Si la récupération des détails échoue, le token est supprimé et l'état d'authentification est réinitialisé.
 */
if (token) {
    fetch('http://localhost:3001/api/v1/user/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then(response => {
            //vérifie si la réponse de l'API est correcte
            if (!response.ok) {
                throw new Error("Echec de récupération des données détaillées de l'utilisateur");
            }
            return response.json();
        })
        .then(user => {
            //met à jour l'état d'authentification avec les détails de l'utilisateur et le token
            store.dispatch(login({ token, user }));
        })
        .catch(error => {
            //si une erreur survient, déconnecte l'utilisateur et supprime le token du localStorage
            console.error("Echec de récupération des données détaillées de l'utilisateur:", error);
            //supprimer le token du localStorage s'il y a une erreur
            store.dispatch(logout());
        });
}
