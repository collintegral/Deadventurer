export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export async function loadPartial(path, element) {
    let elementTemplate = await fetch(path);
  if (!elementTemplate.ok) {
      console.error(`Error ${elementTemplate.status}: Could not find ${path}`);
      return;
  }
    let elementTemplateText = await elementTemplate.text();
    let elementLoc = document.getElementById(element);
  
    renderTemplate(elementTemplateText, elementLoc);
}

export function renderTemplate(templateFn, parentElement, callback) {  
    parentElement.insertAdjacentHTML("afterbegin", templateFn);

  if (callback)
  {
    callback();
  }
}

/* Potential hamburger if sitenav grows unwieldy:
export function menuClick() {
    const siteNav = document.getElementById('sitenav');
    const menuIcon = document.querySelector('.menuIcon');
    const closeIcon = document.querySelector('.closeIcon');

    siteNav.classList.toggle('hide');
    menuIcon.classList.toggle('hide');
    closeIcon.classList.toggle('hide');
}
*/

export class Deadventurer {
  constructor(id, name, history, killer, loot) {
    this.id = id;
    this.name = name;
    this.history = history;
    this.loot = loot;
    this.killer = killer;
    this.notes = "";
  }
}

export function deleteAdventurer(charId) {
  const deadventurers = getLocalStorage('deadventurers');
  const newDeadList = deadventurers.filter(deadventurer => {return !(deadventurer.id == charId)});
  setLocalStorage("deadventurers", newDeadList);
}