import { getLocalStorage, deleteAdventurer } from "./utilities.mjs";
import { deadventurerDetailTemplate } from "./adventurerDisplay.mjs";


document.addEventListener('DOMContentLoaded', () => {
    const deadventurers = getLocalStorage("deadventurers");
    const urlParams = new URLSearchParams(window.location.search);
    const detailId = urlParams.get("id");
    
    const deadventurer = deadventurers.filter(adventurer => {return adventurer.id == parseInt(detailId)});
    const adventurerHtml = deadventurerDetailTemplate(deadventurer[0]);
    const detailSpace = document.querySelector('.adventurer-detail');
    detailSpace.innerHTML = adventurerHtml;

    detailSpace.addEventListener('click', (event) => {
        const adventurerId = parseInt(event.target.parentElement.parentElement.id);
        if (event.target.classList.contains('adventurer-delete')) {
            if (confirm("Are you sure you would like to delete this character forever?")) {
                deleteAdventurer(adventurerId);
                window.location.assign(`./index.html`);
            }
        }
    });
})
