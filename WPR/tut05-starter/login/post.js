/*
 * Sending POST request with fetch
 */
"use strict";
(function () {
  const API_URL = "https://hanustartup.org/wpr/api/login.php";

  window.addEventListener("load", init);

  /**
   * Setup the sign-in button on initial page load
   */
  function init() {
    id("login-form").addEventListener("submit", signIn);
  }

  /**
   * Signs the user in based on username and password inputs
   * @param {Event} event - The submit event
   */
  async function signIn(event) {
    event.preventDefault();

    const username = id("username").value;
    const password = id("password").value;

    const formData = new FormData();
    formData.append("user", username);
    formData.append("password", password);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      await statusCheck(response);
      const result = await response.text();
      id("response").textContent = result;
    } catch (error) {
      id("response").textContent = "Error: " + error.message;
    }
  }

  /* ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the element that has the matches the selector passed.
   * @param {string} selector - selector for element
   * @return {object} DOM object associated with selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }
})();
