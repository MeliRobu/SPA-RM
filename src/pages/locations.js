/*
Crear una nueva vista SPA para visualizar locations.
Debe mostrar:

Nombre
Tipo
Dimensión
Cantidad de residentes
*/
import {navigateTo} from '../router/router.js';
export const locationsPage = (app) => {
    app.innerHTML = `
        <h1>Locations</h1>  
        <div id="locations-container"></div>
    `;
}   