import { loadPartial } from "./utilities.mjs";

document.addEventListener("DOMContentLoaded", async () => {
    await loadPartial("/public/partials/header.html", "header");
    
    /* Potential hamburger if sitenav grows unwieldy: 
    const menuButton = document.getElementById('menubtn');
    menuButton.addEventListener('click', menuClick); */

    loadPartial("/public/partials/footer.html", "footer");
});