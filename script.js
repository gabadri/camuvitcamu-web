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
    reveals.forEach(el => el.classList.add('active'));
  }

  // 5) Enviar formulario de postulante
  const postulanteForm = document.getElementById('postulanteForm');
  if (postulanteForm) {
    postulanteForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(postulanteForm);
      const archivo = formData.get('cv');

      const base64 = await archivo.arrayBuffer();
      const base64String = btoa(
        new Uint8Array(base64)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      const dataToSend = {
        nombre: formData.get('nombre'),
        dni: formData.get('dni'),
        correo: formData.get('correo'),
        carrera: formData.get('carrera'),
        nivelEducativo: formData.get('nivelEducativo'),
        cvBase64: base64String,
        cvType: archivo.type,
        cvName: archivo.name
      };

      const url = 'https://script.google.com/macros/s/AKfycbzFLvWVGopeA0PYxJ25z5QZVMXcNHuRoswduEmbd2Amq5M4rLyN-VVfyrk8scYGG_JQ/exec';

      try {
        const resp = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(dataToSend)
        });
        const result = await resp.json();
        document.getElementById('mensajePostulante').textContent = result.message;
        if(result.success) postulanteForm.reset();
      } catch(err) {
        document.getElementById('mensajePostulante').textContent = 'Error al enviar la postulación.';
      }
    });
  }

});
