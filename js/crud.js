document.getElementById('saveBtn').addEventListener('click', function() {
    const form = document.getElementById('dataForm');
    const formData = new FormData(form);

    // Obtén los valores del formulario
    const nombre = formData.get('nombre');
    const apellido = formData.get('apellido');
    const rol = formData.get('rol');
    const email = formData.get('email');
    const presencialidad = formData.get('presencialidad');
    const pais = formData.get('pais');
    const imageFile = formData.get('rolImage');
    const editIndex = form.getAttribute('data-edit-index'); // Saber si estamos modificando

    // Verifica si se ha cargado una imagen
    if (imageFile && imageFile.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const imageDataUrl = event.target.result;

            // Crear un objeto con los datos del formulario
            const newData = {
                nombre,
                apellido,
                rol,
                email,
                presencialidad,
                pais,
                imageDataUrl
            };

            // Guardar o actualizar los datos en el local storage
            if (editIndex !== null) {
                updateDataInLocalStorage(editIndex, newData);
                updateRow(editIndex, newData);
            } else {
                addDataToLocalStorage(newData);
                addNewRow(newData);
            }

            // Limpiar formulario
            form.reset();
            form.removeAttribute('data-edit-index');
        };

        reader.readAsDataURL(imageFile);

    } else {
        alert('Por favor, selecciona una imagen válida.');
    }
});

// Función para añadir datos a una nueva fila en la tabla
function addNewRow(data) {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    newRow.innerHTML = `
        <td>${data.nombre}</td>
        <td>${data.apellido}</td>
        <td>${data.rol}</td>
        <td>${data.email}</td>
        <td>${data.presencialidad}</td>
        <td>${data.pais}</td>
        <td><img src="${data.imageDataUrl}" alt="Imagen del rol" width="50"></td>
        <td>
            <button class="editBtn">Modificar</button>
            <button class="deleteBtn">Eliminar</button>
        </td>
    `;

    // Añadir funcionalidad a los botones de modificar y eliminar
    newRow.querySelector('.editBtn').addEventListener('click', function() {
        loadRowDataToForm(newRow);
    });

    newRow.querySelector('.deleteBtn').addEventListener('click', function() {
        deleteRowAndData(newRow);
    });
}

// Función para actualizar una fila existente
function updateRow(index, data) {
    const row = document.getElementById('dataTable').getElementsByTagName('tbody')[0].rows[index];
    row.cells[0].textContent = data.nombre;
    row.cells[1].textContent = data.apellido;
    row.cells[2].textContent = data.rol;
    row.cells[3].textContent = data.email;
    row.cells[4].textContent = data.presencialidad;
    row.cells[5].textContent = data.pais;
    row.cells[6].innerHTML = `<img src="${data.imageDataUrl}" alt="Imagen del rol" width="50">`;
}

// Función para cargar los datos de la fila en el formulario
function loadRowDataToForm(row) {
    const form = document.getElementById('dataForm');
    const cells = row.getElementsByTagName('td');

    // Llenar el formulario con los datos de la fila seleccionada
    form.nombre.value = cells[0].textContent;
    form.apellido.value = cells[1].textContent;
    form.rol.value = cells[2].textContent;
    form.email.value = cells[3].textContent;
    form.presencialidad.value = cells[4].textContent;
    form.pais.value = cells[5].textContent;

    // Guardar el índice de la fila
    const rowIndex = row.rowIndex - 1; // Ajuste por el encabezado de la tabla
    form.setAttribute('data-edit-index', rowIndex);
}

// Función para añadir datos al Local Storage
function addDataToLocalStorage(data) {
    const existingData = JSON.parse(localStorage.getItem('formData')) || [];
    existingData.push(data);
    localStorage.setItem('formData', JSON.stringify(existingData));
}

// Función para actualizar datos en el Local Storage
function updateDataInLocalStorage(index, data) {
    const existingData = JSON.parse(localStorage.getItem('formData')) || [];
    existingData[index] = data;
    localStorage.setItem('formData', JSON.stringify(existingData));
}

// Función para eliminar una fila y sus datos del Local Storage
function deleteRowAndData(row) {
    const rowIndex = row.rowIndex - 1; // Ajuste por el encabezado de la tabla
    row.remove();
    const existingData = JSON.parse(localStorage.getItem('formData')) || [];
    existingData.splice(rowIndex, 1);
    localStorage.setItem('formData', JSON.stringify(existingData));
    
}
// Función para añadir datos a una nueva fila en la tabla
function addNewRow(data) {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    newRow.innerHTML = `
        <td class="tachable">${data.nombre}</td>
        <td class="tachable">${data.apellido}</td>
        <td class="tachable">${data.rol}</td>
        <td class="tachable">${data.email}</td>
        <td class="tachable">${data.presencialidad}</td>
        <td class="tachable">${data.pais}</td>
        <td><img src="${data.imageDataUrl}" alt="Imagen del rol" width="50"></td>
        <td>
            <button class="editBtn">Modificar</button>
            <button class="deleteBtn">Eliminar</button>
            <button class="tacharBtn">Tachar</button>
        </td>
    `;

    // Añadir funcionalidad a los botones de modificar, eliminar y tachar
    newRow.querySelector('.editBtn').addEventListener('click', function() {
        loadRowDataToForm(newRow);
    });

    newRow.querySelector('.deleteBtn').addEventListener('click', function() {
        deleteRowAndData(newRow);
    });

    newRow.querySelector('.tacharBtn').addEventListener('click', function() {
        toggleStrikeThrough(newRow);
    });
}

// Función para tachar o destachar el texto de una fila
function toggleStrikeThrough(row) {
    const cells = row.getElementsByClassName('tachable');
    const isStriked = cells[0].classList.contains('striked');

    // Cambiar el estado de cada celda
    for (let cell of cells) {
        if (isStriked) {
            cell.classList.remove('striked');
        } else {
            cell.classList.add('striked');
        }
    }

    // Actualizar el estado en el Local Storage
    const rowIndex = row.rowIndex - 1; // Ajuste por el encabezado de la tabla
    const existingData = JSON.parse(localStorage.getItem('formData')) || [];
    existingData[rowIndex].isStriked = !isStriked;
    localStorage.setItem('formData', JSON.stringify(existingData));
}

// Función para cargar datos desde el Local Storage al iniciar la página
function loadFromLocalStorage() {
    const existingData = JSON.parse(localStorage.getItem('formData')) || [];
    existingData.forEach(data => {
        addNewRow(data);
        // Marcar la fila si estaba tachada previamente
        if (data.isStriked) {
            const rows = document.getElementById('dataTable').getElementsByTagName('tbody')[0].rows;
            const row = rows[rows.length - 1];
            toggleStrikeThrough(row);
        }
    });
}
// prueba


// Función para cargar datos desde el Local Storage al iniciar la página
function loadFromLocalStorage() {
    const existingData = JSON.parse(localStorage.getItem('formData')) || [];
    existingData.forEach(data => {
        addNewRow(data);
    });
}

// Cargar datos al inicio
document.addEventListener('DOMContentLoaded', loadFromLocalStorage);
