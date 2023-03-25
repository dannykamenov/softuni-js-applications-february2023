import { render, html } from '../node_modules/lit-html/lit-html.js';
import { getFurniture } from "../data.js";
import { detailsView } from './details.js';

export async function myPublications() {
    let owner = JSON.parse(localStorage.getItem('user'))._id;
    let data = await getFurniture();
    let myPublications = data.filter(x => x._ownerId == owner);
    render(myPubTemplate(myPublications), document.querySelector('.container'));
    document.querySelectorAll('.details').forEach(d => d.addEventListener('click', detailsView))
}

const myPubTemplate = (data) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>My Furniture</h1>
      <p>This is a list of your publications.</p>
    </div>
  </div>
  <div class="row space-top">${data.map(x => myPubTemplate2(x))}</div>
`;

const myPubTemplate2 = (data) => html`
  <div class="col-md-4">
    <div class="card text-white bg-primary">
      <div class="card-body">
        <img src="${data.img}" />
        <p>${data.description}</p>
        <footer>
          <p>Price: <span>${data.price}</span></p>
        </footer>
        <div>
        <a href="" id="${data._id}" class="btn btn-info details">Details</a>
        </div>
      </div>
    </div>
  </div>
`;
