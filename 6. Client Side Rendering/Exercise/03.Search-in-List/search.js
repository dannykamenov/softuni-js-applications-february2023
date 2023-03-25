import { towns } from "./towns.js";
import { html, render } from "https://unpkg.com/lit-html?module";

const container = document.getElementById("towns");

const searchTemplate = (towns) => html`
<ul>
      ${towns.map((t) => html`<li>${t}</li>`)}
</ul>`;

render(searchTemplate(towns), container);

document.addEventListener('click', e => {
	if (e.target.tagName === 'BUTTON') {
		const value = document.getElementById(`searchText`).value
		const towns = [...document.getElementsByTagName('li')]
		let counter = 0

      if(value !== ''){
         towns.forEach(x => {
            x.className = ''
            if (x.innerText.includes(value)) {
               x.className = 'active'
               counter += 1
            }
         })
      }

		document.getElementById('result').innerText =
			counter !== 0
				? `${counter} matches found`
				: '0 matches found'
	}
})

