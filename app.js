// primera part funcional de la página, "Display Cards Enfermedades"
const cards = document.querySelectorAll('.sick-card');
const popup = document.querySelectorAll('.popup');
const btnCerrar = document.querySelectorAll('.cerrar-popup');
const overlay = document.querySelectorAll('.overlay');

cards.forEach(card => {
    card.addEventListener('click', () => {
        const enfermedad = card.dataset.enfermedad;
        const popup = document.getElementById(`popup-${enfermedad}`);
        popup.classList.add('active');
    });
});

btnCerrar.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.popup').classList.remove('active');
    });
});

overlay.forEach(ov => {
    ov.addEventListener('click', () => {
        ov.closest('.popup').classList.remove('active');
    });
});


// Segunda parte funcional de la página, "Carrusel de noticias"

// Tercera parte funcional de la página, "Calendario de eventos"

// Cuarta parte funcional de la página, "Busqueda de Centros de salud"

// Quinta parte funcional de la página, "Chatbot de navegación" *====en desarrollo====*