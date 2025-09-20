document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registroForm");
  const mensajeDiv = document.createElement("div");
  form.appendChild(mensajeDiv);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // URL de tu Apps Script Web App
    const scriptURL = "https://script.google.com/macros/s/AKfycbzFLvWVGopeA0PYxJ25z5QZVMXcNHuRoswduEmbd2Amq5M4rLyN-VVfyrk8scYGG_JQ/exec";

    // Crear objeto con los datos del formulario
    const formData = new FormData(form);

    // Mostrar mensaje de "procesando"
    mensajeDiv.className = "";
    mensajeDiv.textContent = "Enviando datos...";
    mensajeDiv.style.color = "#555";

    // Enviar datos con fetch
    fetch(scriptURL, { method: "POST", body: formData })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === "success") {
          mensajeDiv.className = "success-message";
          mensajeDiv.textContent = "✅ Gracias por registrarte. Tu postulación fue enviada con éxito.";
          form.reset();
        } else {
          mensajeDiv.className = "error-message";
          mensajeDiv.textContent = "❌ Ocurrió un error al registrar tu postulación. Intenta nuevamente.";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        mensajeDiv.className = "error-message";
        mensajeDiv.textContent = "❌ Error de conexión. Verifica tu internet o vuelve a intentarlo.";
      });
  });
});
