// Import API data

// API base URL
const rickApi = "https://rickandmortyapi.com/api"

// Fetch data from API using the provided endpoint, this is a general function that can be used to fetch characters, episodes, or locations
const apiFetch = async (extention)=> {
  const response = await fetch(`${rickApi}${extention}`); // Fetch endpoint from API
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json(); 
  return data;
}
// Functions to fetch specific data from the API, they call the general apiFetch function with the appropriate endpoint
// Exported functions to be used in other parts of the application, they return only the results array from the API response for easier handling in the UI components
export const getCharacters = async ()=> {
  const characters = await apiFetch("/character"); // Fetch characters from API
  return characters.results;// Return only the results array from the API response
}

export const getEpisodes = async ()=> {
  const episodes = await apiFetch("/episode"); // Fetch episodes from API
  return episodes.results; // Return only the results array from the API response
}

export const getLocations = async ()=> {
  const locations = await apiFetch("/location"); // Fetch locations from API
  return locations.results; // Return only the results array from the API response
}
