const researchData = [
    {
        id: 1,
        title: "Visible Shoreline Change in the Northern Caspian Sea",
        date: "12.06.2026",
        category: "Satellite Observation",
        status: "Draft Research",
        authors: ["Umid Qurbanli", "Emin Rzayev"],
        readingTime: "8 min read",
        image: "img/research/research-1.jpg",
        featured: true,
        tags: ["Caspian Sea", "Shoreline Change", "Satellite Imagery"],
        abstract:
            "This research examines visible changes in the northern Caspian Sea coastline using satellite-based visual comparison and project observations. The aim is to document environmental change in an accessible research format.",
        sections: [
            {
                heading: "Introduction",
                image: "img/research/research-1-intro.jpg",
                caption: "Example introduction image. Replace this with your actual research image.",
                body: `
                    <p>The Caspian Sea is undergoing visible environmental change, especially in shallow northern areas where coastline retreat can be observed through satellite imagery and long-term visual comparison.</p>

                    <p>This research is prepared as part of the Caspian Guardians project. Its purpose is to collect, organize, and present evidence in a format that can be understood by students, researchers, environmental activists, and the general public.</p>
                `
            },
            {
                heading: "Observation Method",
                image: "img/research/research-1-method.jpg",
                caption: "Satellite comparison, field materials, or map screenshots can be placed here.",
                body: `
                    <p>The observation method is based on comparing visual materials from different years. The focus is not only on numeric indicators, but also on clear visual evidence of coastline movement, drying zones, and exposed land.</p>

                    <ul>
                        <li>Satellite images are compared by year.</li>
                        <li>Visible drying zones are marked and described.</li>
                        <li>Field or map-based references can be added where available.</li>
                    </ul>
                `
            },
            {
                heading: "Preliminary Findings",
                image: "img/research/research-1-findings.jpg",
                caption: "Use this area for a photo, chart, or map connected to the findings.",
                body: `
                    <p>Preliminary observations suggest that the northeastern and northern parts of the Caspian Sea show the most visible surface-area changes. These areas require continued monitoring because shallow waters react strongly to long-term water-level decline.</p>

                    <p>Further work should include more precise measurements, source comparison, and references to scientific datasets.</p>
                `
            }
        ],
        references: [
            {
                label: "NASA Worldview",
                url: "https://worldview.earthdata.nasa.gov/"
            },
            {
                label: "Caspian Guardians internal visual archive",
                url: ""
            }
        ],
        pdf: "",
        gallery: [
            "img/research/research-1-gallery-1.jpg",
            "img/research/research-1-gallery-2.jpg",
            "img/research/research-1-gallery-3.jpg",
            "img/research/research-1-gallery-4.jpg"
        ]
    },
    {
        id: 2,
        title: "Microplastic Pollution and Coastal Waste on the Caspian Shoreline",
        date: "05.06.2026",
        category: "Environmental Analysis",
        status: "In Progress",
        authors: ["Umid Qurbanli", "Rauf Novruzlu"],
        readingTime: "6 min read",
        image: "img/research/research-2.jpg",
        featured: false,
        tags: ["Pollution", "Microplastics", "Coastal Waste"],
        abstract:
            "This publication explains how visible coastal waste can become part of a wider marine pollution problem, including microplastic fragmentation and possible effects on aquatic organisms.",
        sections: [
            {
                heading: "Background",
                image: "img/research/research-2-background.jpg",
                caption: "Coastal waste documentation image.",
                body: `
                    <p>Waste found along the Caspian shoreline is not only a local aesthetic problem. Plastic materials left near the coast may eventually enter the water and break down into smaller fragments over time.</p>

                    <p>These fragments can become microplastics, which are difficult to remove and may enter aquatic food chains.</p>
                `
            },
            {
                heading: "Why This Matters",
                image: "",
                caption: "",
                body: `
                    <p>The Caspian Sea supports fishing, recreation, coastal communities, and unique ecosystems. Pollution therefore becomes both an environmental and social issue.</p>

                    <ul>
                        <li>Plastic waste can fragment into microplastics.</li>
                        <li>Marine organisms may ingest small particles.</li>
                        <li>Pollution can affect public perception of coastal areas.</li>
                    </ul>
                `
            }
        ],
        references: [
            {
                label: "Caspian Guardians field notes",
                url: ""
            }
        ],
        pdf: "",
        gallery: [
            "img/research/research-2-gallery-1.jpg",
            "img/research/research-2-gallery-2.jpg",
            "img/research/research-2-gallery-3.jpg"
        ]
    },
    {
        id: 3,
        title: "Educational Visualisation of Caspian Sea Water-Level Decline",
        date: "29.05.2026",
        category: "Project Report",
        status: "Published",
        authors: ["Umid Qurbanli", "Hamid Shakhbazov"],
        readingTime: "5 min read",
        image: "img/research/research-3.jpg",
        featured: false,
        tags: ["Education", "Data Visualisation", "Awareness"],
        abstract:
            "This report describes how visual tools, timelines, and charts can help students and general audiences understand the long-term decline of the Caspian Sea water level.",
        sections: [
            {
                heading: "Purpose of the Visualisation",
                image: "img/research/research-3-purpose.jpg",
                caption: "Example of visual education material.",
                body: `
                    <p>Environmental data can be difficult for the general public to understand when it is presented only as numbers. Visualisation helps convert complex trends into accessible explanations.</p>

                    <p>The project uses timelines, image comparison, and graphs to make the decline easier to see and discuss.</p>
                `
            }
        ],
        references: [
            {
                label: "Caspian Guardians website visual materials",
                url: ""
            }
        ],
        pdf: "",
        gallery: [
            "img/research/research-3-gallery-1.jpg",
            "img/research/research-3-gallery-2.jpg"
        ]
    }
];

