import {render} from 'https://unpkg.com/lit-html?module';
import {contacts} from './contacts.js';
import {createTemplate} from './template.js';

const mainDiv = document.getElementById('contacts');
mainDiv.addEventListener('click', onClick);

function onClick(ev) {
    if (ev.target.className == 'detailsBtn') {
        let details = ev.target.parentNode.querySelector('.details');
        details.style.display = details.style.display == 'block' ? 'none' : 'block';
    }
}

const output = contacts.map(createTemplate);
render(output, mainDiv);