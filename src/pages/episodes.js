/*
Nombre del episodio
Fecha de emisión
Cantidad de personajes participantes
*/
import {navigateTo} from '../router/router.js';
import { getEpisodes } from '../services/api.js';

export const episodesPage = async (app) => {
    const episodes = await getEpisodes();
    app.innerHTML = `
        <seccion class="episodes-view">
        <h1>Episodes</h1>
        <div id="episodes-container" class="episodes-container">
            ${episodes.map(episode => `
                <div class="episode-card" data-id="${episode.id}">
                    <h2><strong>${episode.name}</strong></h2>
                    <p><strong>Air Date:</strong> ${episode.air_date}</p>
                    <p><strong>Episode:</strong> ${episode.episode}</p>
                    <p><strong>Characters:</strong> ${episode.characters.length}</p>
                    <details>
                        <summary><strong>Read more</strong></summary>
                        <ul>
                            <li><strong>Created:</strong> ${episode.created}</li>
                            <li><strong>URL:</strong> ${episode.url}</li>
                        </ul>
                    </details>
                </div>
            `).join('')}
        </div>
    `;
}