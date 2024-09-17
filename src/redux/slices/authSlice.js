import { createSlice } from '@reduxjs/toolkit';


//récup du token stocké dans localStorage ou initialise à null s'il n'y en a pas
const initialState = {
    token: localStorage.getItem('authToken') || null,
    isAuthenticated: !!localStorage.getItem('authToken'),
    //infos user si besoin
    user: null,
    error: null
};

//création d'un slice pour gérer l'authentification
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //action pour connecter un utilisateur
        login: (state, { payload }) => {
            //stocker les données de l'utilisateur dans l'état
            const { token, user } = payload;
            //mettre à jour l'état pour indiquer que l'utilisateur est authentifié et token enregistré
            state.token = token;
            state.isAuthenticated = true;
            state.user = user;
            // Stocke le token dans localStorage pour persister la session
            localStorage.setItem('authToken', token);
        },
        //action pour déconnecter un utilisateur
        logout: (state) => {
            //réinitialiser les données de l'utilisateur
            state.token = null;
            state.isAuthenticated = false;
            state.user = null;
            // Supprime le token du localStorage pour déconnecter l'utilisateur
            localStorage.removeItem('authToken');
        },
        //action de mise à jour des infos utilisateur
        updateUser: (state, { payload }) => {
            state.user = { ...state.user, ...payload };
        }
    },
});

//exporter des actions
export const { login, logout, updateUser } = authSlice.actions;

//exporter du réducteur pour l'ajouter au store
export default authSlice.reducer;

