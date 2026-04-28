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
  const category = document.getElementById("expenseCategory").value;

  if (!name || !amount || !category) {
    alert("Please fill out all expense fields.");
    return;
  }

  expenses.push({ name, amount, category });

  localStorage.setItem("expenses", JSON.stringify(expenses));

  renderExpenses();

  document.getElementById("expenseName").value = "";
  document.getElementById("expenseAmount").value = "";
  document.getElementById("expenseCategory").value = "";
});

function renderExpenses() {
  expenseList.innerHTML = "";

  let total = 0;

  expenses.forEach((expense, index) => {
    total += expense.amount;

    expenseList.innerHTML += `
  <li>
    <strong>${expense.name}</strong><br>
    Category: ${expense.category}<br>
    Amount: $${expense.amount.toFixed(2)}
    <button onclick="deleteExpense(${index})">Delete</button>
  </li>
`;
  });

  document.getElementById("totalExpenses").textContent = total.toFixed(2);
  updateDashboard();
}

function deleteExpense(index) {
  expenses.splice(index, 1);

  localStorage.setItem("expenses", JSON.stringify(expenses));

  renderExpenses();
}

renderExpenses();

let goals = JSON.parse(localStorage.getItem("goals")) || [];

const goalList = document.getElementById("goalList");
const addGoalBtn = document.getElementById("addGoalBtn");

addGoalBtn.addEventListener("click", () => {
  const name = document.getElementById("goalName").value;
  const amount = Number(document.getElementById("goalAmount").value);
  const saved = Number(document.getElementById("goalSaved").value);

  if (!name || !amount || saved < 0) {
    alert("Please enter valid goal information.");
    return;
  }

  goals.push({ name, amount, saved });

  localStorage.setItem("goals", JSON.stringify(goals));

  renderGoals();

  document.getElementById("goalName").value = "";
  document.getElementById("goalAmount").value = "";
  document.getElementById("goalSaved").value = "";
});

function renderGoals() {
  goalList.innerHTML = "";

  goals.forEach((goal, index) => {
    const percent = Math.min((goal.saved / goal.amount) * 100, 100);

    goalList.innerHTML += `
      <li>
        <strong>${goal.name}</strong><br>
        $${goal.saved.toFixed(2)} / $${goal.amount.toFixed(2)}
        <div class="progress-bar">
          <div class="progress-fill" style="width:${percent}%"></div>
        </div>
        <button onclick="deleteGoal(${index})">Delete</button>
      </li>
    `;
  });
  updateDashboard();
}

function deleteGoal(index) {
  goals.splice(index, 1);

  localStorage.setItem("goals", JSON.stringify(goals));

  renderGoals();
}

renderGoals();

let income = Number(localStorage.getItem("income")) || 0;

const incomeInput = document.getElementById("incomeInput");
const saveIncomeBtn = document.getElementById("saveIncomeBtn");

incomeInput.value = income;

saveIncomeBtn.addEventListener("click", () => {
  income = Number(incomeInput.value);

  if (income < 0) {
    alert("Please enter a valid income.");
    return;
  }

  localStorage.setItem("income", income);

  updateDashboard();
});

function updateDashboard() {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.amount, 0);

  const totalSaved = goals.reduce((sum, goal) => sum + goal.saved, 0);

  document.getElementById("totalIncome").textContent = income.toFixed(2);
  document.getElementById("totalExpenses").textContent = totalExpenses.toFixed(2);
  document.getElementById("remainingBudget").textContent =
    (income - totalExpenses).toFixed(2);

  document.getElementById("totalGoalAmount").textContent =
    totalGoalAmount.toFixed(2);

  document.getElementById("totalSaved").textContent =
    totalSaved.toFixed(2);
}

updateDashboard();

updateDashboard();