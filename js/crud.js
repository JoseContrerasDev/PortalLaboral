// crud.js

// Función para guardar datos
document.getElementById('saveBtn').addEventListener('click', function() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const rol = document.getElementById('rol').value;
    const email = document.getElementById('email').value;
    const presencialidad = document.getElementById('presencialidad').value;
    const pais = document.getElementById('pais').value;

    const datos = {
        nombre, apellido, rol, email, presencialidad, pais
    };

    let registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.push(datos);
    localStorage.setItem('registros', JSON.stringify(registros));
    mostrarDatos();
});

// Función para mostrar datos en la tabla
function mostrarDatos() {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    const tbody = document.querySelector('#dataTable tbody');
    tbody.innerHTML = '';

    registros.forEach((registro, index) => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${registro.nombre}</td>
            <td>${registro.apellido}</td>
            <td>${registro.rol}</td>
            <td>${registro.email}</td>
            <td>${registro.presencialidad}</td>
            <td>${registro.pais}</td>
            <td>
                <button onclick="editarRegistro(${index})">Editar</button>
                <button onclick="eliminarRegistro(${index})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

// Función para editar un registro
function editarRegistro(index) {
    const registros = JSON.parse(localStorage.getItem('registros'));
    const registro = registros[index];

    document.getElementById('nombre').value = registro.nombre;
    document.getElementById('apellido').value = registro.apellido;
    document.getElementById('rol').value = registro.rol;
    document.getElementById('email').value = registro.email;
    document.getElementById('presencialidad').value = registro.presencialidad;
    document.getElementById('pais').value = registro.pais;

    registros.splice(index, 1);
    localStorage.setItem('registros', JSON.stringify(registros));
    mostrarDatos();
}

// Función para eliminar un registro
function eliminarRegistro(index) {
    let registros = JSON.parse(localStorage.getItem('registros'));
    registros.splice(index, 1);
    localStorage.setItem('registros', JSON.stringify(registros));
    mostrarDatos();
}

// Mostrar datos al cargar la página
document.addEventListener('DOMContentLoaded', mostrarDatos);
