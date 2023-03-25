import { getDashboard, getOfferById } from "../data.js";
import { render, html } from "../node_modules/lit-html/lit-html.js";
import { onDelete, onEdit } from "./editdelete.js";

const dashboardTemplate = (offers) => html`
  <section id="dashboard">
    <h2>Job Offers</h2>
    <div class="offers">
      ${offers.length > 0
        ? offers.map(offerTemplate)
        : html`<p>No offers yet.</p>`}
    </div>
  </section>
`;

function offerTemplate(offer) {
  return html`
    <div class="offer">
      <img src="${offer.imageUrl}" alt="" />
      <p><strong>Title: </strong><span class="title">${offer.title}</span></p>
      <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
      <a class="details-btn" href="" id="${offer._id}" @click=${showDetails}
        >Details</a
      >
    </div>
  `;
}

export async function dashboardView() {
  const offers = await getDashboard();
  render(dashboardTemplate(offers), document.querySelector("main"));
}

const detailsTemplate = (offer, owner) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src="${offer.imageUrl}" alt="" />
      <p id="details-title">${offer.title}</p>
      <p id="details-category">
        Category: <span id="categories">${offer.category}</span>
      </p>
      <p id="details-salary">
        Salary: <span id="salary-number">${offer.salary}</span>
      </p>
      <div id="info-wrapper">
        <div id="details-description">
          <h4>Description</h4>
          <span>${offer.description}</span>
        </div>
        <div id="details-requirements">
          <h4>Requirements</h4>
          <span>${offer.requirements}</span>
        </div>
      </div>
      <p>Applications: <strong id="applications">${offer.applications}</strong></p>
      <div id="action-buttons">
        <a
          href=""
          id="edit-btn"
          class="${offer._id}"
          style=${owner == offer._ownerId ? "display:block" : "display:none"}
          @click=${onEdit}
          >Edit</a
        >
        <a
          href=""
          id="delete-btn"
          class="${offer._id}"
          style=${owner == offer._ownerId ? "display:block" : "display:none"}
          @click=${onDelete}
          >Delete</a
        >

        <!--Bonus - Only for logged-in users ( not authors )-->
        <a href="" id="apply-btn" class="${offer._id}" style="${owner == null ? "display:none" : "display:block"}">Apply</a>
      </div>
    </div>
  </section>
`;

async function showDetails(e) {
  e.preventDefault();
  const owner = JSON.parse(localStorage.getItem("user"));
  const id = e.target.id;
  if(owner){
    const ownerId = owner._id;
    const details = await getOfferById(id);
    render(detailsTemplate(details, ownerId), document.querySelector("main"));
  }else{
    const notLogged = null;
    const details = await getOfferById(id);
    render(detailsTemplate(details, notLogged), document.querySelector("main"));
  }
}


