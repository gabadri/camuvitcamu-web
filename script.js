document.addEventListener('DOMContentLoaded', function() {

  // 1) Toggle mobile menu
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    navLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') navLinks.classList.remove('active');
    });
  }

  // 2) Año dinámico en footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 3) Formulario de contacto
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Gracias por contactarnos. Te responderemos pronto.');
      form.reset();
    });
  }

  // 4) Animación reveal
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('active'));
  }

  // =============================
  // NUEVA SECCIÓN: POSTULANTES
  // =============================

  const scriptURL = "https://script.google.com/macros/s/AKfycbzFLvWVGopeA0PYxJ25z5QZVMXcNHuRoswduEmbd2Amq5M4rLyN-VVfyrk8scYGG_JQ/exec";

  // Registro de postulante
  const registroForm = document.getElementById('registroForm');
  if (registroForm) {
    registroForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(registroForm);

      try {
        const res = await fetch(scriptURL, {
          method: "POST",
          body: formData
        });
        const data = await res.json();
        alert(data.message || "Registro exitoso. Revisa tu correo para tu clave.");
        registroForm.reset();
      } catch (err) {
        alert("Error al registrar: " + err.message);
      }
    });
  }

  // Login de postulante
  const loginForm = document.getElementById('loginForm');
  const estadoDiv = document.getElementById('estadoResultado');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(loginForm);

      try {
        const res = await fetch(scriptURL + "?action=login", {
          method: "POST",
          body: formData
        });
        const data = await res.json();

        if (data.success) {
          estadoDiv.style.display = "block";
          estadoDiv.innerHTML = `
            <p><strong>Nombre:</strong> ${data.postulante.Nombre}</p>
            <p><strong>DNI:</strong> ${data.postulante.DNI}</p>
            <p><strong>Correo:</strong> ${data.postulante.Correo}</p>
            <p><strong>Clave:</strong> ${data.postulante.Clave}</p>
            <p><strong>Estado:</strong> ${data.postulante.Estado}</p>
            <p><strong>Fecha de Registro:</strong> ${data.postulante.Fecha}</p>
          `;
        } else {
          alert(data.message || "Credenciales incorrectas.");
        }
      } catch (err) {
        alert("Error al consultar: " + err.message);
      }
    });
  }

});

