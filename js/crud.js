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

            // Si estamos editando una fila, la actualizamos
            if (editIndex !== null) {
                const row = document.getElementById('dataTable').getElementsByTagName('tbody')[0].rows[editIndex];
                row.cells[0].textContent = nombre;
                row.cells[1].textContent = apellido;
                row.cells[2].textContent = rol;
                row.cells[3].textContent = email;
                row.cells[4].textContent = presencialidad;
                row.cells[5].textContent = pais;
                row.cells[6].innerHTML = `<img src="${imageDataUrl}" alt="Imagen del rol" width="50">`;
            } else {
                // Agregar nueva fila si no estamos editando
                const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
                const newRow = table.insertRow();

                newRow.innerHTML = `
                    <td>${nombre}</td>
                    <td>${apellido}</td>
                    <td>${rol}</td>
                    <td>${email}</td>
                    <td>${presencialidad}</td>
                    <td>${pais}</td>
                    <td><img src="${imageDataUrl}" alt="Imagen del rol" width="50"></td>
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
                    newRow.remove();
                });
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
