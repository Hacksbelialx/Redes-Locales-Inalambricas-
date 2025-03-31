console.log("Bienvenido a Redes Inalámbricas");
document.addEventListener("DOMContentLoaded", function () {
    // Menú desplegable
    const menuBtn = document.querySelector(".menu-btn");
    const menu = document.querySelector(".menu");

    menuBtn.addEventListener("click", function () {
        menu.classList.toggle("activo");
        menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    });

    document.querySelectorAll(".menu a").forEach(link => {
        link.addEventListener("click", function () {
            menu.classList.remove("activo");
            menu.style.display = "none"; // Ocultar el menú al hacer clic en una opción
        });
    });

    // Resaltar sección activa en el menú
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".menu a");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navLinks.forEach((link) => {
                        link.classList.remove("activo");
                        if (link.getAttribute("href").substring(1) === entry.target.id) {
                            link.classList.add("activo");
                        }
                    });
                }
            });
        },
        { threshold: 0.5 }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });

    // Efecto de aparición y desaparición al hacer scroll
    const observerScroll = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("aparece");
                    entry.target.classList.remove("desaparece");
                } else {
                    entry.target.classList.add("desaparece");
                    entry.target.classList.remove("aparece");
                }
            });
        },
        { threshold: 0.3 }
    );

    sections.forEach((section) => {
        observerScroll.observe(section);
    });

    // Scroll suave al hacer clic en los enlaces del menú
    document.querySelectorAll('.menu a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: "smooth"
                });
            }
        });
    });

    // Crear el botón de volver arriba con diseño cuadrado
    const scrollButton = document.createElement("button");
    scrollButton.innerHTML = "▲";
    scrollButton.classList.add("scroll-top");
    document.body.appendChild(scrollButton);

    scrollButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Mostrar/ocultar botón con animación
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            scrollButton.classList.add("visible");
        } else {
            scrollButton.classList.remove("visible");
        }
    });
});
