import { register } from "../users.js";
import page from "../node_modules/page/page.mjs";
import { render, html } from "../node_modules/lit-html/lit-html.js";
import { catalogView } from "./catalog.js";

const registerTemplate = () => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Register New User</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form @submit=${regMe}>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="email">Email</label>
          <input class="form-control" id="email" type="text" name="email" />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="password">Password</label>
          <input
            class="form-control"
            id="password"
            type="password"
            name="password"
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="rePass">Repeat</label>
          <input
            class="form-control"
            id="rePass"
            type="password"
            name="rePass"
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
      </div>
    </div>
  </form>
`;

async function regMe(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const email = formData.get("email");
  const password = formData.get("password");

  await register(email, password);
  e.target.reset();
  catalogView();
}

export const registerView = (ctx) => {
  render(registerTemplate(), document.querySelector(".container"));
};
