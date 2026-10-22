import {
    affiliation,
    currentlyExploring,
    milestones,
    principles,
    skills,
} from "./content.js";

const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const createElement = (tagName, className, text) => {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
};

const createEvidenceLinks = (evidence) => {
    const list = createElement("div", "evidence-list");
    evidence.forEach((projectId) => {
        const project = document.getElementById(projectId);
        if (!project) return;
        const link = createElement(
            "a",
            "evidence-link",
            project.querySelector("h3")?.textContent || "Project",
        );
        link.href = `#${projectId}`;
        link.dataset.evidenceTarget = projectId;
        list.append(link);
    });
    return list;
};

const renderExperience = () => {
    const container = document.getElementById("experience-content");
    if (!container) return;

    const affiliationCard = createElement("article", "affiliation-card reveal");
    affiliationCard.append(
        createElement("p", "section-label", "CURRENT AFFILIATION"),
        createElement("h3", null, affiliation.role),
        createElement(
            "p",
            "affiliation-organization",
            affiliation.organization,
        ),
    );
    const affiliationNote = createElement(
        "p",
        "content-note",
        affiliation.details,
    );
    affiliationCard.append(affiliationNote);

    const timeline = createElement("div", "timeline");
    if (!milestones.length) {
        timeline.append(
            createElement(
                "p",
                "timeline-empty",
                "Verified milestones will be added as dates and details are confirmed.",
            ),
        );
    }
    milestones.forEach((milestone) => {
        const item = createElement("article", "timeline-item reveal");
        const meta = createElement("p", "timeline-meta");
        meta.append(
            createElement("span", "timeline-date", milestone.date),
            createElement("span", "timeline-category", milestone.category),
        );
        item.append(meta, createElement("h3", null, milestone.title));
        item.append(createElement("p", null, milestone.description));
        if (milestone.links?.length) {
            const links = createElement("div", "inline-links");
            milestone.links.forEach((linkData) => {
                const link = createElement("a", "project-link", linkData.label);
                link.href = linkData.href;
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                links.append(link);
            });
            item.append(links);
        }
        timeline.append(item);
    });

    const exploring = createElement("article", "exploring-card reveal");
    exploring.append(
        createElement("p", "section-label", "CURRENTLY EXPLORING"),
        createElement("h3", null, "Current focus & learning"),
    );
    currentlyExploring.forEach((item) => {
        const entry = createElement("div", "exploring-item");
        entry.append(
            createElement("p", "item-meta", `${item.type} · ${item.title}`),
            createElement("p", null, item.description),
        );
        exploring.append(entry);
    });

    container.append(affiliationCard, timeline, exploring);
};

const renderSkills = () => {
    const container = document.getElementById("skills-content");
    if (!container) return;
    const grid = createElement("div", "skills-grid");

    skills.forEach((group) => {
        const card = createElement("article", "skill-group reveal");
        card.append(createElement("h3", null, group.category));
        const list = createElement("ul", "skill-list");
        group.items.forEach((skill) => {
            const item = createElement("li", "skill-item");
            const header = createElement("div", "skill-heading");
            header.append(
                createElement("strong", null, skill.name),
                createElement("span", "skill-status", skill.status),
            );
            item.append(header, createEvidenceLinks(skill.evidence));
            list.append(item);
        });
        card.append(list);
        grid.append(card);
    });
    container.append(grid);
};

const renderThinking = () => {
    const container = document.getElementById("thinking-content");
    if (!container) return;
    const grid = createElement("div", "principles-grid");
    principles.forEach((principle) => {
        const card = createElement("article", "principle-card reveal");
        card.append(
            createElement("h3", null, principle.title),
            createElement("p", null, principle.description),
        );
        grid.append(card);
    });
    container.append(grid);
};

renderExperience();
renderSkills();
renderThinking();
// .js indicates JavaScript is enabled. Only apply JS-dependent styles (like scroll reveals) when JS can control visibility, so content remains visible if JS is unavailable.
document.documentElement.classList.add("js");

