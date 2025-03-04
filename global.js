
//CHANGES HEADER BACKGROUBND WHEN SCROLLED PAST H1
document.addEventListener("DOMContentLoaded", function () {
    //assigning h1 and .header-bar to variables
    const header = document.querySelector(".header-bar"); 
    const h1 = document.querySelector("h1");

    //Checks is user has scrolled past the h1 and changes the bg color to dark by adding a class
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