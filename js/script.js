window.addEventListener("load", loadTheTasks);

const addBtn = document.querySelector(".button");
const inp = document.querySelector(".text-input");
const showMessage = document.querySelector("#message");
const ul = document.querySelector("#task-list");

function loadTheTasks() {
  ul.innerHTML = "";
  for (let i = 0; i < localStorage.length; i++) {
    let taskName = localStorage.key(i);
    let task = createTask(taskName);
    if (localStorage.getItem(taskName) == "true") {
      task.classList.add("active");
    } else if (localStorage.getItem(taskName) == "false") {
      task.classList.remove("active");
    }
    ul.appendChild(task);
  }
  if (localStorage.length === 0) {
    showMessage.style.display = "block";
  } else {
    showMessage.style.display = "none";
  }
}
function createTask(text) {
  if (localStorage.length) {
    let li = document.createElement("li");
    li.textContent = text;
    li.innerHTML += `<span class='close-btn'><i class="fa-solid fa-trash"></i></span>`;
    return li;
  }
}
addBtn.addEventListener("click", () => {
  if (inp.value === "") {
    showMessage.style.display = "block";
    showMessage.textContent = "Please enter a task";
  } else {
    showMessage.style.display = "none";
    saveTasks(inp.value);
  }
  inp.value = "";
});
function saveTasks(text) {
  localStorage.setItem(text, "false");
  loadTheTasks();
}
ul.addEventListener("click", (e) => {
  if (e.target.nodeName === "I") {
    let theKey = e.target.parentElement;
    localStorage.removeItem(theKey.parentElement.textContent);
    loadTheTasks();
  } else if (e.target.nodeName === "LI") {
    let li = e.target;
    let taskValue = localStorage.getItem(li.textContent);
    if (taskValue == "true") {
      localStorage.setItem(li.textContent, "false");
      li.classList.toggle("active");
    } else if (taskValue == "false") {
      localStorage.setItem(li.textContent, "true");
      li.classList.toggle("active");
    }
  }
});
