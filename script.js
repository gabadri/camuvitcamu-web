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

  // 3) Contact form submit (simple)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Gracias por contactarnos. Te responderemos pronto.');
      form.reset();
    });
  }

  // 4) Simple scroll reveal
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
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        action: 'register',
        nombre: registerForm.name.value,
        dni: registerForm.dni.value,
        correo: registerForm.email.value,
        carrera: registerForm.career.value,
        nivel: registerForm.education.value,
        cv: registerForm.cv.value
      };
      const res = await fetch('https://script.google.com/macros/s/AKfycbzFLvWVGopeA0PYxJ25z5QZVMXcNHuRoswduEmbd2Amq5M4rLyN-VVfyrk8scYGG_JQ/exec', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      const result = await res.json();
      alert(result.message);
      if(result.success) registerForm.reset();
    });
  }

  // 6) Login postulante
  const loginForm = document.getElementById('loginForm');
  const statusResult = document.getElementById('statusResult');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        action: 'login',
        correo: loginForm.email.value,
        clave: loginForm.key.value
      };
      const res = await fetch('https://script.google.com/macros/s/AKfycbzFLvWVGopeA0PYxJ25z5QZVMXcNHuRoswduEmbd2Amq5M4rLyN-VVfyrk8scYGG_JQ/exec', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if(result.success){
        statusResult.innerHTML = `
          <p><strong>Nombre:</strong> ${result.data.nombre}</p>
          <p><strong>DNI:</strong> ${result.data.dni}</p>
          <p><strong>Correo:</strong> ${result.data.correo}</p>
          <p><strong>Clave:</strong> ${result.data.clave}</p>
          <p><strong>Estado:</strong> ${result.data.estado}</p>
          <p><strong>Fecha Registro:</strong> ${new Date(result.data.fecha).toLocaleDateString()}</p>
        `;
      } else {
        statusResult.innerHTML = `<p style="color:red;">${result.message}</p>`;
      }
    });
  }
});
