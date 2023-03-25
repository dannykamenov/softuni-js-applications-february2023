import {html, render} from 'https://unpkg.com/lit-html?module';
import {cats} from './catSeeder.js';

const catTemplate = (cat) => html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn" @click=${onClick}>Show status code</button>
            <div class="status" style="display: none" id=${cat.id}>
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>`;
const catsTemplate = (cats) => html`
    <ul>
        ${cats.map(catTemplate)}
    </ul>`;
const container = document.getElementById('allCats');
render(catsTemplate(cats), container);

function onClick(e) {
    if (e.target.tagName === 'BUTTON') {
        const div = e.target.parentNode.querySelector('.status');
        if (div.style.display === 'none') {
            div.style.display = 'block';
            e.target.textContent = 'Hide status code';
        } else {
            div.style.display = 'none';
            e.target.textContent = 'Show status code';
        }
    }
}

