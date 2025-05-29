document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('busqueda');
  const boton = document.getElementById('boton-busqueda');
  const formulario = document.getElementById('searchForm');

  const buscarPalabraEnPagina = () => {
    const texto = input.value.trim();
    if (!texto) return;

    // Elimina resaltados anteriores
    document.querySelectorAll('.resaltado-busqueda').forEach(el => {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });

    const regex = new RegExp(`(${texto})`, 'gi'); // 'gi' para todas las coincidencias y sin distinguir mayúsculas
    const elementos = document.body.querySelectorAll('*:not(script):not(style):not(noscript)');

    let primeraCoincidencia = null;

    for (let elemento of elementos) {
      if (elemento.children.length === 0 && regex.test(elemento.textContent)) {
        const original = elemento.textContent;
        const nuevoHTML = original.replace(regex, '<span class="resaltado-busqueda">$1</span>');
        const nuevoElemento = document.createElement('span');
        nuevoElemento.innerHTML = nuevoHTML;
        elemento.replaceWith(nuevoElemento);

        if (!primeraCoincidencia) {
          primeraCoincidencia = nuevoElemento.querySelector('.resaltado-busqueda');
        }
      }
    }

    if (primeraCoincidencia) {
      primeraCoincidencia.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      alert('No se encontró el texto en la página.');
    }
  };

  boton.addEventListener('click', (e) => {
    e.preventDefault();
    buscarPalabraEnPagina();
  });

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    buscarPalabraEnPagina();
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      buscarPalabraEnPagina();
    }
  });

  // Gestión de cookies
  const popup = document.getElementById("cookiePopup");
  const acceptBtn = document.getElementById("acceptCookies");

  if (popup && acceptBtn && !localStorage.getItem("cookiesAccepted")) {
    popup.classList.remove("d-none");

    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      popup.classList.add("d-none");
    });
  }
});
