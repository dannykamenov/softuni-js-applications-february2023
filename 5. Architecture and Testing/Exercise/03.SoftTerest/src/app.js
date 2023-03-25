import { showCatalog } from "./showpages/catalog.js";
import { showCreate } from "./showpages/create.js";
import { showDetails } from "./showpages/details.js";
import { showLogin } from "./showpages/login.js";
import { showRegister } from "./showpages/register.js";
import { showHome } from "./showpages/views.js";
import { logout } from "./users.js";

const main = document.querySelector('main');
document.getElementById('views').remove();

const nav = document.querySelector('nav');
const links = {
    '/': showHome,
    '/register': showRegister,
    '/login': showLogin,
    '/details': showDetails,
    '/create': showCreate,
    '/dashboard': showCatalog,
    '/logout': onLogout

}

const x = {
    showSection,
    goto,
    updateNav
}

goto('/');
updateNav();

function showSection(section) {
    main.replaceChildren(section);
}

document.querySelector('nav').addEventListener('click', (e) => {
    let target = e.target;
    if(target.tagName == 'IMG') {
        target = target.parentElement;
    }
    if(target.tagName == 'A') {
        e.preventDefault();
        const url = new URL(target.href);
        goto(url.pathname);
    }
});


function goto(name, ...params) {
    const path = links[name];
    if(typeof path == 'function') {
        path(x, ...params);
    }
}

function updateNav() {
    const user = localStorage.getItem('user');
    if(user) {
        nav.querySelectorAll('.user').forEach(x => x.style.display = 'block');
        nav.querySelectorAll('.guest').forEach(x => x.style.display = 'none');
    } else {
        nav.querySelectorAll('.user').forEach(x => x.style.display = 'none');
        nav.querySelectorAll('.guest').forEach(x => x.style.display = 'block');
    }
}


function onLogout() {
    logout();
    updateNav();
    goto('/');
}