const http = new coreHTTP;

// Block Variables
let theList = [];

// setup selectors
const result = document.querySelector(".result");
const input =  document.querySelector("#listitem");
const formAlert =  document.querySelector(".form-alert");
const addButton =  document.querySelector(".add-btn");
const delButton =  document.querySelector(".del-btn");

// Listeners
addButton.addEventListener("click", httpPost);
delButton.addEventListener("click", httpDelete);

/* Helper Functions */
function ShowList() {
  let output = "<ul>";
  for (const itm of theList) {
    output += `<li>${itm}</li>`;
  }
  output += "</ul>";
  result.innerHTML = output;
}

// Gets the data as an array from server and modifies HTML to show it
async function GetList() {
  theList = await http.get("/api");
  ShowList();
}

// Sends a POST request to the server to rewrite the data and waits for a response before updating HTML with new data
async function WriteList() {
  await http.post("/api", theList);
  ShowList();
}

/* Listener Functions */
async function httpPost(e) {
  e.preventDefault(); // Prevent the browser from creating its own request to the server
  if (input.value == "") { // If there is no input, prompt user for input and return
    formAlert.innerText = "Please enter a valid input.";
    setTimeout(() => {
      formAlert.innerText = "";
    }, 2000);
    return;
  }
  theList[theList.length] = input.value; // Add data to POST to array
  await WriteList(); // Send new array to server for POST
  input.value = ""; // Clear input field
}

async function httpDelete(e) {
  e.preventDefault(); // Prevent the browser from creating its own request to the server
  if (input.value == "") { // If there is no input, prompt user for input and return
    formAlert.innerText = "Please enter a valid input.";
    setTimeout(() => {
      formAlert.innerText = "";
    }, 2000);
    return;
  }
  theListOrigLength = theList.length; // Take note of the length of the array before beginning delete
  for (let i = 0; i < theList.length; i++) { // Iterate through array and delete any entry that matches search query
    if (theList[i] == input.value) {
      theList.splice(i, 1); // Remove one entry from array at position i
      i--; // Roll i back if an entry is deleted so that the entry that takes its place is checked, also
    }
  }
  if (theListOrigLength == theList.length) { // If the array's original length is the same as the array's length now then no elements were deleted -> search query was invalid
    formAlert.innerText = "The value you entered does not exist. Please try again.";
    input.value = "";
    setTimeout(() => {
      formAlert.innerText = "";
    }, 2000);
    return;
  }
  await WriteList(); // With the updated array now completed, wait for POST request to be sent to server
  input.value = ""; // Clear input field
}

// Loading functions
function showLoading() {
  result.innerHTML = "Loading...";
}

async function main() {
  addButton.disabled = true;
  delButton.disabled = true;
  showLoading();

  await GetList();

  addButton.disabled = false;
  delButton.disabled = false;
}

main();