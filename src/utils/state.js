import { getCharacters, getEpisodes, getLocations } from "../services/api";
import {saveLocalCharacters, saveDeletedCharacters, saveEditedCharacters , loadLocalCharacters,
     loadDeletedCharacters, loadEditedCharacters} from "../services/storage";

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

export const setCharacters = (data) => {
    characters = data;
    saveLocalCharacters(characters);
}

export const setDeletedCharacters 

export const addCharacter = (newCharacter) => {

}

export const editCharacter