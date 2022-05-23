// DOM cache
const state = {
  balance: 0,
  income: 0,
  expense: 0,
  transaction: [],
};

const balanceAmt = document.getElementById("balance");
const incomeAmt = document.getElementById("income");
const expenseAmt = document.getElementById("expense");
const transactionList = document.getElementById("transaction");
const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");

// Event listeners
function initEventListeners() {
  incomeBtn.addEventListener("click", addIncomeClick);
  expenseBtn.addEventListener("click", addExpenseClick);
}

// Functions
function addTransactions(name, amount, type) {
  // pass info through a condition to confirm input is not blank
  if (name !== "" && amount !== "") {
    // take in user input and store in a var
    let transactions = {
      id: uniqId(),
      name: name,
      amount: parseInt(amount),
      type: type,
    };
    // post user input into state transactions array
    state.transaction.push(transactions);
    updateState();
  } else {
    alert(
      "Please make sure you are entering a valid transaction name and amount"
    );
  }
  // clear name and input value
  nameInput.value = "";
  amountInput.value = "";
  nameInput.focus();
}

function addIncomeClick() {
  addTransactions(nameInput.value, amountInput.value, "income");
}

function addExpenseClick() {
  addTransactions(nameInput.value, amountInput.value, "expense");
}

function onDeleteClick(event) {
  let uniqId = parseInt(event.target.getAttribute("date-id"));
  let deleteIndex;
  for (let i = 0; i < state.transaction.length; i++) {
    if (state.transaction[i].id === uniqId) {
      deleteIndex = i;
      break;
    }
  }
  state.transaction.splice(deleteIndex, 1);
  updateState();
}

function initTracker() {
  updateState();
  initEventListeners();
}

function uniqId() {
  return Math.round(Math.random() * 1000000);
}

function updateState() {
  // create balance, income, and expense and set to 0
  let balance = 0,
    income = 0,
    expense = 0,
    item;
  for (let i = 0; i < state.transaction.length; i++) {
    item = state.transaction[i];
    // pass i through conditional to check type and assign it
    // keep note of this incase of bug. If bug, replace else with else if statement that adds condition check for expense
    if (item.type === "income") {
      income += item.amount;
    } else if (item.type === "expense") {
      expense += item.amount;
    }
  }
  // store income - expense to balance
  balance = income - expense;
  // update amounts in state
  state.balance = balance;
  state.income = income;
  state.expense = expense;
  // send info to display
  transactionDisplay();
}

function transactionDisplay() {
  // display initial balance, income, and expense
  balanceAmt.innerHTML = `$${state.balance}`;
  incomeAmt.innerHTML = `$${state.income}`;
  expenseAmt.innerHTML = `$${state.expense}`;
  // create li, create div, create span
  let transactionLi, transactionDiv, transactionAmount, item, btn;
  // clear transaction before looping
  transactionList.innerHTML = "";
  for (let i = 0; i < state.transaction.length; i++) {
    item = state.transaction[i];
    // li
    transactionLi = document.createElement("li");
    transactionLi.append(item.name);
    transactionList.appendChild(transactionLi);
    // div
    transactionDiv = document.createElement("div");
    // span
    transactionAmount = document.createElement("span");
    // determine if the new item is an expense or income
    // keep note of this incase of bug. If bug, replace else with if else statement that adds condition check for expense
    if (item.type === "income") {
      transactionAmount.classList.add("income-amt");
    } else if (item.type === "expense") {
      transactionAmount.classList.add("expense-amt");
    }
    // display amount
    transactionAmount.innerHTML = `$${item.amount}`;
    // add amount to div
    transactionDiv.appendChild(transactionAmount);
    // display btn
    btn = document.createElement("button");
    btn.setAttribute("data-id", item.id);
    btn.innerHTML = `<i class="fas fa-trash"></i>`;
    // remove transaction item
    btn.addEventListener("click", onDeleteClick);
    // add btn to div
    transactionDiv.appendChild(btn);
    // add div to li
    transactionLi.appendChild(transactionDiv);
  }
}

initTracker();
