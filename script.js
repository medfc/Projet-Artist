

document.addEventListener("DOMContentLoaded", () => {

    /* 1- Mettre en surbriance le lien de la page en cours */
    const links = document.querySelectorAll(".navigation-bar a");
    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    /* 2- Gestion du menu burger */
    const menuToggle = document.querySelector(".menu-toggle");
    const navBar = document.querySelector(".navigation-bar");

    if (menuToggle && navBar) {
        navBar.classList.remove("active"); // S'assurer que le menu est fermé au début

        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation(); // Empêcher l'événement de se propager
            navBar.classList.toggle("active");

            if (navBar.classList.contains("active")) {
                // Ajouter un événement pour fermer le menu si l'utilisateur clique ailleurs
                document.addEventListener("click", function closeMenu(event) {
                    if (!navBar.contains(event.target) && !menuToggle.contains(event.target)) {
                        navBar.classList.remove("active");
                        document.removeEventListener("click", closeMenu);
                    }
                });
            }
        });
    }

    /* 3- faire défiler le texte */
    const scrollingTextElement = document.getElementById("scrolling-text");
    if (scrollingTextElement) {
        const textContent = scrollingTextElement.innerHTML;
        const repetitions = 5;  // Répéter le texte 5 fois pour l'effet
        scrollingTextElement.innerHTML = Array(repetitions).fill(textContent).join(" &nbsp;&nbsp;&nbsp;&nbsp; ");

        let position = 0;
        const speed = 1; // Vitesse de défilement du texte
        const scrollText = () => {
            position -= speed;
            if (position <= -scrollingTextElement.scrollWidth / repetitions) {
                position += scrollingTextElement.scrollWidth / repetitions;
            }
            scrollingTextElement.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(scrollText); // Demander au navigateur de redessiner l'animation
        };
        scrollText();
    }

     /* 4- défilement de la carrousel d'images */
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    if (slider && slides.length && dots.length) {
        let currentIndex = 0;
        const updateSlider = (index) => {
            slider.style.transform = `translateX(${-index * 100}%)`;
            dots.forEach(dot => dot.classList.remove("active"));
            dots[index].classList.add("active");
            currentIndex = index;
        };

        const nextSlide = () => updateSlider((currentIndex + 1) % slides.length);

        // Ajouter un événement pour chaque point de navigation (dot)
        dots.forEach(dot => {
            dot.addEventListener("click", () => {
                clearInterval(interval);
                updateSlider(parseInt(dot.dataset.index));
                startAutoSlide(); // Relancer le diaporama automatique
            });
        });

        let interval;
        const startAutoSlide = () => interval = setInterval(nextSlide, 3000);
        startAutoSlide(); // Démarrer le défilement automatique au chargement de la page
    }

    
    /* 5- Affichage des images en plein écran depuis le portfolio */
    const portfolioImages = document.querySelectorAll(".portfolio-container img");
    if (portfolioImages.length) {
        const overlay = document.createElement("div");
        const fullScreenImage = document.createElement("img");

        overlay.className = "overlay";
        fullScreenImage.className = "fullscreen";
        document.body.append(overlay, fullScreenImage);

        portfolioImages.forEach(img => img.addEventListener("click", () => {
            fullScreenImage.src = img.src;
            overlay.style.display = fullScreenImage.style.display = "block";
        }));

        [overlay, fullScreenImage].forEach(el => el.addEventListener("click", () => {
            overlay.style.display = fullScreenImage.style.display = "none";
        }));
    }


    /* 6- gestion de l'envoi du formulaire de contact */
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();  // Empêche le comportement par défaut (rechargement de la page)
            
            const fullName = document.getElementById("fullName").value;  // Récupère la valeur du champ "Nom"
            const email = document.getElementById("email-client").value;  // Utilise l'ID "email-client" pour récupérer l'email
            const message = document.getElementById("message").value;  // Récupère la valeur du champ "Message"
    
            // Vérifie que tous les champs sont remplis
            if (fullName && email && message) {
                alert("Votre message a été envoyé !");
                form.reset();  // Réinitialise le formulaire après envoi
            } else {
                alert("Veuillez remplir tous les champs.");  // Si un champ est vide, affiche un message d'alerte
            }
        });
    }
    

    /* 7- Gestion video */
    const video = document.getElementById("video");
    const playButton = document.querySelector(".play-button");

    if (video && playButton) {
        playButton.addEventListener("click", () => {
            if (video.paused) {
                video.play();
                playButton.style.display = "none";
            }
        });

        video.addEventListener("pause", () => {
            playButton.style.display = "flex";
        });

        video.addEventListener("play", () => {
            playButton.style.display = "none";
        });

        video.addEventListener("ended", () => {
            playButton.style.display = "flex";
        });
    }

});
