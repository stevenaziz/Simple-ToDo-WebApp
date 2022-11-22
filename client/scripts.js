const http = new coreHTTP;

// Block Variables
let theList = [];

// setup selectors
const result = document.querySelector(".result");
const input =  document.querySelector("#listitem");
const formAlert =  document.querySelector(".form-alert");
const addButton =  document.querySelector(".add-btn");

// Listeners
addButton.addEventListener("click", AddTask);

/* Helper Functions */
function ShowTasks() {
  let output = "";
  let currTask;
  for (currTask = 0; currTask < theList.length; currTask++) { // repeat for each task item
    output += `<form id="${theList[currTask]._id}" class="list-item">`; // create form tag
    if (theList[currTask].checked) { // check whether the task is completed
      output += `<input type="checkbox" name="${currTask}" id="${currTask}" checked onchange="UpdateTask(this)"/>`; // if task is completed, add a checked checkbox and strike the name
      output += `<label for="${currTask}" class="striked">${theList[currTask].name}</label>`;
    }
    else {
      output += `<input type="checkbox" name="${currTask}" id="${currTask}" onchange="UpdateTask(this)"/>`; // if task is not completed, add blank checkbox and normal text for the name
      output += `<label for="${currTask}">${theList[currTask].name}</label>`;
    }
    output += `<input type="button" value="X" onclick="DeleteTask(this)"/>`; // Add the delete button for the task
    output += "</form>";
  }
  result.innerHTML = output;
}

// Gets the data as an array from server and modifies HTML to show it
async function GetTasks() {
  let res = await http.get("/tm/tasks");
  if (!res) {
    result.innerHTML = "You have no remaining tasks."
    return;
  }
  theList = res.task;
  ShowTasks();
}

/* Listener Functions */
async function AddTask(e) {
  e.preventDefault(); // Prevent the browser from creating its own request to the server
  if (input.value == "") { // If there is no input, prompt user for input and return
    formAlert.innerText = "Please enter a valid input.";
    setTimeout(() => {
      formAlert.innerText = "";
    }, 2000);
    return;
  }
  let newTask = { // create task object
    name: input.value,
    checked: false
  };
  await http.post("/tm/tasks", newTask); // send POST request for the new task
  await main(); // Rewrite the tasks
  input.value = ""; // Clear input field
}

async function DeleteTask(object) {
  await http.delete(`/tm/tasks/${object.parentElement.id}`);
  await main();
}

async function UpdateTask(object) {
  let updatedTask = {
    name: object.nextSibling.innerText,
    checked: object.checked
  };
  await http.put(`/tm/tasks/${object.parentElement.id}`, updatedTask);
  object.nextSibling.classList.toggle("striked");
}

// Loading functions
function showLoading() {
  result.innerHTML = "Loading...";
}

async function main() {
  addButton.disabled = true;
  showLoading();

  await GetTasks();

  addButton.disabled = false;
}

main();
