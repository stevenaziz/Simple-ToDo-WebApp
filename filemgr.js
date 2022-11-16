// Import Node.js filesystem modules
const fs = require("fs");
const fsPromises = require("fs").promises;

// Gets data from file and sends it back to caller
async function ReadData() {
  try {
    const items = await fsPromises.readFile('./listdata.json','utf-8');
    return items;
  } catch (error) {
    console.log(error);
  }
}

// Uses dataOut parameter to overwrite the entire JSON file
async function WriteData(dataOut) { // dataOut should be a JSON object
  try {
    fsPromises.writeFile('./listdata.json', dataOut);
  } catch (error) {
    console.log(error);
  }
}

// Export this functionality for other JS files in back-end to use
exports.ReadData = ReadData;
exports.WriteData = WriteData;