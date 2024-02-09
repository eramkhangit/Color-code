const form = document.querySelector('.form');
const nameField = document.getElementById("name")
const ageField = document.getElementById("age")
const rollNumberField = document.getElementById("roll-num")
const entriesContainer = document.querySelector(".entries-container");

// ++++++++++++++ functions ++++++++++++++ 
function resetForm() {
    nameField.value = "";
    ageField.value = "";
    rollNumberField.value = "";
}

function createEntry({ name, age, rollNumber, id }) {
    // Why use de-stracturing object ? Because when we submit user input it's create in object form So we recieve in object form
    const entryItem = `
    <article class="entry">
        <h4>Name: <span>${name}</span></h4>
        <h4>Age: <span>${age}</span></h4>
        <h4>Roll No.: <span>${rollNumber}</span></h4>
        <button class="delete-btn" data-id="${id}">Delete</button>
    </article>`
    return entryItem;
}


// +++++++++++ functions to handle localStorage ++++++++++++
function getLocalStorage() {
    return localStorage.getItem("details")
        ? JSON.parse(localStorage.getItem("details"))
        : []
}

function addToLocalStorage(entry) {
    const details = getLocalStorage();
    if(details) {
        details.push(entry);
        localStorage.setItem("details", JSON.stringify(details));
    }
}

function removeFromLocalStorage(id) {
    const details = getLocalStorage();
    const updatedDetails = details.filter(entry => entry.id !== Number(id))
    localStorage.setItem("details", JSON.stringify(updatedDetails));
}


// ++++++++++++++ Event listeners ++++++++++++++ 

// get data from the local storage and display them on the page when the page loads everytime
window.addEventListener('DOMContentLoaded', () => {
    const localStorageData = getLocalStorage();
    localStorageData.forEach(entry => {
        entriesContainer.innerHTML += createEntry(entry);
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newEntry = { //Is it important to create object ? [whatever we enter(main container) is go in created object keys ]
        name: nameField.value,
        age: ageField.value,
        rollNumber: rollNumberField.value,
        id: Date.now()
    }
    entriesContainer.innerHTML += createEntry(newEntry);
    addToLocalStorage(newEntry);
    resetForm();
})

entriesContainer.addEventListener('click', (e) => {
    const entryId = e.target.dataset.id;
    if (entryId) {
        const elementToRemove = e.target.parentElement;
        entriesContainer.removeChild(elementToRemove);
         removeFromLocalStorage(entryId);
    }
})