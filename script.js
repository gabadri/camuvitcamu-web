// script.js

// ====== NAVBAR RESPONSIVE ======
document.getElementById("navToggle").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("active");
});

// ====== ANIMACIONES SCROLL ======
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let elementTop = reveals[i].getBoundingClientRect().top;
    let elementVisible = 100;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
});

// ====== AÑO AUTOMÁTICO EN FOOTER ======
document.getElementById("year").textContent = new Date().getFullYear();

// ====== SIMULACIÓN BASE DE DATOS (localStorage) ======
let postulantes = JSON.parse(localStorage.getItem("postulantes")) || [];

// ====== REGISTRO DE POSTULANTE ======
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = this.name.value;
  const dni = this.dni.value;
  const email = this.email.value;
  const career = this.career.value;
  const education = this.education.value;
  const cv = this.cv.value;

  // Generar clave de acceso única
  const key = Math.random().toString(36).substring(2, 8).toUpperCase();

  // Guardar postulante en memoria (localStorage)
  const postulante = { name, dni, email, career, education, cv, key, estado: "En revisión" };
  postulantes.push(postulante);
  localStorage.setItem("postulantes", JSON.stringify(postulantes));

  alert(`Registro exitoso. Tu clave de acceso es: ${key}`);
  this.reset();
});

// ====== CONSULTA DE ESTADO ======
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = this.email.value;
  const key = this.key.value;

  const postulante = postulantes.find(p => p.email === email && p.key === key);

  const statusDiv = document.getElementById("statusResult");
  if (postulante) {
    statusDiv.innerHTML = `
      <div class="alert alert-success">
        Hola <strong>${postulante.name}</strong>, tu postulación está en estado: 
        <strong>${postulante.estado}</strong>.
      </div>`;
  } else {
    statusDiv.innerHTML = `
      <div class="alert alert-danger">
        No se encontró un registro con esos datos. Verifica tu correo y clave.
      </div>`;
  }
});

// ====== FORMULARIO DE CONTACTO ======
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Gracias por contactarnos. Te responderemos pronto.");
  this.reset();
});
