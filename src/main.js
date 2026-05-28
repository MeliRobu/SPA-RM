import './style.css'

const characterUrl = "https://rickandmortyapi.com/api/character"
const locationsUrl = "https://rickandmortyapi.com/api/location"
const episodesUrl = "https://rickandmortyapi.com/api/episode"

const rickApi = "https://rickandmortyapi.com/api"

const getCharacters = async (url)=> {
  const response = await fetch(`${url}/character`);
  const characters = await response.json();
  console.log(characters);

}
getCharacters(rickApi);

document.querySelector('#app').innerHTML = `
`