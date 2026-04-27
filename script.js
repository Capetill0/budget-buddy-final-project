function showSection(sectionId) {
  document.querySelectorAll(".view").forEach(section => {
    section.classList.add("hidden");
  });

  document.getElementById(sectionId).classList.remove("hidden");
}

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const expenseList = document.getElementById("expenseList");
const addExpenseBtn = document.getElementById("addExpenseBtn");

addExpenseBtn.addEventListener("click", () => {
  const name = document.getElementById("expenseName").value;
  const amount = Number(document.getElementById("expenseAmount").value);

  if (!name || !amount) {
    alert("Please enter both expense name and amount.");
    return;
  }

  expenses.push({ name, amount });

  localStorage.setItem("expenses", JSON.stringify(expenses));

  renderExpenses();

  document.getElementById("expenseName").value = "";
  document.getElementById("expenseAmount").value = "";
});

function renderExpenses() {
  expenseList.innerHTML = "";

  let total = 0;

  expenses.forEach((expense, index) => {
    total += expense.amount;

    expenseList.innerHTML += `
      <li>
        ${expense.name}: $${expense.amount.toFixed(2)}
        <button onclick="deleteExpense(${index})">Delete</button>
      </li>
    `;
  });

  document.getElementById("totalExpenses").textContent = total.toFixed(2);
}

function deleteExpense(index) {
  expenses.splice(index, 1);

  localStorage.setItem("expenses", JSON.stringify(expenses));

  renderExpenses();
}

renderExpenses();