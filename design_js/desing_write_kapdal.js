/* ============================
    LISTA DINÁMICA DE CURSOS
============================= */

const kapdalCursosDisponibles = [
    "Diseño Arquitectónico",
    "Metodología BIM",
    "Excel Profesional",
    "AutoCAD 2D & 3D",
    "Gestión de Proyectos",
    "Marketing Digital"
];

/* ============================
    CARGAR CURSOS EN SELECT
============================= */

const selectCursos = document.getElementById("kapdalCurso");

kapdalCursosDisponibles.forEach(curso => {
    let option = document.createElement("option");
    option.value = curso;
    option.textContent = curso;
    selectCursos.appendChild(option);
});


/* ============================
    VALIDACIÓN + WHATSAPP
============================= */

document.getElementById("kapdalForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("kapdalNombre").value.trim();
    const celular = document.getElementById("kapdalCelular").value.trim();
    const email = document.getElementById("kapdalEmail").value.trim();
    const pais = document.getElementById("kapdalPais").value.trim();
    const curso = document.getElementById("kapdalCurso").value.trim();
    const mensaje = document.getElementById("kapdalMensaje").value.trim();

    if (!nombre || !celular || !email || !pais || !curso || !mensaje) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    let numeroWhatsApp = "51918347875"; // <-- Pon tu número aquí

    let texto = `Hola, deseo más información:%0A
Nombre: ${nombre}%0A
Celular: ${celular}%0A
Email: ${email}%0A
País: ${pais}%0A
Curso: ${curso}%0A
Mensaje: ${mensaje}`;

    let url = `https://wa.me/${numeroWhatsApp}?text=${texto}`;

    window.open(url, "_blank");
});
