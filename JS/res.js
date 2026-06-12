const researchData = [
   {
    id: 1,
    title: "When a Sea Disappears: The Economic Cost of the Caspian’s Decline",
    date: "12.06.2026",
    category: "Socio-Economic Analysis",
    status: "Published",
    authors: ["Hamid Shahbazov"],
    readingTime: "5 min read",
    image: "img/NewLogoFixed.png",
    featured: true,
    tags: ["Caspian Sea", "Economy", "Infrastructure", "Investment Risk", "Environmental Decline"],
    abstract:
        "This research examines the economic consequences of the Caspian Sea’s decline, arguing that falling water levels are not only an environmental issue but also a growing economic risk for transport, fisheries, infrastructure, investment, and regional stability.",
    sections: [
        {
            heading: "Main Article",
            image: "",
            caption: "",
            body: `
                <p>The drying of the Caspian Sea is still most often described in environmental terms—falling water levels, stressed ecosystems, declining biodiversity. That framing is understandable, but it is no longer sufficient. What is unfolding is not only an ecological shift; it is a process that is already reshaping the economic stability of the region.</p>

                <p>For decades, the Caspian has functioned as more than a body of water. It has been a foundation for entire sectors: transport and logistics, fisheries, energy systems, and coastal infrastructure. Economic activity has been built around it, relying—often implicitly—on one key assumption: that the natural environment would remain broadly stable over time. That assumption is now being tested.</p>

                <p>In recent decades, the sea level has declined noticeably. In some areas, the shoreline has retreated by significant distances. These changes are no longer abstract. They are beginning to affect the practical workings of the economy. Port operations increasingly face depth constraints, requiring dredging and adjustment. Logistics routes become less predictable. Coastal infrastructure, designed for long-term use, requires earlier-than-expected adaptation. At the same time, pressure on fish stocks is affecting local incomes, employment, and the resilience of coastal communities.</p>

                <p>At first glance, these may appear as separate challenges. But taken together, they reflect a single underlying process. Environmental change is not occurring alongside the economy—it is altering the conditions under which the economy functions. When the physical environment shifts, so do cost structures, risk profiles, and the time horizons of decision-making.</p>

                <p>One of the most important aspects of this shift is that economic consequences emerge before environmental limits are fully reached. Financial systems are highly sensitive to uncertainty. When foundational parameters—such as water depth, infrastructure accessibility, or resource stability—become less predictable, this uncertainty begins to influence investment behavior. Projects require more cautious evaluation, capital may become more selective, and long-term planning loses some of its reliability.</p>

                <p>In this context, the traditional separation between environmental and economic policy becomes increasingly difficult to sustain. Environmental initiatives are often treated as part of a social or ESG agenda—important, but secondary to core economic activity. The situation in the Caspian challenges this distinction.</p>

                <p>Investments in environmental resilience are directly linked to economic stability. Efforts such as ecosystem restoration, responsible water management, and the adaptation of infrastructure to changing conditions do not simply address environmental concerns. They reduce systemic risk, support asset value, and contribute to a more predictable investment environment.</p>

                <p>The absence of such investments also carries consequences. It does not merely delay solutions; it increases the likelihood of more severe economic disruptions in the future. In this sense, environmental inaction becomes an economic liability.</p>

                <p>Recognizing this relationship requires a broader analytical approach. The Caspian must be understood as a system in which environmental and economic processes are deeply interconnected. Decisions cannot be made in isolation—whether across sectors or within individual projects. A more integrated perspective is necessary, one that accounts for long-term change and its cross-sectoral implications.</p>

                <p>This kind of perspective also reflects a deeper intellectual discipline: the ability to work with complexity, to connect seemingly separate variables, and to acknowledge the limits of available data while still acting responsibly. It is an approach grounded not in simplified answers, but in careful, system-level understanding.</p>

                <p>Today, the Caspian Sea represents more than a regional environmental concern. It illustrates how changes in the natural environment can redefine economic logic. Ignoring this connection risks the gradual accumulation of structural vulnerabilities. Acknowledging it, on the other hand, opens the possibility for more resilient and forward-looking development.</p>

                <p>The question, therefore, is no longer whether environmental investment is necessary. The question is whether financial institutions, policymakers, and international organizations are prepared to treat such investment as central to economic strategy rather than peripheral to it.</p>

                <p>The future of the Caspian will not be determined by environmental awareness alone, but by the decisions that follow from it. Meaningful progress will require coordinated action—across governments, industries, and global institutions—grounded in the understanding that environmental sustainability and economic stability are not competing priorities, but parts of the same system.</p>

                <p>In that sense, the preservation of the Caspian is not simply about protecting nature. It is about sustaining the economic foundations that depend on it.</p>
            `
        }
    ],
    references: [
        {
            label: "Caspian Guardians Research Publication",
            url: ""
        }
    ],
    pdf: "",
    gallery: []
},
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
