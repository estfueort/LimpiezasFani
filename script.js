document.addEventListener('DOMContentLoaded', () => {
  // --- BUSCADOR DE TEXTO ---
  const input = document.getElementById('busqueda');
  const boton = document.getElementById('boton-busqueda');
  const formularioBusqueda = document.getElementById('searchForm');

  const buscarPalabraEnPagina = () => {
    const texto = input.value.trim();
    if (!texto) return;

    // Eliminar resaltados anteriores
    document.querySelectorAll('.resaltado-busqueda').forEach(el => {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });

    const regex = new RegExp(`(${texto})`, 'gi');
    const elementos = document.body.querySelectorAll('*:not(script):not(style):not(noscript)');

    let primeraCoincidencia = null;

    for (let el of elementos) {
      if (el.children.length === 0 && regex.test(el.textContent)) {
        const nuevoHTML = el.textContent.replace(regex, '<span class="resaltado-busqueda">$1</span>');
        const span = document.createElement('span');
        span.innerHTML = nuevoHTML;
        el.replaceWith(span);

        if (!primeraCoincidencia) {
          primeraCoincidencia = span.querySelector('.resaltado-busqueda');
        }
      }
    }

    if (primeraCoincidencia) {
      primeraCoincidencia.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      alert('No se encontró el texto en la página.');
    }
  };

  boton?.addEventListener('click', e => {
    e.preventDefault();
    buscarPalabraEnPagina();
  });

  formularioBusqueda?.addEventListener('submit', e => {
    e.preventDefault();
    buscarPalabraEnPagina();
  });

  input?.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      buscarPalabraEnPagina();
    }
  });

  // --- GESTIÓN DE COOKIES ---
  const popup = document.getElementById("cookiePopup");
  const acceptBtn = document.getElementById("acceptCookies");

  if (popup && acceptBtn && !localStorage.getItem("cookiesAccepted")) {
    popup.classList.remove("d-none");

    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      popup.classList.add("d-none");
    });
  }

  // --- VALIDACIÓN DE FORMULARIO ---
  const form = document.querySelector("form");

  form?.addEventListener("submit", e => {
    let hayErrores = false;

    // Validar aceptación de datos
    const aceptaDatos = document.getElementById("aceptoDatos");
    const errorDatos = document.getElementById("errorDatos");
    if (aceptaDatos && !aceptaDatos.checked) {
      errorDatos?.classList.add("d-block");
      hayErrores = true;
    } else {
      errorDatos?.classList.remove("d-block");
    }

    // Validar método de contacto
    const checkTelefono = document.getElementById("checkTelefono")?.checked;
    const checkEmail = document.getElementById("checkEmail")?.checked;
    const telefono = document.getElementById("numeroTelefono");
    const email = document.querySelector("input[name='email']");
    const errorContacto = document.getElementById("errorContacto");

    const telefonoValido = checkTelefono && telefono?.value.trim() !== "";
    const emailValido = checkEmail && email?.value.trim() !== "";

    if ((checkTelefono || checkEmail) && !(telefonoValido || emailValido)) {
      errorContacto?.classList.add("d-block");
      hayErrores = true;
    } else {
      errorContacto?.classList.remove("d-block");
    }

    if (hayErrores) {
      e.preventDefault();
      form.scrollIntoView({ behavior: "smooth" });
    }
  });
});
