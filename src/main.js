import './style.css'
// import router function
import {router} from './router/router.js';


// window event listeners for DOMContentLoaded and popstate to call the router function
window.addEventListener("DOMContentLoaded", router);

window.addEventListener("popstate", router);