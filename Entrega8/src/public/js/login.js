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
        } else {
            const data = await response.json();
            if (data.error === "Wrong credentials") {
                const errorMessage = document.getElementById("error-message");
                errorMessage.textContent = "Invalid email or password.";
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
