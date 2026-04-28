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
}

function deleteGoal(index) {
  goals.splice(index, 1);

  localStorage.setItem("goals", JSON.stringify(goals));

  renderGoals();
}

renderGoals();