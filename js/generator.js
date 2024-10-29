import apiWork from "./apiWork.mjs";

const formBack = new apiWork;

const createForm = document.getElementById('generate-form');
const classList = document.getElementById('class-list');
const raceList = document.getElementById('race-list');
const crList = document.getElementById('cr-list');

formBack.init(classList, raceList, crList, createForm);

createForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formInfo = new FormData(createForm);
    let formJson = {};
    formInfo.forEach((value, key) => {
        formJson[key] = value;
    })
    const newId = await formBack.newAdventurer(formJson);
    window.location.assign(`./detail.html?id=${newId}`);
});