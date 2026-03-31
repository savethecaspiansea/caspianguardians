const fullSeries = [
  { date: "1992-10-01", value: -27.31 },
  { date: "1992-11-01", value: -27.33 },
  { date: "1992-12-01", value: -27.36 },
  { date: "1993-01-01", value: -27.39 },
  { date: "1993-02-01", value: -27.41 },
  { date: "1993-03-01", value: -27.38 },
  { date: "1993-04-01", value: -27.35 },
  { date: "1993-05-01", value: -27.32 },
  { date: "1993-06-01", value: -27.28 },
  { date: "1993-07-01", value: -27.26 },
  { date: "1993-08-01", value: -27.29 },
  { date: "1993-09-01", value: -27.34 },
  { date: "2005-01-01", value: -26.62 },
  { date: "2006-01-01", value: -26.70 },
  { date: "2007-01-01", value: -26.82 },
  { date: "2008-01-01", value: -26.95 },
  { date: "2009-01-01", value: -27.08 },
  { date: "2010-01-01", value: -27.15 },
  { date: "2011-01-01", value: -27.21 },
  { date: "2012-01-01", value: -27.35 },
  { date: "2013-01-01", value: -27.48 },
  { date: "2014-01-01", value: -27.62 },
  { date: "2015-01-01", value: -27.71 },
  { date: "2016-01-01", value: -27.82 },
  { date: "2017-01-01", value: -27.93 },
  { date: "2018-01-01", value: -28.02 },
  { date: "2019-01-01", value: -28.10 },
  { date: "2020-01-01", value: -28.18 },
  { date: "2021-01-01", value: -28.29 },
  { date: "2022-01-01", value: -28.41 },
  { date: "2023-01-01", value: -28.55 },
  { date: "2024-01-01", value: -28.67 },
  { date: "2025-01-01", value: -28.73 },
  { date: "2026-03-01", value: -28.77 }
  
];
const temperatureSeries = [
  { date: "1992-10-01", value: 16.2 },
  { date: "1993-10-01", value: 16.4 },
  { date: "1994-10-01", value: 16.5 },
  { date: "1995-10-01", value: 16.6 },
  { date: "1996-10-01", value: 16.8 },
  { date: "1997-10-01", value: 16.9 },
  { date: "1998-10-01", value: 17.0 },
  { date: "1999-10-01", value: 17.1 },
  { date: "2000-10-01", value: 17.2 },
  { date: "2001-10-01", value: 17.3 },
  { date: "2002-10-01", value: 17.4 },
  { date: "2003-10-01", value: 17.5 },
  { date: "2004-10-01", value: 17.6 },
  { date: "2005-10-01", value: 17.7 },
  { date: "2006-10-01", value: 17.8 },
  { date: "2007-10-01", value: 17.9 },
  { date: "2008-10-01", value: 18.0 },
  { date: "2009-10-01", value: 18.1 },
  { date: "2010-10-01", value: 18.3 },
  { date: "2011-10-01", value: 18.2 },
  { date: "2012-10-01", value: 18.3 },
  { date: "2013-10-01", value: 18.4 },
  { date: "2014-10-01", value: 18.5 },
  { date: "2015-10-01", value: 18.6 },
  { date: "2016-10-01", value: 18.7 },
  { date: "2017-10-01", value: 18.8 },
  { date: "2018-10-01", value: 18.9 },
  { date: "2019-10-01", value: 19.0 },
  { date: "2020-10-01", value: 19.1 },
  { date: "2021-10-01", value: 19.2 },
  { date: "2022-10-01", value: 19.3 },
  { date: "2023-10-01", value: 19.4 },
  { date: "2024-10-01", value: 19.5 }
];

const recentSeries = fullSeries.filter(item => item.date >= "2005-01-01");

let chartsWereCreated = false;

function createChart(chartId, data, labelText) {
    const canvas = document.getElementById(chartId);
    if (!canvas) return;

    new Chart(canvas, {
        type: "line",
        data: {
            labels: data.map(item => item.date),
            datasets: [{
                label: labelText,
                data: data.map(item => item.value),
                borderColor: "#4fc3f7",
                backgroundColor: "rgba(79, 195, 247, 0.18)",
                fill: true,
                tension: 0.35,
                borderWidth: 3,

                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: "#ffffff",
                pointHoverBorderColor: "#4fc3f7",
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2200,
                easing: "easeOutQuart"
            },
            plugins: {
                legend: {
                    labels: {
                        color: "white"
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: "#111",
                    titleColor: "#fff",
                    bodyColor: "#fff",
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + " m";
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: "#d0d7de",
                        maxTicksLimit: 8
                    },
                    grid: {
                        color: "rgba(255,255,255,0.08)"
                    }
                },
                y: {
                    ticks: {
                        color: "#d0d7de"
                    },
                    grid: {
                        color: "rgba(255,255,255,0.08)"
                    }
                }
            },
            interaction: {
                
                mode: 'index',
                intersect: false
            },
        }
    });
}

function initChartsOnce() {
    if (chartsWereCreated) return;
    chartsWereCreated = true;

    createChart("chart1", fullSeries, "Caspian Sea level");
    createChart("chart2", recentSeries, "Recent decline");
    createTemperatureChart("chartTemp", temperatureSeries, "Sea surface temperature");
}

document.addEventListener("DOMContentLoaded", function () {
    const graphSection = document.querySelector(".Graphs-dec");
    if (!graphSection) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initChartsOnce();
                observer.unobserve(graphSection);
            }
        });
    }, {
        threshold: 0.35
    });

    observer.observe(graphSection);
});

function createTemperatureChart(chartId, data, labelText) {
    const canvas = document.getElementById(chartId);
    if (!canvas) return;

    new Chart(canvas, {
        type: "line",
        data: {
            labels: data.map(item => item.date),
            datasets: [{
                label: labelText,
                data: data.map(item => item.value),
                borderColor: "#ff8c42",
                backgroundColor: "rgba(255, 140, 66, 0.18)",
                fill: true,
                tension: 0.35,
                borderWidth: 3,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: "#ffffff",
                pointHoverBorderColor: "#ff8c42",
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,

            interaction: {
                mode: "index",
                intersect: false
            },

            animation: {
                duration: 2200,
                easing: "easeOutQuart"
            },

            plugins: {
                legend: {
                    labels: {
                        color: "white"
                    }
                },
                tooltip: {
                    backgroundColor: "#111",
                    titleColor: "#fff",
                    bodyColor: "#fff",
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + " °C";
                        }
                    }
                }
            },

            scales: {
                x: {
                    ticks: {
                        color: "#d0d7de",
                        maxTicksLimit: 8
                    },
                    grid: {
                        color: "rgba(255,255,255,0.08)"
                    }
                },
                y: {
                    ticks: {
                        color: "#d0d7de",
                        callback: function(value) {
                            return value + " °C";
                        }
                    },
                    grid: {
                        color: "rgba(255,255,255,0.08)"
                    }
                }
            }
        }
    });
}