import { months } from "./checker.js";


function resetYears() {
    let years = document.getElementById('years');
[...document.querySelectorAll('section')].forEach(section => {
    section.style.display = 'none';
});

years.style.display = 'block';
}


function chooseYear(year) {
    year = Number(year);
    let yearChosen = document.getElementById(`year-${year}`);
    [...document.querySelectorAll('section')].forEach(section => {
        section.style.display = 'none';
    });
    yearChosen.style.display = 'block';
}

function chooseMonth(month, year) {
    month = months[month];
    let monthChosen = document.getElementById(`month-${year}-${month}`);
    [...document.querySelectorAll('section')].forEach(section => {
        section.style.display = 'none';
    });
    monthChosen.style.display = 'block';
}


export { chooseYear, resetYears, chooseMonth }