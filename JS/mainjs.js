const track = document.getElementById("timelineTrack");
const tooltip = document.getElementById("tooltip");
const bgA = document.getElementById("heroBgA");
const bgB = document.getElementById("heroBgB");

let activeLayer = "A";

const events = [
{
    year: 2000,
    title: "Caspian Sea in 2000",
    text: "Starting point of our observations and satellite imagery.",
    bg: "img/timeline/Casp2000.jpeg"
  },
  {
    year: 2015,
    title: "Caspian Sea in 2015",
    text: "The northeastern region is almost completely dried out. The trend continues toward the central-northern area, along with significant water level decline across the northern coastline of Russia and Kazakhstan.",
    bg: "img/timeline/Casp2015.jpeg"
  },
  {
    year: 2005,
    title: "Caspian Sea in 2005",
    text: "A year when the situation remained relatively stable, with no significant changes in surface area.",
    bg: "img/timeline/Casp2005.jpeg"
  },
  {
    year: 2010,
    title: "Caspian Sea in 2010",
    text: "Major reductions in surface area become clearly visible, especially in the northeastern part of the sea.",
    bg: "img/timeline/Casp2010.jpeg"
  },
  {
    year: 2020,
    title: "Caspian Sea in 2020",
    text: "Continued drying of the northern Caspian. Early signs of land exposure appear between the islands near Krasny Dolginets (source: Google Maps) and the mainland of Kazakhstan.",
    bg: "img/timeline/Casp2020.jpeg"
  },
  {
    year: 2025,
    title: "Caspian Sea in 2025",
    text: "The same trend continues with the islands, along with further drying near the Volga River.",
    bg: "img/timeline/Casp2025.jpeg"
  },
  {
    year: 2026,
    title: "Caspian Sea in 2026",
    text: "The same trend continues with the islands, along with further drying near the Volga River.",
    bg: "img/timeline/Casp2026.jpeg"
  },
];

const START = 2000;
const END = 2026;
const STEP = 1;

const defaultBg = events.length > 0 ? events[0].bg : "";

function yearGroup(year) {
  return Math.floor(year / STEP) * STEP;
}

const eventsByGroup = {};
events.forEach((ev) => {
  const group = yearGroup(ev.year);
  if (!eventsByGroup[group]) {
    eventsByGroup[group] = [];
  }
  eventsByGroup[group].push(ev);
});

if (bgA && bgB && defaultBg) {
  bgA.style.backgroundImage = `url("${defaultBg}")`;
  bgB.style.backgroundImage = `url("${defaultBg}")`;
}

function preload(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => reject(url);
    img.src = url;
  });
}

async function changeBackground(url) {
  if (!url || !bgA || !bgB) return;

  console.log("Trying to load:", url);

  try {
    await preload(url);
    console.log("Loaded successfully:", url);
  } catch (error) {
    console.error("Image failed to load:", url);
    return;
  }

  if (activeLayer === "A") {
    bgB.style.backgroundImage = `url("${url}")`;

    requestAnimationFrame(() => {
      bgB.style.opacity = "1";
      bgA.style.opacity = "0";
      activeLayer = "B";
    });
  } else {
    bgA.style.backgroundImage = `url("${url}")`;

    requestAnimationFrame(() => {
      bgA.style.opacity = "1";
      bgB.style.opacity = "0";
      activeLayer = "A";
    });
  }
}

function showTooltip(dot, e) {
  if (!tooltip) return;

  tooltip.style.display = "block";
  tooltip.querySelector(".event-year").textContent = dot.dataset.year || "";
  tooltip.querySelector(".event-title").textContent = dot.dataset.title || "";
  tooltip.querySelector(".event-text").textContent = dot.dataset.text || "";

  if (e) {
    moveTooltip(e);
  }
}

function moveTooltip(e) {
  if (!tooltip || !e) return;

  const offset = 14;
  let x = e.clientX + offset;
  let y = e.clientY + offset;

  const rect = tooltip.getBoundingClientRect();
  const maxX = window.innerWidth - rect.width - 10;
  const maxY = window.innerHeight - rect.height - 10;

  if (x > maxX) x = maxX;
  if (y > maxY) y = maxY;
  if (x < 10) x = 10;
  if (y < 10) y = 10;

  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y}px`;
}

function hideTooltip() {
  if (!tooltip) return;
  tooltip.style.display = "none";
}

function clearActiveDots() {
  document.querySelectorAll(".TLdot.is-active").forEach((item) => {
    item.classList.remove("is-active");
  });
}

function createTimeline() {
  if (!track) return;

  track.innerHTML = "";

  for (let year = START; year <= END; year += STEP) {
    const yearDiv = document.createElement("div");
    yearDiv.className = "TLyear";

    const yearEvents = eventsByGroup[year] || [];

    yearEvents.forEach((ev, i) => {
      const dot = document.createElement("div");
      dot.className = "TLdot";
      dot.style.top = `${-6 - i * 19}px`;

      dot.dataset.year = ev.year;
      dot.dataset.title = ev.title;
      dot.dataset.text = ev.text;
      dot.dataset.bg = ev.bg || "";

      dot.addEventListener("mouseenter", async (e) => {
        showTooltip(dot, e);
        clearActiveDots();
        dot.classList.add("is-active");

        if (dot.dataset.bg) {
          await changeBackground(dot.dataset.bg);
        }
      });

      dot.addEventListener("mousemove", (e) => {
        moveTooltip(e);
      });

      dot.addEventListener("mouseleave", () => {
        hideTooltip();
        clearActiveDots();
      });

      dot.addEventListener("click", async () => {
        clearActiveDots();
        dot.classList.add("is-active");

        if (dot.dataset.bg) {
          await changeBackground(dot.dataset.bg);
        }
      });

      yearDiv.appendChild(dot);
    });

    const line = document.createElement("div");
    line.className = "TLline";
    yearDiv.appendChild(line);

    const label = document.createElement("div");
    label.className = "TLlabel";
    label.textContent = String(year);
    yearDiv.appendChild(label);

    track.appendChild(yearDiv);
  }
}

createTimeline();

const tlTrack = document.querySelector(".TLtrack");

if (tlTrack) {
  tlTrack.addEventListener(
    "wheel",
    (e) => {
      if (e.ctrlKey) return;

      const speed = 0.35;
      const dx = e.deltaX || 0;
      const dy = e.deltaY || 0;
      const dominant = Math.abs(dx) > Math.abs(dy) ? dx : dy;

      if (dominant !== 0) {
        e.preventDefault();
        tlTrack.scrollLeft += dominant * speed;
      }
    },
    { passive: false }
  );
}