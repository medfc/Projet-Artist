

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
        
            overlay.classList.add("overlay");
            fullScreenImage.classList.add("fullscreen");
            document.body.append(overlay, fullScreenImage);
        
            portfolioImages.forEach(img => {
                img.addEventListener("click", () => {
                    fullScreenImage.src = img.src.replace(/w_\d+/, 'w_1600');
                    overlay.style.display = fullScreenImage.style.display = "block";
                });
            });
        
            [overlay, fullScreenImage].forEach(element => {
                element.addEventListener("click", () => {
                    overlay.style.display = fullScreenImage.style.display = "none";
                });
            });
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






        /* 8- GESTION DU CONSENTEMENT COOKIES + CHARGEMENT DES IMAGES l CLOUDINARY */

        const overlay = document.getElementById("cookie-overlay");
        const cookieBanner = document.getElementById("cookie-banner");
        const acceptButton = document.getElementById("acceptCookiesBtn");

        // Vérifie si l’utilisateur a déjà accepté les cookies
        const hasConsent = localStorage.getItem("cookiesAccepted") === "true";

        // Si l’utilisateur a donné son consentement, on cache la bannière et on charge les images LCP
        if (hasConsent) {
            overlay.style.display = "none";
            cookieBanner.style.display = "none";
            preloadImagesLCP();  // Précharger les images LCP après consentement
        } else {
            // Sinon, on affiche la bannière
            overlay.style.display = "flex";
            cookieBanner.style.display = "flex";

            // Et on écoute le clic sur le bouton "Accepter"
            if (acceptButton) {
                acceptButton.addEventListener("click", () => {
                    localStorage.setItem("cookiesAccepted", "true");
                    overlay.style.display = "none";
                    cookieBanner.style.display = "none";
                    preloadImagesLCP();  // Précharger les images LCP après consentement
                });
            }
        }


        /* 9- Fonction qui charge dynamiquement les images Cloudinary */
        function chargerImagesCloudinary() {
            const images = document.querySelectorAll(".responsive-img");

            images.forEach((img) => {
                const base = img.getAttribute("data-base");
                const file = img.getAttribute("data-file");
                const consent = img.getAttribute("data-cookieconsent");

                // Vérifie si l'image est associée à un consentement spécifique (par exemple marketing)
                if (base && file && (consent === "marketing" || !consent)) {
                    const baseUrl = `https://res.cloudinary.com/${base}/image/upload`;

                    img.src = `${baseUrl}/w_320,f_webp/${file}`;
                    img.srcset = `
                        ${baseUrl}/w_320,f_webp/${file} 320w,
                        ${baseUrl}/w_768,f_webp/${file} 768w,
                        ${baseUrl}/w_1024,f_webp/${file} 1024w,
                        ${baseUrl}/w_1600,f_webp/${file} 1600w
                    `.trim();
                    img.sizes = "100vw";
                    img.loading = "lazy";
                    img.decoding = "async";
                    img.style.display = "block"; // Débloque l’image si elle était masquée par défaut
                }
            });
        }

        // 10- Fonction pour précharger les images critiques LCP après consentement
        function preloadImagesLCP() {
            const consentGiven = localStorage.getItem("cookiesAccepted") === "true";

            if (consentGiven) {
                // Précharger la première image LCP avec fetchpriority="high"
                const preloadLink1 = document.createElement('link');
                preloadLink1.rel = 'preload';
                preloadLink1.as = 'image';
                preloadLink1.href = 'https://res.cloudinary.com/dai5sffyc/image/upload/w_768,f_auto,q_auto/banner-portfolio_pimjwi.webp';
                preloadLink1.type = 'image/webp';
                preloadLink1.fetchpriority = 'high'; // Priorité élevée pour le LCP
                document.head.appendChild(preloadLink1);

                // Précharger la deuxième image LCP avec fetchpriority="high"
                const preloadLink2 = document.createElement('link');
                preloadLink2.rel = 'preload';
                preloadLink2.as = 'image';
                preloadLink2.href = 'https://res.cloudinary.com/dai5sffyc/image/upload/f_auto,q_auto,w_768/v1743245140/prt-1_ty6pn6.webp';
                preloadLink2.type = 'image/webp';
                preloadLink2.fetchpriority = 'high'; // Priorité élevée pour le LCP
                document.head.appendChild(preloadLink2);
            }
        }

        // Pour être sûr que les images non liées au consentement soient chargées au bon moment
        window.addEventListener("DOMContentLoaded", () => {
            if (hasConsent) {
                preloadImagesLCP();  // Précharger les images LCP après consentement
                chargerImagesCloudinary();    // Charger les autres images après consentement
            }
        });

            
        


            
  

    });



    
    