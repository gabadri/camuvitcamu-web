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

  // 2) Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 3) Contact form submit
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Gracias por contactarnos. Te responderemos pronto.');
      form.reset();
    });
  }

  // 4) Scroll reveal
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

  // =======================
  // TRABAJA CON NOSOTROS
  // =======================
  const scriptURL = "https://script.google.com/macros/s/AKfycbzFLvWVGopeA0PYxJ25z5QZVMXcNHuRoswduEmbd2Amq5M4rLyN-VVfyrk8scYGG_JQ/exec";

  // Registro de postulante
  const registroForm = document.getElementById('registroForm');
  if (registroForm) {
    registroForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(registroForm);
      // We don't set 'action' here; Apps Script default will treat as register
      try {
        const res = await fetch(scriptURL, {
          method: "POST",
          body: fd
        });
        const data = await res.json();
        alert(data.message || "Registro exitoso. Revisa tu correo.");
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
      const fd = new FormData(loginForm);

      try {
        // send action=login via query parameter so Apps Script picks it as login
        const res = await fetch(scriptURL + "?action=login", {
          method: "POST",
          body: fd
        });
        const data = await res.json();

        if (data.success) {
          estadoDiv.style.display = "block";
          const p = data.postulante;
          estadoDiv.innerHTML = `
            <p><strong>Nombre:</strong> ${p.Nombre}</p>
            <p><strong>DNI:</strong> ${p.DNI}</p>
            <p><strong>Correo:</strong> ${p.Correo}</p>
            <p><strong>Clave:</strong> ${p.Clave}</p>
            <p><strong>Estado:</strong> ${p.Estado}</p>
            <p><strong>Fecha de Registro:</strong> ${p.Fecha}</p>
            <p><strong>Carrera:</strong> ${p.Carrera || '-'}</p>
            <p><strong>Nivel Educativo:</strong> ${p.Nivel || '-'}</p>
            <p><strong>Enlace CV:</strong> ${p.CV ? `<a href="${p.CV}" target="_blank">Ver CV</a>` : '-'}</p>
          `;
        } else {
          estadoDiv.style.display = "block";
          estadoDiv.innerHTML = `<p style="color:red;">${data.message || "Credenciales incorrectas."}</p>`;
        }
      } catch (err) {
        alert("Error al consultar: " + err.message);
      }
    });
  }

});
