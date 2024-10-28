import { Deadventurer } from "./utilities.mjs";

const apiUrls = {
    class: "https://api.open5e.com/v1/classes/?format=json"
    , race: "https://api.open5e.com/v2/races/?format=json"
    , background: "https://api.open5e.com/v2/backgrounds/?format=json"
    , item: "https://api.open5e.com/v1/magicitems/?format=json"
    , monster: "https://api.open5e.com/v1/monsters/?format=json"
};

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

function populateSelect(optionList, selectPointer, named = false) {
    optionList.forEach(elem => {
        let newEntry = document.createElement('option');
        if (named) {
            newEntry.value = elem.name;
            newEntry.innerHtml = elem.name;
        }
        else {
            newEntry.value = elem;
            newEntry.innerHtml = elem;
        }
        selectPointer.insertAdjacentHTML("afterBegin", newEntry);
    });
}

export default class apiWork {
    constructor() {
        this.classes = getData(apiUrls.class);
        this.races = getData(apiUrls.race);
        this.mainRaces = [];
        this.subRaces = [];
        this.backgrounds = getData(apiUrls.background);
        this.items = getData(apiUrls.item);

        races.array.forEach(race => {
            if (race.is_subrace) {
                this.subRaces.push(race);
            }
            else {
                this.mainRaces.push(race);
            }
        });
    }
    
    async populateForm(classList, raceList, crList) {
        populateSelect(this.classes, classList, true);
        populateSelect(this.mainRaces, raceList, true);
        populateSelect(crOptions, crList);
    }

    async newAdventurer(charId, charName, charClass, charRace, ) {
        
        

        /*{
            class: {
              name: charClass.name
              , desc: charClass.desc
            }
            , subclass: {
              name: charSubclass.name
              , desc: charSubclass.desc
            }
            , race: {
              name: charRace.name
              , desc: charRace.desc
            }
            , background: {
              name: charBackground.name
            }
          };*/
        const newDead = new Deadventurer(charId, charName, charHistory, charLoot);
    }
}
