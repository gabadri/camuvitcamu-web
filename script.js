document.addEventListener('DOMContentLoaded', function() {

  // ---------- MENU MÓVIL ----------
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

  // ---------- AÑO EN FOOTER ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- FORMULARIO CONTACTO ----------
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Gracias por contactarnos. Te responderemos pronto.');
      form.reset();
    });
  }

  // ---------- ANIMACIÓN SCROLL ----------
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

  // ---------- TRABAJA CON NOSOTROS - REGISTRO ----------
  const registroForm = document.getElementById('registroForm');
  const loginForm = document.getElementById('loginForm');
  const estadoResult = document.getElementById('estadoResult');
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzFLvWVGopeA0PYxJ25z5QZVMXcNHuRoswduEmbd2Amq5M4rLyN-VVfyrk8scYGG_JQ/exec';

  if (registroForm) {
    registroForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(registroForm));
      try {
        const res = await fetch(SCRIPT_URL, {
          method:'POST',
          mode:'no-cors',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ action:'registro', data })
        });
        alert('Postulación registrada! Revisa tu correo para la clave.');
        registroForm.reset();
      } catch(err){
        alert('Error al registrar, intenta de nuevo.');
      }
    });
  }

  // ---------- LOGIN POSTULANTE ----------
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(loginForm));
      try {
        const res = await fetch(SCRIPT_URL+'?action=login&email='+encodeURIComponent(data.email)+'&clave='+encodeURIComponent(data.clave));
        const json = await res.json();
        if(json.success){
          estadoResult.innerHTML = `
            <div class="alert alert-success">
              <strong>Nombre:</strong> ${json.nombre}<br>
              <strong>DNI:</strong> ${json.dni}<br>
              <strong>Correo:</strong> ${json.email}<br>
              <strong>Clave:</strong> ${json.clave}<br>
              <strong>Estado:</strong> ${json.estado}<br>
              <strong>Fecha Registro:</strong> ${json.fecha}
            </div>`;
        } else {
          estadoResult.innerHTML = `<div class="alert alert-danger">Correo o clave incorrecta.</div>`;
        }
      } catch(err){
        estadoResult.innerHTML = `<div class="alert alert-danger">Error al consultar el estado.</div>`;
      }
    });
  }

});

