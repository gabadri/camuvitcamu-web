document.addEventListener('DOMContentLoaded', function() {

  // --- NAV TOGGLE ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => { 
      navLinks.classList.toggle('active'); 
    });
    navLinks.addEventListener('click', (e) => { 
      if(e.target.tagName==='A') navLinks.classList.remove('active'); 
    });
  }

  // --- YEAR FOOTER ---
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // --- REVEAL ANIMATIONS ---
  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && reveals.length){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('active');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.12});
    reveals.forEach(el=>io.observe(el));
  } else {
    reveals.forEach(el=>el.classList.add('active'));
  }

  // --- REGISTRO POSTULANTE ---
  const registerForm = document.getElementById('registerForm');
  if(registerForm){
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

      try {
        const res = await fetch('https://script.google.com/macros/s/AKfycbzFLvWVGopeA0PYxJ25z5QZVMXcNHuRoswduEmbd2Amq5M4rLyN-VVfyrk8scYGG_JQ/exec', {
          method:'POST',
          body: JSON.stringify(data)
        });
        const result = await res.json();
        alert(result.message);
        if(result.success) registerForm.reset();
      } catch(err) {
        alert('Error al registrar postulante: ' + err);
      }
    });
  }

  // --- LOGIN POSTULANTE ---
  const loginForm = document.getElementById('loginForm');
  const statusResult = document.getElementById('statusResult');
  if(loginForm){
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = {
        action: 'login',
        correo: loginForm.email.value,
        clave: loginForm.key.value
      };

      try {
        const res = await fetch('https://script.google.com/macros/s/AKfycbzFLvWVGopeA0PYxJ25z5QZVMXcNHuRoswduEmbd2Amq5M4rLyN-VVfyrk8scYGG_JQ/exec', {
          method:'POST',
          body: JSON.stringify(data)
        });
        const result = await res.json();

        if(result.success){
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

      } catch(err){
        statusResult.classList.add('error');
        statusResult.textContent = 'Error al consultar el estado: ' + err;
      }
    });
  }

  // --- FORM CONTACTO ---
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      alert('Gracias por contactarnos. Te responderemos pronto.');
      contactForm.reset();
    });
  }

});
