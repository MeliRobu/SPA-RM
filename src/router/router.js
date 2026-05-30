// Router function
import {charactersPage} from "../pages/characters.js";// Import the characters page rendering function
import {episodesPage} from "../pages/episodes.js";// Import the episodes page rendering function
import {locationsPage} from "../pages/locations.js";// Import the locations page rendering function

const routes = {
    "/": charactersPage, // Define the route for the home page (characters)
    "/episodes": episodesPage, // Define the route for the episodes page
    "/locations": locationsPage, // Define the route for the locations page    
    "/characters" : charactersPage, // Define the route for the character detail page"
}


window.navigateTo = navigateTo; // Expose navigateTo to the global scope so it can be called from inline HTML onclick handlers


export const router = async() => {
    const app = document.querySelector("#app"); // Get the main app container
    
    const path = window.location.pathname; // Get the current path from the URL
    console.log({path});

    const page = routes[path]; // Get the corresponding page rendering function from the router object
    console.log(page);

    if (!page) {
        app.innerHTML = "<h1>404 Not Found</h1>"; // If the path does not match any route, display a 404 message
        return;
    }
    await page(app); // Call the page rendering function and pass the app container as an argument
};
export const navigateTo = (path) => {
    history.pushState({}, "", path); // Update the URL without reloading the page
    router();
}
