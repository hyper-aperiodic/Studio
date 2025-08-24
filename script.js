// Hardcoded people list
const people = ["Alice", "Bob", "Clara", "Dave"];
const statuses = ["Out", "Table", "Wheel"];

// Store current states
const state = {};
people.forEach(p => state[p] = "Out");

// Render UI
const container = document.getElementById("people");

people.forEach(person => {
  const row = document.createElement("div");
  row.className = "person";

  const label = document.createElement("div");
  label.className = "name";
  label.textContent = person;
  row.appendChild(label);

  statuses.forEach(status => {
    const btn = document.createElement("button");
    btn.textContent = status;
    btn.onclick = () => updateStatus(person, status);
    btn.id = `${person}-${status}`;
    row.appendChild(btn);
  });

  container.appendChild(row);
});

// Update state + button styles
function updateStatus(person, status) {
  state[person] = status;

  statuses.forEach(s => {
    const btn = document.getElementById(`${person}-${s}`);
    if (s === status) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  console.log(state); // For now just logs to console
}
