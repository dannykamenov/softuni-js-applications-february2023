import { updateInfo } from "../app.js";
import { render, html } from "../node_modules/lit-html/lit-html.js";
import { login } from "../users.js";
import { defaultView } from "./defaultView.js";
import { registerView } from "./register.js";

const loginTemplate = () => html`
  <section id="login">
    <div class="form">
      <h2>Login</h2>
      <form class="login-form" @submit=${onLogin}>
        <input type="text" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <button type="submit">login</button>
        <p class="message">Not registered? <a href="#" @click=${registerView}>Create an account</a></p>
      </form>
    </div>
  </section>
`;

export function loginView() {
    render(loginTemplate(), document.querySelector("main"));
}

async function onLogin(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    if(email == '' || password == ''){
        return alert('All fields are required!');
    }

    await login(email, password);
    e.target.reset();
    updateInfo();
    defaultView();
}
