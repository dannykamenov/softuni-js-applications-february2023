import { deleteById, getFurnitureById } from "../data.js";
import { render, html } from "../node_modules/lit-html/lit-html.js";
import { updateInfo } from "../app.js";
import { editView } from "./edit.js";
import { catalogView } from "./catalog.js";

const detailsTemplate = (furniture,owner) => {
  if (owner == furniture._ownerId) {
    return html`
      <div class="row space-top">
        <div class="col-md-12">
          <h1>Furniture Details</h1>
        </div>
      </div>
      <div class="row space-top">
        <div class="col-md-4">
          <div class="card text-white bg-primary">
            <div class="card-body">
              <img src="/images/chair.jpg" />
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <p>Make: <span>${furniture.make}</span></p>
          <p>Model: <span>${furniture.model}</span></p>
          <p>Year: <span>${furniture.year}</span></p>
          <p>Description: <span>${furniture.description}</span></p>
          <p>Price: <span>${furniture.price}</span></p>
          <p>Material: <span>${furniture.material}</span></p>
          <div>
            <a href="" class="btn btn-info edit" id="${furniture._id}">Edit</a>
            <a href="" class="btn btn-red delete" id="${furniture._id}">Delete</a>
          </div>
        </div>
      </div>
    `;
  } else {
    return html`
      <div class="row space-top">
        <div class="col-md-12">
          <h1>Furniture Details</h1>
        </div>
      </div>
      <div class="row space-top">
        <div class="col-md-4">
          <div class="card text-white bg-primary">
            <div class="card-body">
              <img src="/images/chair.jpg" />
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <p>Make: <span>${furniture.make}</span></p>
          <p>Model: <span>${furniture.model}</span></p>
          <p>Year: <span>${furniture.year}</span></p>
          <p>Description: <span>${furniture.description}</span></p>
          <p>Price: <span>${furniture.price}</span></p>
          <p>Material: <span>${furniture.material}</span></p>
        </div>
      </div>
    `;
  }

};

export async function detailsView(e) {
  e.preventDefault();
  const data = JSON.parse(localStorage.getItem("user"));
  const owner = data == null ? null : data._id;
  if (e.target.tagName == "A") {
    const id = e.target.id;
    const furniture = await getFurnitureById(id);
    render(detailsTemplate(furniture,owner), document.querySelector(".container"));
    document.querySelectorAll(".edit").forEach((e) => e.addEventListener("click", editView));
    document.querySelectorAll(".delete").forEach((e) => e.addEventListener("click", deleteView));
    updateInfo();
  }
}

async function deleteView(e) {
    e.preventDefault();
    const id = e.target.id;
    const confirmed = confirm("Are you sure you want to delete this item?");
    if (confirmed) {
        await deleteById(id);
        catalogView();
    }
}
