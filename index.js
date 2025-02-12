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

function equalClick() {
  const input = document.querySelector(".screen__input");

  const lastDigit = input.value.charAt(input.value.length - 1);
  const operators = "+-/*";

  if (input?.value?.trim() !== "" && !operators.includes(lastDigit)) {
    try {
      input.value = new Function(`return ${input.value}`)();
    } catch (e) {
      input.value = "Error";
    }
  } else {
    input.value = "Error";
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
}

function closeHistory() {
    document.querySelector(".history-main-container").style.display = "none";
  document.querySelector(".history-container").style = "height: 0%;";
}

document.getElementById("searchHistory").innerHTML = localStorage.getItem("searchHistory")

function autoScroll() {
  let screenInput = document.querySelector(".screen__input");
  screenInput.scrollRight = screenInput.scrollWidth;
}