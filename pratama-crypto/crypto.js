const apiKey = "d97ceec7c27e438db063e0e5330286d5";
var currencyList = document.getElementById("currencyList");

// Array of currencies you want to display
const currencies = ["USD", "EUR", "GBP", "JPY", "CAD"];
// Function to fetch live currency rates
function fetchCurrencyRates() {
  const url = `https://api.exchangerate-api.com/v4/latest/USD?access_key=${apiKey}&symbols=${currencies.join(
    ","
  )}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const rates = data.rates;
      console.log("currency list", currencyList);
      // Clear previous list items
      currencyList.innerHTML = "";
      // Iterate over currencies and display the rates
      currencies.forEach((currency) => {
        const rate = rates[currency];
        const listItem = document.createElement("li");
        listItem.draggable = true;

        // Create the radio button
        const radioButton = document.createElement("input");
        radioButton.type = "radio";
        radioButton.name = "radioGroup";
        radioButton.id = currency;
        // Append the radio button and label to the li element
        listItem.textContent = `${currency}: ${rate}`;
        console.log("list item", listItem);
        currencyList.appendChild(listItem);
        listItem.appendChild(radioButton);
      });
    })
    .catch((error) => {
      console.error("Error fetching currency rates:", error);
    });
}

// Fetch currency rates on page load
fetchCurrencyRates();
setTimeout(() => {
  const itemList = document.querySelectorAll("#currencyList li");
  console.log("item list darg", itemList);
  let draggedItem = null;

  // Event listener for dragstart event
  itemList.forEach((item) => {
    item.addEventListener("dragstart", function (e) {
      draggedItem = this;
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", this.innerHTML);
      this.classList.add("dragging");
    });

    // Event listener for dragend event
    item.addEventListener("dragend", function () {
      draggedItem = null;
      this.classList.remove("dragging");
    });
  });

  // Event listener for dragover event
  currencyList.addEventListener("dragover", function (e) {
    e.preventDefault();
    const afterElement = getDragAfterElement(currencyList, e.clientY);
    const draggableItem = document.querySelector(".dragging");
    if (afterElement == null) {
      currencyList.appendChild(draggableItem);
    } else {
      currencyList.insertBefore(draggableItem, afterElement);
    }
  });

  // Helper function to get the element after the drag position
  function getDragAfterElement(container, y) {
    const draggableElements = [
      ...container.querySelectorAll("li:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
}, 1000);

// Refresh currency rates every 10 seconds
// setInterval(fetchCurrencyRates, 10000);
