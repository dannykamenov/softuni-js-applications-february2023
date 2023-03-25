function attachEvents() {
    let submitBtn = document.getElementById('submit');
    let refreshBtn = document.getElementById('refresh');
    let textArea = document.getElementById('messages');

    submitBtn.addEventListener('click', () => {
        let author = document.getElementsByName('author')[0].value;
        let content = document.getElementsByName('content')[0].value;

        fetch('http://localhost:3030/jsonstore/messenger', {
            method: 'POST',
            body: JSON.stringify({
                author,
                content
            })
        })
        .then(() => {
            document.getElementsByName('author')[0].value = '';
            document.getElementsByName('content')[0].value = '';
        })
        .catch(err => console.log(err));
    });

    refreshBtn.addEventListener('click', () => {
        fetch('http://localhost:3030/jsonstore/messenger')
        .then(response => response.json())
        .then(data => {
            let messages = Object.values(data).map(m => `${m.author}: ${m.content}`);
            textArea.textContent = messages.join('\n');
        })
        .catch(err => console.log(err));

    });


}

attachEvents();