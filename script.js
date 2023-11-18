let history = [];
const MAX_INPUT_DIGITS = 14;

document.getElementById('calculator-buttons').addEventListener('click', function (event) {
  const target = event.target;
  if (target.tagName === 'BUTTON') {
    const buttonValue = target.dataset.value;
    const buttonAction = target.dataset.action;

    if (buttonAction === 'clear') {
      clearDisplay();
    } else if (buttonAction === 'calculate') {
      calculateResult();
    } else if (buttonAction === 'sqrt') {
      calculateSquareRoot();
    } else {
      appendToDisplay(buttonValue);
    }
  }
});

document.addEventListener('keydown', function (event) {
  const key = event.key;
  if (/^[0-9+\-*/.=]$/.test(key)) {
    event.preventDefault();
    if (key === 'C') {
      clearDisplay();
    } else if (key === '=') {
      calculateResult();
    } else {
      appendToDisplay(key);
    }
  }
});

function appendToDisplay(value) {
  const currentInput = document.getElementById('display').value;
  if (currentInput.length < MAX_INPUT_DIGITS) {
    document.getElementById('display').value += value;
  } else {
    displayMessage('Maximum input limit reached (14 digits)');
  }
}

function clearDisplay() {
  document.getElementById('display').value = '';
  clearMessage();
}

function calculateResult() {
  try {
    const result = eval(document.getElementById('display').value);
    const formattedResult = formatResult(result);
    document.getElementById('display').value = formattedResult;
    history.push(`${document.getElementById('display').value} = ${formattedResult}`);
    updateHistory();
    clearDisplayOnOperator();
  } catch (error) {
    document.getElementById('display').value = 'Error';
  }
}

function clearDisplayOnOperator() {
  const currentInput = document.getElementById('display').value;
  const operators = ['+', '-', '*', '/'];


  if (operators.some(operator => currentInput.endsWith(operator))) {
    clearDisplay();
  }
}

function calculateSquareRoot() {
  document.getElementById('display').value = Math.sqrt(eval(document.getElementById('display').value));
}

function formatResult(result) {
  return Number(result.toPrecision(MAX_INPUT_DIGITS)).toString();
}

function updateHistory() {
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = '';
  history.forEach((entry) => {
    const li = document.createElement('li');
    li.textContent = entry;
    historyList.appendChild(li);
  });
}

function displayMessage(message) {
  document.getElementById('display').value = message;
}

function clearMessage() {
  document.getElementById('display').value = '';
}
