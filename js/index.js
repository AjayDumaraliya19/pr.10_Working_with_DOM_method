// Form validation
function formValidation(event) {
    event.preventDefault(); // Prevent default form submission

    const firstNameInput = document.getElementById('fnam');
    const lastNameInput = document.getElementById('lnam');
    const phoneInput = document.getElementById('mobile');
    const dobInput = document.getElementById('dobField');
    const emailInput = document.getElementById('mail');
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const addressInput = document.getElementById('add');

    // Validate first name
    if (firstNameInput.value.trim() === '') {
        document.getElementById('firstNameError').textContent = 'Please enter your first name';
        firstNameInput.focus();
        return false;
    } else {
        document.getElementById('firstNameError').textContent = '';
    }

    // Validate last name
    if (lastNameInput.value.trim() === '') {
        document.getElementById('lastNameError').textContent = 'Please enter your last name';
        lastNameInput.focus();
        return false;
    } else {
        document.getElementById('lastNameError').textContent = '';
    }

    // Validate phone number
    if (phoneInput.value.trim() === '') {
        document.getElementById('phoneError').textContent = 'Please enter your mobile number';
        phoneInput.focus();
        return false;
    } else {
        document.getElementById('phoneError').textContent = '';
    }

    // Validate date of birth
    if (dobInput.value.trim() === '') {
        document.getElementById('dobError').textContent = 'Please enter your date of birth';
        dobInput.focus();
        return false;
    } else {
        document.getElementById('dobError').textContent = '';
    }

    // Validate email
    if (emailInput.value.trim() === '') {
        document.getElementById('emailError').textContent = 'Please enter your email';
        emailInput.focus();
        return false;
    } else {
        document.getElementById('emailError').textContent = '';
    }

    // Validate gender
    let genderSelected = false;
    genderInputs.forEach(input => {
        if (input.checked) {
            genderSelected = true;
        }
    });
    if (!genderSelected) {
        document.getElementById('genderError').textContent = 'Please select your gender';
        return false;
    } else {
        document.getElementById('genderError').textContent = '';
    }

    // Validate address
    if (addressInput.value.trim() === '') {
        document.getElementById('addressError').textContent = 'Please enter your address';
        addressInput.focus();
        return false;
    } else {
        document.getElementById('addressError').textContent = '';
    }
    // Store form data in local storage
    storeFormData();

    return false; // Return false to prevent form submission
}

// Store form data in local storage
function storeFormData() {
    const firstName = document.getElementById('fnam').value.trim();
    const lastName = document.getElementById('lnam').value.trim();
    const phone = document.getElementById('mobile').value.trim();
    const dob = document.getElementById('dobField').value.trim();
    const email = document.getElementById('mail').value.trim();
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    let gender = '';
    genderInputs.forEach(input => {
        if (input.checked) {
            gender = input.value;
        }
    });
    const address = document.getElementById('add').value.trim();

    // Create a unique ID for each entry
    const entryId = Date.now().toString();

    // Create an object with form data
    const formData = {
        id: entryId,
        firstName,
        lastName,
        phone,
        dob,
        email,
        gender,
        address
    };

    // Get existing data from local storage or initialize an empty array
    let userData = JSON.parse(localStorage.getItem('userData')) || [];

    // Add new form data to the array
    userData.push(formData);

    // Store the updated data back in local storage
    localStorage.setItem('userData', JSON.stringify(userData));

    // Clear the form inputs
    document.getElementById('fnam').value = '';
    document.getElementById('lnam').value = '';
    document.getElementById('mobile').value = '';
    document.getElementById('dobField').value = '';
    document.getElementById('mail').value = '';
    document.querySelectorAll('input[name="gender"]').forEach(input => {
        input.checked = false;
    });
    document.getElementById('add').value = '';

    // Reload the table to display the updated data
    loadTableData();
}

