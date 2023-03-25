import { getIdeas } from "../data.js";

const section = document.getElementById("dashboard-holder");
section.addEventListener("click", onDetailsSelect);
let ctx = null;
export async function showCatalog(x) {
    ctx = x;
  x.showSection(section);
  const ideas = await getIdeas();
  if(ideas.length == 0){
    section.innerHTML = `<h1>No ideas yet. Be the first one :)</h1>`;
  }else{
    section.replaceChildren(...ideas.map(createIdeas));
  }

}

function createIdeas(ideas) {
    const element = document.createElement('div');
    element.className = 'card overflow-hidden current-card details';
    element.style = 'width: 20rem; height: 18rem';
    element.innerHTML = `
    <div class="card-body">
    <p class="card-text">${ideas.title}</p>
  </div>
  <img
    class="card-image"
    src="${ideas.img}"
    alt="Card image cap"
  />
  <a data-id="${ideas._id}" class="btn" href="/details">Details</a>
    `;

    return element;
}

function onDetailsSelect(e) {
    if (e.target.tagName == "A") {
        e.preventDefault();
        const id = e.target.dataset.id;
        if (id) {
          ctx.goto("/details", id);
        }
    }
}
