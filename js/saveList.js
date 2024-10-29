import { getLocalStorage } from "./utilities.mjs";

function deadventurerTemplate(adventurer) {
    const itemRarity = ["Common", "Uncommon", "Rare", "Very Rare", "Legendary"]
    let template = `<li class="adventurer-card">
                        <h3 class="adventurer-name">${adventurer.name}</h3>
                        <section class="adventurer-background section-field">
                            <span class="section-label">History</span>
                                <p class="adventurer-info class">${adventurer.history.class.name} - ${adventurer.history.subclass.name}</p>
                                <p class="adventurer-info race">${adventurer.history.race}</p>
                                <p class="adventurer-info background">${adventurer.history.background.name}</p>
                            </section>
                        <section class="adventurer-loot section-field">
                            <span class="section-label">Loot</span>
                            <ul class="loot-list">
                            `;

    adventurer.loot.forEach(item => {
        template += `<li class="loot-item">
                        <span class="adventurer-info loot-span">${item.name} - ${itemRarity[item.rarity]}</span>
                    </li>
                    `;
    });

    template += `</ul>
                </section>
                <section class="adventurer-death section-field">
                    <span class="section-label">Death</span>
                    <p class="adventurer-info">Killed By: </p>
                    <p class="adventurer-info monster-name">${adventurer.killer.name}</p>
                    <span class="adventurer-info monster-level">${adventurer.killer.cr}</span>
                </section>
                <section class="adventurer-buttons">
                    <button class="adventurer-details">Details</button>
                    <button class="adventurer-delete">X</button>
                </section>
                </li>`;

    return template;
}

document.addEventListener('DOMContentLoaded', () => {
    const deadventurers = getLocalStorage("deadventurers");
    let deadventurerList = ``;
    
    deadventurers.forEach(deadventurer => {
        deadventurerList += deadventurerTemplate(deadventurer);
        const listSpace = document.querySelector('.adventurers-list');
        listSpace.innerHTML = deadventurerList;
    });
})
