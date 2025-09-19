document.addEventListener('DOMContentLoaded', function() {

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzFLvWVGopeA0PYxJ25z5QZVMXcNHuRoswduEmbd2Amq5M4rLyN-VVfyrk8scYGG_JQ/exec";

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

  // 3) Contact form simple
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

  // 5) Registro postulante
  const registroForm = document.getElementById('registroPostulante');
  if (registroForm) {
    registroForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(registroForm).entries());
      data.action = "register";

      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const json = await res.json();
      alert(json.message);
      if(json.success) registroForm.reset();
    });
  }

  // 6) Login / consultar estado
  const loginForm = document.getElementById('loginPostulante');
  const estadoDiv = document.getElementById('estadoResultado');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(loginForm).entries());
      data.action = "login";

      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if(json.success){
        const d = json.data;
        estadoDiv.innerHTML = `
          <p><b>Nombre:</b> ${d.nombre}</p>
          <p><b>DNI:</b> ${d.dni}</p>
          <p><b>Correo:</b> ${d.correo}</p>
          <p><b>Clave:</b> ${d.clave}</p>
          <p><b>Estado:</b> ${d.estado}</p>
          <p><b>Fecha de Registro:</b> ${new Date(d.fecha).toLocaleDateString()}</p>
        `;
      } else {
        estadoDiv.textContent = json.message;
      }
    });
  }

});
