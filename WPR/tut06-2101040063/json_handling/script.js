"use strict";
(function () {
  // Wait for the DOM to load before initializing
  document.addEventListener("DOMContentLoaded", init);

  /**
   * Initializes the event listener for the Load Data button
   */
  function init() {
    const loadDataButton = document.getElementById("loadDataButton");
    if (loadDataButton) {
      loadDataButton.addEventListener("click", loadData);
    }
  }

  /**
   * Simulates loading JSON data and displays it after a 3-second countdown
   */
  function loadData() {
    // Define JSON data
    const jsonData = {
      items: [
        { name: "Alice", age: 30, country: "USA" },
        { name: "Bob", age: 25, country: "UK" },
        { name: "Charlie", age: 35, country: "Canada" },
      ],
    };

    const countdownContainer = document.getElementById("countdown");
    const dataContainer = document.getElementById("dataContainer");

    if (!countdownContainer || !dataContainer) {
      console.error("Required DOM elements not found.");
      return;
    }

    // Clear any existing data and set initial countdown value
    dataContainer.innerHTML = "";
    let countdown = 3;
    countdownContainer.textContent = `Loading data in ${countdown} seconds...`;

    // Countdown logic
    const countdownInterval = setInterval(() => {
      countdown--;
      countdownContainer.textContent = `Loading data in ${countdown} seconds...`;

      if (countdown === 0) {
        clearInterval(countdownInterval);
        countdownContainer.textContent = ""; // Clear countdown message
        displayData(jsonData.items); // Display the JSON data
      }
    }, 1000);
  }

  /**
   * Displays JSON data in the data container
   * @param {Array} items - Array of JSON objects to display
   */
  function displayData(items) {
    const dataContainer = document.getElementById("dataContainer");
    if (!dataContainer) return;

    // Clear previous content
    dataContainer.innerHTML = "";

    // Iterate over items and create divs for each
    items.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "data-item";
      itemDiv.textContent = `Name: ${item.name}, Age: ${item.age}, Country: ${item.country}`;
      dataContainer.appendChild(itemDiv);
    });
  }
})();
