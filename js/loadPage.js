import { loadPartial } from "./utilities.mjs";

document.addEventListener("DOMContentLoaded", async () => {
    await loadPartial("./partials/header.html", "header");
    
    /* Potential hamburger if sitenav grows unwieldy: 
    const menuButton = document.getElementById('menubtn');
    menuButton.addEventListener('click', menuClick); */

    loadPartial("./partials/footer.html", "footer");
});