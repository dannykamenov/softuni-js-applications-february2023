import page from "../node_modules/page/page.mjs";
import { render, html } from "../node_modules/lit-html/lit-html.js";
import { login } from "../users.js";
import { updateInfo } from "../app.js";
import { catalogView } from "./catalog.js";

const loginTemplate = () => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Login User</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form @submit=${onSubmit}>
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
        <input type="submit" class="btn btn-primary" value="Login" />
      </div>
    </div>
  </form>
`;

async function onSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    await login(email, password);
    e.target.reset();
    updateInfo();
    catalogView();

}

export const loginView = (ctx) => {
    render(loginTemplate(), document.querySelector('.container'));
}

