function clearLocalStorage() {
    localStorage.clear();
    // Render an empty table after clearing localStorage
    renderTable();
    alert("localStorage cleared successfully");
}


// Retrieve data from local storage or initialize an empty array
data = JSON.parse(localStorage.getItem('data')) || [];

fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((jsonData) => {
        data = jsonData;
        renderTable();
    })
    .catch((error) => console.log(error));

function renderTable() {
    let table = "<table>";
    table += "<tr><th>ID</th><th>Title</th><th>Body</th><th>Actions</th></tr>";
    tableContainer.style.border = "3px solid black";

    data.forEach((item) => {
        table += `<tr>
                <td class="px-5">${item.id}</td>
                <td class="px-5">${item.title}</td>
                <td class="px-5">${item.body}</td>
                <td>
                  <button class="btn btn-danger px-3" onclick="del(${item.id})">Delete</button>
                  <button type="button" class="btn btn-primary px-3" onclick="editdata(${item.id})" data-bs-toggle="modal" data-bs-target="#myModal">
                    Edit
                  </button>
                </td>
              </tr>`;
    });

    table += "</table>";

    document.getElementById("tableContainer").innerHTML = table;
    localStorage.setItem('data', JSON.stringify(data));
}

function del(id) {
    // Find the index of the user in the data array
    const index = data.findIndex((item) => item.id === id);

    if (index !== -1) {
        // Remove the user from the data array
        // data.splice(index, 1);
        const deletedRecord = data.splice(index, 1)[0];

        // Store the updated data array in local storage
        localStorage.setItem('data', JSON.stringify(data));

        // Render the updated table
        renderTable();
        // alert("Delete data successfuly");
        alert(
            `Deleted record:\nUser ID: ${deletedRecord.id}\nTitle: ${deletedRecord.title}\nBody: ${deletedRecord.body}`);
    }
}


function editdata(id) {
    // Find the index of the user in the data array
    const index = data.findIndex((item) => item.id === id);

    if (index !== -1) {
        const title = prompt("Enter the new title:");
        const body = prompt("Enter the new body:");

        // Update the values in the data array
        data[index].title = title;
        data[index].body = body;

        // Store the updated data array in local storage
        localStorage.setItem('data', JSON.stringify(data));

        // Render the updated table
        renderTable();
        alert("Data Edit successfuly");
    }
}

function addData() {
    const title = prompt("Enter the title:");
    const body = prompt("Enter the body:");

    // Create a new data object
    const newData = {
        id: data.length + 1, // Generate a new ID for the data
        title: title,
        body: body,
    };

    // Push the new data object to the data array
    data.push(newData);

    // Store the updated data array in local storage
    localStorage.setItem("data", JSON.stringify(data));

    // Render the updated table
    renderTable();
    alert("Data added successfully");
}