const shiftToFriday = () => {
  // 1. Reordenar encabezados (Mon-Sun -> Fri-Thu)
  const headerRow = document.querySelector('.training-log-header tr');
  if (headerRow && !headerRow.dataset.viernized) {
    const cells = Array.from(headerRow.children);
    // Mover Vie(4), Sáb(5), Dom(6) al inicio
    const weekend = cells.slice(4, 7);
    weekend.reverse().forEach(cell => headerRow.prepend(cell));
    headerRow.dataset.viernized = "true";
  }

  // 2. Reordenar filas de datos
  const weeks = document.querySelectorAll('.training-log-body tr');
  weeks.forEach(row => {
    if (!row.dataset.viernized) {
      const cells = Array.from(row.children);
      // Mover los datos de Vie, Sáb, Dom al frente de la misma fila
      const weekendData = cells.slice(4, 7);
      weekendData.reverse().forEach(cell => row.prepend(cell));
      row.dataset.viernized = "true";
    }
  });
};

// Observador para manejar carga dinámica de Strava
const observer = new MutationObserver(() => {
  shiftToFriday();
});

observer.observe(document.body, { childList: true, subtree: true });
shiftToFriday();