document.addEventListener("DOMContentLoaded", () => {
    
    /** 🔹 1️⃣ Gestion du menu burger */
    const menuToggle = document.querySelector(".menu-toggle"),
          navBar = document.querySelector(".navigation-bar");

    if (menuToggle && navBar) {
        navBar.classList.remove("active");
        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();
            navBar.classList.toggle("active");
            if (navBar.classList.contains("active")) {
                document.addEventListener("click", function closeMenu(event) {
                    if (!navBar.contains(event.target) && !menuToggle.contains(event.target)) {
                        navBar.classList.remove("active");
                        document.removeEventListener("click", closeMenu);
                    }
                });
            }
        });
    }

    /** 🔹 2️⃣ Texte défilant */
    const textElement = document.getElementById("scrolling-text");
    if (textElement) {
        let textContent = textElement.innerHTML, repetitions = 5;
        textElement.innerHTML = Array(repetitions).fill(textContent).join(" &nbsp;&nbsp;&nbsp;&nbsp; ");
        
        let position = 0, speed = 1;
        const scrollText = () => {
            position -= speed;
            if (position <= -textElement.scrollWidth / repetitions) {
                position += textElement.scrollWidth / repetitions;
            }
            textElement.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(scrollText);
        };
        scrollText();
    }

    /** 🔹 3️⃣ Carrousel */
    const slider = document.querySelector(".slider"),
          slides = document.querySelectorAll(".slide"),
          dots = document.querySelectorAll(".dot");

    if (slider && slides.length && dots.length) {
        let currentIndex = 0, interval;
        const updateSlider = (index) => {
            slider.style.transform = `translateX(${-index * 100}%)`;
            dots.forEach(dot => dot.classList.remove("active"));
            dots[index].classList.add("active");
            currentIndex = index;
        };
        const nextSlide = () => updateSlider((currentIndex + 1) % slides.length);
        
        dots.forEach(dot => dot.addEventListener("click", () => {
            clearInterval(interval);
            updateSlider(parseInt(dot.dataset.index));
            startAutoSlide();
        }));

        const startAutoSlide = () => interval = setInterval(nextSlide, 3000);
        startAutoSlide();
    }

    /** 🔹 4️⃣ Images du portfolio */
    const images = document.querySelectorAll(".portfolio-container img");
    if (images.length) {
        const overlay = document.createElement("div"),
              fullImage = document.createElement("img");

        overlay.className = "overlay";
        fullImage.className = "fullscreen";
        document.body.append(overlay, fullImage);

        images.forEach(img => img.addEventListener("click", () => {
            fullImage.src = img.src;
            overlay.style.display = fullImage.style.display = "block";
        }));

        [overlay, fullImage].forEach(el => el.addEventListener("click", () => {
            overlay.style.display = fullImage.style.display = "none";
        }));
    }

    /** 🔹 5️⃣ Formulaire de contact */
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const fullName = document.getElementById("fullName").value,
                  email = document.getElementById("email").value,
                  message = document.getElementById("message").value;

            fullName && email && message ? (alert("Votre message a été envoyé !"), form.reset()) : alert("Veuillez remplir tous les champs.");
        });
    }

    /** 🔹 6️⃣ Gestion des vidéos */
    
        const video = document.getElementById("video");
        const playButton = document.querySelector(".play-button"); // Utiliser querySelector pour récupérer le bouton correctement
    
        if (video && playButton) {
            playButton.addEventListener("click", () => {
                if (video.paused) {
                    video.play();
                    playButton.style.display = "none"; // Cache le bouton une fois la vidéo lancée
                }
            });
    
            video.addEventListener("pause", () => {
                playButton.style.display = "flex"; // Réaffiche le bouton si la vidéo est mise en pause
            });
    
            video.addEventListener("play", () => {
                playButton.style.display = "none"; // Cache le bouton si la vidéo est en lecture
            });
    
            video.addEventListener("ended", () => {
                playButton.style.display = "flex"; // Réaffiche le bouton lorsque la vidéo est terminée
            });
        }

    

});



