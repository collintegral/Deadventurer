import { Deadventurer, setLocalStorage, getLocalStorage } from "./utilities.mjs";

const apiUrls = {
    class: "https://api.open5e.com/v1/classes/?format=json"
    , race: "https://api.open5e.com/v2/races/?format=json"
    , background: "https://api.open5e.com/v2/backgrounds/?format=json"
    , item: "https://api.open5e.com/v1/magicitems/?format=json"
    , monster: "https://api.open5e.com/v1/monsters/?format=json"
};

const monsterCount = 3207;
const itemCount = 1618;
const averageQuality = 15;
const itemRarity = ["Common", "Uncommon", "Rare", "Very Rare", "Legendary"]
const crOptions = [0, .125, .25, .5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 30];

async function convertToJson(res) {
    let jsonResponse = await res.json();
    if (res.ok) {
      return jsonResponse;
    } else {
      throw { name: 'ServicesError', message: jsonResponse};
    }
}

async function getData(url) {
    const response = await fetch(url);
    const data = await convertToJson(response);
    return data.results;
}

async function getAllData() {
    let apiValues = {};
    for (const [key, url] of Object.entries(apiUrls)) {
        
        apiValues[key] = await getData(url);
        if (key == "monster") {
            let randomMonsterPage = Math.floor(Math.random() * monsterCount);
            if (randomMonsterPage > 50) {
                apiValues[key] = await getData(`${url}&page=${Math.floor(randomMonsterPage / 50)}`);
            }
        }
        if (key == "item") {
            let randomItemPage = Math.floor(Math.random() * itemCount);
            if (randomItemPage > 50) {
                apiValues[key] = await getData(`${url}&page=${Math.floor(randomItemPage / 50)}`);
            }
        }
    }
    return apiValues;
}

function populateSelect(optionList, selectPointer, named = false) {
    optionList.forEach(elem => {
        let newEntry = document.createElement('option');
        if (named) {
            newEntry.value = elem.name;
            newEntry.textContent = elem.name;
        }
        else {
            newEntry.value = elem;
            newEntry.textContent = elem;
        }
        selectPointer.appendChild(newEntry);
    });
}

export default class apiWork {
    constructor() {
        this.classes = null;
        this.races = null;
        this.mainRaces = [];
        this.subRaces = [];
        this.backgrounds = null;
        this.items = null;
        this.monsters = null;
    }
    
    async init(classList, raceList, crList, createForm) {
        const apiValues = await getAllData();
        
        this.classes = apiValues.class;
        this.races = apiValues.race;
        this.backgrounds = apiValues.background;
        this.items = apiValues.item;
        this.monsters = apiValues.monster;

        this.races.forEach(race => {
            if (race.is_subrace) {
                this.subRaces.push(race);
            }
            else {
                this.mainRaces.push(race);
            }
        });
        this.populateForm(classList, raceList, crList);

        const loadForm = document.querySelector('.loadForm');
        loadForm.classList.toggle('hide');
        createForm.classList.toggle('hide');
    }

    async populateForm(classList, raceList, crList) {
        populateSelect(this.classes, classList, true);
        populateSelect(this.mainRaces, raceList, true);
        populateSelect(crOptions, crList);
    }

    async newAdventurer(charObject) {
        let deadventurerList = getLocalStorage("deadventurers") || [];

        let charId = 0;
        if (deadventurerList.length > 0) {
            charId = await deadventurerList.at(-1).id + 1
        }

        let charLoot = [];

        let charName = "";
        if (charObject.name == "") {
            charName = "Unnamed Corpse";
        }
        else {
            charName = charObject.name;
        }

        let randomClass = "";
        if (charObject.class == "") {
            randomClass = this.classes[Math.floor(Math.random() * this.classes.length)];
        }
        else {
            randomClass = this.classes.filter(entry => {return entry.name == charObject.class})[0];
        }
        const randomSubclass = randomClass.archetypes[Math.floor(Math.random() * randomClass.archetypes.length)];
        const charClass = {"name": randomClass.name, "desc": randomClass.desc};
        const charSubclass = {"name": randomSubclass.name, "desc": randomSubclass.desc};

        let monster = "";
        if (charObject.cr == "") {
            charObject.cr = crOptions[Math.floor(Math.random() * crOptions.length)];
            const monsterCRList = this.monsters.filter((monster) => monster.cr == charObject.cr);
            monster = monsterCRList[Math.floor(Math.random() * monsterCRList.length)];
        }
        else {
            monster = this.monsters[Math.floor(Math.random() * 50)];
        }
        if (monster === undefined) {
            monster = this.monsters[0];
        }

        let randomRace = "";
        if (charObject.race == "") {
            randomRace = this.mainRaces[Math.floor(Math.random() * this.mainRaces.length)];
        }
        else {
            randomRace = this.mainRaces.filter(entry => {return entry.name == charObject.race})[0];
        }
        const charRace = {"name": randomRace.name, "desc": randomRace.desc};

        const randomBackground = this.backgrounds[Math.floor(Math.random() * this.backgrounds.length)];
        const charBackground = {"name": randomBackground.name, "desc": randomBackground.desc};

        const charHistory = {charClass, charSubclass, charRace, charBackground};   
        const charKiller = {"name": monster.name, "cr": monster.cr};

        let lootCount = 0;
        if (isNaN(charObject.loot_count)) {
            lootCount = Math.floor(Math.random() * 7);
        }
        else {
            lootCount = charObject.loot_count
        }

        for (let x = 0; x < lootCount; x++) {
            let rarity = Math.floor((Math.random() * (parseInt(charObject.loot_quality) + averageQuality)) / 10);
            if (rarity > 4) {rarity = 4;}

            const itemRarityList = this.items.filter((item) => item.rarity == itemRarity[rarity]);
            const item = itemRarityList[Math.floor(Math.random() * itemRarityList.length)];
            charLoot.push({"name": item.name, "rarity": rarity});
        }
        
        const newDead = new Deadventurer(charId, charName, charHistory, charKiller, charLoot);
        deadventurerList.push(newDead);
       
        setLocalStorage("deadventurers", deadventurerList);

        return charId;
    }
}
