const itemRarity = ["Common", "Uncommon", "Rare", "Very Rare", "Legendary"] 

export function deadventurerTemplate(adventurer) {
    let template = `<li class="adventurer-card" id="${adventurer.id}">
                        <h3 class="adventurer-name">${adventurer.name}</h3>
                        <section class="adventurer-background section-field">
                            <span class="section-label">History</span>
                                <p class="adventurer-info class">${adventurer.history.charClass.name} - ${adventurer.history.charSubclass.name}</p>
                                <span class="adventurer-info race">${adventurer.history.charRace.name}</span>
                                <span class="adventurer-info background">${adventurer.history.charBackground.name}</span>
                            </section>
                        <section class="adventurer-loot section-field">
                            <span class="section-label">Loot</span>
                            <ul class="loot-list">
                            `;

    adventurer.loot.forEach(item => {
        template += `<li class="loot-item">
                        <p class="adventurer-info loot-span">${item.name} - ${itemRarity[item.rarity]}</p>
                    </li>
                    `;
    });

    template += `</ul>
                </section>
                <section class="adventurer-death section-field">
                    <span class="section-label">Death</span>
                    <p class="adventurer-info">Killed By: </p>
                    <span class="adventurer-info monster-name">${adventurer.killer.name}, CR</span>
                    <span class="adventurer-info monster-level">${adventurer.killer.cr}</span>
                </section>
                <section class="adventurer-buttons">
                    <button class="adventurer-details">Details</button>
                    <button class="adventurer-delete">Delete</button>
                </section>
                </li>`;
    
    return template;
}

export function deadventurerDetailTemplate(adventurer) {  
    let template = `<li class="adventurer-card" id="${adventurer.id}">
                        <h3 class="adventurer-name">${adventurer.name}</h3>
                        <section class="adventurer-background section-field">
                            <span class="section-label">History</span>
                                <p class="adventurer-info class">${adventurer.history.charClass.name} - ${adventurer.history.charSubclass.name}</p>
                                <span class="adventurer-info race">${adventurer.history.charRace.name}</span>
                                <span class="adventurer-info background">${adventurer.history.charBackground.name}</span>
                            </section>
                        <section class="adventurer-loot section-field">
                            <span class="section-label">Loot</span>
                            <ul class="loot-list">
                            `;

    adventurer.loot.forEach(item => {
        template += `<li class="loot-item">
                        <p class="adventurer-info loot-span">${item.name} - ${itemRarity[item.rarity]}</p>
                    </li>
                    `;
    });

    template += `</ul>
                </section>
                <section class="adventurer-death section-field">
                    <span class="section-label">Death</span>
                    <p class="adventurer-info">Killed By: </p>
                    <span class="adventurer-info monster-name">${adventurer.killer.name}, CR</span>
                    <span class="adventurer-info monster-level">${adventurer.killer.cr}</span>
                </section>
                <section class="adventurer-buttons">
                    <button class="adventurer-delete">Delete</button>
                </section>
                </li>`;

    return template;
}