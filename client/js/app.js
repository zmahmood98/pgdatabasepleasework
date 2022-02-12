// ********************************************
// SETUP
const btn = document.querySelector('#msg-btn');
const form = document.querySelector('#new-slime-form');
const slimesList = document.querySelector('table');

// Bind event listeners
btn.addEventListener('click', getMessage);
form.addEventListener('submit', submitSlime);

// Fetch all slimes as soon as app is loaded
getAllSlimes();

// ********************************************

// SLIMES FLOW
// index
function getAllSlimes(){
    fetch('http://localhost:3000/slimes')
        .then(r => r.json())
        .then(appendSlimes)
        .catch(console.warn)
};

// create
function submitSlime(e){
    e.preventDefault();

    const slimeData = {
        name: e.target.name.value,
        rating: e.target.rating.value
    };

    const options = { 
        method: 'POST',
        body: JSON.stringify(slimeData),
        headers: { "Content-Type": "application/json" }
    };

    fetch('http://localhost:3000/slimes', options)
        .then(r => r.json())
        .then(appendSlime)
        .then(() => e.target.reset())
        .catch(console.warn)
};

function updateSlime(id, tr){
    const options = { 
        method: 'PATCH',
    };
    fetch(`http://localhost:3000/slimes/${id}`, options)
        .then(r => r.json())
        .then(data => {
            const { slime } = data
            tr.querySelectorAll('td')[1].textContent = slime.rating
        })
        .catch(console.warn)
}

function deleteSlime(id, li){
    console.log('deleting', id)
    const options = { 
        method: 'DELETE',
    };
    fetch(`http://localhost:3000/slimes/${id}`, options)
        .then(li.remove())
        .catch(console.warn)
}

// helpers
function appendSlimes(data){
    data.slimes.forEach(appendSlime);
};

function appendSlime(slimeData){
    const newRow = document.createElement('tr');
    const slimeLi = formatSlimeTr(slimeData, newRow)
    slimesList.append(newRow);
};


function formatSlimeTr(slime, tr){
    const nameTd = document.createElement('td');
    const ratingTd = document.createElement('td');
    const delTd = document.createElement('td');
    const uptTd = document.createElement('td');

    const delBtn = document.createElement('button');
    const uptBtn = document.createElement('button');
    delBtn.setAttribute('class', 'delete')
    uptBtn.setAttribute('class', 'update')
    delBtn.textContent = 'X';
    uptBtn.textContent = '+';
    delBtn.onclick = () => deleteSlime(slime.id, tr);
    uptBtn.onclick = () => updateSlime(slime.id, tr);
    delTd.append(delBtn);
    uptTd.append(uptBtn);

    nameTd.textContent = slime.name
    ratingTd.textContent = slime.rating

    tr.append(nameTd)
    tr.append(ratingTd)
    tr.append(delTd)
    tr.append(uptTd)

    return tr
}

// ********************************************

// MESSAGE FLOW
function getMessage(){
    fetch('http://localhost:3000')
        .then(r => r.text())
        .then(renderMessage)
        .catch(console.warn)
};

function renderMessage(msgText){
    document.querySelector('#msg-btn').textContent = msgText;
};



// ********************************************
