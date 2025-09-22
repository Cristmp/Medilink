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
const slider = document.getElementById("slider")
const CardNoti = document.querySelectorAll(".card")
const prevbtn = document.querySelector('.prevbtn')
const nextbtn = document.querySelector('.nextbtn')

function getScrollAmount(){
    const Cardnot = cards[0];
    const style = getComputedStyle(Cardnot);
    const CardWidth = Cardnot.offsetWidth
    const gap = parseInt(style.marginRight) ||20 ;
    return CardWidth + gap;
}

function updateButtons(){
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    prevbtn.style.display = slider.scrollLeft > 0 ? 'block' : 'none';
    nextbtn.style.display = slider.scrollLeft < maxScrollLeft - 6 ? 'block' : 'none';
}
updateButtons();

nextbtn.addEventListener('click', () => {
    slider.scrollLeft += getScrollAmount();
    setTimeout(updateButtons, 100);
})

prevbtn.addEventListener('click', () => {
    slider.scrollLeft -= getScrollAmount();
    setTimeout(updateButtons, 100);
})
// Tercera parte funcional de la página, "Calendario de eventos"
const currentDate = document.querySelector('.fecha')
const diaTag = document.querySelector('.dia')
const prevNextIcon = document.querySelectorAll(".icons span")

let selectedDays = {};

let date = new Date();
currYear = date.getFullYear(),
currMonth = date.getMonth();

const month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
              "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    LastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--){
        liTag += `<li class="inactive">${LastDateofLastMonth - i + 1}</li>`
    }

    for (let i = 1; i <= lastDateofMonth; i++){
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";

        let key = `${currYear}-${currMonth}-${i}`;
        let isSelected = selectedDays[key] ? "event" : "";

        liTag += `<li class="${isToday} ${isSelected}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++){
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }

    currentDate.innerHTML = `${month[currMonth]} ${currYear}`;
    diaTag.innerHTML = liTag;

    const days = diaTag.querySelectorAll("li:not(.inactive)");
    const eventosContainer = document.getElementById('slider-event')

    eventosContainer.innerHTML = "";

    //Agregar eventos con click - Solo prueba 
    days.forEach(day => {
        day.addEventListener("click", () => {
            let dayNumber = day.textContent;
            let key = `${currYear}-${currMonth}-${dayNumber}`;

            // Alternar selección
            if (selectedDays[key]) {
                delete selectedDays[key];
                day.classList.remove("event");

                const cardToRemove = eventosContainer.querySelector(`[data-card="${key}"]`);
                if (cardToRemove) cardToRemove.remove();

            } else {
                selectedDays[key] = true;
                day.classList.add("event");

                const card = document.createElement("div");
                card.classList.add("card-event");
                card.setAttribute("data-card", key);
                card.innerHTML = 
                `<div class="fecha-event">
                        <h1>${dayNumber}</h1>
                    </div>

                    <div class="info-event">
                        <h1>Evento 1</h1>
                        <p>descripción del evento</p>
                    </div>

                    <div class="icon-event">
                        <i class="ri-calendar-event-fill"></i>
                    </div>`;
                    eventosContainer.appendChild(card);
            }
        });

})}

renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ?  currMonth - 1 : currMonth + 1;
        if(currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); 
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }


        renderCalendar();
    })
})

// Cuarta parte funcional de la página, "Busqueda de Centros de salud"

// Quinta parte funcional de la página, "Chatbot de navegación" *====en desarrollo====*