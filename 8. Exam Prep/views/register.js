import { render, html } from "../node_modules/lit-html/lit-html.js";
import { register } from "../users.js";
import { loginView } from "./login.js";

const registerTemplate = () => html`
  <section id="register">
    <div class="form">
      <h2>Register</h2>
      <form class="login-form" @submit=${onRegister}>
        <input
          type="text"
          name="email"
          id="register-email"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          id="register-password"
          placeholder="password"
        />
        <input
          type="password"
          name="re-password"
          id="repeat-password"
          placeholder="repeat password"
        />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="#" @click=${loginView}>Login</a></p>
      </form>
    </div>
  </section>
`;

export function registerView() {
    render(registerTemplate(), document.querySelector("main"));
}


async function onRegister(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePassword = formData.get('re-password');

    if(email == '' || password == '' || rePassword == ''){
        return alert('All fields are required!');
    }

    if(password != rePassword){
        return alert('Passwords don\'t match!');
    }

    await register(email, password);
    e.target.reset();
    loginView();
}