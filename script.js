document.addEventListener('DOMContentLoaded', function() {

  // -----------------------------
  // 1) Toggle mobile menu
  // -----------------------------
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

  // -----------------------------
  // 2) Year in footer
  // -----------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // -----------------------------
  // 3) Contact form (simple)
  // -----------------------------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Gracias por contactarnos. Te responderemos pronto.');
      contactForm.reset();
    });
  }

  // -----------------------------
  // 4) Registro de candidatos
  // -----------------------------
  const registroForm = document.getElementById('registroForm');
  if (registroForm) {
    registroForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const msgDiv = document.getElementById('msg') || document.createElement('div');
      if (!msgDiv.id) msgDiv.id = 'msg';
      registroForm.parentNode.insertBefore(msgDiv, registroForm.nextSibling);

      msgDiv.innerHTML = 'Enviando...';

      // URL de tu Web App de Google Apps Script
      const webAppUrl = "https://script.google.com/macros/s/AKfycbzPAltwqmkEcfg5Lbs5xYcJ84BmbNt8Ogd3cLkbqhdQKyiYPfuUbWGp4pAWNeycK_Hg8w/exec";

      // Crear objeto de datos
      const data = {
        dni: document.getElementById('dni').value.trim(),
        nombre: document.getElementById('nombre').value.trim(),
        email: document.getElementById('email').value.trim()
      };

      try {
        const res = await fetch(webAppUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const json = await res.json();

        if (json.status === 'success') {
          msgDiv.innerHTML = `<div class="alert alert-success">${json.message}</div>`;
          registroForm.reset();
        } else {
          msgDiv.innerHTML = `<div class="alert alert-danger">${json.message}</div>`;
        }

      } catch (err) {
        console.error('Error al registrar:', err);
        msgDiv.innerHTML = `<div class="alert alert-danger">Ocurrió un error. Intenta de nuevo.</div>`;
      }

    });
  }

  // -----------------------------
  // 5) Simple scroll reveal
  // -----------------------------
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

});

});



