// Map Configuration
const mapOptions = {
    center: [38.0, 20.0], // Centered around Mediterranean/Europe
    zoom: 4,
    zoomControl: false,
    minZoom: 2,
    maxBounds: [
        [-90, -180],
        [90, 180]
    ]
};

// Initialize Map
const map = L.map('map', mapOptions);
L.control.zoom({ position: 'topright' }).addTo(map);

// Define Tile Layers
const darkTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
});

const lightTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
});

// State variables
let currentTileLayer = darkTileLayer;
currentTileLayer.addTo(map);

let currentLayerGroup = L.layerGroup().addTo(map);
let markers = {};
let activeEventId = null;
let animationIntervals = [];

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    buildSidebar(expulsionEvents, 'exile');
    drawInitialMarkers();
    setupThemeToggle();

    // Tab system
    document.getElementById('show-exile-btn').addEventListener('click', () => { setActiveTab('show-exile-btn'); resetMap(); });
    document.getElementById('show-population-btn').addEventListener('click', () => { setActiveTab('show-population-btn'); closeSidebarOnMobile(); showPopulation2026(); });
    document.getElementById('show-holy-places-btn').addEventListener('click', () => { setActiveTab('show-holy-places-btn'); closeSidebarOnMobile(); showHolyPlaces(); });
    document.getElementById('show-figures-btn').addEventListener('click', () => { setActiveTab('show-figures-btn'); closeSidebarOnMobile(); showNotableFigures(); });
    document.getElementById('show-turkey-btn').addEventListener('click', () => { setActiveTab('show-turkey-btn'); closeSidebarOnMobile(); showTurkeyData(); });
    document.getElementById('show-analysis-btn').addEventListener('click', () => { setActiveTab('show-analysis-btn'); closeSidebarOnMobile(); showAnalysisData(); });

    setupMobileToggle();
    setupTimeSlider();
});

function setActiveTab(activeId) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(activeId);
    if (activeBtn) activeBtn.classList.add('active');
}

function setupMobileToggle() {
    const toggleBtn = document.getElementById('mobile-toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (toggleBtn && sidebar && overlay) {
        // Toggle menu
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        });

        // Close on overlay click
        overlay.addEventListener('click', () => {
            closeSidebarOnMobile();
        });
    }
}

function closeSidebarOnMobile() {
    if (window.innerWidth <= 900) {
        document.querySelector('.sidebar').classList.remove('open');
        document.getElementById('sidebar-overlay').classList.remove('active');
    }
}

function setupThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Check saved preference
    const savedTheme = localStorage.getItem('je2-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        map.removeLayer(darkTileLayer);
        lightTileLayer.addTo(map);
        currentTileLayer = lightTileLayer;
        updateIconToMoon(themeIcon);
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');

        map.removeLayer(currentTileLayer);
        if (isLight) {
            lightTileLayer.addTo(map);
            currentTileLayer = lightTileLayer;
            localStorage.setItem('je2-theme', 'light');
            updateIconToMoon(themeIcon);
        } else {
            darkTileLayer.addTo(map);
            currentTileLayer = darkTileLayer;
            localStorage.setItem('je2-theme', 'dark');
            updateIconToSun(themeIcon);
        }
    });
}

function updateIconToMoon(svg) {
    svg.innerHTML = `
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    `;
}

function updateIconToSun(svg) {
    svg.innerHTML = `
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    `;
}

