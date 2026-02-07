/***********************
 * AUTO REDIRECT IF LOGGED IN
 ***********************/
if (localStorage.getItem("userId")) {
    if (
        window.location.pathname.includes("login.html") ||
        window.location.pathname.includes("register.html")
    ) {
        window.location.href = "dashboard.html";
    }
}

/***********************
 * REGISTER
 ***********************/
function register() {
    fetch("http://localhost:8081/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    }).then(() => {
        alert("Registered successfully");
        window.location.href = "login.html";
    });
}

/***********************
 * LOGIN
 ***********************/
function login() {
    fetch("http://localhost:8081/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: document.getElementById("loginEmail").value,
            password: document.getElementById("loginPassword").value
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data) {
            localStorage.setItem("userId", data.id);
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid credentials");
        }
    });
}

/***********************
 * ADD TASK (NO DEADLINE)
 ***********************/
function addTask() {
    let title = document.getElementById("title").value.trim();
    let description = document.getElementById("description").value.trim();

    if (title === "" || description === "") {
        alert("Please enter task title and description");
        return;
    }

    fetch("http://localhost:8081/api/tasks/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: title,
            description: description,
            user: { id: localStorage.getItem("userId") }
        })
    }).then(() => {
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        loadTasks();
    });
}

/***********************
 * LOAD TASKS
 ***********************/
function loadTasks() {
    fetch(`http://localhost:8081/api/tasks/user/${localStorage.getItem("userId")}`)
        .then(res => res.json())
        .then(tasks => {
            let list = document.getElementById("taskList");
            list.innerHTML = "";

            tasks.forEach(task => {
                let li = document.createElement("li");

                li.innerHTML = `
                    <strong>${task.title}</strong><br>
                    ${task.description}<br>
                    Status: ${task.status}<br><br>

                    <button 
                        style="background-color:green;color:white;margin-right:5px;"
                        onclick="markCompleted(${task.id})">
                        Mark Completed
                    </button>

                    <button 
                        style="background-color:red;color:white;"
                        onclick="deleteTask(${task.id})">
                        Delete
                    </button>
                `;

                list.appendChild(li);
            });
        });
}

/***********************
 * MARK COMPLETED
 ***********************/
function markCompleted(id) {
    fetch(`http://localhost:8081/api/tasks/complete/${id}`, {
        method: "PUT"
    }).then(() => {
        loadTasks();
    });
}

/***********************
 * DELETE TASK

 ***********************/
function deleteTask(id) {
    fetch(`http://localhost:8081/api/tasks/delete/${id}`, {
        method: "DELETE"
    }).then(() => {
        loadTasks();
    });
}

/***********************
 * LOGOUT
 ***********************/
function logout() {
    localStorage.removeItem("userId");
    window.location.href = "login.html";
}

/***********************
 * PROTECT DASHBOARD
 ***********************/
if (
    window.location.pathname.includes("dashboard.html") &&
    !localStorage.getItem("userId")
) {
    window.location.href = "login.html";
}

/***********************
 * INITIAL LOAD
 ***********************/
if (window.location.pathname.includes("dashboard.html")) {
    loadTasks();
}
