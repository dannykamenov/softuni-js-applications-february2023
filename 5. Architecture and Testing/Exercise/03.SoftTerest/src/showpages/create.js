import { createIdea } from "../data.js";

const section = document.getElementById('createPage');

const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);


let ctx = null;

export function showCreate(x) {
    ctx = x;
    x.showSection(section);
}


async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageURL');

    const idea = {
        title,
        description,
        img
    }

    await createIdea(idea)
    e.target.reset();
    ctx.goto('/dashboard');
}