// Build Dynamic Sidebar
function buildSidebar(dataArray, viewType) {
    const timelineContainer = document.getElementById('timeline');
    timelineContainer.innerHTML = '';

    dataArray.forEach((itemData, index) => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.id = `sidebar-item-${index}`;

        if (viewType === 'exile') {
            let routesHtml = '<ul style="margin-top: 10px; padding-left: 15px; font-size: 0.8rem; color: var(--text-secondary); list-style: none;">';
            itemData.destinations.forEach((dest, dIndex) => {
                routesHtml += `<li class="route-link" data-event-id="${itemData.id}" data-dest-index="${dIndex}" style="margin-bottom: 5px; cursor: pointer; transition: color 0.2s;" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='var(--text-secondary)'">
                    <span style="color: var(--accent);">&#10140;</span> <b>${dest.name}</b> 
                    <span style="color: #f39c12; font-size: 0.75rem; margin-left: 5px;">(${dest.count || 'Sayılmamış'})</span>
                </li>`;
            });
            routesHtml += '</ul>';

            item.innerHTML = `
                <div class="timeline-year">${itemData.displayYear}</div>
                <h3 class="timeline-title">${itemData.title}</h3>
                <p class="timeline-summary">${itemData.description}</p>
                ${routesHtml}
            `;
            item.addEventListener('click', (e) => {
                // Sürgün Hedeflerinden (Rotalar) birine tıklandıysa:
                const routeLink = e.target.closest('.route-link');
                if (routeLink) {
                    e.stopPropagation();
                    closeSidebarOnMobile();

                    // Eğer haritada olay henüz seçilmemişse önce onu seç (çizgiler çizilsin)
                    if (activeEventId !== itemData.id) {
                        selectEvent(itemData.id);
                    }

                    const dIndex = parseInt(routeLink.getAttribute('data-dest-index'));
                    const dest = itemData.destinations[dIndex];
                    map.flyTo(dest.coords, 8, { duration: 1.5 });

                    setTimeout(() => {
                        const destMarker = markers[`dest_${itemData.id}_${dIndex}`];
                        if (destMarker) destMarker.openPopup();
                    }, 1500);

                    return;
                }

                // Normal Olay Başlığına Tıklanırsa
                closeSidebarOnMobile();
                selectEvent(itemData.id);
            });
        } else if (viewType === 'population') {
            item.innerHTML = `
                <div class="timeline-year" style="color: var(--accent);">${itemData.population.toLocaleString('tr-TR')}</div>
                <h3 class="timeline-title">${itemData.country}</h3>
                <p class="timeline-summary">${itemData.description}</p>
            `;
            item.addEventListener('click', () => {
                closeSidebarOnMobile();
                document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
                map.flyTo(itemData.coords, 6, { duration: 1.5 });
                setTimeout(() => { if (markers[index]) markers[index].openPopup(); }, 1500);
            });
        } else if (viewType === 'holy') {
            item.innerHTML = `
                <div class="timeline-year" style="color: #9b59b6;">${itemData.highlight}</div>
                <h3 class="timeline-title">${itemData.name}</h3>
            `;
            item.addEventListener('click', () => {
                closeSidebarOnMobile();
                document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
                map.flyTo(itemData.coords, 8, { duration: 1.5 });
                setTimeout(() => { if (markers[index]) markers[index].openPopup(); }, 1500);
            });
        } else if (viewType === 'figures') {
            item.innerHTML = `
                <div class="timeline-year" style="color: #1abc9c;">${itemData.era}</div>
                <h3 class="timeline-title">${itemData.name}</h3>
                <p class="timeline-summary">${itemData.highlight}</p>
            `;
            item.addEventListener('click', () => {
                closeSidebarOnMobile();
                document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
                map.flyTo(itemData.coords, 8, { duration: 1.5 });
                setTimeout(() => { if (markers[index]) markers[index].openPopup(); }, 1500);
            });
        } else if (viewType === 'turkey') {
            item.innerHTML = `
                <div class="timeline-year" style="color: #e74c3c;">${itemData.era}</div>
                <h3 class="timeline-title">${itemData.name}</h3>
                <p class="timeline-summary">${itemData.highlight}</p>
            `;
            item.addEventListener('click', () => {
                closeSidebarOnMobile();
                document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
                map.flyTo(itemData.coords, 10, { duration: 1.5 });
                setTimeout(() => { if (markers[index]) markers[index].openPopup(); }, 1500);
            });
        } else if (viewType === 'analysis') {
            item.innerHTML = `
                <div class="timeline-year" style="color: #f39c12;">Nüfus: ${itemData.populationRatio}</div>
                <h3 class="timeline-title">${itemData.country}</h3>
                <p class="timeline-summary" style="font-size:0.8rem; color:#f39c12; margin-top:5px;">Sermaye Oranı: ${itemData.wealthRatio}</p>
            `;
            item.addEventListener('click', () => {
                closeSidebarOnMobile();
                document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
                map.flyTo(itemData.coords, 4, { duration: 1.5 });
                setTimeout(() => { if (markers[index]) markers[index].openPopup(); }, 1500);
            });
        }

        timelineContainer.appendChild(item);
    });
}

// Draw initial markers (origins only)
function drawInitialMarkers() {
    currentLayerGroup.clearLayers();

    expulsionEvents.forEach(event => {
        const customIcon = L.divIcon({
            className: 'marker-wrapper',
            html: '<div class="inner-dot" style="width:14px; height:14px; background-color: var(--accent); border: 3px solid #000; box-shadow: 0 0 10px var(--accent);"></div>',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });

        const marker = L.marker(event.origin.coords, { icon: customIcon })
            .bindTooltip(event.origin.name, { direction: 'top', offset: [0, -10] })
            .addTo(currentLayerGroup);

        marker.on('click', () => {
            selectEvent(event.id);
        });

        markers[event.id] = marker;
    });
}

// Select Event and Animate Map
function selectEvent(eventId) {
    if (activeEventId === eventId) return; // Already active

    // Update Slider UI if it doesn't match
    const eventIndex = expulsionEvents.findIndex(e => e.id === eventId);
    const slider = document.getElementById('time-slider');
    const label = document.getElementById('slider-year-label');
    if (slider && label && eventIndex !== -1) {
        slider.value = eventIndex;
        label.innerText = expulsionEvents[eventIndex].displayYear;
    }

    const event = expulsionEvents.find(e => e.id === eventId);
    if (!event) return;

    activeEventId = eventId;

    // Update timeline active state
    document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));

    // Find sidebar item by event index
    const itemEl = document.getElementById(`sidebar-item-${eventIndex}`);
    if (itemEl) {
        itemEl.classList.add('active');
        itemEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Update Map Elements
    updateMapForEvent(event);

    // Update Detail Card
    updateDetailCard(event);
}

