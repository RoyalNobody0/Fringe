document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".header-bar");
    const h1 = document.querySelector("h1");

    function updateHeaderBackground() {
        const heroBottom = h1.offsetHeight;
        if (window.scrollY > heroBottom) {
            header.classList.add("scrolled");
        } 
        else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateHeaderBackground);
});