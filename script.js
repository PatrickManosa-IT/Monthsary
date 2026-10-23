
/* ========================================
   ANNIVERSARY WEBSITE — JAVASCRIPT
======================================== */

// 1. PERSONALIZE YOUR WEBSITE
const CONFIG = {
    anniversaryDate: "2026-03-25T00:00:00",
    partnerName: "My Favorite Person",
    starCount: 65
};


// 2. ANNIVERSARY COUNTER
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const startDateLabel = document.getElementById("startDateLabel");

const anniversaryDate = new Date(CONFIG.anniversaryDate);

function updateCounter() {
    const now = new Date();
    const difference = now.getTime() - anniversaryDate.getTime();

    if (Number.isNaN(anniversaryDate.getTime()) || difference < 0) {
        daysElement.textContent = "000";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        return;
    }

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysElement.textContent = String(days).padStart(3, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
}

if (!Number.isNaN(anniversaryDate.getTime())) {
    startDateLabel.textContent = anniversaryDate.toLocaleDateString(
        "en-US",
        {
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    );
}

updateCounter();
setInterval(updateCounter, 1000);


// 3. PERSONALIZE THE LOVE LETTER
document.getElementById("letterName").textContent =
    CONFIG.partnerName;


// 4. MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


// 5. SCROLL REVEAL ANIMATIONS
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


// 6. DECORATIVE TWINKLING STARS
const starsContainer = document.getElementById("stars");

if (starsContainer) {
    for (let i = 0; i < CONFIG.starCount; i++) {
        const star = document.createElement("span");

        star.className = "star";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 4}s`;
        star.style.animationDuration = `${2 + Math.random() * 4}s`;

        starsContainer.appendChild(star);
    }
}


// 7. INTERACTIVE LOVE LETTER
const letterDialog = document.getElementById("letterDialog");
const openLetterButton = document.getElementById("openLetter");
const closeLetterButton = document.getElementById("closeLetter");

if (letterDialog && openLetterButton && closeLetterButton) {
    openLetterButton.addEventListener("click", () => {
        if (typeof letterDialog.showModal === "function") {
            letterDialog.showModal();
        }
    });

    closeLetterButton.addEventListener("click", () => {
        letterDialog.close();
    });

    letterDialog.addEventListener("click", (event) => {
        if (event.target === letterDialog) {
            letterDialog.close();
        }
    });
}


// 8. AUTOMATIC FOOTER YEAR
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// 9. BACKGROUND MUSIC
const backgroundMusic = document.getElementById("backgroundMusic");

if (backgroundMusic) {
    backgroundMusic.volume = 0.5;

    async function playBackgroundMusic() {
        try {
            await backgroundMusic.play();
            console.log("Background music is playing!");
        } catch (error) {
            console.log(
                "Autoplay was blocked. Click or tap the page to play music."
            );
        }
    }

    // Attempt autoplay when the page loads.
    window.addEventListener("load", playBackgroundMusic);

    // Retry after the visitor's first interaction if autoplay is blocked.
    document.addEventListener(
        "click",
        () => {
            if (backgroundMusic.paused) {
                playBackgroundMusic();
            }
        },
        { once: true }
    );
}

console.log("Our Anniversary Website is ready. ♡");

/* 10. CLICK TO VIEW FULL-SIZE PHOTO */
const photoViewer = document.getElementById("photoViewer");
const fullSizePhoto = document.getElementById("fullSizePhoto");
const photoCaption = document.getElementById("photoCaption");
const closePhotoViewer = document.getElementById("closePhotoViewer");

document.querySelectorAll(".memory-card img").forEach((photo) => {
    photo.addEventListener("click", () => {
        if (!photoViewer || !fullSizePhoto) return;

        fullSizePhoto.src = photo.src;
        fullSizePhoto.alt = photo.alt || "Our memory";

        const caption = photo
            .closest(".memory-card")
            ?.querySelector("figcaption");

        if (photoCaption) {
            photoCaption.textContent = caption
                ? caption.textContent.trim()
                : photo.alt;
        }

        photoViewer.showModal();
    });
});

if (photoViewer && closePhotoViewer) {
    closePhotoViewer.addEventListener("click", () => {
        photoViewer.close();
    });

    photoViewer.addEventListener("click", (event) => {
        if (event.target === photoViewer) {
            photoViewer.close();
        }
    });
}
