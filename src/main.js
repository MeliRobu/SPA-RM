import './style.css'
const rickApi = "https://rickandmortyapi.com/api"


// Fetch data from API
const apiFetch = async (extention)=> {
  const response = await fetch(`${rickApi}${extention}`); // Fetch endpoint from API
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json(); 
  return data;
}
const getCharacters = async ()=> {
  const data = await apiFetch("/character"); // Fetch characters from API
  return data.results;
}

export const getEpisodes = async ()=> {
  const episodes = await apiFetch("/episode"); // Fetch episodes from API
  return episodes;
}

export const getLocations = async ()=> {
  const locations = await apiFetch("/location"); // Fetch locations from API
  return locations;
}

console.log(getCharacters());