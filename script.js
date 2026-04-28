function showSection(sectionId) {
  document.querySelectorAll(".view").forEach(s => s.classList.add("hidden"));
  document.getElementById(sectionId).classList.remove("hidden");
}

function loadArray(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

let expenses = loadArray("expenses");
let goals = loadArray("goals");

let income = (() => {
  const raw = localStorage.getItem("income");
  return raw ? Number(raw) : 0;
})();

const expenseList = document.getElementById("expenseList");

document.getElementById("addExpenseBtn").addEventListener("click", () => {
  const name = document.getElementById("expenseName").value;
  const amount = Number(document.getElementById("expenseAmount").value);
  const category = document.getElementById("expenseCategory").value;

  if (!name || !amount || !category) return alert("Fill all fields");

  expenses.push({ name, amount, category });
  localStorage.setItem("expenses", JSON.stringify(expenses));

  renderExpenses();
});

function renderExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach((e, i) => {
    expenseList.innerHTML += `
      <li>
        <strong>${e.name}</strong><br>
        Category: ${e.category}<br>
        Monthly Expense: $${e.amount.toFixed(2)}
        <button onclick="deleteExpense(${i})">Delete</button>
      </li>
    `;
  });

  updateDashboard();
}

function deleteExpense(i) {
  expenses.splice(i, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

renderExpenses();

const goalList = document.getElementById("goalList");

document.getElementById("addGoalBtn").addEventListener("click", () => {
  const name = document.getElementById("goalName").value;
  const amount = Number(document.getElementById("goalAmount").value);
  const saved = Number(document.getElementById("goalSaved").value);

  if (!name || !amount || saved < 0) return alert("Fix goal input");

  goals.push({ name, amount, saved });
  localStorage.setItem("goals", JSON.stringify(goals));

  renderGoals();
});

function renderGoals() {
  goalList.innerHTML = "";

  const monthlySavings = income - expenses.reduce((s, e) => s + e.amount, 0);

  goals.forEach((g, i) => {
    const percent = Math.min((g.saved / g.amount) * 100, 100);

    let months = monthlySavings > 0
      ? Math.ceil((g.amount - g.saved) / monthlySavings)
      : "∞";

    goalList.innerHTML += `
      <li>
        <strong>${g.name}</strong><br>
        $${g.saved.toFixed(2)} / $${g.amount.toFixed(2)}

        <div class="progress-bar">
          <div class="progress-fill" style="width:${percent}%"></div>
        </div>

        <p>Time to goal: ${months} months</p>
        <button onclick="deleteGoal(${i})">Delete</button>
      </li>
    `;
  });

  updateDashboard();
}

function deleteGoal(i) {
  goals.splice(i, 1);
  localStorage.setItem("goals", JSON.stringify(goals));
  renderGoals();
}

renderGoals();

const incomeInput = document.getElementById("incomeInput");

document.getElementById("saveIncomeBtn").addEventListener("click", () => {
  income = Number(incomeInput.value);
  localStorage.setItem("income", income);
  updateDashboard();
});

function updateDashboard() {
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const totalGoals = goals.reduce((s, g) => s + g.amount, 0);
  const totalSaved = goals.reduce((s, g) => s + g.saved, 0);
  const monthlySavings = income - totalExpenses;

  document.getElementById("totalIncome").textContent = income.toFixed(2);
  document.getElementById("totalExpenses").textContent = totalExpenses.toFixed(2);
  document.getElementById("remainingBudget").textContent = (income - totalExpenses).toFixed(2);
  document.getElementById("totalGoalAmount").textContent = totalGoals.toFixed(2);
  document.getElementById("totalSaved").textContent = totalSaved.toFixed(2);

  const insight = document.getElementById("budgetInsight");
  insight.textContent =
    monthlySavings >= 0
      ? `You are saving $${monthlySavings.toFixed(2)} per month.`
      : `You are overspending by $${Math.abs(monthlySavings).toFixed(2)} per month.`;
}

updateDashboard();