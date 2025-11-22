document.querySelectorAll(".footer-box a").forEach(link => {
    link.addEventListener("click", () => {
        console.log("Navegando a:", link.textContent);
    });
});
