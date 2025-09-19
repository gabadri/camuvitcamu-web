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
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const msgDiv = document.getElementById('msg');
      msgDiv.innerHTML = "Enviando...";

      const webAppUrl = "TU_WEB_APP_URL"; // 👉 pega aquí la URL de tu Web App

      const formData = new URLSearchParams(new FormData(registerForm));

      try {
        const res = await fetch(webAppUrl, {
          method: "POST",
          body: formData
        });
        const json = await res.json();

        if (json.status === "success") {
          msgDiv.innerHTML = `<div class="alert alert-success">${json.message}</div>`;
          registerForm.reset();
        } else {
          msgDiv.innerHTML = `<div class="alert alert-danger">${json.message}</div>`;
        }
      } catch (err) {
        msgDiv.innerHTML = `<div class="alert alert-danger">Error: ${err.message}</div>`;
      }
    });
  }

});
