let screenInput = "";
let calculated = false

//appends inputKey value to the screen__input
function keyClick(inputKey) {
  if (calculated && (inputKey === "." || /^[0-9]+$/.test(inputKey))) {
    document.querySelector(".screen__input").value = inputKey;
    calculated = false;

    return;
  }
  if (calculated) calculated = false;
  document.querySelector(".screen__input").value += inputKey;
}

//removes input screen content
function clearAll() {
  document.querySelector(".screen__input").value = "";
}

function backspace() {
  document.querySelector(".screen__input").value = document.querySelector(".screen__input").value.slice(0, -1);
}

function equalClick() {
  const input = document.querySelector(".screen__input");

  //appending all valid keys to values
  const values = /^[0-9\.\+\-\*/\(\)]+$/;
  const lastDigit = input.value.charAt(input.value.length - 1);
  const operators = "+-/*";

  calculated = true;

  //checks if the calculation contains valid keys
  if (values.test(input.value) && input?.value?.trim() !== "" && !operators.includes(lastDigit)) {
    input.value = eval(input.value);

    return;
  } else {
    document.querySelector(".screen__input").value = "Error";
  }
}

function keyFunction({ key }) {
  const screenInput = document.querySelector(".screen__input");

  // do 'enter' key stuff
  if (key === "Enter") {
    appendHistory()
    equalClick();
    calculated = true;

    return;
  }
  // Check if the input field is not active
  if (!screenInput.contains(document.activeElement)) {
    if (key === "Backspace") {
      screenInput.value = screenInput.value.slice(0, -1);

      return;
    }

    // if event key in list of possible keys
    const keys = "0123456789.";
    const operators = "+-*/()"

    // checks if calculated is trua and includes accepted keys
    if (calculated && keys.includes(key)) {
      screenInput.value = key;
      calculated = false
      
      return;
    }
    
    //checks if it is an accepted operator or key
    if (operators.includes(key) || keys.includes(key)) {
      screenInput.value += key;
      calculated = false;
    
      return;
    }
  }
}

document.addEventListener("keydown", keyFunction);

function appendHistory() {
  let search = document.querySelector(".screen__input").value;
  if (/^[0-9\.\+\-\*/\(\)]+$/.test(search)) {
    let result = eval(search);
    let currentHistory = localStorage.getItem("searchHistory") || "";
    let newEntry = search + " = " + result;
    if (currentHistory) {
      currentHistory += "<br><br>" + newEntry;
    } else {
      currentHistory = newEntry;
    }
    localStorage.setItem("searchHistory", currentHistory);
    document.getElementById("searchHistory").innerHTML = localStorage.getItem("searchHistory")
  }
}

function clearHistory() {
  localStorage.removeItem("searchHistory")
  document.getElementById("searchHistory").innerHTML = "";
}

function showHistory() {
  document.querySelector(".history-main-container").style.display = "flex"
  setTimeout(function() {
    document.querySelector(".history-container").style.height = "50%";
  }, 1);
}

function closeHistory() {
  setTimeout(function() {
    document.querySelector(".history-main-container").style.display = "none";
  }, 300);
  document.querySelector(".history-container").style = "height: 0%;";
}

document.getElementById("searchHistory").innerHTML = localStorage.getItem("searchHistory")

function autoScroll() {
  let screenInput = document.querySelector(".screen__input");
  screenInput.scrollRight = screenInput.scrollWidth;
}