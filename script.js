document.addEventListener('DOMContentLoaded', function() {
  // Menu móvil
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    navLinks.addEventListener('click', e => { if(e.target.tagName==='A') navLinks.classList.remove('active'); });
  }

  // Año en footer
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('active');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('active'));
  }

  // Registro de candidatos
  const registerForm = document.getElementById('registroForm');
  if(registerForm){
    registerForm.addEventListener('submit', async e=>{
      e.preventDefault();
      const msgDiv = document.getElementById('msg');
      msgDiv.innerHTML = "Enviando...";
      const webAppUrl = "https://script.google.com/macros/s/AKfycbzPAltwqmkEcfg5Lbs5xYcJ84BmbNt8Ogd3cLkbqhdQKyiYPfuUbWGp4pAWNeycK_Hg8w/exec";
      const formData = new URLSearchParams(new FormData(registerForm));
      try{
        const res = await fetch(webAppUrl,{method:"POST",body:formData});
        const json = await res.json();
        if(json.status==="success"){
          msgDiv.innerHTML = `<div class="alert alert-success">${json.message}</div>`;
          registerForm.reset();
        } else {
          msgDiv.innerHTML = `<div class="alert alert-danger">${json.message}</div>`;
        }
      }catch(err){
        msgDiv.innerHTML = `<div class="alert alert-danger">Error: ${err.message}</div>`;
      }
    });
  }
});


