import {html} from 'https://unpkg.com/lit-html?module';

const template = (data) => html`
<li>${data}</li>`;

const fullTemplate = (names) => html`
<ul>
${names.map(x => template(x))}
</ul>`;

export {fullTemplate};