function updateMapForEvent(event) {
    animationIntervals.forEach(clearInterval);
    animationIntervals = [];
    currentLayerGroup.clearLayers(); // Clear old paths

    // Determine bounds for panning
    const bounds = L.latLngBounds([event.origin.coords]);

    // Origin marker
    const originIcon = L.divIcon({
        className: 'marker-wrapper',
        html: '<div class="inner-dot active" style="width:18px; height:18px; background-color: var(--accent); border: 3px solid #000; box-shadow: 0 0 20px var(--accent); transform: scale(1.3);"></div>',
        iconSize: [44, 44],
        iconAnchor: [22, 22]
    });

    L.marker(event.origin.coords, { icon: originIcon, zIndexOffset: 1000 })
        .bindPopup(`<b>${event.origin.name}</b><br>Sürgün Başlangıcı`)
        .addTo(currentLayerGroup);

    // Destination paths and markers
    event.destinations.forEach((dest, index) => {
        bounds.extend(dest.coords);

        // Destination marker
        const destIcon = L.divIcon({
            className: 'marker-wrapper',
            html: '<div class="inner-dot" style="width:12px; height:12px; background-color: #f0f2f5; border: 2px solid #d4af37;"></div>',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });

        const destMarker = L.marker(dest.coords, { icon: destIcon })
            .bindPopup(`<b>${dest.name}</b><br>Varış/Sürgün Yeri<br><span style="color:var(--accent); font-weight:bold;">${dest.count || 'Bilinmiyor'}</span>`)
            .bindTooltip(`<span style="font-weight:bold;">${dest.name}</span><br><span style="color:#f39c12; font-size:0.75rem;">${dest.count || ''}</span>`, {
                permanent: true, direction: 'top', className: 'dest-tooltip', offset: [0, -10]
            })
            .addTo(currentLayerGroup);

        markers[`dest_${event.id}_${index}`] = destMarker;

        const latLngs = [event.origin.coords, dest.coords];
        const line = L.polyline(latLngs, {
            color: '#d4af37',
            weight: 3,
            opacity: 0.8,
            dashArray: '10, 15', // Okları/noktaları belirginleştiren aralık
            lineCap: 'round'
        }).addTo(currentLayerGroup);

        // Calculate heading to place an arrow in the middle
        const lat1 = event.origin.coords[0];
        const lng1 = event.origin.coords[1];
        const lat2 = dest.coords[0];
        const lng2 = dest.coords[1];
        const midLat = (lat1 + lat2) / 2;
        const midLng = (lng1 + lng2) / 2;

        // Calculate angle
        const dy = lat2 - lat1;
        const dx = Math.cos(Math.PI / 180 * lat1) * (lng2 - lng1);
        let angle = Math.atan2(dy, dx) * 180 / Math.PI;
        angle = -angle + 90; // Adjust for map rotation

        // Add a directional arrow marker exactly in the middle of the line
        const arrowIcon = L.divIcon({
            className: 'path-arrow',
            html: `<div style="transform: rotate(${angle}deg); color: #f1c40f; font-size: 20px; text-shadow: 0 0 5px #000;">&#10148;</div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
        L.marker([midLat, midLng], { icon: arrowIcon, interactive: false }).addTo(currentLayerGroup);

        // Hareket efekti (Animasyonlu noktalar/oklar)
        let dashOffset = 0;
        let intervalId = setInterval(() => {
            dashOffset -= 1; // Sürgün yönüne doğru akar
            line.setStyle({ dashOffset: dashOffset });
        }, 30); // 30ms akıcı hareket
        animationIntervals.push(intervalId);
    });

    // Fit map to show both origin and destinations with some padding
    map.flyToBounds(bounds, {
        padding: [50, 50],
        duration: 1.5,
        easeLinearity: 0.25
    });
}

function updateDetailCard(event) {
    const card = document.getElementById('initial-card');

    card.innerHTML = `
        <h2>${event.title}</h2>
        <p><b>Tarih:</b> ${event.displayYear}</p>
        <p>${event.description}</p>
        
        <div class="detail-tags">
            <span class="tag">${event.category}</span>
            <span class="tag">${event.destinations.length} Ana Hedef Bölge</span>
        </div>
        
        <button onclick="resetMap()" style="
            margin-top: 20px;
            background: transparent;
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-family: var(--font-sans);
            font-size: 0.8rem;
            transition: all 0.2s;
        " onmouseover="this.style.color='var(--text-primary)'; this.style.borderColor='var(--accent)'" 
           onmouseout="this.style.color='var(--text-secondary)'; this.style.borderColor='var(--border-color)'">
            ← Tümünü Göster
        </button>
    `;
}

function resetMap() {
    hideAnalysisDashboard();
    activeEventId = null;
    animationIntervals.forEach(clearInterval);
    animationIntervals = [];
    document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));

    // Show slider ONLY on Exile map
    const sliderContainer = document.getElementById('time-slider-container');
    if (sliderContainer) sliderContainer.style.display = 'flex';

    const card = document.getElementById('initial-card');
    card.innerHTML = `
        <h2>Zaman Çizelgesini Keşfedin</h2>
        <p>Sol taraftaki menüden tarihi bir olay seçerek veya harita üzerindeki noktalara tıklayarak sürgün rotalarını ve detayları görüntüleyebilirsiniz.</p>
        <div class="pulse-indicator"></div>
    `;

    buildSidebar(expulsionEvents, 'exile');
    drawInitialMarkers();

    map.flyTo([38.0, 20.0], 4, {
        duration: 1.5
    });
}

// Show 2026 Population Data
function showPopulation2026() {
    hideAnalysisDashboard();
    // Hide slider
    const sliderContainer = document.getElementById('time-slider-container');
    if (sliderContainer) sliderContainer.style.display = 'none';

    activeEventId = null;
    document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
    currentLayerGroup.clearLayers();

    const bounds = L.latLngBounds([]);

    markers = {};
    currentPopulation.forEach((data, index) => {
        bounds.extend(data.coords);

        const size = Math.max(15, 10 + Math.log10(data.population) * 3);
        const hitSize = Math.max(40, size + 20);

        const popIcon = L.divIcon({
            className: 'marker-wrapper',
            html: `<div class="inner-dot" style="width: ${size}px; height: ${size}px; background-color: rgba(212, 175, 55, 0.8); border: 2px solid #fff; box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);"></div>`,
            iconSize: [hitSize, hitSize],
            iconAnchor: [hitSize / 2, hitSize / 2]
        });

        const marker = L.marker(data.coords, { icon: popIcon })
            .bindPopup(`<b>${data.country}</b><br>Nüfus: ${data.population.toLocaleString('tr-TR')}<br><small>${data.description}</small>`)
            .addTo(currentLayerGroup);

        markers[index] = marker;
    });

    buildSidebar(currentPopulation, 'population');

    // Update Detail Card
    const card = document.getElementById('initial-card');
    card.innerHTML = `
        <h2 style="color: var(--accent);">Güncel Nüfus (2026)</h2>
        <p>Dünya üzerindeki yaklaşık 15.8 milyonluk Yahudi nüfusunun dağılımı. Haritada günümüzde en yoğun Yahudi nüfusuna sahip olan <b>ilk 25 ülke</b> gösterilmektedir.</p>
        <div class="detail-tags">
            <span class="tag">Modern Dağılım</span>
            <span class="tag">İlk 25 Ülke</span>
        </div>
        <button onclick="resetMap()" style="
            margin-top: 20px;
            background: transparent;
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-family: var(--font-sans);
            font-size: 0.8rem;
            transition: all 0.2s;
        " onmouseover="this.style.color='var(--text-primary)'; this.style.borderColor='var(--accent)'" 
           onmouseout="this.style.color='var(--text-secondary)'; this.style.borderColor='var(--border-color)'">
            ← Tarihi Olaylara Dön
        </button>
    `;

    map.flyToBounds(bounds, {
        padding: [30, 30],
        duration: 2.0,
        easeLinearity: 0.25
    });
}

// Show Holy Places Data
function showHolyPlaces() {
    hideAnalysisDashboard();
    const sliderContainer = document.getElementById('time-slider-container');
    if (sliderContainer) sliderContainer.style.display = 'none';

    activeEventId = null;
    document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
    currentLayerGroup.clearLayers();

    const bounds = L.latLngBounds([]);

    markers = {};
    const offsetTracker = {};
    holyPlaces.forEach((place, index) => {
        const displayCoords = getJitteredCoords(place.coords, offsetTracker);
        bounds.extend(displayCoords);

        const holyIcon = L.divIcon({
            className: 'marker-wrapper',
            html: `<div class="inner-dot" style="width: 16px; height: 16px; background-color: #9b59b6; border: 2px solid #fff; box-shadow: 0 0 10px #9b59b6;"></div>`,
            iconSize: [44, 44],
            iconAnchor: [22, 22]
        });

        const imageId = `img-${place.wikiPage || place.name}`.replace(/[^a-zA-Z0-9-]/g, '-');
        const imageHtml = `<div id="${imageId}-wrap" style="width:100%; height:140px; background:rgba(0,0,0,0.2); border-radius:6px; display:flex; align-items:center; justify-content:center; margin-bottom:12px; overflow:hidden;"><span style="color:var(--text-secondary); font-size:0.8rem;">Yükleniyor...</span></div>`;

        const popup = L.popup({ maxWidth: 300 })
            .setContent(`${imageHtml}<b>${place.name}</b><br><span style="color: #9b59b6; font-weight: bold;">${place.highlight}</span><br><small>${place.description}</small>`);

        const marker = L.marker(displayCoords, { icon: holyIcon })
            .bindPopup(popup)
            .addTo(currentLayerGroup);

        // Fetch image from Wikipedia REST API when popup opens
        if (place.wikiPage) {
            marker.on('popupopen', () => {
                const wrap = document.getElementById(`${imageId}-wrap`);
                if (!wrap || wrap.dataset.loaded) return;
                wrap.dataset.loaded = 'true';

                fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(place.wikiPage)}`)
                    .then(r => r.json())
                    .then(data => {
                        const imgUrl = data.thumbnail && data.thumbnail.source;
                        if (imgUrl && wrap) {
                            wrap.innerHTML = `<img src="${imgUrl}" alt="${place.name}" style="width:100%;height:140px;object-fit:cover;border-radius:6px;object-position:center 25%;">`;
                        } else if (wrap) {
                            wrap.style.display = 'none';
                        }
                    })
                    .catch(() => { if (wrap) wrap.style.display = 'none'; });
            });
        }
        markers[index] = marker;
    });

    buildSidebar(holyPlaces, 'holy');

    // Update Detail Card
    const card = document.getElementById('initial-card');
    card.innerHTML = `
        <h2 style="color: #9b59b6;">Kutsal ve Tarihi Merkezler</h2>
        <p>İsrail'deki dini merkezlerden, Avrupa ve Kuzey Afrika'daki tarihi diaspora sinagoglarına ve anıtlarına kadar Yahudiler için manevi ve tarihi önemi yüksek mekanlar.</p>
        <div class="detail-tags">
            <span class="tag">Kültür & İnanç</span>
            <span class="tag">${holyPlaces.length} Önemli Mekan</span>
        </div>
        <button onclick="resetMap()" style="
            margin-top: 20px;
            background: transparent;
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-family: var(--font-sans);
            font-size: 0.8rem;
            transition: all 0.2s;
        " onmouseover="this.style.color='var(--text-primary)'; this.style.borderColor='var(--accent)'" 
           onmouseout="this.style.color='var(--text-secondary)'; this.style.borderColor='var(--border-color)'">
            ← Tarihi Sürgünlere Dön
        </button>
    `;

    map.flyToBounds(bounds, {
        padding: [50, 50],
        duration: 2.0,
        easeLinearity: 0.25
    });
}

