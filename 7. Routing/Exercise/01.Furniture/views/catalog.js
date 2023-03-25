import { updateInfo } from "../app.js";
import { getFurniture } from "../data.js";
import { render, html } from '../node_modules/lit-html/lit-html.js';
import { detailsView } from "./details.js";

export const catalogPublications = (publications) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Welcome to Furniture System</h1>
      <p>Select furniture from the catalog to view details.</p>
    </div>
  </div>
  <div class="row space-top">${publications.map(publicationTemplate)}</div>
`;

const publicationTemplate = (publication) => html`
  <div class="col-md-4">
    <div class="card text-white bg-primary">
      <div class="card-body">
        <img src=${publication.img} />
        <p>${publication.description}</p>
        <footer>
          <p>Price: <span>${publication.price} $</span></p>
        </footer>
        <div>
          <a href="" id="${publication._id}" class="btn btn-info details">Details</a>
        </div>
      </div>
    </div>
  </div>
`;

export async function catalogView() {
    const publications = await getFurniture();
  render(catalogPublications(publications), document.querySelector(".container"));
  updateInfo();
  document.querySelectorAll('.details').forEach(d => d.addEventListener('click', detailsView))
}


