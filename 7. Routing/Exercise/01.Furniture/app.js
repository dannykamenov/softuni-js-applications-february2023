import page from './node_modules/page/page.mjs';
import { render, html } from './node_modules/lit-html/lit-html.js';
import {loginView} from './views/login.js';
import { registerView } from './views/register.js';
import { logout } from './users.js';
import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { myPublications } from './views/my-furniture.js';



page('/register',registerView)
page('/login', loginView);
page('/catalog', catalogView);
page('/create', createView)
page('/my-furniture', myPublications)
page.start();

document.getElementById('logoutBtn').addEventListener('click', logout)

//document.addEventListener('click', editView)

export const updateInfo = () => {
    const user = localStorage.getItem('user');
    if (user) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

catalogView();
updateInfo();

