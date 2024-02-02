async function postLogin(email, password) {
  try {
      const response = await fetch("/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
          window.location.href = "/products";
      } else {
          if (data.error === "Wrong credentials") {
              alert("Wrong credentials");
          } else {
              console.error("Login error:", data.error);
          }
      }
  } catch (error) {
      console.error("Error during login:", error);
  }
}
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    postLogin(email, password);
});