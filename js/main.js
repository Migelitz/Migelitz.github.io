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

/**
 * Validates that dynamic URLs use safe protocols (https: or mailto:)
 * before assigning to anchor href attributes.
 */
const sanitizeUrl = (rawUrl) => {
    try {
        const parsed = new URL(rawUrl, window.location.origin);
        if (parsed.protocol === "https:" || parsed.protocol === "mailto:") {
            return parsed.href;
        }
    } catch {
        return null;
    }
    return null;
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

    // 1. Current Affiliation Banner
    const affiliationBanner = createElement(
        "article",
        "affiliation-banner reveal",
    );
    const affiliationMeta = createElement("div", "affiliation-meta");
    affiliationMeta.append(
        createElement("p", "section-label", "Current affiliation"),
        createElement(
            "p",
            "affiliation-organization",
            affiliation.organization,
        ),
    );

    const affiliationBody = createElement("div", "affiliation-body");
    affiliationBody.append(
        createElement("h3", null, affiliation.role),
        createElement("p", "content-note", affiliation.details),
    );
    affiliationBanner.append(affiliationMeta, affiliationBody);

    // 2. Direct recruiter timeline
    const timelineExperience = createElement("div", "timeline-experience");
    const timelineList = createElement("div", "timeline-list");

    milestones
        .filter((milestone) => milestone.archiveLevel === "quick")
        .forEach((milestone) => {
            const item = createElement("article", "timeline-item reveal");
            item.classList.add("is-visible");

            const meta = createElement("div", "timeline-meta");
            meta.append(
                createElement("span", "timeline-date", milestone.date),
                createElement("span", "timeline-category", milestone.category),
            );

            const content = createElement("div", "timeline-content");
            content.append(createElement("h3", null, milestone.title));
            content.append(createElement("p", "timeline-description", milestone.description));

            if (milestone.links?.length) {
                const links = createElement("div", "inline-links");
                milestone.links.slice(0, 1).forEach((linkData) => {
                    const safeHref = sanitizeUrl(linkData.href);
                    if (!safeHref) return;
                    const link = createElement("a", "project-link", `${linkData.label} \u2197`);
                    link.href = safeHref;
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                    links.append(link);
                });
                content.append(links);
            }

            item.append(meta, content);
            timelineList.append(item);
        });

    timelineExperience.append(timelineList);

    // 3. Currently Exploring Block
    const exploringBlock = createElement("div", "exploring-block reveal");
    exploringBlock.id = "timeline-learning";
    const exploringHeader = createElement("div", "exploring-header");
    exploringHeader.append(
        createElement("p", "section-kicker", "Currently exploring"),
        createElement("h3", null, "Current focus & learning"),
    );

    const exploringGrid = createElement("div", "exploring-grid");
    currentlyExploring.forEach((item) => {
        const entry = createElement("article", "exploring-item");
        entry.append(
            createElement("h4", null, item.title),
            createElement("p", null, item.description),
        );
        exploringGrid.append(entry);
    });

    exploringBlock.append(exploringHeader, exploringGrid);
    container.append(affiliationBanner, timelineExperience, exploringBlock);
};

const renderSkills = () => {
    const container = document.getElementById("skills-content");
    if (!container) return;

    const grid = createElement("div", "skills-grid");

    skills.forEach((group) => {
        const row = createElement("section", "skill-group reveal");
        row.append(createElement("h3", null, group.category));

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

        row.append(list);
        grid.append(row);
    });

    container.append(grid);
};

const renderThinking = () => {
    const container = document.getElementById("thinking-content");
    if (!container) return;

    const grid = createElement("div", "principles-grid");

    principles.forEach((principle, index) => {
        const card = createElement("article", "principle-card reveal");
        const num = String(index + 1).padStart(2, "0");
        card.append(
            createElement("p", "principle-number", num),
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

document.documentElement.classList.add("js");

// Stagger sibling reveal cards in editorial grids.
[
    ...document.querySelectorAll(".tldr-columns"),
    ...document.querySelectorAll(".principles-grid"),
    ...document.querySelectorAll(".skill-list"),
].forEach((container) => {
    const siblings = [
        ...container.querySelectorAll(":scope > .tldr-item, :scope > .principle-card, :scope > .skill-item"),
    ];
    siblings.forEach((sibling, index) => {
        sibling.style.setProperty("--reveal-delay", `${index * 60}ms`);
    });
});

// Scroll reveal & active section observers
if ("IntersectionObserver" in window) {
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observerInstance.unobserve(entry.target);
                }
            });
        },
        { rootMargin: "0px 0px -5% 0px", threshold: 0.01 },
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    const navLinks = [...document.querySelectorAll("[data-nav-section]")];
    const sections = navLinks
        .map((link) => document.getElementById(link.dataset.navSection))
        .filter(Boolean);

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const activeId = entry.target.id;
                navLinks.forEach((link) => {
                    if (link.dataset.navSection === activeId) {
                        link.setAttribute("aria-current", "true");
                    } else {
                        link.removeAttribute("aria-current");
                    }
                });
            });
        },
        { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );

    sections.forEach((section) => sectionObserver.observe(section));
} else {
    document.querySelectorAll(".reveal").forEach((element) => {
        element.classList.add("is-visible");
    });
}