// Show Notable Figures Data
function showNotableFigures() {
    hideAnalysisDashboard();
    const sliderContainer = document.getElementById('time-slider-container');
    if (sliderContainer) sliderContainer.style.display = 'none';

    activeEventId = null;
    document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
    currentLayerGroup.clearLayers();

    const bounds = L.latLngBounds([]);

    markers = {};
    const offsetTracker = {};
    notableFigures.forEach((figure, index) => {
        const displayCoords = getJitteredCoords(figure.coords, offsetTracker);
        bounds.extend(displayCoords);

        const figureIcon = L.divIcon({
            className: 'marker-wrapper',
            html: `<div class="inner-dot" style="width: 16px; height: 16px; background-color: #1abc9c; border: 2px solid #fff; box-shadow: 0 0 10px #1abc9c;"></div>`,
            iconSize: [44, 44],
            iconAnchor: [22, 22]
        });

        const imageId = `img-fig-${figure.wikiPage || figure.name}`.replace(/[^a-zA-Z0-9-]/g, '-');
        const imageHtml = `<div id="${imageId}-wrap" style="width:100%; height:140px; background:rgba(0,0,0,0.2); border-radius:6px; display:flex; align-items:center; justify-content:center; margin-bottom:12px; overflow:hidden;"><span style="color:var(--text-secondary); font-size:0.8rem;">Yükleniyor...</span></div>`;

        const popup = L.popup({ maxWidth: 300 })
            .setContent(`${imageHtml}<b>${figure.name}</b><br><span style="color: #1abc9c; font-weight: bold;">${figure.highlight}</span><br><div style="margin: 5px 0; font-size: 0.85em; color: var(--text-secondary);">📍 ${figure.location} • ⏳ ${figure.era}</div><small>${figure.description}</small>`);

        const marker = L.marker(displayCoords, { icon: figureIcon })
            .bindPopup(popup)
            .addTo(currentLayerGroup);

        // Fetch image from Wikipedia REST API when popup opens
        if (figure.wikiPage) {
            marker.on('popupopen', () => {
                const wrap = document.getElementById(`${imageId}-wrap`);
                if (!wrap || wrap.dataset.loaded) return;
                wrap.dataset.loaded = 'true';

                fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(figure.wikiPage)}`)
                    .then(r => r.json())
                    .then(data => {
                        const imgUrl = data.thumbnail && data.thumbnail.source;
                        if (imgUrl && wrap) {
                            wrap.innerHTML = `<img src="${imgUrl}" alt="${figure.name}" style="width:100%;height:140px;object-fit:cover;border-radius:6px;object-position:center 25%;">`;
                        } else if (wrap) {
                            wrap.style.display = 'none';
                        }
                    })
                    .catch(() => { if (wrap) wrap.style.display = 'none'; });
            });
        }
        markers[index] = marker;
    });

    buildSidebar(notableFigures, 'figures');

    // Update Detail Card
    const card = document.getElementById('initial-card');
    card.innerHTML = `
        <h2 style="color: #1abc9c;">Tarihte İz Bırakan İsimler</h2>
        <p>Bilimden felsefeye, siyasetten sanata kadar dünya tarihine yön vermiş olan önemli Yahudi entelektüellerinin, bilim insanlarının ve liderlerinin tarih boyunca etki bıraktığı merkezler.</p>
        <div class="detail-tags">
            <span class="tag">Önemli Şahsiyetler</span>
            <span class="tag">${notableFigures.length} İsim</span>
        </div>
        <button onclick="resetMap()" style="
            margin-top: 20px;
            background: transparent;
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-family: var(--font-sans);
            font-size: 0.8rem;
            transition: all 0.2s;
        " onmouseover="this.style.color='var(--text-primary)'; this.style.borderColor='var(--accent)'" 
           onmouseout="this.style.color='var(--text-secondary)'; this.style.borderColor='var(--border-color)'">
            ← Tarihi Sürgünlere Dön
        </button>
    `;

    map.flyToBounds(bounds, {
        padding: [50, 50],
        duration: 2.0,
        easeLinearity: 0.25
    });
}

// Show Turkey Data
function showTurkeyData() {
    hideAnalysisDashboard();
    const sliderContainer = document.getElementById('time-slider-container');
    if (sliderContainer) sliderContainer.style.display = 'none';

    activeEventId = null;
    document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
    currentLayerGroup.clearLayers();

    const bounds = L.latLngBounds([]);

    markers = {};
    const offsetTracker = {};
    turkeyData.forEach((figure, index) => {
        const displayCoords = getJitteredCoords(figure.coords, offsetTracker);
        bounds.extend(displayCoords);

        const turkeyIcon = L.divIcon({
            className: 'marker-wrapper',
            html: `<div class="inner-dot" style="width: 16px; height: 16px; background-color: #e74c3c; border: 2px solid #fff; box-shadow: 0 0 10px #e74c3c;"></div>`,
            iconSize: [44, 44],
            iconAnchor: [22, 22]
        });

        const imageId = `img-trk-${figure.wikiPage || figure.name}`.replace(/[^a-zA-Z0-9-]/g, '-');
        const imageHtml = `<div id="${imageId}-wrap" style="width:100%; height:140px; background:rgba(0,0,0,0.2); border-radius:6px; display:flex; align-items:center; justify-content:center; margin-bottom:12px; overflow:hidden;"><span style="color:var(--text-secondary); font-size:0.8rem;">Yükleniyor...</span></div>`;

        const popup = L.popup({ maxWidth: 300 })
            .setContent(`${imageHtml}<b>${figure.name}</b><br><span style="color: #e74c3c; font-weight: bold;">${figure.highlight}</span><br><div style="margin: 5px 0; font-size: 0.85em; color: var(--text-secondary);">📍 ${figure.location} • ⏳ ${figure.era}</div><small>${figure.description}</small>`);

        const marker = L.marker(displayCoords, { icon: turkeyIcon })
            .bindPopup(popup)
            .addTo(currentLayerGroup);

        // Fetch image from Wikipedia REST API when popup opens
        if (figure.wikiPage) {
            marker.on('popupopen', () => {
                const wrap = document.getElementById(`${imageId}-wrap`);
                if (!wrap || wrap.dataset.loaded) return;
                wrap.dataset.loaded = 'true';

                fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(figure.wikiPage)}`)
                    .then(r => r.json())
                    .then(data => {
                        const imgUrl = data.thumbnail && data.thumbnail.source;
                        if (imgUrl && wrap) {
                            wrap.innerHTML = `<img src="${imgUrl}" alt="${figure.name}" style="width:100%;height:140px;object-fit:cover;border-radius:6px;object-position:center 25%;">`;
                        } else if (wrap) {
                            wrap.style.display = 'none';
                        }
                    })
                    .catch(() => { if (wrap) wrap.style.display = 'none'; });
            });
        }
        markers[index] = marker;
    });

    buildSidebar(turkeyData, 'turkey');

    // Update Detail Card
    const card = document.getElementById('initial-card');
    card.innerHTML = `
        <h2 style="color: #e74c3c;">Türkiye Yahudileri</h2>
        <p>Osmanlı ve Türkiye Cumhuriyeti dönemlerinde ticaret, sanayi, kültür, sanat ve dini hayatta etki yaratan ünlü Türk Yahudileri ve toplumun tarihi dini toplanma merkezleri.</p>
        <div class="detail-tags">
            <span class="tag">Anadolu Sefaradları</span>
            <span class="tag">${turkeyData.length} Ana Merkez</span>
        </div>
        <button onclick="resetMap()" style="
            margin-top: 20px;
            background: transparent;
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-family: var(--font-sans);
            font-size: 0.8rem;
            transition: all 0.2s;
        " onmouseover="this.style.color='var(--text-primary)'; this.style.borderColor='var(--accent)'" 
           onmouseout="this.style.color='var(--text-secondary)'; this.style.borderColor='var(--border-color)'">
            ← Tarihi Sürgünlere Dön
        </button>
    `;

    // Specifically framing Turkey
    map.flyToBounds(bounds, {
        padding: [100, 100],
        duration: 2.0,
        easeLinearity: 0.25
    });
}