// Load table data from local storage
function loadTableData() {
    const dataTable = document.getElementById('dataTable');
    const maleNamesTable = document.getElementById('maleNamesTable');

    // Clear existing table data
    dataTable.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Phone number</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Action</th>
        </tr>
    `;
    maleNamesTable.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Phone number</th>
            <th>Email</th>
            <th>Action</th>
        </tr>
    `;

    // Get stored user data from local storage
    const userData = JSON.parse(localStorage.getItem('userData')) || [];

    // Iterate over the user data and populate the tables
    userData.forEach(data => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.firstName} ${data.lastName}</td>
            <td>${data.phone}</td>
            <td>${data.dob}</td>
            <td>${data.email}</td>
            <td>${data.gender}</td>
            <td>${data.address}</td>
            <td>
                <button onclick="editData('${data.id}')">Edit</button>
                <button onclick="deleteData('${data.id}')">Delete</button>
            </td>
        `;
        dataTable.appendChild(row);

        if (data.gender === 'male') {
            const maleRow = document.createElement('tr');
            maleRow.innerHTML = `
                <td>${data.firstName} ${data.lastName}</td>
                <td>${data.phone}</td>
                <td>${data.email}</td>
                <td>
                    <button onclick="updateData('${data.id}')">Update</button>
                    <button onclick="deleteData('${data.id}')">Delete</button>
                </td>
            `;
            maleNamesTable.appendChild(maleRow);
        }
    });
}

// Edit user data
function editData(id) {
    const userData = JSON.parse(localStorage.getItem('userData')) || [];

    // Find the data with the given ID
    const data = userData.find(data => data.id === id);

    if (data) {
        // Set the form inputs with the existing data
        document.getElementById('fnam').value = data.firstName;
        document.getElementById('lnam').value = data.lastName;
        document.getElementById('mobile').value = data.phone;
        document.getElementById('dobField').value = data.dob;
        document.getElementById('mail').value = data.email;
        document.querySelectorAll('input[name="gender"]').forEach(input => {
            input.checked = (input.value === data.gender);
        });
        document.getElementById('add').value = data.address;

        // Remove the data from the array
        const index = userData.indexOf(data);
        userData.splice(index, 1);

        // Store the updated data back in local storage
        localStorage.setItem('userData', JSON.stringify(userData));

        // Reload the table to display the updated data
        loadTableData();
    }
}

// Update user data
function updateData(id) {
    // Validate the form inputs
    if (!formValidation()) {
        return;
    }

    const userData = JSON.parse(localStorage.getItem('userData')) || [];

    // Find the data with the given ID
    const data = userData.find(data => data.id === id);

    if (data) {
        // Update the existing data with the new values
        data.firstName = document.getElementById('fnam').value.trim();
        data.lastName = document.getElementById('lnam').value.trim();
        data.phone = document.getElementById('mobile').value.trim();
        data.dob = document.getElementById('dobField').value.trim();
        data.email = document.getElementById('mail').value.trim();
        document.querySelectorAll('input[name="gender"]').forEach(input => {
            if (input.checked) {
                data.gender = input.value;
            }
        });
        data.address = document.getElementById('add').value.trim();

        // Store the updated data back in local storage
        localStorage.setItem('userData', JSON.stringify(userData));

        // Clear the form inputs
        document.getElementById('fnam').value = '';
        document.getElementById('lnam').value = '';
        document.getElementById('mobile').value = '';
        document.getElementById('dobField').value = '';
        document.getElementById('mail').value = '';
        document.querySelectorAll('input[name="gender"]').forEach(input => {
            input.checked = false;
        });
        document.getElementById('add').value = '';

        // Reload the table to display the updated data
        loadTableData();
    }
}

// Delete user data
function deleteData(id) {
    const userData = JSON.parse(localStorage.getItem('userData')) || [];

    // Find the data with the given ID
    const data = userData.find(data => data.id === id);

    if (data) {
        // Remove the data from the array
        const index = userData.indexOf(data);
        userData.splice(index, 1);

        // Store the updated data back in local storage
        localStorage.setItem('userData', JSON.stringify(userData));

        // Reload the table to display the updated data
        loadTableData();
    }
}

// Load table data when the page loads
loadTableData();