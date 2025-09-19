document.addEventListener('DOMContentLoaded', function () {

  // ====================
  // Footer año
  // ====================
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Contacto simple
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Gracias por contactarnos. Te responderemos pronto.');
      form.reset();
    });
  }

  // ====================
  // TRABAJA CON NOSOTROS
  // ====================
  const registroForm = document.getElementById('registroForm');
  const loginForm = document.getElementById('loginForm');
  const estadoDiv = document.getElementById('estadoPostulacion');

  const API_URL = "https://script.google.com/macros/s/AKfycbzFLvWVGopeA0PYxJ25z5QZVMXcNHuRoswduEmbd2Amq5M4rLyN-VVfyrk8scYGG_JQ/exec";

  // Registro
  registroForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      action: "registrar",
      nombre: document.getElementById("nombre").value,
      dni: document.getElementById("dni").value,
      correo: document.getElementById("correo").value,
      carrera: document.getElementById("carrera").value,
      nivel: document.getElementById("nivel").value,
      cv: document.getElementById("cv").value
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(data)
      });
      const result = await res.json();
      alert(result.message);
      registroForm.reset();
    } catch (err) {
      alert("Error al registrar: " + err);
    }
  });

  // Login
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      action: "login",
      correo: document.getElementById("loginCorreo").value,
      clave: document.getElementById("loginClave").value
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(data)
      });
      const result = await res.json();

      if (result.success) {
        estadoDiv.style.display = "block";
        estadoDiv.innerHTML = `
          <h3>Estado de tu postulación</h3>
          <p><b>Nombre:</b> ${result.data.nombre}</p>
          <p><b>DNI:</b> ${result.data.dni}</p>
          <p><b>Correo:</b> ${result.data.correo}</p>
          <p><b>Clave:</b> ${result.data.clave}</p>
          <p><b>Estado:</b> ${result.data.estado}</p>
          <p><b>Fecha Registro:</b> ${result.data.fecha}</p>
        `;
        loginForm.reset();
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert("Error al iniciar sesión: " + err);
    }
  });

});
