import './style.css'
const rickApi = "https://rickandmortyapi.com/api"

// Fetch data from API
const getCharacters = async (url)=> {
  const response = await fetch(`${url}/character`); // Fetch characters from API
  const characters = await response.json();
    if (characters.error) {
    console.error("Error fetching characters:", characters.error);
    return;
  }
  else {     
    console.log("Characters fetched successfully");
    console.log(characters);
  }
}
const getEpisodes = async (url)=> {
  const response = await fetch(`${url}/episode`); // Fetch episodes from API
  const episodes = await response.json();
  if (episodes.error) {    
    console.error("Error fetching episodes:", episodes.error);
    return;
  }
  else {
    console.log("Episodes fetched successfully");
    console.log(episodes);
  }
}

const getLocations = async (url)=> {
  const response = await fetch(`${url}/location`);// Fetch locations from API
  const locations = await response.json();
  if (locations.error) {    
    console.error("Error fetching locations:", locations.error);
    return;
  }
  else {
    console.log("Locations fetched successfully");
    console.log(locations);
  }
  
}

getCharacters(rickApi);
getEpisodes(rickApi);
getLocations(rickApi);

document.querySelector('#app').innerHTML = `
`