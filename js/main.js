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
        }
    });
});
