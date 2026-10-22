export const affiliation = {
    role: "Technical Lead",
    organization: "PyTorch Philippines",
    details:
        "Supporting technical planning, project development, and collaborative learning in the PyTorch community.",
};

export const milestones = [
    // NOTE: links key-value can hold multiple links
    {
        date: "OCT 2025",
        category: "Competitive Programming",
        title: "Placed 2nd Runner-Up at the RAITE Regional Programming Competition",
        description:
            "Competed in the CodeChum Programming Challenge as part of a two-person team, solving algorithmic problems under a three-hour time limit against teams from universities across Region III.",
        links: [
            {
                label: "View Competition Post",
                href: "https://www.facebook.com/share/p/1DGzAvWiWU/",
            },
        ],
    },
    {
        date: "AUG 2026",
        category: "Machine Learning & Systems",
        title: "Built Sentinel Risk Engine",
        description:
            "Developed a transaction-scoring system integrating an XGBoost model with C, a C++ JNI bridge, and a Java 17 service. Explored model deployment, cross-language integration, and transaction auditing with SQLite.",
        links: [
            {
                label: "View Project",
                href: "https://github.com/Migelitz/sentinel-risk-engine",
            },
        ],
    },
    {
        date: "AUG 2026",
        category: "Backend & Data Engineering",
        title: "Led Backend and Database Development for AutoVal",
        description:
            "Served as Project Lead and Database/Backend Engineer for a full-stack vehicle valuation platform. Built a Python and Pandas pipeline to clean and prepare over 100,000 vehicle listings, designed PostgreSQL schemas, integrated backend data access, and coordinated code reviews and pull requests.",
        links: [
            {
                label: "View Project",
                href: "https://github.com/ThreeBytes-Studio/AutoVal",
            },
        ],
    },
    {
        date: "OCT 2026",
        category: "Open-Source Contribution",
        title: "Merged My First GitHub Pull Request",
        description:
            "Made my first merged contribution to an external GitHub repository by submitting LeetCode solutions while following the project's contribution guidelines. A first step toward collaborating on shared codebases and contributing to open-source software.",
        links: [
            {
                label: "View Merged Pull Request",
                href: "https://github.com/Stewie-pixel/claude-with-leetcode/pull/623",
            },
            {
                label: "View Repository",
                href: "https://github.com/Stewie-pixel/claude-with-leetcode",
            },
        ],
    },
    {
        date: "OCT 2026",
        category: "Python Automation",
        title: "Built SortFlow",
        description:
            "Developed a file-organization utility into a background automation service using filesystem monitoring, worker threads, queues, and safe file-handling logic. Added duplicate protection, rotating logs, automated tests, and Linux systemd integration.",
        links: [
            {
                label: "View Project",
                href: "https://github.com/Migelitz/SortFlow",
            },
        ],
    },
    {
        date: "OCT 2026",
        category: "Python Automation & Data Engineering",
        title: "Released CleanSheet v1.0.0",
        description:
            "Built and released a cross-platform desktop application for spreadsheet processing, data-quality analysis, and automated cleaning. Implemented resource-aware processing workflows, background execution, automated testing, diagnostic reporting, and Windows/Linux packaging.",
        links: [
            {
                label: "View Project",
                href: "https://github.com/Migelitz/CleanSheet",
            },
        ],
    },
];

export const currentlyExploring = [
    {
        title: "Practical Software Engineering",
        type: "Focus",
        description:
            "Improving application architecture, maintainability, testing, debugging, and reliability through hands-on projects.",
    },
    {
        title: "Open-Source Contribution",
        type: "Focus",
        description:
            "Learning unfamiliar codebases, building mental models of existing systems, and contributing through focused, well-tested changes.",
    },
    {
        title: "Developer Tooling & CI/CD",
        type: "Focus",
        description:
            "Strengthening automated testing, continuous integration, release workflows, and application packaging.",
    },
];

export const skills = [
    {
        category: "Programming and data",
        items: [
            {
                name: "Python",
                status: "Established",
                evidence: [
                    "project-cleansheet",
                    "project-sortflow",
                    "project-autoval",
                    "project-sentinel",
                ],
            },
            {
                name: "Pandas",
                status: "Established",
                evidence: ["project-cleansheet", "project-autoval"],
            },
            {
                name: "C++",
                status: "Established",
                evidence: ["project-sentinel"],
            },
            {
                name: "Java",
                status: "Established",
                evidence: ["project-sentinel"],
            },
        ],
    },
    {
        category: "Software engineering",
        items: [
            {
                name: "FastAPI",
                status: "Established",
                evidence: ["project-autoval"],
            },
            {
                name: "REST APIs",
                status: "Established",
                evidence: ["project-autoval"],
            },
            {
                name: "Machine Learning Integration",
                status: "Established",
                evidence: ["project-autoval", "project-sentinel"],
            },
        ],
    },
    {
        category: "Testing and automation",
        items: [
            {
                name: "pytest",
                status: "Established",
                evidence: ["project-cleansheet", "project-sortflow"],
            },
            {
                name: "Data Quality Validation",
                status: "Established",
                evidence: ["project-cleansheet"],
            },
            {
                name: "Automation Workflows",
                status: "Established",
                evidence: [
                    "project-autoval",
                    "project-cleansheet",
                    "project-sortflow",
                ],
            },
        ],
    },
    {
        category: "Tools and infrastructure",
        items: [
            {
                name: "Linux and systemd",
                status: "Established",
                evidence: ["project-sortflow"],
            },
            {
                name: "PostgreSQL",
                status: "Established",
                evidence: ["project-autoval"],
            },
            {
                name: "SQLite",
                status: "Established",
                evidence: ["project-sentinel"],
            },
            {
                name: "Nuitka",
                status: "Established",
                evidence: ["project-cleansheet"],
            },
        ],
    },
];

export const principles = [
    {
        title: "Make Behavior Understandable",
        description:
            "I value maintainable systems where the reasoning behind a decision is clear, not just systems that happen to work once.",
    },
    {
        title: "Test the Edges",
        description:
            "Testing and data-quality checks help turn repetitive work into reliable workflows that can be trusted and debugged.",
    },
    {
        title: "Choose Practical Trade-Offs",
        description:
            "I prefer simple, observable solutions that fit the problem before introducing unnecessary abstraction.",
    },
];