// Helper to spread markers that have identical coordinates so they don't hide each other
function getJitteredCoords(coords, offsetTracker) {
    const key = coords.join(',');
    if (!offsetTracker[key]) {
        offsetTracker[key] = 1;
        return coords;
    }
    const count = offsetTracker[key]++;

    // Spread evenly in expanding circles based on how many share the exact coordinate
    const radiusStep = 0.05; // degree offset (roughly 4-5 km spread)
    const ring = Math.ceil(count / 6); // 6 points per ring
    const radius = radiusStep * ring;
    const angle = count * (Math.PI / 3); // 60 degrees

    return [
        coords[0] + (Math.cos(angle) * radius * 0.7), // Lat adjusted slightly for projection
        coords[1] + (Math.sin(angle) * radius)        // Lng
    ];
}



// Hide analysis dashboard when switching to other views
function hideAnalysisDashboard() {
    const dash = document.getElementById('analysis-dashboard');
    if (dash) dash.style.display = 'none';
}

// Show Analysis Dashboard
function showAnalysisData() {
    activeEventId = null;
    currentLayerGroup.clearLayers();
    animationIntervals.forEach(clearInterval);
    animationIntervals = [];

    const dash = document.getElementById('analysis-dashboard');
    const inner = dash.querySelector('.analysis-inner');
    dash.style.display = 'block';

    // Flag mapping
    const flags = {
        'Küresel (Dünya Geneli)': '🌍',
        'ABD (Amerika Birleşik Devletleri)': '🇺🇸',
        'Birleşik Krallık': '🇬🇧',
        'İsrail': '🇮🇱',
        'Rusya ve Doğu Avrupa Oligarkları': '🇷🇺',
        'Fransa': '🇫🇷'
    };

    // Parse percentage helper
    function parsePercent(str) {
        const match = str.match(/[\d.]+/);
        return match ? parseFloat(match[0]) : 0;
    }

    // Build HTML
    let html = `
        <h2>📊 Nüfus / Sermaye Analizi</h2>
        <p class="subtitle">Yahudi nüfusu ve ekonomik etki oranlarının ülkelere göre karşılaştırması</p>

        <div class="analysis-summary-grid">
            <div class="summary-stat">
                <div class="stat-value">15.7M</div>
                <div class="stat-label">Dünya Yahudi Nüfusu</div>
            </div>
            <div class="summary-stat">
                <div class="stat-value">%0.2</div>
                <div class="stat-label">Dünya Nüfus Oranı</div>
            </div>
            <div class="summary-stat">
                <div class="stat-value">%20+</div>
                <div class="stat-label">Küresel Sermaye Etkisi</div>
            </div>
            <div class="summary-stat">
                <div class="stat-value">14</div>
                <div class="stat-label">Analiz Edilen Bölge</div>
            </div>
        </div>

        <div class="analysis-grid">
            <!-- Sol Sütun: Ülkeler -->
            <div class="analysis-column">
                <div style="margin-bottom: 15px; border-bottom: 2px solid var(--border-color); padding-bottom: 15px;">
                    <h2 style="font-size: 1.3rem;">🌍 Bölgesel Demografi & Servet Dağılımı</h2>
                </div>
    `;

    analysisData.forEach(item => {
        const popVal = parsePercent(item.populationRatio);
        const wealthVal = parsePercent(item.wealthRatio);
        const popWidth = Math.max(3, Math.min(popVal * 1.3, 100));
        const wealthWidth = Math.max(8, Math.min(wealthVal * 1.3, 100));
        const flag = flags[item.country] || '📍';

        let sectorsHtml = '';
        if (item.sectors) {
            sectorsHtml = '<div class="sector-grid">';
            item.sectors.forEach(s => {
                sectorsHtml += `<span class="sector-badge" onclick="hideAnalysisDashboard(); focusOnFigure('${s}')">${s}</span>`;
            });
            sectorsHtml += '</div>';
        }

        html += `
            <div class="analysis-card">
                <h3><span class="flag">${flag}</span> ${item.country}</h3>
                <div class="bar-row">
                    <div class="bar-label">Nüfus</div>
                    <div class="bar-track">
                        <div class="bar-fill pop" style="width: 0%;" data-width="${popWidth}%">${item.populationRatio}</div>
                    </div>
                </div>
                <div class="bar-row">
                    <div class="bar-label">Sermaye</div>
                    <div class="bar-track">
                        <div class="bar-fill wealth" style="width: 0%;" data-width="${wealthWidth}%">${item.wealthRatio}</div>
                    </div>
                </div>
                ${sectorsHtml}
                <p class="analysis-desc">${item.description}</p>
            </div>
        `;
    });

    html += `
            </div>
            
            <!-- Sağ Sütun: Şirketler -->
            <div class="analysis-column">
                <div style="margin-bottom: 15px; border-bottom: 2px solid var(--border-color); padding-bottom: 15px;">
                    <h2 style="font-size: 1.3rem;">🏢 Öne Çıkan Şirketler & Holdingler</h2>
                </div>
    `;

    if (typeof majorCompanies !== 'undefined') {
        majorCompanies.forEach(sector => {
            let companiesHtml = '';
            sector.companies.forEach(c => {
                companiesHtml += `
                    <div style="display: flex; align-items: flex-start; gap: 14px; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                        <div class="company-value-badge" style="background: linear-gradient(135deg, ${sector.color}, ${sector.color}aa); color: #000;">
                            ${c.value}
                        </div>
                        <div style="flex: 1; padding-top: 2px;">
                            <div style="font-family: var(--font-serif); font-weight: 600; font-size: 1.05rem; color: var(--text-primary); margin-bottom: 3px;">${c.name}</div>
                            <div style="font-size: 0.7rem; font-weight: 600; color: ${sector.color}; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">
                                <span style="opacity: 0.7;">◆</span> ${c.founder}
                            </div>
                            <div style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5; font-weight: 300;">${c.desc}</div>
                        </div>
                    </div>
                `;
            });

            html += `
                <div class="analysis-card" style="border-left: 3px solid ${sector.color};">
                    <h3><span class="flag">${sector.icon}</span> ${sector.sector} <span style="font-size: 0.7rem; color: var(--text-secondary); font-weight: 400;">(${sector.companies.length} şirket)</span></h3>
                    ${companiesHtml}
                </div>
            `;
        });
    }

    html += `
            </div>
        </div>
    `;

    inner.innerHTML = html;

    // Animate bars
    setTimeout(() => {
        inner.querySelectorAll('.bar-fill').forEach(bar => {
            bar.style.width = bar.getAttribute('data-width');
        });
    }, 100);

    // Update sidebar
    buildSidebar(analysisData, 'analysis');

    // Update detail card
    const card = document.getElementById('initial-card');
    card.innerHTML = `
        <h2 style="color: #f39c12;">📊 Analiz Panosu</h2>
        <p>Ülkelere göre nüfus ve sermaye analizini inceliyorsunuz. Sektörlere tıklayarak öne çıkan isimlere ulaşabilirsiniz.</p>
    `;
}

