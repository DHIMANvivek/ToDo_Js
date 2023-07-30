document.addEventListener("DOMContentLoaded", function () {
    var selectedRow = null;

    // Show Alerts
    function showAlert(message, className) {
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const main = document.querySelector(".main");
        container.insertBefore(div, main);

        setTimeout(() => div.remove(), 3000);
    }

    // Add Data
document.querySelector("#student-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const rollNumber = document.querySelector("#rollNumber").value;

    if (firstName.trim() === "" || lastName.trim() === "" || rollNumber.trim() === "") {
        showAlert("Please fill in all fields", "danger");
        return;
    }

    const storedData = localStorage.getItem("formData");
    let formDataArray = [];
    if (storedData) {
        formDataArray = JSON.parse(storedData);
    }

    if (selectedRow === null) {
        // Add new data to LocalStorage
        const formData = {
            firstName: firstName,
            lastName: lastName,
            rollNumber: rollNumber,
        };
        formDataArray.push(formData);
        showAlert("Student Added", "success");
    } else {
        // Update existing data in LocalStorage
        const rowIndex = selectedRow.rowIndex - 1; // Subtract 1 because of the header row
        formDataArray[rowIndex].firstName = firstName;
        formDataArray[rowIndex].lastName = lastName;
        formDataArray[rowIndex].rollNumber = rollNumber;
        showAlert("Student Info Edited", "info");
        selectedRow = null;
    }

    localStorage.setItem("formData", JSON.stringify(formDataArray));

    // Clear the form fields
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#rollNumber").value = "";

    // Refresh the table data
    const list = document.querySelector("#student-list");
    list.innerHTML = ""; // Clear existing rows
    appendDataToTable(); // Re-append the data from LocalStorage
});

    // Delete Data
document.querySelector("#student-list").addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("delete")) {
        const rowToDelete = target.parentElement.parentElement;
        rowToDelete.remove();
        showAlert("Student Data Deleted", "danger");

        const firstName = rowToDelete.children[0].textContent;
        const lastName = rowToDelete.children[1].textContent;
        const rollNumber = rowToDelete.children[2].textContent;

        // Remove from LocalStorage
        const storedData = localStorage.getItem("formData");
        if (storedData) {
            let formDataArray = JSON.parse(storedData);
            formDataArray = formDataArray.filter((student) => {
                return (
                    student.firstName !== firstName ||
                    student.lastName !== lastName ||
                    student.rollNumber !== rollNumber
                );
            });

            console.log("form data array ",formDataArray)

            localStorage.setItem("formData", JSON.stringify(formDataArray));
        }
    }
});


    // Edit Data
document.querySelector("#student-list").addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#rollNumber").value = selectedRow.children[2].textContent;
    }
});


document.querySelector("#student-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const rollNumber = document.querySelector("#rollNumber").value;

    if (firstName.trim() === "" || lastName.trim() === "" || rollNumber.trim() === "") {
        showAlert("Please fill in all fields", "danger");
        return;
    }

    const storedData = localStorage.getItem("formData");
    let formDataArray = [];
    if (storedData) {
        formDataArray = JSON.parse(storedData);
    }

    if (selectedRow !== null) {
        
        const rowIndex = selectedRow.rowIndex - 1; 
        formDataArray[rowIndex].firstName = firstName;
        formDataArray[rowIndex].lastName = lastName;
        formDataArray[rowIndex].rollNumber = rollNumber;

        localStorage.setItem("formData", JSON.stringify(formDataArray));
        showAlert("Student Info Edited", "info");
        selectedRow = null;

        
        const list = document.querySelector("#student-list");
        list.innerHTML = ""; // Clear existing rows
        //appendDataToTable(); // Re-append the data from LocalStorage

        // Clear the form fields
        document.querySelector("#firstName").value = "";
        document.querySelector("#lastName").value = "";
        document.querySelector("#rollNumber").value = "";
    }
});


    // Store LocalStorage
    document.querySelector("#student-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const rollNumber = document.querySelector("#rollNumber").value;

    if (firstName.trim() === "" || lastName.trim() === "" || rollNumber.trim() === "") {
        showAlert("Please fill in all fields", "danger");
        return;
    }

    const storedData = localStorage.getItem("formData");
    let formDataArray = [];
    if (storedData) {
        formDataArray = JSON.parse(storedData);
    }

    if (selectedRow === null) {
        // Add new data to LocalStorage
        const formData = {
            firstName: firstName,
            lastName: lastName,
            rollNumber: rollNumber,
        };
        formDataArray.push(formData);
        showAlert("Student Added", "success");
    } else {
        // Update existing data in LocalStorage
        const rowIndex = selectedRow.rowIndex - 1; // Subtract 1 because of the header row
        formDataArray[rowIndex].firstName = firstName;
        formDataArray[rowIndex].lastName = lastName;
        formDataArray[rowIndex].rollNumber = rollNumber;
        showAlert("Student Info Edited", "info");
        selectedRow = null;

        // Save the modified array back to LocalStorage
        localStorage.setItem("formData", JSON.stringify(formDataArray));
    }

    // Clear the form fields
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#rollNumber").value = "";

    // Refresh the table data
    const list = document.querySelector("#student-list");
    list.innerHTML = ""; // Clear existing rows
    appendDataToTable(); // Re-append the data from LocalStorage
});


    // Function to append LocalStorage data to the table
function appendDataToTable() {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
        const formData = JSON.parse(storedData);
        const list = document.querySelector("#student-list");

        formData.forEach((student) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td>${student.rollNumber}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                </td>
            `;

            list.appendChild(row);
        });

        console.log(JSON.stringify(formData));
        console.log("type is ", typeof formData);
    }
}
    // Append the data to the table after storing it in LocalStorage
    appendDataToTable();
});
