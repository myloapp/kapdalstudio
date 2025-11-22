const track = document.getElementById("certTrack");
const prev = document.getElementById("certPrev");
const next = document.getElementById("certNext");

let index = 0;
const totalSlides = 3;

function updateSlide() {
    track.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    index = (index + 1) % totalSlides;
    updateSlide();
}

function prevSlide() {
    index = (index - 1 + totalSlides) % totalSlides;
    updateSlide();
}

next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);

setInterval(nextSlide, 4500);

function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("active");
}

// Cerrar menú móvil cuando la pantalla vuelve a modo escritorio
window.addEventListener("resize", function () {
    const menu = document.getElementById("mobileMenu");
    if (window.innerWidth > 900) {
        menu.classList.remove("active");
    }
});