if ("IntersectionObserver" in window) {
    window.addEventListener("DOMContentLoaded", () => {
        const revealElements = document.querySelectorAll(".reveal");
        const observer = new IntersectionObserver(
            (entries, observerInstance) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observerInstance.unobserve(entry.target);
                    }
                });
            },
            // Make it easier for tall and thin objects to get triggered
            { rootMargin: "0px 0px -5% 0px", threshold: 0.01 },
        );
        revealElements.forEach((element) => observer.observe(element));
    });
} else {
    // For browsers that doesn't support IntersectionObserver but Javascript active
    document.querySelectorAll(".reveal").forEach((element) => {
        element.classList.add("is-visible");
    });
}

const headerGlowFadeDistance = 200;
let headerGlowFrame;
const updateHeaderGlow = () => {
    headerGlowFrame = undefined;
    const opacity = Math.max(0, 1 - window.scrollY / headerGlowFadeDistance);
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

const returnButton = document.getElementById("return-btn");
const returnButtonVisibilityThreshold = 500;

const updateReturnButton = () => {
    if (!returnButton) return;
    returnButton.classList.toggle(
        "is-visible",
        window.scrollY > returnButtonVisibilityThreshold,
    );
};

returnButton?.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
});

window.addEventListener("scroll", updateReturnButton, { passive: true });
updateReturnButton();

// ... is spread operator of Javascript, similar to Python's unpacking *my_list
const projectCards = [...document.querySelectorAll(".project-card")];
const filterButtons = [...document.querySelectorAll(".filter-btn")];
const filterStatus = document.getElementById("filter-status");

const applyCategoryFilter = (category) => {
    let visibleCount = 0;
    filterButtons.forEach((button) => {
        button.setAttribute(
            "aria-pressed",
            String(button.dataset.filter === category),
        );
    });
    projectCards.forEach((card) => {
        const categories = (card.dataset.categories || "").split(" ");
        const matches = category === "all" || categories.includes(category);
        card.hidden = !matches;
        if (matches) visibleCount += 1;
    });
    if (filterStatus) {
        const label =
            filterButtons.find((button) => button.dataset.filter === category)
                ?.textContent || "All";
        filterStatus.textContent = `Showing ${visibleCount} project${visibleCount === 1 ? "" : "s"}${category === "all" ? "." : ` in ${label}.`}`;
    }
};

filterButtons.forEach((button) => {
    button.addEventListener("click", () =>
        applyCategoryFilter(button.dataset.filter),
    );
});

projectCards.forEach((card) => {
    const details = card.querySelector(".project-details-toggle");
    if (!details) return;
    details.open = false;
    details.addEventListener("toggle", () => {
        if (!details.open) return;
        projectCards.forEach((otherCard) => {
            if (otherCard === card) return;
            const otherDetails = otherCard.querySelector(
                ".project-details-toggle",
            );
            if (otherDetails) otherDetails.open = false;
        });
        requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            if (rect.top < 96) {
                card.scrollIntoView({
                    behavior: prefersReducedMotion() ? "auto" : "smooth",
                    block: "start",
                });
            }
        });
    });
});

document.addEventListener("click", (event) => {
    const evidenceLink = event.target.closest("[data-evidence-target]");
    if (!evidenceLink) return;
    const targetCard = document.getElementById(
        evidenceLink.dataset.evidenceTarget,
    );
    if (!targetCard) return;
    event.preventDefault();
    if (targetCard.hidden) applyCategoryFilter("all");
    const details = targetCard.querySelector(".project-details-toggle");
    if (details) details.open = true;
    requestAnimationFrame(() => {
        targetCard.scrollIntoView({
            behavior: prefersReducedMotion() ? "auto" : "smooth",
            block: "start",
        });
        targetCard.querySelector("summary")?.focus({ preventScroll: true });
    });
});
