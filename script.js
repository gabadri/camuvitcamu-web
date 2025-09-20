document.addEventListener('DOMContentLoaded', function() {

  // --- Tabs ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tabPanes.forEach(p => p.classList.remove('active'));
      document.querySelector(`.tab-pane.${btn.dataset.tab}`)?.classList.add('active');
    });
  });

  // === Helper para mostrar mensajes bonitos ===
  function showMessage(container, message, success = true) {
    container.innerHTML = `<div class="msg ${success ? 'success' : 'error'}">${message}</div>`;
    setTimeout(() => container.innerHTML = "", 5000); // Se borra en 5 seg
  }

  // --- Registro ---
  const registerForm = document.getElementById('registerForm');
  const registerMsg = document.getElementById('registerMsg');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        action: 'register',
        nombre: registerForm.nombre.value,
        dni: registerForm.dni.value,
        correo: registerForm.correo.value,
        carrera: registerForm.carrera.value,
        nivel: registerForm.nivel.value,
        cv: registerForm.cv.value
      };
      try {
        const res = await fetch('https://script.google.com/macros/s/AKfycbzFLvWVGopeA0PYxJ25z5QZVMXcNHuRoswduEmbd2Amq5M4rLyN-VVfyrk8scYGG_JQ/exec', {
          method: 'POST',
          body: JSON.stringify(data)
        });
        const result = await res.json();
        showMessage(registerMsg, result.message, result.success);
        if (result.success) registerForm.reset();
      } catch (err) {
        showMessage(registerMsg, "Error de conexión con el servidor.", false);
      }
    });
  }

  // --- Login ---
  const loginForm = document.getElementById('loginForm');
  const statusResult = document.getElementById('statusResult');
  const loginMsg = document.getElementById('loginMsg');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        action: 'login',
        correo: loginForm.correo.value,
        clave: loginForm.clave.value
      };
      try {
        const res = await fetch('https://script.google.com/macros/s/AKfycbzFLvWVGopeA0PYxJ25z5QZVMXcNHuRoswduEmbd2Amq5M4rLyN-VVfyrk8scYGG_JQ/exec', {
          method: 'POST',
          body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) {
          const d = result.data;
          loginMsg.innerHTML = "";
          statusResult.classList.remove('error');
          statusResult.innerHTML = `
            <p><b>Nombre:</b> ${d.nombre}</p>
            <p><b>DNI:</b> ${d.dni}</p>
            <p><b>Correo:</b> ${d.correo}</p>
            <p><b>Clave:</b> ${d.clave}</p>
            <p><b>Estado:</b> ${d.estado}</p>
            <p><b>Fecha de Registro:</b> ${new Date(d.fecha).toLocaleDateString()}</p>
          `;
        } else {
          statusResult.innerHTML = "";
          showMessage(loginMsg, result.message, false);
        }
      } catch (err) {
        showMessage(loginMsg, "Error de conexión con el servidor.", false);
      }
    });
  }

  // --- Menú ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => { navLinks.classList.toggle('active'); });
    navLinks.addEventListener('click', (e) => { if (e.target.tagName === 'A') navLinks.classList.remove('active'); });
  }

  // --- Año ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Contacto ---
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Gracias por contactarnos. Te responderemos pronto.');
      form.reset();
    });
  }

  // --- Animaciones ---
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
