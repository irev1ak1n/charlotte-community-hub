console.log("APP.JS LOADED");

const API = "http://localhost:5050";

async function loadResources() {
    const res = await fetch(`${API}/api/resources`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

function renderList(resources) {
    const list = document.getElementById("resourceList");
    if (!list) return;

    list.innerHTML = "";

    if (!resources.length) {
        list.innerHTML = "<li>No resources yet (resources array is empty)</li>";
        return;
    }

    resources.forEach(r => {
        const li = document.createElement("li");
        li.textContent = `${r.name} — ${r.category}`;
        list.appendChild(li);
    });
}

loadResources()
    .then(data => {
        console.log("Resources from backend:", data);
        renderList(data.resources || []);
    })
    .catch(err => console.error("FETCH ERROR:", err));