// Return to top button
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

// Header scroll-progress hairline.
const scrollProgress = document.querySelector(".scroll-progress");
const updateScrollProgress = () => {
    if (!scrollProgress) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
    scrollProgress.style.setProperty("--scroll-progress", String(progress));
};

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

// Project category filtering
const projectCards = [...document.querySelectorAll(".project-card")];
const filterButtons = [...document.querySelectorAll(".filter-btn")];
const filterStatus = document.getElementById("filter-status");

const applyCategoryFilter = (category) => {
    const updateFilter = () => {
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
                filterButtons
                    .find((button) => button.dataset.filter === category)
                    ?.textContent?.trim() || "All";
            filterStatus.textContent = `Showing ${visibleCount} project${visibleCount === 1 ? "" : "s"}${category === "all" ? "." : ` in ${label}.`}`;
        }
    };

    if (document.startViewTransition && !prefersReducedMotion()) {
        document.startViewTransition(updateFilter);
    } else {
        updateFilter();
    }
};

filterButtons.forEach((button) => {
    button.addEventListener("click", () =>
        applyCategoryFilter(button.dataset.filter),
    );
});

/**
 * Ensures that if a user clicks an anchor pointing to a project (or project notes)
 * that is currently hidden by a category filter, the filter resets to "all"
 * so native browser hash navigation lands on the visible target.
 */
const ensureTargetProjectVisible = (hash) => {
    if (!hash || !hash.startsWith("#")) return;
    const targetElement = document.getElementById(hash.slice(1));
    if (!targetElement) return;

    const parentProject = targetElement.closest(".project-card");
    if (parentProject && parentProject.hidden) {
        applyCategoryFilter("all");
    }

    if (targetElement.matches(".project-notes")) {
        targetElement.open = true;
    }
};

document.addEventListener("click", (event) => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;
    ensureTargetProjectVisible(anchor.getAttribute("href"));
});

window.addEventListener("hashchange", () => {
    ensureTargetProjectVisible(window.location.hash);
});

// Ensure deep links to filtered projects work on initial page load
if (window.location.hash) {
    ensureTargetProjectVisible(window.location.hash);
}

// Accessible System Architecture Inspector tabs.
const inspectorTabs = [...document.querySelectorAll('[role="tab"][data-inspector]')];
const inspectorPanels = [...document.querySelectorAll('[role="tabpanel"][data-inspector-panel]')];

const activateInspector = (tab) => {
    const system = tab.dataset.inspector;
    inspectorTabs.forEach((candidate) => {
        const selected = candidate === tab;
        candidate.setAttribute("aria-selected", String(selected));
        candidate.tabIndex = selected ? 0 : -1;
    });
    inspectorPanels.forEach((panel) => {
        panel.hidden = panel.dataset.inspectorPanel !== system;
    });
};

inspectorTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateInspector(tab));
    tab.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let nextIndex = index;
        if (event.key === "ArrowLeft") nextIndex = (index - 1 + inspectorTabs.length) % inspectorTabs.length;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % inspectorTabs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = inspectorTabs.length - 1;
        const nextTab = inspectorTabs[nextIndex];
        activateInspector(nextTab);
        nextTab.focus();
    });
});

document.querySelectorAll(".inspector-panel").forEach((panel) => {
    const detail = panel.querySelector(".inspector-detail");
    const nodes = [...panel.querySelectorAll(".pipeline-node")];

    const activateInspectorNode = (node) => {
        nodes.forEach((candidate) => {
            candidate.classList.toggle("is-active", candidate === node);
        });
        if (detail) {
            detail.textContent = node.dataset.inspectorRole || "";
        }
    };

    nodes.forEach((node) => {
        node.addEventListener("click", () => activateInspectorNode(node));
        node.addEventListener("mouseenter", () => activateInspectorNode(node));
        node.addEventListener("focus", () => activateInspectorNode(node));
    });
});

// Briefly pulse a project card reached from a skills evidence link.
document.addEventListener("click", (event) => {
    const evidenceLink = event.target.closest(".evidence-link");
    if (!evidenceLink) return;
    const projectId = evidenceLink.dataset.evidenceTarget;
    const project = document.getElementById(projectId);
    if (!project) return;
    window.requestAnimationFrame(() => {
        project.classList.remove("is-evidence-highlight");
        void project.offsetWidth;
        project.classList.add("is-evidence-highlight");
        window.setTimeout(() => {
            project.classList.remove("is-evidence-highlight");
        }, 1200);
    });
});
