/**
 * JS for dynamic form validation exercise
 */

"use strict";
(function () {
  window.addEventListener("load", init);

  /**
   * Sets up necessary functionality when page loads
   */
  function init() {
    // Add event listener to form submit button
    qs("button").addEventListener("click", validateForm);

    // Add event listeners to input fields for real-time validation
    id("name").addEventListener("input", validateName);
    id("email").addEventListener("input", validateEmail);
    id("password").addEventListener("input", validatePassword);
    id("confirm-password").addEventListener("input", validateConfirmPassword);
  }

  /**
   * Validates the entire form on submit
   * @param {Event} event - the event that triggered this function
   */
  function validateForm(event) {
    // Prevent form from submitting if there are validation errors
    event.preventDefault();

    let isValid =
      validateName() &
      validateEmail() &
      validatePassword() &
      validateConfirmPassword();

    // After successful validation, display a 3-second countdown and then show a success message.
    if (isValid) {
      startCountdown();
    }
  }

  /**
   * Starts a 3-second countdown and displays a success message
   */
  function startCountdown() {
    const countdownElement = id("countdown");
    countdownElement.style.display = "block";
    let count = 3;

    const countdownInterval = setInterval(() => {
      countdownElement.textContent = `Registration successful! Redirecting in ${count} seconds...`;
      count--;

      if (count < 0) {
        clearInterval(countdownInterval);
        countdownElement.textContent =
          "Registration complete! You can now log in.";
      }
    }, 1000);
  }

  /**
   * Validates the name field
   * @returns {boolean} - true if valid, false otherwise
   */
  function validateName() {
    const nameInput = id("name");
    const nameError = id("nameError");
    const name = nameInput.value.trim();

    if (name.length < 3) {
      nameError.textContent = "Name must be at least 3 characters long";
      return false;
    } else {
      nameError.textContent = "";
      return true;
    }
  }

  /**
   * Validates the email field
   * @returns {boolean} - true if valid, false otherwise
   */
  function validateEmail() {
    const emailInput = id("email");
    const emailError = id("emailError");
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email address";
      return false;
    } else {
      emailError.textContent = "";
      return true;
    }
  }

  /**
   * Validates the password field
   * @returns {boolean} - true if valid, false otherwise
   */
  function validatePassword() {
    const passwordInput = id("password");
    const passwordError = id("passwordError");
    const password = passwordInput.value;

    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (
      password.length < minLength ||
      !hasUpperCase ||
      !hasLowerCase ||
      !hasNumber
    ) {
      passwordError.textContent =
        "Password must be at least 8 characters long and include uppercase, lowercase, and number";
      return false;
    } else {
      passwordError.textContent = "";
      return true;
    }
  }

  /**
   * Validates the confirm password field
   * @returns {boolean} - true if valid, false otherwise
   */
  function validateConfirmPassword() {
    const passwordInput = id("password");
    const confirmPasswordInput = id("confirm-password");
    const confirmPasswordError = id("confirmPasswordError");

    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordError.textContent = "Passwords do not match";
      return false;
    } else {
      confirmPasswordError.textContent = "";
      return true;
    }
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns first element matching selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} - DOM object associated with selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns a DOM object from the given tag name.
   * @param {string} tagName - the name of the element to be created.
   * @returns {object} - DOM object of the specified tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }
})();
