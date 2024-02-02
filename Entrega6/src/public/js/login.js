async function postLogin(email, password) {
  console.log("Email:", email);
  console.log("Password:", password);
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
          // Successful login
          window.location.href = "/products";
      } else {
          // Unsuccessful login, check for error message
          if (data.error === "Wrong credentials") {
              alert("Wrong credentials");
          } else {
              // Handle other possible errors
              console.error("Login error:", data.error);
          }
      }
  } catch (error) {
      // Handle fetch or other unexpected errors
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