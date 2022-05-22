// DOM cache
const state = {
  balance: 0,
  income: 0,
  expense: 0,
  transaction: [
    { name: "Salary", amount: 5000, type: "income" },
    { name: "Buy Grocery", amount: 50, type: "expense" },
    { name: "Buy Guitar", amount: 500, type: "expense" },
  ],
};
const balanceAmt = document.getElementById('balance');
const incomeAmt = document.getElementById('income');
const expenseAmt = document.getElementById('expense');
const transactionList = document.getElementById('transaction');

// Event listeners

// Functions
function initTracker() {
    // set initial balance, income, and expense to 0
    balanceAmt.innerHTML = `$${state.balance}`;
    incomeAmt.innerHTML = `$${state.income}`;
    expenseAmt.innerHTML = `$${state.expense}`;
    // create li, create div, create span
    let transactionLi, transactionDiv, transactionAmount, item;
    for (let i = 0; i < state.transaction.length; i++) {
        item = state.transaction[i];
        // li
        transactionLi = document.createElement('li');
        transactionLi.append(item.name);
        transactionList.appendChild(transactionLi);
        // div
        transactionDiv = document.createElement('div');
        // span
        transactionAmount = document.createElement('span');
        // determine if the new item is an expense or income
        // keep note of this incase of bug. If bug, replace else with if else statement that adds condition check for expense
        if (item.type === 'income') {
            transactionAmount.classList.add('income-amt');
        } else {
            transactionAmount.classList.add('expense-amt');
        }
        // display amount
        transactionAmount.innerHTML = `$${item.amount}`;
        // add amount to div
        transactionDiv.appendChild(transactionAmount);
        // add div to li
        transactionLi.appendChild(transactionDiv);
    }

};

initTracker();