// Set up Time Slider
function setupTimeSlider() {
    const sliderContainer = document.getElementById('time-slider-container');
    const slider = document.getElementById('time-slider');
    const label = document.getElementById('slider-year-label');
    const playBtn = document.getElementById('slider-play-btn');

    if (!slider || !label || !playBtn) return;

    // Show slider initially because we start on 'exile'
    sliderContainer.style.display = 'flex';

    // Set max bounds
    slider.max = expulsionEvents.length - 1;
    slider.value = 0;
    label.innerText = expulsionEvents[0].displayYear;

    // On manually sliding
    slider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        label.innerText = expulsionEvents[val].displayYear;
    });

    // On releasing the slider
    slider.addEventListener('change', (e) => {
        const val = parseInt(e.target.value);
        selectEvent(expulsionEvents[val].id);
    });

    // Auto Play Logic
    let autoPlayInterval = null;
    let isPlaying = false;

    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            clearInterval(autoPlayInterval);
            isPlaying = false;
            playBtn.innerText = '▶ Oynat';
        } else {
            isPlaying = true;
            playBtn.innerText = '⏸ Durdur';
            let currentVal = parseInt(slider.value);

            // Loop functionality
            if (currentVal >= expulsionEvents.length - 1) {
                currentVal = -1; // reset to before start so next iteration is 0
            }

            autoPlayInterval = setInterval(() => {
                currentVal++;
                if (currentVal >= expulsionEvents.length) {
                    clearInterval(autoPlayInterval);
                    isPlaying = false;
                    playBtn.innerText = '▶ Oynat';
                    return;
                }

                slider.value = currentVal;
                label.innerText = expulsionEvents[currentVal].displayYear;
                selectEvent(expulsionEvents[currentVal].id);
            }, 3000); // 3 seconds per event
        }
    });
}

