import { createOffer } from "../data.js";
import { render, html } from "../node_modules/lit-html/lit-html.js";
import { dashboardView } from "./dashboard.js";


const createTemplate = () => html`
  <section id="create">
    <div class="form">
      <h2>Create Offer</h2>
      <form class="create-form" @submit=${onCreate}>
        <input type="text" name="title" id="job-title" placeholder="Title" />
        <input
          type="text"
          name="imageUrl"
          id="job-logo"
          placeholder="Company logo url"
        />
        <input
          type="text"
          name="category"
          id="job-category"
          placeholder="Category"
        />
        <textarea
          id="job-description"
          name="description"
          placeholder="Description"
          rows="4"
          cols="50"
        ></textarea>
        <textarea
          id="job-requirements"
          name="requirements"
          placeholder="Requirements"
          rows="4"
          cols="50"
        ></textarea>
        <input type="text" name="salary" id="job-salary" placeholder="Salary" />

        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

export function createView() {
    render(createTemplate(), document.querySelector("main"));
    document.querySelector("form").addEventListener("submit", create);
}


async function onCreate(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const imageUrl = formData.get("imageUrl");
    const category = formData.get("category");
    const description = formData.get("description");
    const requirements = formData.get("requirements");
    const salary = formData.get("salary");
    const applications = 0;
    if (title == "" || imageUrl == "" || category == "" || description == "" || requirements == "" || salary == "") {
        return alert("All fields are required!");
    }
    const data = {
        title,
        imageUrl,
        category,
        description,
        requirements,
        salary,
        applications
    }
    await createOffer(data);
    e.target.reset();
    dashboardView();
}
