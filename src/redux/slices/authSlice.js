import { createSlice } from '@reduxjs/toolkit';

//création d'un slice pour gérer l'authentification
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null, //l'utilisateur actuellement connecté, initialisé à null
        isAuthenticated: false, //indicateur d'authentification, initialisé à false
    },
    reducers: {
        //action pour connecter un utilisateur
        login: (state, action) => {
            state.user = action.payload; //stocker les données de l'utilisateur dans l'état
            state.isAuthenticated = true; //mettre à jour l'état pour indiquer que l'utilisateur est authentifié
        },
        //action pour déconnecter un utilisateur
        logout: (state) => {
            state.user = null; //réinitialiser les données de l'utilisateur
            state.isAuthenticated = false; //mettre à jour l'état pour indiquer que l'utilisateur n'est plus authentifié
        },
    },
});

//exporter des actions
export const { login, logout } = authSlice.actions;

//exporter du réducteur pour l'ajouter au store
export default authSlice.reducer;