// Map specific sectors to prominent notable figures and fly to them
function focusOnFigure(sectorName) {
    showNotableFigures();

    // Map sector names to figure names existing in data.js notableFigures array
    const sectorMap = {
        "Teknoloji (Big Tech)": "Larry Ellison",
        "Finans & Bankacılık": "Stephen Schwarzman",
        "Medya ve Eğlence": "Michael Bloomberg",
        "Eczacılık / Medikal": "Carl Icahn",
        "Silikon Vadisi (Tech)": "Mark Zuckerberg",
        "Wall Street (Finans)": "Steve Cohen",
        "Hollywood (Sinema/TV)": "David Geffen",
        "Girişim Sermayesi (VC)": "Marc Benioff",
        "Finans (City of London)": "Mikhail Fridman",
        "Perakende": "Les Wexner",
        "Gayrimenkul": "Stephen Ross",
        "Medya": "Donald Newhouse",
        "Savunma Sanayii": "Binyamin Netanyahu",
        "Siber Güvenlik": "Sam Altman",
        "Biyoteknoloji": "Yuri Milner",
        "Tarım Teknolojileri": "Eyal Ofer",
        "Enerji (Petrol & Doğalgaz)": "Igor Makarov",
        "Madencilik": "Roman Abramovich",
        "Bankacılık": "David Tepper",
        "Telekomünikasyon": "Patrick Drahi",
        "Lüks Tüketim & Moda": "Alain Wertheimer"
    };

    const targetName = sectorMap[sectorName];
    if (targetName) {
        // Find the index of this figure
        const index = notableFigures.findIndex(f => f.name === targetName);
        if (index !== -1) {
            // Need a slight delay to let showNotableFigures finish rendering markers
            setTimeout(() => {
                if (markers[index]) {
                    map.flyTo(notableFigures[index].coords, 10, { duration: 1.5 });
                    setTimeout(() => markers[index].openPopup(), 1500);

                    // Highlight the item in the sidebar
                    document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
                    const sidebarItem = document.getElementById(`sidebar-item-${index}`);
                    if (sidebarItem) sidebarItem.classList.add('active');
                }
            }, 500); // Give map half a second to initialize the new layer
        }
    }
}

