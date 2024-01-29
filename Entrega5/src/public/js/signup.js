async function postSignup(email, password) {
    const data = {
      email,
      password,
    };
  
    const response = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    const result = await response.json();
    return result;
  }
  
  const signupForm = document.getElementById("signup-form");
  
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const result = await postSignup(email, password);
    if (result.respuesta === "User created successfully") {
      window.location.href = "/login";
    } else {
      alert("Wrong credentials");
    }
  });