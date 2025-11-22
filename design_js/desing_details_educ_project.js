function initCarousel(innerSelector, leftBtn, rightBtn, containerSelector) {

    const inner = document.querySelector(innerSelector);
    const imgs = Array.from(inner.querySelectorAll(".carousel-img"));

    if (!inner || imgs.length === 0) return;

    // CLONES
    const firstClone = imgs[0].cloneNode(true);
    const lastClone = imgs[imgs.length - 1].cloneNode(true);

    inner.appendChild(firstClone);
    inner.insertBefore(lastClone, inner.firstChild);

    let slides = Array.from(inner.querySelectorAll(".carousel-img"));
    let current = 1;
    let slideWidth = slides[current].clientWidth;

    inner.style.transition = "none";
    inner.style.transform = `translateX(${-current * slideWidth}px)`;

    window.addEventListener("resize", () => {
        slideWidth = slides[current].clientWidth;
        inner.style.transition = "none";
        inner.style.transform = `translateX(${-current * slideWidth}px)`;
        requestAnimationFrame(() => {
            inner.style.transition = "transform 0.6s ease";
        });
    });

    let isMoving = false;

    function move(dir) {
        if (isMoving) return;
        isMoving = true;
        current += dir;
        inner.style.transition = "transform 0.6s ease";
        inner.style.transform = `translateX(${-current * slideWidth}px)`;
    }

    inner.addEventListener("transitionend", () => {
        if (current === slides.length - 1) {
            inner.style.transition = "none";
            current = 1;
            inner.style.transform = `translateX(${-current * slideWidth}px)`;
        }
        if (current === 0) {
            inner.style.transition = "none";
            current = slides.length - 2;
            inner.style.transform = `translateX(${-current * slideWidth}px)`;
        }
        setTimeout(() => {
            isMoving = false;
            inner.style.transition = "transform 0.6s ease";
        }, 20);
    });

    document.querySelector(leftBtn).addEventListener("click", () => {
        pauseAuto();
        move(-1);
        restartAuto();
    });

    document.querySelector(rightBtn).addEventListener("click", () => {
        pauseAuto();
        move(1);
        restartAuto();
    });

    let auto = null;

    function startAuto() {
        if (!auto) auto = setInterval(() => move(1), 3800);
    }

    function pauseAuto() {
        if (auto) {
            clearInterval(auto);
            auto = null;
        }
    }

    function restartAuto() {
        pauseAuto();
        setTimeout(startAuto, 700);
    }

    const container = document.querySelector(containerSelector);
    container.addEventListener("mouseenter", pauseAuto);
    container.addEventListener("mouseleave", startAuto);

    startAuto();
}

/* INICIALIZAR LOS DOS CARRUSELES */
window.addEventListener("load", () => {

    // EDUCACIÓN
    initCarousel(".edu-inner", ".edu-left", ".edu-right", ".edu-carousel");

    // PROYECTOS
    initCarousel(".proj-inner", ".proj-left", ".proj-right", ".proj-carousel");

});