const featuredResearchBox = document.getElementById("featuredResearchBox");
const researchGrid = document.getElementById("researchGrid");
const researchModal = document.getElementById("researchModal");
const researchModalMain = document.getElementById("researchModalMain");
const researchModalClose = document.getElementById("researchModalClose");
const researchModalOverlay = document.getElementById("researchModalOverlay");

let currentGalleryIndex = 0;
let currentGalleryMax = 0;
let galleryResizeHandler = null;

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function shortText(text, maxLength = 150) {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
}

function renderTags(tags = []) {
    if (!tags.length) return "";

    return `
        <div class="research-tag-row">
            ${tags.map(tag => `<span class="research-tag">${escapeHTML(tag)}</span>`).join("")}
        </div>
    `;
}

function renderFeaturedResearch() {
    if (!featuredResearchBox || !researchData.length) return;

    const featuredItem = researchData.find(item => item.featured) || researchData[0];

    featuredResearchBox.innerHTML = `
        <div class="featured-research-card">
            <img src="${escapeHTML(featuredItem.image)}" alt="${escapeHTML(featuredItem.title)}">

            <div class="featured-research-content">
                <span class="featured-badge">FEATURED RESEARCH</span>

                <div class="featured-meta">
                    <span>${escapeHTML(featuredItem.date)}</span>
                    <span>${escapeHTML(featuredItem.category)}</span>
                </div>

                <h3>${escapeHTML(featuredItem.title)}</h3>

                <p>${escapeHTML(shortText(featuredItem.abstract, 145))}</p>

                <button class="featured-research-btn js-open-research" data-id="${featuredItem.id}">
                    Read research
                </button>
            </div>
        </div>
    `;
}

function renderResearchGrid() {
    if (!researchGrid) return;

    researchGrid.innerHTML = researchData.map(item => `
        <article class="research-card js-open-research" data-id="${item.id}">
            <div class="research-card-image">
                <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}">
            </div>

            <div class="research-card-content">
                <div class="research-card-meta">
                    <span class="research-date">${escapeHTML(item.date)}</span>
                    <span class="research-category">${escapeHTML(item.category)}</span>
                    <span class="research-status">${escapeHTML(item.status)}</span>
                </div>

                <h3>${escapeHTML(item.title)}</h3>

                <p class="research-card-authors">
                    By ${escapeHTML(item.authors.join(", "))}
                </p>

                <p class="research-card-abstract">
                    ${escapeHTML(shortText(item.abstract, 135))}
                </p>

                ${renderTags(item.tags)}

                <button class="research-card-btn" type="button">
                    Open research
                </button>
            </div>
        </article>
    `).join("");
}

