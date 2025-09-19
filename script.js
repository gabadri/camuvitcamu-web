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

  // 3) Contact form submit (simple alert)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Gracias por contactarnos. Te responderemos pronto.');
      contactForm.reset();
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

  // 5) Registro de candidatos
  const registroForm = document.getElementById('registroForm');
  const msgDiv = document.createElement('div');
  msgDiv.id = "msg";
  registroForm.parentNode.insertBefore(msgDiv, registroForm.nextSibling);

  if (registroForm) {
    registroForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      msgDiv.innerHTML = "Enviando...";

      // ➤ Aquí debes poner la URL de tu Web App de Google Apps Script
      const webAppUrl = "TU_WEB_APP_URL_AQUI"; 

      const formData = new URLSearchParams(new FormData(registroForm));

      try {
        const res = await fetch(webAppUrl, {
          method: "POST",
          body: formData
        });

        const json = await res.json();

        if (json.status === "success") {
          msgDiv.innerHTML = `<div class="alert-success">${json.message}</div>`;
          registroForm.reset();
        } else {
          msgDiv.innerHTML = `<div class="alert-danger">${json.message}</div>`;
        }
      } catch (err) {
        msgDiv.innerHTML = `<div class="alert-danger">Error: ${err.message}</div>`;
      }
    });
  }

});
