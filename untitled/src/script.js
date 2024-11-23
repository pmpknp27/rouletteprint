let participants = [];

function addPerson() {
    const codename = document.getElementById('codename').value.trim();
    const wishlist = document.getElementById('wishlist').value.trim();

    if (codename && wishlist) {
        participants.push({ codename, wishlist });
        updateList();
    }

    // Clear the input fields
    document.getElementById('codename').value = '';
    document.getElementById('wishlist').value = '';
}

function updateList() {
    const personList = document.getElementById('person-list');
    personList.innerHTML = ''; // Clear the existing list

    participants.forEach((person, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${person.codename} - Wishlist: ${person.wishlist}`;
        listItem.setAttribute('data-index', index);
        personList.appendChild(listItem);
    });

    updateRoulette();
}

function updateRoulette() {
    const roulette = document.getElementById('roulette');
    roulette.innerHTML = '';

    participants.forEach(person => {
        const div = document.createElement('div');
        div.textContent = person.codename;
        roulette.appendChild(div);
    });
}

function spinRoulette() {
    const rouletteDivs = document.getElementById('roulette').children;
    const randomIndex = Math.floor(Math.random() * rouletteDivs.length);
    const chosenPerson = participants[randomIndex];

    // Display the chosen codename
    document.getElementById('chosen-codename').textContent = chosenPerson.codename;

    // Mark the chosen person as "crossed out" in the list and in the roulette
    const chosenIndex = participants.findIndex(p => p.codename === chosenPerson.codename);
    participants[chosenIndex].crossedOut = true;

    // Update the list UI to cross out the name
    const personListItems = document.getElementById('person-list').children;
    personListItems[chosenIndex].classList.add('crossed-out');

    // Update the roulette UI to cross out the name
    rouletteDivs[randomIndex].classList.add('crossed-out');
}
