// script.js

// Close the window functionality (for simulation purposes, as a web app can't close the browser window)
function closeWindow() {
    window.close(); // This will only work in certain browsers (e.g., for windows opened via JavaScript)
}

// Handle login button click
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email) {
        alert("Please enter your email address.");
        return;
    }

    if (!password) {
        alert("Please enter your password.");
        return;
    }

    // Simulate successful login
    alert("Login successful!");
    // You can implement your actual authentication logic here
}
