/*
Nombre del episodio
Fecha de emisión
Cantidad de personajes participantes
*/
import {navigateTo} from '../router/router.js';
export const episodesPage = (app) => {
    app.innerHTML = `
        <h1>Episodes</h1>
        <div id="episodes-container"></div>
    `;
}