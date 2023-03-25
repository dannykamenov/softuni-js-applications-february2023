import {render} from 'https://unpkg.com/lit-html?module';
import {fullTemplate} from './template.js';

document.getElementsByTagName('form')[0].addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const towns = [...formData.values()][0].split(',');
    const result = document.getElementById('root');
    render(fullTemplate(towns), result);
});