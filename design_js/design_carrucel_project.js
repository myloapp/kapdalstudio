window.addEventListener("load", () => {
    const inner = document.querySelector(".pro-carousel .pro-inner");
    let slides = Array.from(document.querySelectorAll(".pro-carousel .carousel-img"));

    if (!inner || slides.length === 0) return;

    // Crear clones
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    inner.appendChild(firstClone);
    inner.insertBefore(lastClone, slides[0]);

    // Actualizar lista de slides
    slides = Array.from(document.querySelectorAll(".pro-carousel .carousel-img"));

    let index = 1;
    let slideWidth = slides[index].clientWidth;

    // Posicionar en la primera imagen real
    inner.style.transform = `translateX(${-slideWidth * index}px)`;

    function updateSize() {
        slideWidth = slides[index].clientWidth;
        inner.style.transition = "none";
        inner.style.transform = `translateX(${-slideWidth * index}px)`;

        requestAnimationFrame(() => {
            inner.style.transition = "transform 0.5s ease";
        });
    }

    window.addEventListener("resize", updateSize);

    function moveSlide(dir) {
        index += dir;
        inner.style.transition = "transform 0.5s ease";
        inner.style.transform = `translateX(${-slideWidth * index}px)`;
    }

    inner.addEventListener("transitionend", () => {
        // Si llega al clone final → saltar al inicio real
        if (index === slides.length - 1) {
            inner.style.transition = "none";
            index = 1;
            inner.style.transform = `translateX(${-slideWidth * index}px)`;
        }

        // Si llega al clone inicial → saltar al final real
        if (index === 0) {
            inner.style.transition = "none";
            index = slides.length - 2;
            inner.style.transform = `translateX(${-slideWidth * index}px)`;
        }

        setTimeout(() => {
            inner.style.transition = "transform 0.5s ease";
        }, 20);
    });

    // Botones
    document.querySelector(".pro-btn-arrow.left")
        .addEventListener("click", () => {
            moveSlide(-1);
            restartAuto();
        });

    document.querySelector(".pro-btn-arrow.right")
        .addEventListener("click", () => {
            moveSlide(1);
            restartAuto();
        });

    // AutoPlay
    let auto = setInterval(() => moveSlide(1), 3500);

    function restartAuto() {
        clearInterval(auto);
        auto = setInterval(() => moveSlide(1), 3500);
    }

    const container = document.querySelector(".pro-carousel");
    container.addEventListener("mouseenter", () => clearInterval(auto));
    container.addEventListener("mouseleave", restartAuto);
});
