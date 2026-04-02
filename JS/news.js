const newsData = [
    {
        id: 1,
        title: "New field expedition launched to document Caspian coastal ecosystems",
        date: "02.04.2026",
        category: "Research",
        image: "img/news/news-1.jpg",
        featured: true,
        text: `
            <p>A new field expedition has been launched as part of the Caspian Guardians project to document the current condition of coastal ecosystems connected to the Caspian Sea. The expedition focuses on environmental observation, shoreline documentation, and visual data collection.</p>

            <p>The team is visiting selected coastal locations in order to gather photographic materials, field notes, and observational data that can later support awareness work, educational materials, and further research-oriented publication.</p>

            <p>This stage of the project is especially important because it connects visual storytelling with environmental documentation. The resulting material will be used both in the news section and in future project resources.</p>

            <p>Additional images from the expedition are available in the gallery below.</p>
        `,
        gallery: [
            "img/news/gallery-1.jpg",
            "img/news/gallery-2.jpg",
            "img/news/gallery-3.jpg",
            "img/news/gallery-4.jpg",
            "img/news/gallery-5.jpg"
        ]
    },
    {
        id: 2,
        title: "Project media archive expanded with new coastline materials",
        date: "29.03.2026",
        category: "Archive",
        image: "img/news/news-2.jpg",
        featured: false,
        text: `
            <p>The project media archive has been expanded with new visual materials collected during recent field activity. These include updated coastline photographs, landscape observations, and additional image references for future articles.</p>

            <p>The archive is being structured to support both educational content and public communication about environmental change in the Caspian region.</p>
        `,
        gallery: [
            "img/news/gallery-6.jpg",
            "img/news/gallery-7.jpg",
            "img/news/gallery-8.jpg"
        ]
    },
    {
        id: 3,
        title: "New analytical article prepared on visible shoreline change",
        date: "25.03.2026",
        category: "Analysis",
        image: "img/news/news-3.jpg",
        featured: false,
        text: `
            <p>A new long-form analytical article has been prepared to discuss visible shoreline change and how visual comparison can support public understanding of the Caspian Sea crisis.</p>

            <p>The article combines descriptive observations, project commentary, and field-based examples to present recent developments in an accessible format.</p>
        `,
        gallery: [
            "img/news/gallery-9.jpg",
            "img/news/gallery-10.jpg"
        ]
    },
    {
        id: 4,
        title: "Caspian Guardians prepares new educational visual materials",
        date: "21.03.2026",
        category: "Project",
        image: "img/news/news-4.jpg",
        featured: false,
        text: `
            <p>The team is preparing a new set of educational and visual materials designed to support outreach, awareness campaigns, and project communication. These materials will be adapted for website publication and presentation use.</p>

            <p>The goal is to make environmental information more understandable and more visually engaging for visitors.</p>
        `,
        gallery: [
            "img/news/gallery-11.jpg",
            "img/news/gallery-12.jpg",
            "img/news/gallery-13.jpg"
        ]
    },
    {
        id: 5,
        title: "Interactive news format with image gallery introduced",
        date: "17.03.2026",
        category: "Update",
        image: "img/news/news-5.jpg",
        featured: false,
        text: `
            <p>A new interactive format has been introduced for longer news items. Each article can now be opened in a dedicated modal layout with a featured image, metadata, long-form text, and an additional gallery.</p>

            <p>This gives the page a more structured and readable format, where the article text appears on the left, while the image and metadata are displayed on the right.</p>
        `,
        gallery: [
            "img/news/gallery-14.jpg",
            "img/news/gallery-15.jpg",
            "img/news/gallery-16.jpg"
        ]
    },
    {
        id: 6,
        title: "Additional photo documentation prepared for upcoming publications",
        date: "13.03.2026",
        category: "Gallery",
        image: "img/news/news-6.jpg",
        featured: false,
        text: `
            <p>Additional photo documentation has been prepared for future project publications. These visual materials are intended to support upcoming reports, story-based articles, and environmental updates.</p>

            <p>The news section will continue to expand as more materials are prepared and uploaded.</p>
        `,
        gallery: [
            "img/news/gallery-17.jpg",
            "img/news/gallery-18.jpg"
        ]
    }
];

