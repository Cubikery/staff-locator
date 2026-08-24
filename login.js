// LOGIN BUTTON CLICK HANDLER
document.getElementById("signBtn").onclick = function (e) {
  // Stops the form from reloading the page when submitted
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Simple login check
  if (username === "admin" && password === "1234") {
    // Saved so index.js knows to turn the absence marking on
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "index.html";
  } else {
    // Clear the password field and put the cursor back in it
    const passwordInput = document.getElementById("password");
    passwordInput.value = "";
    passwordInput.focus();
  }
};
