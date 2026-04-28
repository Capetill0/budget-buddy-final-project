function showSection(sectionId) {
  document.querySelectorAll(".view").forEach(section => {
    section.classList.add("hidden");
  });

  document.getElementById(sectionId).classList.remove("hidden");
}

function loadArray(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

let expenses = loadArray("expenses").map(e => ({
  name: e.name || "",
  amount: Number(e.amount) || 0,
  category: e.category || ""
}));

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

let goals = loadArray("goals").map(g => ({
  name: g.name || "",
  amount: Number(g.amount) || 0,
  saved: Number(g.saved) || 0
}));

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

// Initialize income from localStorage safely
let income = (() => {
  const raw = localStorage.getItem("income");
  return raw !== null ? Number(raw) : 0;
})();

const incomeInput = document.getElementById("incomeInput");
const saveIncomeBtn = document.getElementById("saveIncomeBtn");

if (incomeInput) incomeInput.value = income;

if (saveIncomeBtn) {
  saveIncomeBtn.addEventListener("click", () => {
    const parsed = Number(incomeInput.value);
    if (Number.isNaN(parsed) || parsed < 0) {
      alert("Please enter a valid income.");
      return;
    }

    income = parsed;

    localStorage.setItem("income", String(income));

    updateDashboard();
  });
}

function updateDashboard() {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.amount, 0);

  const totalSaved = goals.reduce((sum, goal) => sum + goal.saved, 0);

  const totalIncomeEl = document.getElementById("totalIncome");
  const totalExpensesEl = document.getElementById("totalExpenses");
  const remainingBudgetEl = document.getElementById("remainingBudget");
  const totalGoalAmountEl = document.getElementById("totalGoalAmount");
  const totalSavedEl = document.getElementById("totalSaved");

  if (totalIncomeEl) totalIncomeEl.textContent = (Number(income) || 0).toFixed(2);
  if (totalExpensesEl) totalExpensesEl.textContent = totalExpenses.toFixed(2);
  if (remainingBudgetEl) remainingBudgetEl.textContent = (Number(income) - totalExpenses).toFixed(2);
  if (totalGoalAmountEl) totalGoalAmountEl.textContent = totalGoalAmount.toFixed(2);
  if (totalSavedEl) totalSavedEl.textContent = totalSaved.toFixed(2);
}

updateDashboard();