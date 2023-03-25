import { updateInfo } from "../app.js";
import { render, html } from '../node_modules/lit-html/lit-html.js';
import { createFurniture } from "../data.js";
import { catalogView } from "./catalog.js";

const createTemplate= () => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Create New Furniture</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form @submit=${postMe}>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-make">Make</label>
          <input
            class="form-control valid"
            id="new-make"
            type="text"
            name="make"
          />
        </div>
        <div class="form-group has-success">
          <label class="form-control-label" for="new-model">Model</label>
          <input
            class="form-control is-valid"
            id="new-model"
            type="text"
            name="model"
          />
        </div>
        <div class="form-group has-danger">
          <label class="form-control-label" for="new-year">Year</label>
          <input
            class="form-control is-invalid"
            id="new-year"
            type="number"
            name="year"
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-description"
            >Description</label
          >
          <input
            class="form-control"
            id="new-description"
            type="text"
            name="description"
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-price">Price</label>
          <input
            class="form-control"
            id="new-price"
            type="number"
            name="price"
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-image">Image</label>
          <input class="form-control" id="new-image" type="text" name="img" />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-material"
            >Material (optional)</label
          >
          <input
            class="form-control"
            id="new-material"
            type="text"
            name="material"
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Create" />
      </div>
    </div>
  </form>
`;

export function createView(){
    render(createTemplate(), document.querySelector(".container"));
    updateInfo();
}


async function postMe(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const make = formData.get('make');
    const model = formData.get('model');
    const year = formData.get('year');
    const description = formData.get('description');
    const price = formData.get('price');
    const img = formData.get('img');
    const material = formData.get('material');
    const data = {
        make,
        model,
        year,
        description,
        price,
        img,
        material
    }
    if(make == '' || model == '' || year == '' || description == '' || price == '' || img == ''){
        alert('All fields are required!');
        return;
    }
    if(year < 1950 || year > 2050){
        alert('Year must be between 1950 and 2050');
        return;
    }
    if(price < 0){
        alert('Price must be a positive number');
        return;
    }
    await createFurniture(data);
    catalogView();
}
