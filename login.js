document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    // Simple demo validation
    if (username === "admin" && password === "1234") {
        message.style.color = "green";
        message.textContent = "Login successful! Redirecting...";
        // simulate redirect after 1 second
        setTimeout(() => {
            window.location.href = "dashboard.html"; // example
        }, 1000);
    } else {
        message.style.color = "red";
        message.textContent = "Invalid username or password!";
        // shake effect
        document.querySelector(".login-container").classList.add("shake");
        setTimeout(() => {
            document.querySelector(".login-container").classList.remove("shake");
        }, 500);
    }
});
