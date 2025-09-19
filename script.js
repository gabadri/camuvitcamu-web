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

  // 5) Trabaja con Nosotros
  const registerForm = document.getElementById('workForm');
  const statusForm = document.getElementById('checkStatusForm');
  const statusResult = document.getElementById('statusResult');

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzFLvWVGopeA0PYxJ25z5QZVMXcNHuRoswduEmbd2Amq5M4rLyN-VVfyrk8scYGG_JQ/exec';

  // Registro de nuevo postulante
  if (registerForm) {
    registerForm.addEventListener('submit', function(e){
      e.preventDefault();
      const formData = new FormData(registerForm);
      const data = {};
      formData.forEach((value, key) => data[key] = value);

      data.action = 'register'; // indicar registro
      fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(data),
      })
      .then(res => res.json())
      .then(res => {
        alert(res.message || 'Postulación enviada. Revisa tu correo para la clave.');
        registerForm.reset();
      })
      .catch(err => alert('Error al registrar postulante.'));
    });
  }

  // Consulta de estado
  if (statusForm) {
    statusForm.addEventListener('submit', function(e){
      e.preventDefault();
      const formData = new FormData(statusForm);
      const data = {};
      formData.forEach((value, key) => data[key] = value);

      data.action = 'checkStatus'; // indicar consulta
      fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(data),
      })
      .then(res => res.json())
      .then(res => {
        if(res.success){
          statusResult.innerHTML = `
            <div class="card">
              <p><strong>Nombre:</strong> ${res.nombre}</p>
              <p><strong>DNI:</strong> ${res.dni}</p>
              <p><strong>Correo:</strong> ${res.email}</p>
              <p><strong>Clave:</strong> ${res.clave}</p>
              <p><strong>Estado:</strong> ${res.estado}</p>
              <p><strong>Fecha de Registro:</strong> ${res.fecha}</p>
            </div>`;
        } else {
          statusResult.innerHTML = `<p>${res.message || 'No se encontró el postulante.'}</p>`;
        }
      })
      .catch(err => statusResult.innerHTML = `<p>Error al consultar estado.</p>`);
    });
  }

});
