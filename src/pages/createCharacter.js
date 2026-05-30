import { addCharacter } from '../utils/state.js';
import { renderCharacters } from './characters.js';

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
            <input type="text" id="input-image" placeholder="URL de imagen (opcional)" />
            <div class="modal-buttons">
                <button onclick="closeCreateModal()">Cancelar</button>
                <button onclick="submitCreateCharacter()">Guardar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

export const closeCreateModal = () => {
    const modal = document.getElementById('create-modal');
    if (modal) modal.remove();
};

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
    renderCharacters();
};

// Exponer al scope global para los onclick del HTML
window.closeCreateModal      = closeCreateModal;
window.submitCreateCharacter = submitCreateCharacter;