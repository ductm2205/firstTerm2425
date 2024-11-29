/**
 * A webpage for fetching cute pet photos.
 * Photos will be populated on the page after the user
 * selects their desired pet type.
 */
"use strict";
(function () {
  const API_URL = "https://hanustartup.org/wpr/api/pets/index.php";

  window.addEventListener("load", init);

  /**
   * Initialize the page by adding event listeners to radio buttons
   */
  function init() {
    const radioButtons = qsa('input[name="animal"]');
    radioButtons.forEach((radio) => {
      radio.addEventListener("change", makeRequest);
    });
  }

  /**
   * Fetch data from the ajax pets API based on the selected animal
   */
  function makeRequest() {
    const selectedAnimal = qs('input[name="animal"]:checked').value;
    const url = `${API_URL}?animal=${selectedAnimal}`;

    fetch(url)
      .then(statusCheck)
      .then((res) => res.text())
      .then(displayImages)
      .catch(handleError);
  }

  /**
   * Display fetched images on the page
   * @param {string} imageData - String containing image paths separated by newlines
   */
  function displayImages(imageData) {
    const picturesDiv = id("pictures");
    picturesDiv.innerHTML = ""; // Clear existing images

    const imagePaths = imageData.trim().split("\n");
    imagePaths.forEach((path) => {
      const img = document.createElement("img");
      img.src = path;
      img.alt = "Pet photo";
      picturesDiv.appendChild(img);
    });
  }

  /**
   * Handle errors that occur during the fetch operation
   * @param {Error} error - The error that occurred
   */
  function handleError(error) {
    console.error("Error:", error);
    const picturesDiv = id("pictures");
    picturesDiv.innerHTML =
      "An error occurred while fetching images. Please try again.";
  }

  /* ------------------------------ Helper Functions  ------------------------------ */

  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  function id(id) {
    return document.getElementById(id);
  }

  function qs(query) {
    return document.querySelector(query);
  }

  function qsa(query) {
    return document.querySelectorAll(query);
  }
})();
