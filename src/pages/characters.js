import { navigateTo } from '../router/router.js';
import { loadInicialData, getCharactersCopy, getDeletedCharactersCopy, getEditedCharactersCopy } from '../utils/state.js';

export const charactersPage = async (app) => {

    app.innerHTML = `
    <header>
        <h1>Characters</h1>
        <nav>
            <a href="/" onclick="event.preventDefault(); navigateTo('/')">Inicio</a>
            <a href="/episodes" onclick="event.preventDefault(); navigateTo('/episodes')">Episodes</a>
            <a href="/locations" onclick="event.preventDefault(); navigateTo('/locations')">Locations</a>
        </nav>
    </header>
    <p id="loading-msg">Cargando personajes...</p>
    <div id="characters-container"></div>
`;

    await loadInicialData();
    
    const allCharacters    = getCharactersCopy();
    const deletedIds       = getDeletedCharactersCopy();
    const editedCharacters = getEditedCharactersCopy();

    const visibleCharacters = allCharacters
        .filter(character => !deletedIds.includes(character.id))
        .map(character => {
            const localEdits = editedCharacters[character.id];
            return localEdits ? { ...character, ...localEdits } : character;
        });

    document.getElementById("loading-msg").remove();

    const container = document.getElementById("characters-container");
    container.innerHTML = visibleCharacters.map(character => createCharacterCard(character)).join('');
};

const createCharacterCard = (character) => {
    const statusColor = getStatusColor(character.status);
    return `
        <div class="character-card" data-id="${character.id}">
            <img 
                src="${character.image}" 
                alt="${character.name}"
                onerror="this.src='https://rickandmortyapi.com/api/character/avatar/19.jpeg'"
            />
            <div class="character-info">
                <h2 class="character-name">${character.name}</h2>
                <p class="character-status">
                    <span class="status-dot" style="background-color: ${statusColor}"></span>
                    ${character.status} — ${character.species}
                </p>
                <p class="character-detail"><span class="label">Género:</span> ${character.gender}</p>
                <p class="character-detail"><span class="label">Origen:</span> ${character.origin.name}</p>
                <p class="character-detail"><span class="label">Última ubicación:</span> ${character.location.name}</p>
            </div>
        </div>
    `;
};

const getStatusColor = (status) => {
    const colors = {
        "Alive":   "#55cc44",
        "Dead":    "#d63d2e",
        "unknown": "#9e9e9e",
    };
    return colors[status] ?? "#9e9e9e";
};