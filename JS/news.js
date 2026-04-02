const newsData = [
    {
        id: 1,
        title: "Caspian Guardians Launches Official Telegram Community",
        date: "01.04.2026",
        category: "Uptade",
        image: "img/news/Telegram.webp",
        featured: true,
        text: `
            <p>Caspian Guardians is pleased to announce the launch of its official Telegram community — a new digital space designed to bring together members, partners, and supporters of the initiative.

The community will serve as a central hub for updates, discussions, and collaboration. Participants will gain direct access to project news, insights, and opportunities to engage with the team and like-minded individuals.

This launch marks an important step in strengthening communication and fostering a more connected and active ecosystem around Caspian Guardians.

Join the conversation and become part of the movement.</p>
        `,
        gallery: [
            "img/news/tgcg.jpg"
        ]
    },
    {
        id: 2,
        title: "Caspian Guardians Introduces News Section on the Official Website",
        date: "2.04.2026",
        category: "Uptade",
        image: "img/news/news-2.jpg",
        featured: false,
        text: `
            <p>TCaspian Guardians is proud to announce the launch of a dedicated News section on its official website.

This new section will serve as a reliable source of timely updates, key announcements, and insights related to the team’s activities and ongoing initiatives. It is designed to keep the community, partners, and stakeholders informed about the latest developments and milestones.

By introducing this feature, Caspian Guardians continues to strengthen transparency and communication, ensuring that important information is easily accessible to everyone.

Stay informed. Stay connected with Caspian Guardians.</p>
        `,
        gallery: [
            "img/news/gallery-6.jpg",
        ]
    },
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
