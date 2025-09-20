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

  // --- Registro ---
  const registerForm = document.getElementById('registerForm');
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
      const res = await fetch('https://script.google.com/macros/s/AKfycbzFLvWVGopeA0PYxJ25z5QZVMXcNHuRoswduEmbd2Amq5M4rLyN-VVfyrk8scYGG_JQ/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      alert(result.message);
      if (result.success) registerForm.reset();
    });
  }

  // --- Login ---
  const loginForm = document.getElementById('loginForm');
  const statusResult = document.getElementById('statusResult');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        action: 'login',
        correo: loginForm.correo.value,
        clave: loginForm.clave.value
      };
      const res = await fetch('https://script.google.com/macros/s/AKfycbzFLvWVGopeA0PYxJ25z5QZVMXcNHuRoswduEmbd2Amq5M4rLyN-VVfyrk8scYGG_JQ/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (result.success) {
        const d = result.data;
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
        statusResult.classList.add('error');
        statusResult.textContent = result.message;
      }
    });
  }

  // --- Resto de tu JS original ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => { navLinks.classList.toggle('active'); });
    navLinks.addEventListener('click', (e) => { if (e.target.tagName === 'A') navLinks.classList.remove('active'); });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Gracias por contactarnos. Te responderemos pronto.');
      form.reset();
    });
  }

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
