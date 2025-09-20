document.addEventListener('DOMContentLoaded', function() {

  // 1) Toggle mobile menu
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Cerrar menú cuando se hace clic en un enlace
    navLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') navLinks.classList.remove('active');
    });
  }

  // 2) Año en el footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 3) Contact form submit con App Script
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbzFLvWVGopeA0PYxJ25z5QZVMXcNHuRoswduEmbd2Amq5M4rLyN-VVfyrk8scYGG_JQ/exec",
          {
            method: "POST",
            body: formData
          }
        );

        if (response.ok) {
          alert("✅ Gracias por registrarte. Revisa tu correo para la contraseña.");
          form.reset();
        } else {
          alert("❌ Ocurrió un error al enviar el formulario.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("⚠️ No se pudo conectar con el servidor.");
      }
    });
  }

  // 4) Scroll reveal simple
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
