import { getLocalStorage, deleteAdventurer } from "./utilities.mjs";
import { deadventurerTemplate } from "./adventurerDisplay.mjs";


document.addEventListener('DOMContentLoaded', () => {
    const deadventurers = getLocalStorage("deadventurers");
    let deadventurerList = ``;
    
    const listSpace = document.querySelector('.adventurers-list');
    deadventurers.forEach(deadventurer => {
        deadventurerList += deadventurerTemplate(deadventurer);
        listSpace.innerHTML = deadventurerList;
    });

    listSpace.addEventListener('click', (event) => {
        const adventurerId = parseInt(event.target.parentElement.parentElement.id);
        if (event.target.classList.contains('adventurer-delete')) {
            if (confirm("Are you sure you would like to delete this character forever?")) {
                deleteAdventurer(adventurerId);
                location.reload();
            }
        } else if (event.target.classList.contains('adventurer-details')) {
            window.location.assign(`./detail.html?id=${adventurerId}`);
        }
    })
})