function renderResearchSections(item) {
    if (!item.sections || !item.sections.length) return "";

    return item.sections.map((section, index) => {
        const hasImage = Boolean(section.image);

        return `
            <div class="research-modal-section ${!hasImage ? "no-image" : ""} ${index % 2 === 1 ? "is-reversed" : ""}">
                ${hasImage ? `
                    <div class="research-section-image">
                        <img src="${escapeHTML(section.image)}" alt="${escapeHTML(section.heading)}">
                        ${section.caption ? `<p class="research-image-caption">${escapeHTML(section.caption)}</p>` : ""}
                    </div>
                ` : ""}

                <div class="research-section-text">
                    <h3>${escapeHTML(section.heading)}</h3>
                    <div class="research-modal-text">
                        ${section.body}
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

function renderReferences(item) {
    if (!item.references || !item.references.length) return "";

    return `
        <div class="research-references">
            <h3>References</h3>
            <ol>
                ${item.references.map(ref => `
                    <li>
                        ${ref.url
                            ? `<a href="${escapeHTML(ref.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(ref.label)}</a>`
                            : `<span>${escapeHTML(ref.label)}</span>`
                        }
                    </li>
                `).join("")}
            </ol>
        </div>
    `;
}

function renderGallery(item) {
    if (!item.gallery || !item.gallery.length) return "";

    return `
        <div class="research-gallery-section">
            <div class="research-gallery-top">
                <h3>Gallery</h3>

                <div class="research-gallery-controls">
                    <button class="gallery-btn" id="galleryPrevBtn" type="button">&#8592;</button>
                    <button class="gallery-btn" id="galleryNextBtn" type="button">&#8594;</button>
                </div>
            </div>

            <div class="research-gallery-viewport">
                <div class="research-gallery-track" id="researchGalleryTrack">
                    ${item.gallery.map(src => `
                        <div class="gallery-item">
                            <img src="${escapeHTML(src)}" alt="Research gallery image">
                        </div>
                    `).join("")}
                </div>
            </div>
        </div>
    `;
}

function openResearchModal(id) {
    const item = researchData.find(research => research.id === Number(id));
    if (!item || !researchModal || !researchModalMain) return;

    currentGalleryIndex = 0;
    currentGalleryMax = item.gallery ? item.gallery.length : 0;

    researchModalMain.innerHTML = `
        <div class="research-modal-layout">
            <div class="research-modal-left">
                <h2>${escapeHTML(item.title)}</h2>

                <div class="research-modal-abstract">
                    <h3>Abstract</h3>
                    <p>${escapeHTML(item.abstract)}</p>
                </div>

                ${renderResearchSections(item)}

                ${renderReferences(item)}
            </div>

            <div class="research-modal-right">
                <div class="research-main-image">
                    <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}">
                </div>

                <div class="research-info-box">
                    <div class="research-info-row">
                        <span class="research-info-label">Authors</span>
                        <span class="research-info-value">${escapeHTML(item.authors.join(", "))}</span>
                    </div>

                    <div class="research-info-row">
                        <span class="research-info-label">Category</span>
                        <span class="research-info-value">${escapeHTML(item.category)}</span>
                    </div>

                    <div class="research-info-row">
                        <span class="research-info-label">Status</span>
                        <span class="research-info-value">${escapeHTML(item.status)}</span>
                    </div>

                    <div class="research-info-row">
                        <span class="research-info-label">Date</span>
                        <span class="research-info-value">${escapeHTML(item.date)}</span>
                    </div>

                    <div class="research-info-row">
                        <span class="research-info-label">Reading time</span>
                        <span class="research-info-value">${escapeHTML(item.readingTime)}</span>
                    </div>

                    <div class="research-info-row">
                        <span class="research-info-label">Tags</span>
                        <div class="research-modal-tags">
                            ${renderTags(item.tags)}
                        </div>
                    </div>

                    ${item.pdf ? `
                        <div class="research-info-row">
                            <a class="research-link-btn" href="${escapeHTML(item.pdf)}" target="_blank" rel="noopener noreferrer">
                                Open PDF
                            </a>
                        </div>
                    ` : ""}
                </div>
            </div>
        </div>

        ${renderGallery(item)}
    `;

    researchModal.classList.add("active");
    document.body.style.overflow = "hidden";

    initGallery();
}

function closeResearchModal() {
    if (!researchModal) return;

    researchModal.classList.remove("active");
    document.body.style.overflow = "";

    if (galleryResizeHandler) {
        window.removeEventListener("resize", galleryResizeHandler);
        galleryResizeHandler = null;
    }
}

function initGallery() {
    const track = document.getElementById("researchGalleryTrack");
    const prevBtn = document.getElementById("galleryPrevBtn");
    const nextBtn = document.getElementById("galleryNextBtn");

    if (!track || !prevBtn || !nextBtn) return;

    function getVisibleCount() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 900) return 2;
        return 3;
    }

    function getMaxIndex() {
        return Math.max(0, currentGalleryMax - getVisibleCount());
    }

    function updateButtons() {
        prevBtn.disabled = currentGalleryIndex <= 0;
        nextBtn.disabled = currentGalleryIndex >= getMaxIndex();
    }

    function updateGallery() {
        const firstItem = track.querySelector(".gallery-item");
        if (!firstItem) return;

        const gap = 16;
        const itemWidth = firstItem.offsetWidth + gap;

        if (currentGalleryIndex > getMaxIndex()) {
            currentGalleryIndex = getMaxIndex();
        }

        track.style.transform = `translateX(-${currentGalleryIndex * itemWidth}px)`;
        updateButtons();
    }

    prevBtn.onclick = () => {
        currentGalleryIndex--;
        if (currentGalleryIndex < 0) currentGalleryIndex = 0;
        updateGallery();
    };

    nextBtn.onclick = () => {
        currentGalleryIndex++;
        if (currentGalleryIndex > getMaxIndex()) {
            currentGalleryIndex = getMaxIndex();
        }
        updateGallery();
    };

    if (galleryResizeHandler) {
        window.removeEventListener("resize", galleryResizeHandler);
    }

    galleryResizeHandler = updateGallery;
    window.addEventListener("resize", galleryResizeHandler);

    updateGallery();
}

document.addEventListener("click", function (event) {
    const openButton = event.target.closest(".js-open-research");

    if (openButton) {
        openResearchModal(openButton.dataset.id);
    }
});

if (researchModalClose) {
    researchModalClose.addEventListener("click", closeResearchModal);
}

if (researchModalOverlay) {
    researchModalOverlay.addEventListener("click", closeResearchModal);
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && researchModal && researchModal.classList.contains("active")) {
        closeResearchModal();
    }
});

renderFeaturedResearch();
renderResearchGrid();
