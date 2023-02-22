function loadRepos() {
  let name = document.getElementById("username").value;
  let ul = document.getElementById("repos");
  ul.innerHTML = "";

  fetch(`https://api.github.com/users/${name}/repos`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Error");
      }
    })
    .then((data) => {
      data.forEach((repo) => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        li.appendChild(a);
        a.textContent = repo.full_name;
        a.href = repo.html_url;
        ul.appendChild(li);
      });
    })
    .catch((err) => {
      let li = document.createElement("li");
      li.textContent = err.message;
      ul.appendChild(li);
    });
}
