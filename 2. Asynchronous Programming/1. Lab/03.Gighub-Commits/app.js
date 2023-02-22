function loadCommits() {
  const username = document.getElementById("username").value;
  const repo = document.getElementById("repo").value;
  const ul = document.getElementById("commits");

  const url = `https://api.github.com/repos/${username}/${repo}/commits`;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((data) => {
      ul.innerHTML = "";
      data.forEach((commit) => {
        const li = document.createElement("li");
        li.textContent = `${commit.commit.author.name}: ${commit.commit.message}`;
        ul.appendChild(li);
      });
    })
    .catch((err) => {
      ul.innerHTML = "";
      const li = document.createElement("li");
      li.textContent = err.message;
      ul.appendChild(li);
    });
}
