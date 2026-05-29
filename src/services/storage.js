//local storage
// VALORES FIJOS NO MODIFICAR
const KEYS = {
    localCharacters: "created_characters", // Key for storing created characters/ficticious in local storage.
    editedCharacters: "edited_characters",// Key for storing edited characters in local storage.
    deletedCharacters: "deleted_characters" // Key for storing deleted characters in local storage by id.
}
export const saveLocalCharacters = (character) => {
    localStorage.setItem(KEYS.localCharacters, JSON.stringify(character));
};

export const saveEditedCharacters = (character) => {
    localStorage.setItem(KEYS.editedCharacters, JSON.stringify(character));
}
export const saveDeletedCharacters = (id) => {
    localStorage.setItem(KEYS.deletedCharacters, JSON.stringify(id));
};


export const loadLocalCharacters  = ()=> {
    const charactersFromStorage = localStorage.getItem(KEYS.localCharacters); 
    return JSON.parse(charactersFromStorage) || []; // Return an empty array if there are no characters in local storage
}

export const loadEditedCharacters = () => {
    const editedCharactersFromStorage = localStorage.getItem(KEYS.editedCharacters);
    if (editedCharactersFromStorage === null) {
        return {}; // Return an empty object if there are no edited characters in local storage
    }
    return JSON.parse(editedCharactersFromStorage) ; 
}

export const loadDeletedCharacters = () => {
    const deletedCharactersFromStorage = localStorage.getItem(KEYS.deletedCharacters);
    return JSON.parse(deletedCharactersFromStorage) || []; // Return an empty array if there are no deleted characters in local storage
    // another way to do it (in loadEditedCharacters we return an empty object because we want to store the edited characters with if and return.):
}