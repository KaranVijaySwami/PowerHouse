const API = "http://localhost:5000";

// ================= RESIDENT UI =================
function showResident() {
  document.getElementById("content").innerHTML = `
    <h2>Find Services</h2>

    <select onchange="fetchServices(this.value)">
      <option value="">All</option>
      <option value="Food">Food</option>
      <option value="Electrician">Electrician</option>
      <option value="Tutor">Tutor</option>
    </select>

    <div id="services"></div>
  `;

  fetchServices("");
}

async function fetchServices(category) {
  const res = await fetch(API + "/services?category=" + category);
  const data = await res.json();

  let html = "";
  data.forEach(s => {
    html += `
      <div class="card">
        <h3>${s.name}</h3>
        <p>${s.category}</p>
        <p>${s.location}</p>
        <p>⭐ ${s.rating}</p>
      </div>
    `;
  });

  document.getElementById("services").innerHTML = html;
}

// ================= VENDOR UI =================
function showVendor() {
  document.getElementById("content").innerHTML = `
    <h2>Add Your Service</h2>

    <input id="name" placeholder="Service Name"><br>
    <input id="category" placeholder="Category"><br>
    <input id="location" placeholder="Location"><br>
    <input id="rating" placeholder="Rating"><br>

    <button onclick="addService()">Add Service</button>
  `;
}

async function addService() {
  const service = {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    location: document.getElementById("location").value,
    rating: document.getElementById("rating").value
  };

  await fetch(API + "/services", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(service)
  });

  alert("Service Added!");
}