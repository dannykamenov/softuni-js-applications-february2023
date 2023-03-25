import { login } from "../users.js";

const section = document.getElementById('loginPage');

const form = section.querySelector('form');
form.addEventListener('submit', logMe);

let ctx = null;


export function showLogin(x) {
    ctx = x;
    x.showSection(section);
}


async function logMe(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    await login(email, password);
    e.target.reset();
    ctx.updateNav();
    ctx.goto('/')
}