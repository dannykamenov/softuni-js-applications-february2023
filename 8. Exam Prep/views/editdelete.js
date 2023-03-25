import { deleteOffer, editOffer, getOfferById } from "../data.js";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { dashboardView } from "./dashboard.js";

let applications = 0;
let offerId = "";

export async function onEdit(e) {
  e.preventDefault();
  const id = e.target.className;
  offerId = id;
  const offer = await getOfferById(id);
  applications = offer.applications;
  render(editTemplate(offer), document.querySelector("main"));
}

export async function onDelete(e) {
  e.preventDefault();
  const id = e.target.className;
  await deleteOffer(id);
  dashboardView();
}

const editTemplate = (offer, id) => html`
  <section id="edit">
    <div class="form">
      <h2>Edit Offer</h2>
      <form class="edit-form" @submit=${editMe}>
        <input type="text" name="title" id="job-title" placeholder="Title" value="${offer.title}"/>
        <input
          type="text"
          name="imageUrl"
          id="job-logo"
          placeholder="Company logo url"
          value="${offer.imageUrl}"
        />
        <input
          type="text"
          name="category"
          id="job-category"
          placeholder="Category"
          value="${offer.category}"
        />
        <textarea
          id="job-description"
          name="description"
          placeholder="Description"
          rows="4"
          cols="50""
        >${offer.description}</textarea>
        <textarea
          id="job-requirements"
          name="requirements"
          placeholder="Requirements"
          rows="4"
          cols="50"
        >${offer.requirements}</textarea>
        <input type="text" name="salary" id="job-salary" placeholder="Salary" value="${offer.salary}"/>

        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;


async function editMe(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const imageUrl = formData.get("imageUrl");
    const category = formData.get("category");
    const description = formData.get("description");
    const requirements = formData.get("requirements");
    const salary = formData.get("salary");
    const data = {
        title,
        imageUrl,
        category,
        description,
        requirements,
        salary,
        applications
    };

    if(title == "" || imageUrl == "" || category == "" || description == "" || requirements == "" || salary == ""){
        return alert("All fields are required!");
    }

    await editOffer(offerId, data);
    e.target.reset();
    dashboardView();
}
