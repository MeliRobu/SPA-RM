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
        <section class="episodes-view">
            <div class="episodes-header">
                <h1><strong>Episodes</strong></h1>
                <nav>
                    <a href="/" data-link="/">Home</a>
                    <a href="/episodes" data-link="/episodes">Episodes</a>
                    <a href="/locations" data-link="/locations">Locations</a>
                </nav>
            </div>
            <div id="episodes-container" class="episodes-container">
                ${episodes.map(episode => `
                    <div class="episode-card" data-id="${episode.id}">
                        <h2 class="episode-name"><strong>${episode.name}</strong></h2>
                        <p class="episode-code"><strong>Episode:</strong> ${episode.episode}</p>
                        <p class="episode-detail"><strong>Air Date:</strong> ${episode.air_date}</p>
                        <p class="episode-characters"><strong>Characters:</strong> ${episode.characters.length}</p>
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
        </section>
    `;

    // Navegación
    document.querySelectorAll('[data-link]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(e.target.dataset.link);
        });
    });
};