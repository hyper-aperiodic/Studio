import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// ====== Firebase config ======
const firebaseConfig = {
  apiKey: "AIzaSyDMAKyj1NagvDJDiDT0yFNlQUquNVR3FNg",
  authDomain: "studio-status-voswv.firebaseapp.com",
  databaseURL: "https://studio-status-voswv-default-rtdb.firebaseio.com",
  projectId: "studio-status-voswv",
  storageBucket: "studio-status-voswv.appspot.com", // ✅ fixed
  messagingSenderId: "573527092085",
  appId: "1:573527092085:web:452686c65e9017b881813c"
};

console.log("✅ Script loaded");

const app = initializeApp(firebaseConfig);
console.log("✅ Firebase initialized");

const db = getDatabase(app);
console.log("✅ Database loaded");

// ====== Users & statuses ======
const users = ["Alice", "Bob", "Clara"]; // Add your group here
const container = document.getElementById("status-container");
const userRows = {}; // store divs by user

// Initialize buttons
users.forEach(user => {
  const div = document.createElement("div");
  div.classList.add("user-row");
  div.innerHTML = `<strong>${user}</strong> `;
  
  ["Table", "Wheel", "Out"].forEach(status => {
    const btn = document.createElement("button");
    btn.textContent = status;
    btn.classList.add(status.toLowerCase());
    btn.addEventListener("click", () => updateStatus(user, status));
    div.appendChild(btn);
  });
  
  container.appendChild(div);
  userRows[user] = div;
});

console.log("✅ Buttons rendered");

// ====== Update status in Firebase ======
function updateStatus(user, status) {
  console.log(`⬆️ Updating ${user} to ${status}`);
  set(ref(db, 'statuses/' + user), status);
}

// ====== Listen for changes and update buttons ======
const statusesRef = ref(db, 'statuses');
onValue(statusesRef, (snapshot) => {
  const data = snapshot.val() || {};
  console.log("⬇️ Got update from Firebase:", data);

  users.forEach(user => {
    const status = data[user];
    const row = userRows[user];
    const buttons = row.querySelectorAll("button");
    buttons.forEach(btn => {
      btn.classList.toggle("active", btn.textContent === status);
    });
  });
});
