window.addEventListener("DOMContentLoaded", onLoadHTML);

document.getElementById("logout").addEventListener("click", onLogout);

async function onLogout() {
    const token = sessionStorage.getItem("userToken");
    const response = await fetch("http://localhost:3030/users/logout", {
        method: "get",
        headers: { "X-Authorization": token },
    });
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("email");
    window.location.href = 'http://127.0.0.1:5500/3.%20Remote%20Data%20and%20Authentication/Exercise/05.Fisher-Game/src/index.html'

}

function onLoadHTML() {
  const token = sessionStorage.getItem("userToken");
  if (token) {
    document.getElementById("guest").style.display = "none";
    document.getElementsByClassName(
      "email"
    )[0].children[0].textContent = `${sessionStorage.getItem("email")}`;

  } else {
    document.getElementById("guest").style.display = "inline-block";
    document.getElementById("user").style.display = "none";
  }
}
