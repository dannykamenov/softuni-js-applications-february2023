let url = 'http://localhost:3030/jsonstore/advanced/dropdown';
let select = document.getElementById('menu');
let input = document.getElementById('itemText');

document.addEventListener('submit', addItem);

async function addItem(e) {
    e.preventDefault();
    let text = input.value;
    if (text) {
        let response = await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        if (response.ok) {
            input.value = '';
            await loadItems();
        }
    }
}

async function loadItems() {
    let response = await fetch(url);
    if (response.ok) {
        let data = await response.json();
        select.innerHTML = Object.values(data).map(x => `<option value="${x._id}">${x.text}</option>`).join('');

    }

}

loadItems();
