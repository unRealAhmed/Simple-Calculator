let history = [];

function appendToDisplay(value) {
  document.getElementById('display').value += value;
}

function clearDisplay() {
  document.getElementById('display').value = '';
}

function calculateResult() {
  try {
    const result = eval(document.getElementById('display').value);
    document.getElementById('display').value = result;
    history.push(`${document.getElementById('display').value} = ${result}`);
    updateHistory();
  } catch (error) {
    document.getElementById('display').value = 'Error';
  }
}

function calculateSquareRoot() {
  document.getElementById('display').value = Math.sqrt(eval(document.getElementById('display').value));
}

function updateHistory() {
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = '';
  history.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = entry;
    historyList.appendChild(li);
  });
}

document.addEventListener('keydown', function (event) {
  const key = event.key;
  if (/^[0-9+\-*/.C=]$/.test(key)) {
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
