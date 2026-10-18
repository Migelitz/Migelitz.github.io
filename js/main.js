if ("IntersectionObserver" in window) {
    document.documentElement.classList.add("js");

    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
        },
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });
}

const headerGlowFadeDistance = 200;
let headerGlowFrame;

const updateHeaderGlow = () => {
    headerGlowFrame = undefined;

    const opacity = Math.max(
        0,
        1 - window.scrollY / headerGlowFadeDistance,
    );

    document.documentElement.style.setProperty(
        "--header-glow-opacity",
        opacity.toString(),
    );
};

window.addEventListener(
    "scroll",
    () => {
        if (headerGlowFrame === undefined) {
            headerGlowFrame = window.requestAnimationFrame(updateHeaderGlow);
        }
    },
    { passive: true },
);

updateHeaderGlow();

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
    const details = card.querySelector(".project-details-toggle");
    details.open = false;

    details.addEventListener("toggle", () => {
        if (details.open) {
            projectCards.forEach((otherCard) => {
                const otherDetails = otherCard.querySelector(
                    ".project-details-toggle",
                );

                if (otherCard !== card && otherDetails.open) {
                    otherDetails.open = false;
                }
            });

            card.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});
