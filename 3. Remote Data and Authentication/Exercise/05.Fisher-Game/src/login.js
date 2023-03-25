const notification = document.getElementsByClassName('notification')[0];
const btn = document.querySelector('button');
btn.addEventListener('click', loginMe);


function loginMe(e){
    e.preventDefault();
    let form = new FormData(document.querySelector('form'));
    const email = form.get('email');
    const password = form.get('password');
    onLogin(email, password);
}

async function onLogin(email, password) {
    const url = 'http://localhost:3030/users/login';
    const body = {
        email,
        password
    }
    const header = getHeader('POST', body);
    const response = await fetch(url, header);
    const data = await response.json();
    sessionStorage.setItem('email', data.email);
    sessionStorage.setItem('userToken', data.accessToken);
    window.location.href = 'http://127.0.0.1:5500/3.%20Remote%20Data%20and%20Authentication/Exercise/05.Fisher-Game/src/index.html'
    return data;
}

function getHeader(method, body) {
    const header = {
        method,
        headers: { 'Content-Type': 'application/json' }
    }
    if (body) {
        header.body = JSON.stringify(body);
    }
    return header;
}
