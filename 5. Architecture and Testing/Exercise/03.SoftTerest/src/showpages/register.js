import { register } from "../users.js";

const section = document.getElementById('registerPage');

const form = section.querySelector('form');
form.addEventListener('submit', regMe);

let ctx = null;



export function showRegister(x) {
    ctx = x;
    x.showSection(section);
}

async function regMe(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    await register(email, password);
    e.target.reset();
    ctx.updateNav();
    ctx.goto('/');
}