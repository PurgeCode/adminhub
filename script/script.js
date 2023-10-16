const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSideMenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", function () {
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});

const searchButton = document.querySelector(
  "#content nav form .form-input button"
);
const searchButtonIcon = document.querySelector(
  "#content nav form .form-input button .bx"
);
const searchForm = document.querySelector("#content nav form");

searchButton.addEventListener("click", function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchForm.classList.toggle("show");
    if (searchForm.classList.contains("show")) {
      searchButtonIcon.classList.replace("bx-search", "bx-x");
    } else {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
    }
  }
});

if (window.innerWidth < 768) {
  sidebar.classList.add("hide");
} else if (window.innerWidth > 576) {
  searchButtonIcon.classList.replace("bx-x", "bx-search");
  searchForm.classList.remove("show");
}

window.addEventListener("resize", function () {
  if (this.innerWidth > 576) {
    searchButtonIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});

const switchMode = document.getElementById("switch-mode");

switchMode.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});

// End of Toggle

// JavaScript for the tab accordion
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");
  const homeLink = document.getElementById("home-link");
  const titleContent = document.querySelector(".title-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Hide all tab contents
      tabContents.forEach((content) => {
        content.style.display = "none";
      });

      // Remove the "active" class from all buttons
      tabButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      const targetId = button.getAttribute("data-target");
      const targetContent = document.getElementById(targetId);

      if (targetContent) {
        // Display the selected tab content
        targetContent.style.display = "block";

        // Add the "active" class to the clicked button
        button.classList.add("active");

        // Update the "Home" link text based on the selected tab
        if (targetId === "tab-dashboard") {
          homeLink.textContent = "Main Dashboard";
        } else if (targetId === "tab-grade") {
          homeLink.textContent = "Grading";
        } else if (targetId === "tab-student") {
          homeLink.textContent = "Student";
        } else if (targetId === "tab-teachers") {
          homeLink.textContent = "Teachers";
        } else if (targetId === "tab-subject") {
          homeLink.textContent = "Subject";
        } else if (targetId === "tab-department") {
          homeLink.textContent = "Department";
        } else if (targetId === "tab-faculty") {
          homeLink.textContent = "Faculty";
        }
      }
    });
  });

  // Initially, display the first tab and mark it as active
  tabButtons[0].click();
  tabButtons[0].classList.add("active");

  // Add a click event listener to the "Home" link to remove "active" class
  homeLink.addEventListener("click", () => {
    tabButtons.forEach((button) => {
      button.classList.remove("active");
    });
  });
});

// Display the Input
let formSubmitted = false;

function displayUserInput() {
  if (formSubmitted) {
    return; // Don't add more rows if the form has already been submitted
  }

  let total = 0;
  const table = document.querySelector("#outputTable tbody");
  const inputs = ["English", "Math", "Science", "Puschis"];
  const errorDisplay = document.getElementById("errorDisplay");
  errorDisplay.textContent = ""; // Clear any previous error messages

  let hasError = false; // Flag to track if any errors occur
  document.getElementById("messageDisplay").style.display = "none";
  document.getElementById("avgDisplay").style.display = "none";
  const values = inputs.map((inputLabel, index) => {
    if (hasError) return null;
    const inputField = document.getElementById(`grades${index + 1}`);
    const value = Number(inputField.value);

    if (isNaN(value)) {
      hasError = true;
      errorDisplay.textContent = `Invalid input for ${inputLabel}. Please enter a number.`;

      // Automatically clear the error after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        errorDisplay.textContent = "";
      }, 3000);

      // Set the error flag
      return null; // Exit the loop if there's an error
    }

    total += value;
    return value;
  });
  if (!hasError) {
    inputs.forEach((inputLabel, index) => {
      const row = table.insertRow();
      row.insertCell(0).textContent = inputLabel;
      row.insertCell(1).textContent = values[index];
      const resultCell = row.insertCell(2);
      resultCell.textContent = values[index] >= 79 ? "Pass" : "Fail";
      resultCell.classList.add(values[index] >= 79 ? "pass" : "failed");
    });

    const average = total / inputs.length;
    document.getElementById("averageAmount").textContent = `${average}`;
    checkPassFail(average);
    formSubmitted = true; // Mark the form as submitted
  }
}

function clearInputs() {
  const inputFields = document.querySelectorAll("input[type='text']");
  inputFields.forEach((inputField) => {
    inputField.value = "";
  });
  document.getElementById("messageDisplay").style.display = "block";
  document.getElementById("avgDisplay").style.display = "block";
  document.getElementById("errorDisplay").textContent = "";
  document.getElementById("averageAmount").textContent = "";
  document.querySelector("#outputTable tbody").innerHTML = "";
  document.getElementById("averageAmount").classList.remove("passed", "fail");
  document.getElementById("averageMessage").innerHTML = "";
  formSubmitted = false; // Reset the form submission
}

function checkPassFail(average) {
  const averageElement = document.getElementById("averageAmount");
  const averageMessage = document.getElementById("averageMessage");
  if (average >= 79) {
    averageElement.classList.add("passed");
    averageMessage.classList.add("avgPassed");
    averageMessage.innerHTML += `<img src="./image/passed.png" alt="Passed" class="imgAvg animate__animated animate__jackInTheBox">`;
  } else {
    averageElement.classList.add("fail");
    averageMessage.classList.add("avgFailed");
    averageMessage.innerHTML += `<img src="./image/failed.png" alt="failed" class="animate__animated animate__jackInTheBox imgAvg">`;
  }
}
