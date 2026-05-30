// import router function
import {router} from './router/router.js';
import {loadInicialData}  from './utils/state.js';


// window event listeners for DOMContentLoaded and popstate to call the router function
window.addEventListener("DOMContentLoaded", async () => {
    await loadInicialData();
    router();
});

window.addEventListener("popstate", router);