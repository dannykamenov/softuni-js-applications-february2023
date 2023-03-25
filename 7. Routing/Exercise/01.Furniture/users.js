import {get,post} from "./api.js";
import { updateInfo } from "./app.js";
import { catalogView } from "./views/catalog.js";

const endpoints = {
    'register': "/users/register",
    'login': "/users/login",
    'logout': "/users/logout",

}
export async function login(email, password) {
    const user = await post(endpoints.login, { email, password });

    localStorage.setItem("user", JSON.stringify(user));
}

export async function register(email, password){   
    const user = await post(endpoints.register, { email, password });

    localStorage.setItem("user", JSON.stringify(user));
}

export async function logout(){
    get(endpoints.logout);
    localStorage.removeItem("user");
    updateInfo();
    catalogView();
}