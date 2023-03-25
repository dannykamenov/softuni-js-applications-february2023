import { chooseYear, resetYears, chooseMonth } from "./displayer.js";
import { months } from "./checker.js";

resetYears();

document.addEventListener('click', e => {
    let element;
    if(e.target.className === 'day'){
        element = e.target.children[0].textContent;
        if(!isNaN(Number(element)) && element.length > 2){
            element = Number(element);
            chooseYear(element);
            return;
        }
        if(isNaN(Number(element)) && element.length > 2){
            let year = Number(e.target.parentElement.parentElement.parentElement.children[0].textContent);
            chooseMonth(element, year);
        }
    }
    else if(e.target.className === 'date'){
        element = e.target.textContent;
        if(!isNaN(Number(element)) && element.length > 2){
            element = Number(element);
            chooseYear(element);
            return;
        }
        if(isNaN(Number(element)) && element.length > 2){
            let year = Number(e.target.parentElement.parentElement.parentElement.parentElement.children[0].textContent);
            chooseMonth(element, year);
        }
    }
    else if(e.target.tagName === 'CAPTION'){
        element = e.target.textContent;
        if(element.length > 4){
            let [month, year] = element.split(' ');
            chooseYear(year);
        }else{
            resetYears();
        }
    }
})

