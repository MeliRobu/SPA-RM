import { getCharacters } from "../services/api.js";
import {
    saveLocalCharacters,
    saveDeletedCharacters,
    saveEditedCharacters,
    loadLocalCharacters,
    loadDeletedCharacters,
    loadEditedCharacters
} from "../services/storage.js";

// ── Variables de estado en memoria ────────────────────────────────────────────
let characters        = []; // Personajes de la API + personajes locales creados por el usuario
let deletedCharacters = []; // IDs de personajes eliminados por el usuario
let editedCharacters  = {}; // Ediciones del usuario { [id]: { name, species, status } }

// ── Getters — devuelven copias para no mutar el estado directamente ────────────
export const getCharactersCopy = () => {
    return [...characters];
};

export const getDeletedCharactersCopy = () => {
    return [...deletedCharacters];
};

export const getEditedCharactersCopy = () => {
    return { ...editedCharacters };
};

export const getCharacterById = (id) => {
    const character = characters.find(c => String(c.id) === String(id));
    return character ?? null;
};

// ── Setters ───────────────────────────────────────────────────────────────────

// Recibe un array de personajes y lo guarda en memoria (carga inicial)
export const setCharacters = (data) => {
    characters = data;
    saveLocalCharacters(characters);
};

// Agrega un id al array de personajes eliminados
export const setDeletedCharacters = (id) => {
    deletedCharacters = [...deletedCharacters, id];
    saveDeletedCharacters(deletedCharacters);
};

// Agrega un nuevo personaje local con id único y campos requeridos
export const addCharacter = (newCharacter) => {
    const character = {
        ...newCharacter,
        id: "local-" + Date.now(), // ID único para personajes locales
        isLocal: true,
        // Campos requeridos por createCharacterCard que la API siempre trae
        image:    newCharacter.image || "https://rickandmortyapi.com/api/character/avatar/19.jpeg",
        origin:   { name: "Local" },
        location: { name: "Local" },
    };

    characters = [...characters, character];

    // Guardar solo los personajes locales en localStorage (no mezclar con los de la API)
    const localOnly = characters.filter(c => c.isLocal);
    saveLocalCharacters(localOnly);
};

// Modifica un personaje existente sin tocar los datos originales de la API
export const editCharacter = (id, changes) => {
    characters = characters.map((currentCharacter) => {
        if (String(currentCharacter.id) === String(id)) {
            return {
                ...currentCharacter,
                ...changes,
                isEdited: true
            };
        }
        return currentCharacter; // Sin cambios si no es el personaje buscado
    });
    saveEditedCharacters(characters); // Persistir cambios en localStorage
};

// ── Carga inicial — trae personajes de la API y restaura estado local ──────────
export const loadInicialData = async () => {
    const apiCharacters   = await getCharacters();   // Personajes frescos de la API
    const localCharacters = loadLocalCharacters();   // Solo personajes creados por el usuario
    const deletedC        = loadDeletedCharacters(); // IDs eliminados por el usuario
    const editedC         = loadEditedCharacters();  // Ediciones del usuario

    // Combinar API + locales sin duplicar
    characters        = [...apiCharacters, ...localCharacters];
    editedCharacters  = editedC;
    deletedCharacters = deletedC;
};