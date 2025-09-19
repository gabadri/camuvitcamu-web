document.addEventListener('DOMContentLoaded', function() {

  const url = "https://script.google.com/macros/s/AKfycbzFLvWVGopeA0PYxJ25z5QZVMXcNHuRoswduEmbd2Amq5M4rLyN-VVfyrk8scYGG_JQ/exec";

  // -------------------
  // 1) Toggle mobile menu
  // -------------------
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

  // -------------------
  // 2) Year in footer
  // -------------------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // -------------------
  // 3) Formulario de postulación
  // -------------------
  const formPostulacion = document.getElementById('formPostulacion');
  if (formPostulacion) {
    formPostulacion.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(formPostulacion);
      const archivo = formData.get('cv');

      if (!archivo || archivo.size === 0) {
        alert('Por favor selecciona un CV.');
        return;
      }

      // Convertir archivo a Base64
      const arrayBuffer = await archivo.arrayBuffer();
      const base64String = btoa(
        new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      // Preparar datos a enviar
      const dataToSend = {
        action: "registrar",
        nombre: formData.get('nombre'),
        dni: formData.get('dni'),
        correo: formData.get('correo'),
        carrera: formData.get('carrera'),
        nivelEducativo: formData.get('nivelEducativo'),
        cvBase64: base64String,
        cvType: archivo.type,
        cvName: archivo.name
      };

      try {
        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(dataToSend)
        });

        const result = await res.json();

        alert(result.message);
        if (result.success) formPostulacion.reset();

      } catch(err) {
        alert('Error al enviar postulación: ' + err.message);
      }
    });
  }

  // -------------------
  // 4) Acceso de postulantes
  // -------------------
  const formAcceso = document.getElementById('formAcceso');
  if (formAcceso) {
    formAcceso.addEventListener('submit', async (e) => {
      e.preventDefault();

      const correo = formAcceso.querySelector('input[name="correo"]').value;
      const clave = formAcceso.querySelector('input[name="clave"]').value;
      const resultadoDiv = document.getElementById('resultadoAcceso');

      try {
        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({ action: "acceso", correo, clave })
        });

        const result = await res.json();

        if (result.success) {
          const d = result.data;
          resultadoDiv.innerHTML = `
            <p><strong>Nombre:</strong> ${d.nombre}</p>
            <p><strong>DNI:</strong> ${d.dni}</p>
            <p><strong>Correo:</strong> ${d.correo}</p>
            <p><strong>Clave:</strong> ${d.clave}</p>
            <p><strong>Estado:</strong> ${d.estado}</p>
            <p><strong>Fecha de Registro:</strong> ${new Date(d.fechaRegistro).toLocaleDateString()}</p>
            <p><strong>Carrera:</strong> ${d.carrera}</p>
            <p><strong>Nivel Educativo:</strong> ${d.nivelEducativo}</p>
            <p><strong>Enlace CV:</strong> <a href="${d.enlaceCV}" target="_blank">Ver CV</a></p>
          `;
        } else {
          resultadoDiv.textContent = result.message;
        }

      } catch(err) {
        resultadoDiv.textContent = 'Error al consultar postulación: ' + err.message;
      }
    });
  }

  // -------------------
  // 5) Simple scroll reveal
  // -------------------
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

  }

});

