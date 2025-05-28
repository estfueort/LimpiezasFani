document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('busqueda');
  const boton = document.getElementById('boton-busqueda');

  const buscar = () => {
    const filtro = input.value.toLowerCase();
    const tarjetas = document.querySelectorAll('.card');
    tarjetas.forEach(card => {
      const servicio = card.getAttribute('data-servicio')?.toLowerCase() || '';
      card.style.display = servicio.includes(filtro) ? 'block' : 'none';
    });
  };

  if (input && boton) {
    input.addEventListener('keypress', e => { if (e.key === 'Enter') buscar(); });
    boton.addEventListener('click', buscar);
  }
});
document.querySelector('.search-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const query = this.q.value.trim().toLowerCase();
  if (query) {
    alert(`Buscando: ${query}`);
  }
});

document.addEventListener('DOMContentLoaded', function () {
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    if (!localStorage.getItem('cookiesAccepted')) {
      banner.style.display = 'flex';
    }

    acceptBtn.addEventListener('click', function () {
      localStorage.setItem('cookiesAccepted', 'true');
      banner.style.display = 'none';
    });
  });

