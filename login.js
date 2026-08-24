// Wait for the page to load and attach a click event handler to the login button
document.getElementById("signBtn").onclick = function(e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the username and password from the input fields
    // .trim() removes any extra spaces from the beginning or end
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Get references to DOM elements we'll need to update
    const errorMessage = document.getElementById("errorMessage");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");


    // Hardcoded login check - only accepts username "admin" and password "1234"
    if (username === "admin" && password === "1234") {
        // Save a flag in the browser's local storage to remember that the user is logged in
        // This will persist even if the page is refreshed
        localStorage.setItem('isLoggedIn', 'true');

        // Redirect the user to the main page
        window.location.href = "index.html";
    } else {
        // Login failed - show an error message
        errorMessage.textContent = 'Invalid username or password';
        errorMessage.style.display = 'block'; // Make the error visible

        // Clear the password field for security
        passwordInput.value = '';

        // Add an error class to both input fields to style them with red borders or similar
        passwordInput.classList.add('error');
        usernameInput.classList.add('error');

        // Move keyboard focus to the password field so the user can try again quickly
        passwordInput.focus();
    }
};