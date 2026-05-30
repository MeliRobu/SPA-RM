import { navigateTo } from '../router/router.js';
import { loadInicialData, getCharactersCopy, getDeletedCharactersCopy, getEditedCharactersCopy } from '../utils/state.js';
import { openCreateModal } from './createCharacter.js';
import { deleteCharacter } from './delete.js';
import { editCharacterModal } from './editCharacter.js';

// ── Exponer funciones al scope global para los onclick del HTML ────────────────
window.openCreateModal    = openCreateModal;
window.deleteCharacter    = deleteCharacter;
window.editCharacterModal = editCharacterModal;

// ── Paginación para scroll infinito ───────────────────────────────────────────
let currentPage = 0;
const PAGE_SIZE = 4; // Cantidad de tarjetas que se cargan por scroll

// ── Página principal de personajes ────────────────────────────────────────────
export const charactersPage = async (app) => {

    app.innerHTML = `
        <header>
            <h1>Characters</h1>
            <nav>
                <a href="/" onclick="event.preventDefault(); navigateTo('/')">Home</a>
                <a href="/episodes" onclick="event.preventDefault(); navigateTo('/episodes')">Episodes</a>
                <a href="/locations" onclick="event.preventDefault(); navigateTo('/locations')">Locations</a>
                <button onclick="openCreateModal()">+ Crear personaje</button>
            </nav>
        </header>
        <p id="loading-msg">Cargando personajes...</p>
        <div id="characters-container"></div>
    `;

    await loadInicialData();

    renderCharacters();
};

// ── Renderiza las tarjetas visibles con scroll infinito ────────────────────────
// Se exporta para que createCharacter.js y editCharacter.js puedan re-renderizar
export const renderCharacters = () => {
    currentPage = 0; // Reiniciar página al re-renderizar

    const container  = document.getElementById('characters-container');
    const loadingMsg = document.getElementById("loading-msg");
    if (loadingMsg) loadingMsg.remove();

    container.innerHTML = '';

    // Eliminar centinela anterior si existe
    const oldSentinel = document.getElementById('scroll-sentinel');
    if (oldSentinel) oldSentinel.remove();

    loadMoreCharacters();
    setupInfiniteScroll();
};

// ── Carga el siguiente grupo de PAGE_SIZE personajes ──────────────────────────
const loadMoreCharacters = () => {
    const allCharacters    = getCharactersCopy();
    const deletedIds       = getDeletedCharactersCopy();
    const editedCharacters = getEditedCharactersCopy();

    // Filtrar eliminados y aplicar ediciones locales
    const visibleCharacters = allCharacters
        .filter(c => !deletedIds.includes(c.id))
        .map(c => {
            const localEdits = editedCharacters[c.id];
            return localEdits ? { ...c, ...localEdits } : c;
        });

    const start = currentPage * PAGE_SIZE;
    const end   = start + PAGE_SIZE;
    const chunk = visibleCharacters.slice(start, end);

    if (chunk.length === 0) return; // No hay más personajes que mostrar

    const container = document.getElementById('characters-container');
    chunk.forEach(character => {
        container.innerHTML += createCharacterCard(character);
    });

    currentPage++;
};

// ── Observa el final del contenedor para cargar más personajes ─────────────────
let observer = null;
const setupInfiniteScroll = () => {
    if (observer) observer.disconnect();

    // Crear centinela fuera del grid para no afectar el layout
    let sentinel = document.getElementById('scroll-sentinel');
    if (!sentinel) {
        sentinel = document.createElement('div');
        sentinel.id = 'scroll-sentinel';
        sentinel.style.height = '10px';
        const container = document.getElementById('characters-container');
        container.insertAdjacentElement('afterend', sentinel);
    }

    // Cuando el centinela sea visible en pantalla, cargar más personajes
    observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            loadMoreCharacters();
        }
    });

    observer.observe(sentinel);
};

// ── Genera el HTML de una tarjeta ─────────────────────────────────────────────
// Se exporta para que editCharacter.js pueda reutilizarla
export const createCharacterCard = (character) => {
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
                <div class="card-buttons">
                    <button onclick="editCharacterModal('${character.id}')">Editar</button>
                    <button onclick="deleteCharacter('${character.id}')">Eliminar</button>
                </div>
            </div>
        </div>
    `;
};

// ── Color del indicador según estado del personaje ────────────────────────────
const getStatusColor = (status) => {
    const colors = {
        "Alive":   "#55cc44",
        "Dead":    "#d63d2e",
        "unknown": "#9e9e9e",
    };
    return colors[status] ?? "#9e9e9e";
};