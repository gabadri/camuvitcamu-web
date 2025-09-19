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

  // 3) Contact form simple
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Gracias por contactarnos. Te responderemos pronto.');
      form.reset();
    });
  }

  // 4) Reveal animations
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

  // 5) ===== TRABAJA CON NOSOTROS =====
  const scriptURL = "https://script.google.com/macros/s/AKfycbzFLvWVGopeA0PYxJ25z5QZVMXcNHuRoswduEmbd2Amq5M4rLyN-VVfyrk8scYGG_JQ/exec";

  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const userPanel = document.getElementById("userPanel");

  if(registerForm){
    registerForm.addEventListener("submit", async(e)=>{
      e.preventDefault();
      const formData = new FormData(registerForm);
      formData.append("action","register");

      try {
        const res = await fetch(scriptURL, { method:"POST", body:formData });
        const data = await res.json();
        alert(data.message);
        if(data.success){ registerForm.reset(); }
      } catch(err){
        alert("Error en el registro");
      }
    });
  }

  if(loginForm){
    loginForm.addEventListener("submit", async(e)=>{
      e.preventDefault();
      const formData = new FormData(loginForm);
      formData.append("action","login");

      try {
        const res = await fetch(scriptURL, { method:"POST", body:formData });
        const data = await res.json();
        if(data.success){
          loginForm.style.display = "none";
          registerForm.style.display = "none";
          userPanel.style.display = "block";

          document.getElementById("uNombre").textContent = data.data.nombre;
          document.getElementById("uDni").textContent = data.data.dni;
          document.getElementById("uCorreo").textContent = data.data.correo;
          document.getElementById("uClave").textContent = data.data.clave;
          document.getElementById("uEstado").textContent = data.data.estado;
          document.getElementById("uFecha").textContent = data.data.fecha;
        } else {
          alert(data.message);
        }
      } catch(err){
        alert("Error en el login");
      }
    });
  }

});
