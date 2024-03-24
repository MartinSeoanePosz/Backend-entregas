async function postLogin(email, password) {
    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
            window.location.href = "/products"; 
        } else if (!response.ok){
            console.log("Login error: Wrong credentials");
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
