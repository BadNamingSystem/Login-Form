const form = document.getElementById("form")
const firstname_input = document.getElementById("firstname-input")
const email_input = document.getElementById("email-input")
const password_input = document.getElementById("password-input")
const repeat_password_input = document.getElementById("repeat-password-input")
const error_message = document.getElementById("error-message")

// Submit event listener to the form to trigger validation before submission.
form.addEventListener("submit", (e) => {
    let errors = []

    // Check if the firstname input exists to determine which form we are on.
    // This is a simple way to use the same validation script for both login and signup pages.
    if (firstname_input) {
        // Call the signup validation function if the firstname input exists on the page
        errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password_input.value)
    } else {
        // Else call the login validation function.
        errors = getLoginFormErrors(email_input.value, password_input.value)
    }

    // Check if the error array has any messages in it.
    if (errors.length > 0){
        // If there are errors, prevent the form from submitting to the server.
        e.preventDefault()
        // Display the collected error messages, joined by a period and a space for readability.
        error_message.innerText = errors.join(". ")
    }

})

/**
 * Validates the signup form fields.
 * @param {string} firstname - The user's first name.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @param {string} repeatPassword - The user's repeated password for confirmation.
 * @returns {Array<string>} An array of error messages. Returns an empty array if there are no errors.
 */
function getSignupFormErrors(firstname, email, password, repeatPassword) {
    let errors = []

    // Validate firstname: check if it's empty or null.
    if (firstname === "" || firstname == null) {
        errors.push("Firstname is required")
        // Add a visual indicator to the parent element of the input field.
        firstname_input.parentElement.classList.add("incorrect")
    }

    if (email === "" || email == null) {
        errors.push("Email is required")
        email_input.parentElement.classList.add("incorrect")
    }

    if (password === "" || password == null) {
        errors.push("Password is required")
        password_input.parentElement.classList.add("incorrect")
    }

    if (password.length < 8) {
        errors.push("Password must have at least 8 characters")
        password_input.parentElement.classList.add("incorrect")
    }

    if (repeatPassword === "" || repeatPassword == null) {
        errors.push("Please repeat your password.")
        repeat_password_input.parentElement.classList.add("incorrect")
    }

    // Validate that passwords match, but only if both fields have been filled out.
    if (password !== repeatPassword && password !== "" && repeatPassword !== "") {
        errors.push("Passwords do not match.")
        password_input.parentElement.classList.add("incorrect")
        repeat_password_input.parentElement.classList.add("incorrect")
    }
    return errors
}


/**
 * Validates the login form fields.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Array<string>} An array of error messages. Returns an empty array if there are no errors.
 */
function getLoginFormErrors(email, password) {
    let errors = []

    if (email === "" || email == null) {
        errors.push("Email is required")
        email_input.parentElement.classList.add("incorrect")
    }

    if (password === "" || password == null) {
        errors.push("Password is required")
        password_input.parentElement.classList.add("incorrect")
    }
    return errors
}

// --- Real-time Feedback ---

// Collect all input fields that actually exist on the page into an array.
// The .filter() handles cases where an input (like firstname_input) is null on the login page.
const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null)
// Add an 'input' event listener to each field for real-time validation feedback.
allInputs.forEach(input => {
    input.addEventListener("input", () => {
        // When the user starts typing in a field that was marked as incorrect...
        if (input.parentElement.classList.contains("incorrect")) {
            // ...remove the visual error indicator.
            input.parentElement.classList.remove("incorrect")
            // ...and clear the main error message area to provide immediate feedback.
            error_message.textContent = ""
        }
    })
})
