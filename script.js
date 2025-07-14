// Malla interactiva con desbloqueo de ramos según prerrequisitos

// Al cargar, bloquea todos los ramos que tienen prerrequisitos no cumplidos

document.addEventListener("DOMContentLoaded", () => {
  // Obtenemos todos los ramos
  const ramos = document.querySelectorAll(".ramo");

  // Inicializamos los estados
  ramos.forEach(ramo => {
    const prereqs = ramo.dataset.prerrequisitos.trim();
    if (prereqs) {
      ramo.classList.add("bloqueado");
    }
    // Para los ramos sin prerrequisitos quedan desbloqueados
  });

  // Agregamos evento click solo a ramos desbloqueados
  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado")) return; // No hacer nada si está bloqueado

      // Alterna aprobado/no aprobado
      const aprobado = ramo.classList.toggle("aprobado");

      // Actualizar desbloqueo de otros ramos según apertura
      actualizarDesbloqueos();
    });
  });

  function actualizarDesbloqueos() {
    const aprobados = new Set();
    ramos.forEach(r => {
      if (r.classList.contains("aprobado")) {
        aprobados.add(r.id);
      }
    });

    ramos.forEach(ramo => {
      const prereqStr = ramo.dataset.prerrequisitos.trim();
      if (!prereqStr) {
        // Sin prerrequisitos: desbloqueado siempre
        ramo.classList.remove("bloqueado");
        return;
      }
      const prereqs = prereqStr.split(",").map(p => p.trim()).filter(p => p.length > 0);

      // Si todos los prerrequisitos están aprobados, desbloquea el ramo
      const todosAprobados = prereqs.every(p => aprobados.has(p));

      if (todosAprobados) {
        ramo.classList.remove("bloqueado");
      } else {
        // Si el ramo está aprobado, no lo bloqueamos para que no desaparezca
        if (!ramo.classList.contains("aprobado")) {
          ramo.classList.add("bloqueado");
        }
      }
    });
  }

  // Inicializamos desbloqueos
  actualizarDesbloqueos();
});

