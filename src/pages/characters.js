/*
la aplicación necesita renderizar información básica de personajes.
El cliente solicita ampliar el sistema creando nuevas páginas dinámicas dentro de la SPA.
*/
import {navigateTo} from '../router/router.js';
export const charactersPage = (app) => {
    app.innerHTML = `
        <h1>Characters</h1>
        <div id="characters-container"></div>
    `;
}