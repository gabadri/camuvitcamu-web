const DEPLOY_URL = "https://script.google.com/macros/s/AKfycbzFLvWVGopeA0PYxJ25z5QZVMXcNHuRoswduEmbd2Amq5M4rLyN-VVfyrk8scYGG_JQ/exec"; // Pega aquí tu URL publicada

// Registrar postulante
document.getElementById("formRegistro").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    action: "register",
    nombre: document.getElementById("nombre").value,
    dni: document.getElementById("dni").value,
    correo: document.getElementById("correo").value,
    carrera: document.getElementById("carrera").value,
    nivel: document.getElementById("nivel").value,
    cv: document.getElementById("cv").value,
  };

  try {
    const res = await fetch(DEPLOY_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const json = await res.json();
    alert(json.message);
  } catch (err) {
    alert("Error al conectar con el servidor: " + err);
  }
});

// Login postulante
document.getElementById("formLogin").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    action: "login",
    correo: document.getElementById("loginCorreo").value,
    clave: document.getElementById("loginClave").value,
  };

  try {
    const res = await fetch(DEPLOY_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const json = await res.json();
    if (json.success) {
      alert("Bienvenido " + json.data.nombre + ". Estado: " + json.data.estado);
    } else {
      alert(json.message);
    }
  } catch (err) {
    alert("Error al conectar con el servidor: " + err);
  }
});

