import { setDeletedCharacters } from '../utils/state.js';

// ── Elimina un personaje del DOM con confirmación previa ──────────────────────
// Recibe el id del personaje a eliminar
// No recarga la página — actualiza el DOM directamente
export const deleteCharacter = (id) => {
    // Pedir confirmación antes de eliminar
    const confirmed = confirm('¿Seguro que quieres eliminar este personaje?');
    if (!confirmed) return;

    // Guardar el id en el estado y en localStorage
    setDeletedCharacters(id);

    // Eliminar la tarjeta del DOM directamente sin re-renderizar todo
    const card = document.querySelector(`.character-card[data-id="${id}"]`);
    if (card) card.remove();
};