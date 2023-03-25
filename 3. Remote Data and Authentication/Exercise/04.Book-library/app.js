/*function solve() {
  let title = document.getElementsByName("title")[0];
  let author = document.getElementsByName("author")[0];
  let btns = Array.from(document.querySelectorAll("button"));
  let submitBtn = btns[btns.length - 2];
  let tbody = document.querySelector("tbody");
  let loadbtn = document.getElementById("loadBooks").addEventListener("click", loadBooks);

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let book = {
      title: title.value,
      author: author.value,
    };

    fetch("http://localhost:3030/jsonstore/collections/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    })
      .then(() => {
        title.value = "";
        author.value = "";
        tbody.appendChild(createRow(book));
      })
      .catch((err) => console.log(err));
  });

    function loadBooks() {
        fetch('http://localhost:3030/jsonstore/collections/books')
        .then(response => response.json())
        .then(data => {
            let books = Object.values(data).map(b => createRow(b)).join('');
        })
        .catch(err => console.log(err));
    }

    let editbtn = document.getElementById('edit').addEventListener('click', (e) => {});

    let deletebtn = Array.from(document.querySelectorAll('#delete')).forEach(btn => {
        btn.addEventListener('click', (e) => {
            let id = e.target.getAttribute('data-id');
            fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
                method: 'DELETE'
            })
            .then(() => {
                e.target.parentNode.parentNode.remove();
            })
            .catch(err => console.log(err));
        })
    });
}

function createRow(book) {
    let id = book._id;
    let tbody = document.querySelector("tbody");
    let tr = document.createElement("tr");
    let tdTitle = document.createElement("td");
    tdTitle.textContent = book.title;
    let tdAuthor = document.createElement("td");
    tdAuthor.textContent = book.author;
    let tdBtns = document.createElement("td");
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.setAttribute('data-id', `${id}`);
    editBtn.setAttribute('id', 'edit');
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute('data-id', `${id}`)
    deleteBtn.setAttribute('id', 'delete');
    tdBtns.appendChild(editBtn);
    tdBtns.appendChild(deleteBtn);
    tr.appendChild(tdTitle);
    tr.appendChild(tdAuthor);
    tr.appendChild(tdBtns);
    tbody.appendChild(tr);
}

solve();*/

function bookLibrary() {
  document.getElementById('loadBooks').addEventListener('click', loadAllBooks);

  document.getElementById('createForm').addEventListener('submit', createBook);

  document.querySelector('table').addEventListener('click', handleTableClick);

  document.getElementById('editForm').addEventListener('submit', updateBook);
}

bookLibrary();

async function request(url, options) {
  const response = await fetch(url, options);

  if (response.ok != true) {
      const error = await response.json();
      alert(error.message);
      throw new Error(error.message);
  }

  const data = await response.json();
  return data;
}

async function loadAllBooks() {
  const books = await request('http://localhost:3030/jsonstore/collections/books');

  const rows = Object.entries(books).map(createRow).join('');

  document.querySelector('body > table > tbody').innerHTML = rows;
}

function handleTableClick(event) {
  if (event.target.className == 'deleteBtn') {
      deleteBook(event.target.parentNode.parentNode.id);
  } else if (event.target.className == 'editBtn') {
      document.getElementById('createForm').style.display = 'none';
      document.getElementById('editForm').style.display = 'block';

      loadBookForEditting(event.target.parentNode.parentNode.id);
  }
}

function createRow([id, book]) {
  return `<tr id="${id}"><td>${book.title}</td> <td>${book.author}</td> <td><button class="editBtn">Edit</button><button class="deleteBtn">Delete</button></td></tr>`;
}

async function createBook(event) {
  event.preventDefault();

  var formData = new FormData(event.target);

  const title = formData.get('title');
  const author = formData.get('author');

  if (title && author) {
      const book = { title: title, author: author };

      event.target.reset();

      await request('http://localhost:3030/jsonstore/collections/books', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(book),
      });
      await loadAllBooks();
  }
}

async function updateBook(event) {
  event.preventDefault();

  var formData = new FormData(event.target);

  const id = formData.get('id');
  const title = formData.get('title');
  const author = formData.get('author');

  if (title && author) {
      const book = { title: title, author: author };

      event.target.reset();

      await request(`http://localhost:3030/jsonstore/collections/books/${id}`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(book),
      });

      document.getElementById('createForm').style.display = 'block';
      document.getElementById('editForm').style.display = 'none';

      // bonus auto refresh
      await loadAllBooks();
  }
}

async function deleteBook(id) {
  await request(`http://localhost:3030/jsonstore/collections/books/${id}`, {
      method: 'delete',
  });
  await loadAllBooks();
}

async function loadBookForEditting(bookId) {
  const book = await request(`http://localhost:3030/jsonstore/collections/books/${bookId}`);

  document.querySelector('#editForm [name="id"]').value = bookId;
  document.querySelector('#editForm [name="title"]').value = book.title;
  document.querySelector('#editForm [name="author"]').value = book.author;
}

function createElement(type, content, attributes = []) {
  const element = document.createElement(type);

  if (content) {
      element.textContent = content;
  }

  if (attributes.length > 0) {
      element.setAttribute(attributes[0], attributes[1]);
  }

  return element;
}
