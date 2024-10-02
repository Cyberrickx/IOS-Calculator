document.addEventListener("DOMContentLoaded", () => {
  var hamburger = document.getElementById("hamburger");
  var sidebar = document.getElementById("sidebar");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("hamburger-active");
    sidebar.classList.toggle("sidebar-active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  var dark = document.getElementById("dark");
  var light = document.getElementById("light");

  dark.addEventListener("click", () => {
    document.documentElement.style.setProperty("--background-color", "#000");
    document.documentElement.style.setProperty("--font-color", "#fff");
    document.documentElement.style.setProperty("--keypad-top", "#979797");
    document.documentElement.style.setProperty(
      "--keypad-font-color-top",
      "#000"
    );
    document.documentElement.style.setProperty(
      "--keypad-side-color",
      "#da7619"
    );
    document.documentElement.style.setProperty(
      "--keypad-main-color",
      "#474747"
    );
    document.documentElement.style.setProperty("--shadow-color", "#D3D3D3");
  });
  light.addEventListener("click", () => {
    document.documentElement.style.setProperty("--background-color", "#a1a1a1");
    document.documentElement.style.setProperty("--font-color", "#000");
    document.documentElement.style.setProperty("--keypad-top", "#D9D9D9");
    document.documentElement.style.setProperty(
      "--keypad-font-color-top",
      "#FFFFFF"
    );
    document.documentElement.style.setProperty(
      "--keypad-side-color",
      "#FFB94D"
    );
    document.documentElement.style.setProperty(
      "--keypad-main-color",
      "#C8C8C8"
    );
    document.documentElement.style.setProperty("--shadow-color", "#A9A9A9");
  });
});

let operand1 = "";
let operator = "";
let operand2 = "";
let result = "";

// Get the screen element
const screen = document.querySelector(".screen p");

// Add event listeners to the buttons
document.querySelectorAll(".key").forEach((button) => {
  button.addEventListener("click", (event) => {
    const keyValue = event.target.textContent;
    const keyId = event.target.id;

    // Handle number buttons
    if (keyValue.match(/^\d$/) || keyValue === ".") {
      if (operator === "") {
        if (!(keyValue === "." && operand1.includes("."))) {
          operand1 += keyValue; // Append to operand1
          updateScreen(operand1); // Show operand1
        }
      } else {
        if (!(keyValue === "." && operand2.includes("."))) {
          operand2 += keyValue; // Append to operand2
          updateScreen(operand2); // Show operand2
        }
      }
    }

    // Handle operator buttons
    else if (["+", "−", "×", "÷"].includes(keyValue)) {
      if (operand1 !== "") {
        operator = keyValue; // Set the operator
        // Optionally clear operand2 or wait for input
        operand2 = ""; // Clear operand2 for the next input
      }
    }

    // Handle equals button
    else if (keyId === "equals") {
      if (operand1 !== "" && operator !== "" && operand2 !== "") {
        result = calculate(operand1, operator, operand2);
        updateScreen(result);
        operand1 = result; // Store result for chaining
        operator = "";
        operand2 = "";
      }
    }

    // Handle clear button
    else if (keyId === "clear") {
      operand1 = "";
      operator = "";
      operand2 = "";
      result = "";
      updateScreen(""); // Clear the screen
    }

    // Handle plus/minus button
    else if (keyId === "plus-minus") {
      if (operand1) {
        operand1 = (parseFloat(operand1) * -1).toString();
        updateScreen(operand1);
      }
    }

    // Handle percent button
    else if (keyId === "percent") {
      if (operand1) {
        operand1 = (parseFloat(operand1) / 100).toString();
        updateScreen(operand1);
      }
    }
  });
});

// Update the screen with the given value
function updateScreen(value) {
  screen.textContent = value; // Show only the current value (operand/result)
}

// Perform the calculation based on the operator
function calculate(operand1, operator, operand2) {
  const num1 = parseFloat(operand1);
  const num2 = parseFloat(operand2);

  if (isNaN(num1) || isNaN(num2)) return "Error";

  switch (operator) {
    case "+":
      return (num1 + num2).toString();
    case "−":
      return (num1 - num2).toString();
    case "×":
      return (num1 * num2).toString();
    case "÷":
      return num2 !== 0 ? (num1 / num2).toString() : "Error: Division by zero";
    default:
      return null;
  }
}
