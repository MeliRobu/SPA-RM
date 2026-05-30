import { getCharacters } from "../services/api.js";
import {
    saveLocalCharacters,
    saveDeletedCharacters,
    saveEditedCharacters,
    loadLocalCharacters,
    loadDeletedCharacters,
    loadEditedCharacters
} from "../services/storage.js";

let characters = [];
let deletedCharacters = [];
let editedCharacters = {};

export const initState = async () => {
    const apiCharacters = await getCharacters();
    characters = apiCharacters;

    deletedCharacters = loadDeletedCharacters();
    editedCharacters  = loadEditedCharacters();
};

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
    const character = characters.find(character => character.id === id);
    return character ?? null;
};

export const setCharacters = (data) => {
    characters = data;
    saveLocalCharacters(characters);
};

export const setDeletedCharacters = (ids) => {
    deletedCharacters = ids;
    saveDeletedCharacters(deletedCharacters);
};

export const addCharacter = (newCharacter) => {
};

export const editCharacter = (id, changes) => {
};