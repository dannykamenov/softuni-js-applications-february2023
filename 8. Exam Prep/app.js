import {logout} from "./users.js";
import { createView } from "./views/create.js";
import { dashboardView } from "./views/dashboard.js";
import { defaultView } from "./views/defaultView.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";

document.getElementById('logo').addEventListener('click', main);
document.getElementById('logoutBtn').addEventListener('click', logout);
document.getElementById('loginBtn').addEventListener('click', loginView);
document.getElementById('registerBtn').addEventListener('click', registerView);
document.getElementById('dashboardBtn').addEventListener('click', dashboardView);
document.getElementById('createBtn').addEventListener('click', createView);


export const updateInfo = () => {
    const user = localStorage.getItem('user');
    let navUser = document.querySelector('.user');
    let navGuest = document.querySelector('.guest');
    if (user) {
        navUser.style.display = 'inline-block';
        navGuest.style.display = 'none';
    } else {
        navUser.style.display = 'none';
        navGuest.style.display = 'inline-block';
    }
}

updateInfo();
defaultView();

function main(e) {
    e.preventDefault();
    defaultView();
}