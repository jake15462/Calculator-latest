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
      backspace()

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
    let result = new Function(`return ${search}`)();
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
  document.querySelector(".search__history").innerHTML = '<svg height="21px" version="1.1" viewBox="0 0 20 21" width="20px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#ffffdd" id="Core" opacity="0.9" transform="translate(-464.000000, -254.000000)"><g id="history" transform="translate(464.000000, 254.500000)"><path d="M10.5,0 C7,0 3.9,1.9 2.3,4.8 L0,2.5 L0,9 L6.5,9 L3.7,6.2 C5,3.7 7.5,2 10.5,2 C14.6,2 18,5.4 18,9.5 C18,13.6 14.6,17 10.5,17 C7.2,17 4.5,14.9 3.4,12 L1.3,12 C2.4,16 6.1,19 10.5,19 C15.8,19 20,14.7 20,9.5 C20,4.3 15.7,0 10.5,0 L10.5,0 Z M9,5 L9,10.1 L13.7,12.9 L14.5,11.6 L10.5,9.2 L10.5,5 L9,5 L9,5 Z" id="Shape"/></g></g></g></svg>'
}

document.getElementById("searchHistory").innerHTML = localStorage.getItem("searchHistory")