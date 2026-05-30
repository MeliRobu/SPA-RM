import { getCharactersCopy, editCharacter } from '../utils/state.js';
import { renderCharacters } from './characters.js';

export const editCharacterModal = (id) => {
    const allCharacters = getCharactersCopy();
    const character = allCharacters.find(c => String(c.id) === String(id));
    if (!character) return;

    const modal = document.createElement('div');
    modal.id = 'edit-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeEditModal()"></div>
        <div class="modal-content">
            <h2>Editar personaje</h2>
            <input type="text" id="edit-name" placeholder="Nombre" value="${character.name}" />
            <input type="text" id="edit-species" placeholder="Especie" value="${character.species}" />
            <select id="edit-status">
                <option value="Alive"   ${character.status === 'Alive'   ? 'selected' : ''}>Alive</option>
                <option value="Dead"    ${character.status === 'Dead'    ? 'selected' : ''}>Dead</option>
                <option value="unknown" ${character.status === 'unknown' ? 'selected' : ''}>Unknown</option>
            </select>
            <div class="modal-buttons">
                <button onclick="closeEditModal()">Cancelar</button>
                <button onclick="submitEditCharacter('${id}')">Guardar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

export const closeEditModal = () => {
    const modal = document.getElementById('edit-modal');
    if (modal) modal.remove();
};

export const submitEditCharacter = (id) => {
    const name    = document.getElementById('edit-name').value.trim();
    const species = document.getElementById('edit-species').value.trim();
    const status  = document.getElementById('edit-status').value;

    if (!name || !species || !status) {
        alert('Por favor completa todos los campos.');
        return;
    }

    editCharacter(id, { name, species, status });
    closeEditModal();
    renderCharacters();
};

// Exponer al scope global para los onclick del HTML
window.closeEditModal      = closeEditModal;
window.submitEditCharacter = submitEditCharacter;