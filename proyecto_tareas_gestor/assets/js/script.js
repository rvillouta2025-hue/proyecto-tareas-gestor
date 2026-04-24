const form = document.getElementById("form-tarea");

// CREAR TAREA
function crearTarea(descripcion, prioridad, fecha) {
    const tarea = document.createElement("div");
    tarea.classList.add("tarea", prioridad);

    tarea.innerHTML = `
        <p>${descripcion}</p>
        <small>${prioridad} - ${fecha}</small><br>
        <button class="mover">Mover</button>
        <button class="eliminar">Eliminar</button>
    `;

    return tarea;
}

// HISTORIAL
function agregarAlHistorial(texto) {
    const historial = document.getElementById("historial-container");

    const item = document.createElement("div");
    item.classList.add("historial-item");

    item.innerHTML = `
        <span class="texto">${texto}</span>
        <div class="acciones">
            <button class="editar-historial">Editar</button>
            <button class="eliminar-historial">X</button>
        </div>
    `;

    historial.prepend(item);
}

// SUBMIT
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const descripcion = document.getElementById("descripcion").value;
    const prioridad = document.getElementById("prioridad").value;
    const fecha = document.getElementById("fecha").value;

    if (!descripcion || !prioridad || !fecha) {
        alert("Completa todos los campos");
        return;
    }

    const tarea = crearTarea(descripcion, prioridad, fecha);

    document.querySelector("#pendientes .tareas-container").appendChild(tarea);

    actualizarContadores();

    form.reset();
});

// CONTADORES
function actualizarContadores() {
    document.querySelectorAll(".columna").forEach(col => {
        const count = col.querySelectorAll(".tarea").length;
        col.querySelector(".contador").textContent = count;
    });
}

// EVENTOS
document.addEventListener("click", function(e) {

    // MOVER
    if (e.target.classList.contains("mover")) {
        const tarea = e.target.closest(".tarea");
        const columna = tarea.closest(".columna").id;

        if (columna === "pendientes") {
            document.querySelector("#en-progreso .tareas-container").appendChild(tarea);
        } else if (columna === "en-progreso") {
            document.querySelector("#completadas .tareas-container").appendChild(tarea);
            agregarAlHistorial("Tarea completada");
        }

        actualizarContadores();
    }

    // ELIMINAR TAREA
    if (e.target.classList.contains("eliminar")) {
        const tarea = e.target.closest(".tarea");
        const texto = tarea.querySelector("p").textContent;

        agregarAlHistorial("Tarea eliminada: " + texto);

        tarea.remove();
        actualizarContadores();
    }

    // EDITAR HISTORIAL
    if (e.target.classList.contains("editar-historial")) {
        const item = e.target.closest(".historial-item");
        const texto = item.querySelector(".texto");

        const nuevoTexto = prompt("Editar:", texto.textContent);
        if (nuevoTexto) texto.textContent = nuevoTexto;
    }

    // ELIMINAR HISTORIAL
    if (e.target.classList.contains("eliminar-historial")) {
        e.target.closest(".historial-item").remove();
    }

});