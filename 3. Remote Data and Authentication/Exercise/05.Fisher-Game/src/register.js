const notification = document.getElementsByClassName('notification')[0];
const btn = document.querySelector('button');
btn.addEventListener('click', register);

function register(e) {
    e.preventDefault();
    let form = new FormData(document.querySelector('form'));
    let email = form.get('email');
    let password = form.get('password');
    let repeatPassword = form.get('rePass');
    console.log(email, password, repeatPassword)
    if (email == '' || password == '' || repeatPassword == '') {
        notification.textContent = 'All fields are required!';
        notification.style.display = 'block';
        return;
    }

    if (password != repeatPassword) {
        notification.textContent = 'Passwords don\'t match!';
        notification.style.display = 'block';
        return;
    }

    onRegister(email, password);
}

async function onRegister(email, password) {
    const response = await fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (response.ok == false) {
        const error = await response.json();
        notification.textContent = error.message;
    }

    const data = await response.json();
    sessionStorage.setItem('email', data.email);
    sessionStorage.setItem('userToken', data.accessToken);
    window.location.href = 'http://127.0.0.1:5500/3.%20Remote%20Data%20and%20Authentication/Exercise/05.Fisher-Game/src/index.html';
}