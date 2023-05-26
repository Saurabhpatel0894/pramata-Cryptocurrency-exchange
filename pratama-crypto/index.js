/**  login feature code [OPEN] */
const { username, password } =
  JSON.parse(localStorage.getItem("userDetails")) || {};
console.log("local data", localStorage.getItem("userDetails"));
if (username && password) {
  window.location.href = "crypto.html";
  //   return;
}
document.getElementById("login-form").addEventListener("submit", login);

function login(event) {
  event.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const loginObj = { username, password };
  console.log("user name and password", username, password);
  if (username === "admin" && password === "admin") {
    window.location.href = "crypto.html";
    localStorage.setItem("userDetails", JSON.stringify(loginObj));
  } else {
    alert("Invalid credentials");
  }
}
/**  login feature code [CLOSE] */
