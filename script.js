document.addEventListener('DOMContentLoaded', function() {

  // 1) Toggle mobile menu
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // close menu when clicking a link (mobile)
    navLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') navLinks.classList.remove('active');
    });
  }

  // 2) Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 3) Contact form submit (simple)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Gracias por contactarnos. Te responderemos pronto.');
      form.reset();
    });
  }

  // 4) Simple scroll reveal using IntersectionObserver
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
    // fallback: show all
    reveals.forEach(el => el.classList.add('active'));
  }

  // 5) Registro de candidatos
  const registerForm = document.getElementById('registroForm'); // ID corregido
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const msgDiv = document.getElementById('msg'); // contenedor para mensajes
      if (msgDiv) msgDiv.innerHTML = "Enviando...";

      // Cambia esta URL por la de tu WebApp de Apps Script
      const webAppUrl = "https://script.google.com/macros/s/AKfycby6J8yH2GONYhMf-GGu72WSL1Hee1UJp29VxRMjo5CZxoim1tMX_CZfmZQQaDmid33YCQ/exec";

      // FormData para enviar todos los campos, incluso archivos
      const formData = new FormData(registerForm);

      try {
        const res = await fetch(webAppUrl, {
          method: "POST",
          body: formData
        });
        const json = await res.json();

        if (json.status === "success") {
          if (msgDiv) msgDiv.innerHTML = `<div class="alert alert-success">${json.message}</div>`;
          registerForm.reset();
        } else {
          if (msgDiv) msgDiv.innerHTML = `<div class="alert alert-danger">${json.message}</div>`;
        }
      } catch (err) {
        if (msgDiv) msgDiv.innerHTML = `<div class="alert alert-danger">Error: ${err.message}</div>`;
      }
    });
  }

});
