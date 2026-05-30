import { getCharacters, getEpisodes, getLocations } from "../services/api.js";
import {saveLocalCharacters, saveDeletedCharacters, saveEditedCharacters , loadLocalCharacters,
     loadDeletedCharacters, loadEditedCharacters} from "../services/storage.js";

let characters = [];
let deletedCharacters = [];
let editedCharacters = {};

export const getCharactersCopy = () => {
    return [...characters];
}

export const getDeletedCharactersCopy = () => {
    return [...deletedCharacters];
}

export const getEditedCharactersCopy = () => {
    return {...editedCharacters};
}

export const getCharacterById = (id) => {
    const character = characters.find(character => character.id === id);
    if (character === undefined) {
        return null;
    }
    return character;
}
//Setters
//Recives a n array of characters and keeps it in memorie (inicial load)
export const setCharacters = (data) => {
    characters = data;
    saveLocalCharacters(characters);
}
// Appends a new id to the array of deleted characters (new array with the new id)
export const setDeletedCharacters = (id) => {
    deletedCharacters = [...deletedCharacters, id];
    saveDeletedCharacters(deletedCharacters);
}
// Adds a new character with the id and isLocal. 
export const addCharacter = (newCharacter) => {
    const character = {
        ...newCharacter,
        id: "local-" + Date.now(), // Generate a unique id for the local character
        isLocal: true,
    };
    characters = [...characters, character];
    saveLocalCharacters(characters);

}
// modifies a character with the id and the new data. If the character is local, it modifies the character in the array of characters. 
// If the character is not local, it adds the character to the array of edited characters with the id as key and the new data as value.
export const editCharacter = (id, changes) => {
    characters = characters.map((currentCharacter) => {
        if (currentCharacter.id === id) {
            const editedCharacter = {
                ...currentCharacter,
                ...changes,
                isEdited: true
            };
            return editedCharacter;
        } else {
            return currentCharacter; // if the character is not the one we want to edit, 
            // we return it without changes
        }
})
    saveEditedCharacters(editedCharacters);
}

export const loadInicialData = async () => {
    //We ask the API for the characters, episodes and locations and we save them in memory. We also save them in local storage to persist the data.
    const apiCharacters = await getCharacters();
    const localCharacters = loadLocalCharacters();
    const deletedC = loadDeletedCharacters();
    const editedC = loadEditedCharacters();
    characters = [...apiCharacters, ...localCharacters];

    editedCharacters = editedC ;
    deletedCharacters = deletedC;

}