const featuredNewsBox = document.getElementById("featuredNewsBox");
const newsGrid = document.getElementById("newsGrid");
const newsModal = document.getElementById("newsModal");
const newsModalMain = document.getElementById("newsModalMain");
const newsModalClose = document.getElementById("newsModalClose");
const newsModalOverlay = document.getElementById("newsModalOverlay");

let currentGalleryIndex = 0;
let currentGalleryMax = 0;

function renderFeaturedNews() {
    const featuredItem = newsData.find(item => item.featured) || newsData[0];

    featuredNewsBox.innerHTML = `
        <div class="featured-news-card">
            <img src="${featuredItem.image}" alt="${featuredItem.title}">
            <div class="featured-news-content">
                <span class="featured-badge">MOST ACTUAL</span>

                <div class="featured-meta">
                    <span>${featuredItem.date}</span>
                    <span>${featuredItem.category}</span>
                </div>

                <h3>${featuredItem.title}</h3>

                <button class="featured-news-btn" onclick="openNewsModal(${featuredItem.id})">
                    Read more
                </button>
            </div>
        </div>
    `;
}

function renderNewsGrid() {
    newsGrid.innerHTML = newsData.map(item => `
        <article class="news-card" onclick="openNewsModal(${item.id})">
            <div class="news-card-image">
                <img src="${item.image}" alt="${item.title}">
            </div>

            <div class="news-card-content">
                <div class="news-card-meta">
                    <span class="news-date">${item.date}</span>
                    <span class="news-category">${item.category}</span>
                </div>

                <h3>${item.title}</h3>
            </div>
        </article>
    `).join("");
}

function openNewsModal(id) {
    const item = newsData.find(news => news.id === id);
    if (!item) return;

    currentGalleryIndex = 0;
    currentGalleryMax = item.gallery.length;

    newsModalMain.innerHTML = `
        <div class="modal-layout">
            <div class="modal-left">
                <h2>${item.title}</h2>

                <div class="modal-text">
                    ${item.text}
                </div>
            </div>

            <div class="modal-right">
                <div class="modal-main-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>

                <div class="modal-info-box">
                    <div class="modal-info-row">
                        <span class="modal-info-label">Category</span>
                        <span class="modal-info-value">${item.category}</span>
                    </div>

                    <div class="modal-info-row">
                        <span class="modal-info-label">Date</span>
                        <span class="modal-info-value">${item.date}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-gallery-section">
            <div class="modal-gallery-top">
                <h3>Gallery</h3>

                <div class="modal-gallery-controls">
                    <button class="gallery-btn" id="galleryPrevBtn">&#8592;</button>
                    <button class="gallery-btn" id="galleryNextBtn">&#8594;</button>
                </div>
            </div>

            <div class="modal-gallery-viewport">
                <div class="modal-gallery-track" id="modalGalleryTrack">
                    ${item.gallery.map(src => `
                        <div class="gallery-item">
                            <img src="${src}" alt="Gallery image">
                        </div>
                    `).join("")}
                </div>
            </div>
        </div>
    `;

    newsModal.classList.add("active");
    document.body.style.overflow = "hidden";

    initGallery();
}

function closeNewsModal() {
    newsModal.classList.remove("active");
    document.body.style.overflow = "";
}

function initGallery() {
    const track = document.getElementById("modalGalleryTrack");
    const prevBtn = document.getElementById("galleryPrevBtn");
    const nextBtn = document.getElementById("galleryNextBtn");

    if (!track || !prevBtn || !nextBtn) return;

    function getVisibleCount() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 900) return 2;
        return 3;
    }

    function updateGallery() {
        const item = track.querySelector(".gallery-item");
        if (!item) return;

        const gap = 16;
        const itemWidth = item.offsetWidth + gap;
        track.style.transform = `translateX(-${currentGalleryIndex * itemWidth}px)`;
    }

    function getMaxIndex() {
        return Math.max(0, currentGalleryMax - getVisibleCount());
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

    window.addEventListener("resize", updateGallery);
    updateGallery();
}

newsModalClose.addEventListener("click", closeNewsModal);
newsModalOverlay.addEventListener("click", closeNewsModal);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && newsModal.classList.contains("active")) {
        closeNewsModal();
    }
});

renderFeaturedNews();
renderNewsGrid();
