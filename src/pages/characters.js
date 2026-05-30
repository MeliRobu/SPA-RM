import { navigateTo } from '../router/router.js';
import { loadInicialData, getCharactersCopy, getDeletedCharactersCopy, getEditedCharactersCopy, addCharacter } from '../utils/state.js';

export const charactersPage = async (app) => {

    app.innerHTML = `
    <header>
        <h1>Characters</h1>
        <nav>
            <a href="/" onclick="event.preventDefault(); navigateTo('/')">Home</a>
            <a href="/episodes.js" onclick="event.preventDefault(); navigateTo('/episodes')">Episodes</a>
            <a href="/locations.js" onclick="event.preventDefault(); navigateTo('/locations')">Locations</a>
            <button onclick="openCreateModal()">+ Crear personaje</button>
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

export const openCreateModal = () => {
    const modal = document.createElement('div');
    modal.id = 'create-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeCreateModal()"></div>
        <div class="modal-content">
            <h2>Crear personaje</h2>
            <input type="text" id="input-name" placeholder="Nombre" />
            <input type="text" id="input-species" placeholder="Especie" />
            <select id="input-gender">
                <option value="">Género</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="unknown">Unknown</option>
            </select>
            <select id="input-status">
                <option value="">Estado</option>
                <option value="Alive">Alive</option>
                <option value="Dead">Dead</option>
                <option value="unknown">Unknown</option>
            </select>
            <input type="text" id="input-image" placeholder="URL de imagen" />
            <div class="modal-buttons">
                <button onclick="closeCreateModal()">Cancelar</button>
                <button onclick="submitCreateCharacter()">Guardar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

window.openCreateModal = openCreateModal;

export const closeCreateModal = () => {
    const modal = document.getElementById('create-modal');
    if (modal) modal.remove();
};

window.closeCreateModal = closeCreateModal;

export const submitCreateCharacter = () => {
    const name    = document.getElementById('input-name').value.trim();
    const species = document.getElementById('input-species').value.trim();
    const gender  = document.getElementById('input-gender').value;
    const status  = document.getElementById('input-status').value;
    const image   = document.getElementById('input-image').value.trim();

    if (!name || !species || !gender || !status) {
        alert('Por favor completa todos los campos obligatorios.');
        return;
    }

    addCharacter({ name, species, gender, status, image });
    closeCreateModal();

    // Re-renderizar las tarjetas
    const allCharacters    = getCharactersCopy();
    const deletedIds       = getDeletedCharactersCopy();
    const editedCharacters = getEditedCharactersCopy();

    const visibleCharacters = allCharacters
        .filter(c => !deletedIds.includes(c.id))
        .map(c => {
            const localEdits = editedCharacters[c.id];
            return localEdits ? { ...c, ...localEdits } : c;
        });

    document.getElementById('characters-container').innerHTML =
        visibleCharacters.map(c => createCharacterCard(c)).join('');
};

window.submitCreateCharacter = submitCreateCharacter;