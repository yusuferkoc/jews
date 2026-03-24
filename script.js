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
    document.getElementById('show-sabetay-btn').addEventListener('click', () => { setActiveTab('show-sabetay-btn'); closeSidebarOnMobile(); showSabetayData(); });

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

    if (viewType === 'exile') {
        const summaryDiv = document.createElement('div');
        summaryDiv.className = 'exile-summary-box timeline-item';
        summaryDiv.style.cssText = 'background: rgba(231, 76, 60, 0.05); border-left: 3px solid var(--accent); padding: 15px; margin-bottom: 25px; border-radius: 6px; cursor: default;';
        summaryDiv.innerHTML = `
            <h4 style="color: var(--accent); margin: 0 0 10px 0; font-size: 1rem; border-bottom: 1px solid rgba(231,76,60,0.2); padding-bottom: 8px;">Tarihsel Sürgünlerin Genel Nedenleri</h4>
            <ul style="font-size: 0.85rem; color: var(--text-secondary); margin: 0; padding-left: 18px; line-height: 1.6;">
                <li style="margin-bottom: 6px;"><b>Dini ve Etnik Farklılık:</b> Engizisyonlar, zorunlu din değiştirmeler ve anti-semitizm.</li>
                <li style="margin-bottom: 6px;"><b>Siyasi Otorite ve İşgaller:</b> Antik çağdaki imparatorluk işgalleri (Asur, Babil, Roma) ve isyan bastırma politikaları.</li>
                <li style="margin-bottom: 6px;"><b>Ekonomik Çıkarlar:</b> Hükümdarların Yahudilerin mallarına el koyma veya borçlarını silme motivasyonu.</li>
                <li><b>Günah Keçisi İlan Edilme:</b> Veba salgını, kıtlık veya sosyal-ekonomik krizlerin sorumlusu olarak hedef gösterilmeleri.</li>
            </ul>
        `;
        // Tıklama olayının (active class değişiminin) bu kutuyu etkilememesi için engelle
        summaryDiv.addEventListener('click', (e) => e.stopPropagation());
        timelineContainer.appendChild(summaryDiv);
    }

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
        } else if (['holy', 'figures', 'turkey'].includes(viewType)) {
            let color = '#1abc9c';
            let zoomLevel = 8;
            let yearText = itemData.era;
            let summaryHTML = '';

            if (viewType === 'holy') {
                color = '#9b59b6';
                yearText = itemData.highlight;
            } else if (viewType === 'turkey') {
                color = '#e74c3c';
                zoomLevel = 10;
                summaryHTML = `<p class="timeline-summary" style="margin-top:2px; font-size:0.75rem;">${itemData.highlight}</p>`;
            } else if (viewType === 'figures') {
                color = '#1abc9c'; // or another logic based on era if you want
                summaryHTML = `<p class="timeline-summary" style="margin-top:2px; font-size:0.75rem;">${itemData.highlight}</p>`;
            }

            const imageWrap = itemData.wikiPage
                ? `<div class="sb-img-wrap" data-wiki="${itemData.wikiPage}" style="width:45px; height:45px; border-radius:50%; background: rgba(255,255,255,0.05); margin-right: 15px; flex-shrink: 0; overflow:hidden; display:flex; align-items:center; justify-content:center; border: 1px solid rgba(255,255,255,0.1);"><span style="font-size:0.5rem; color:#666;">...</span></div>`
                : `<div style="width:45px; height:45px; border-radius:50%; background: rgba(255,255,255,0.05); margin-right: 15px; flex-shrink: 0; display:flex; align-items:center; justify-content:center; border: 1px solid rgba(255,255,255,0.1);"><span style="font-size:1rem;">👤</span></div>`;

            item.innerHTML = `
                <div style="display: flex; align-items:center;">
                    ${imageWrap}
                    <div>
                        <div class="timeline-year" style="color: ${color}; font-size: 0.8rem; margin-bottom:2px;">${yearText}</div>
                        <h3 class="timeline-title" style="margin-bottom:0; font-size:1rem;">${itemData.name}</h3>
                        ${summaryHTML}
                    </div>
                </div>
            `;
            item.addEventListener('click', () => {
                closeSidebarOnMobile();
                document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
                map.flyTo(itemData.coords, zoomLevel, { duration: 1.5 });
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

    // Lazy load Wikipedia images for sidebar items
    if (['holy', 'figures', 'turkey'].includes(viewType)) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const wrap = entry.target;
                    obs.unobserve(wrap);
                    if (wrap.dataset.loaded) return;
                    wrap.dataset.loaded = 'true';

                    const wikiPage = wrap.getAttribute('data-wiki');
                    if (!wikiPage) return;

                    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiPage)}`)
                        .then(r => r.json())
                        .then(data => {
                            const imgUrl = data.thumbnail && data.thumbnail.source;
                            if (imgUrl) {
                                wrap.innerHTML = `<img src="${imgUrl}" alt="${wikiPage}" style="width:100%;height:100%;object-fit:cover;">`;
                            } else {
                                // Fallback: try Turkish Wikipedia
                                return fetch(`https://tr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiPage)}`)
                                    .then(r2 => r2.json())
                                    .then(data2 => {
                                        const imgUrl2 = data2.thumbnail && data2.thumbnail.source;
                                        if (imgUrl2) {
                                            wrap.innerHTML = `<img src="${imgUrl2}" alt="${wikiPage}" style="width:100%;height:100%;object-fit:cover;">`;
                                        } else {
                                            wrap.innerHTML = `<span style="font-size:1rem;">👤</span>`;
                                        }
                                    });
                            }
                        })
                        .catch(() => {
                            // Last resort: try Turkish Wikipedia on network error too
                            fetch(`https://tr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiPage)}`)
                                .then(r2 => r2.json())
                                .then(data2 => {
                                    const imgUrl2 = data2.thumbnail && data2.thumbnail.source;
                                    if (imgUrl2) {
                                        wrap.innerHTML = `<img src="${imgUrl2}" alt="${wikiPage}" style="width:100%;height:100%;object-fit:cover;">`;
                                    } else {
                                        wrap.innerHTML = `<span style="font-size:1rem;">👤</span>`;
                                    }
                                })
                                .catch(() => { wrap.innerHTML = `<span style="font-size:1rem;">👤</span>`; });
                        });
                }
            });
        }, { root: timelineContainer, rootMargin: '50px' });

        timelineContainer.querySelectorAll('.sb-img-wrap').forEach(wrap => observer.observe(wrap));
    }
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

        // (Oklar kullanıcı isteğiyle kaldırıldı)

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

    let reasonsHtml = '';
    if (event.reasons && event.reasons.length > 0) {
        reasonsHtml = `
            <div style="margin: 15px 0; padding: 12px; background: rgba(231, 76, 60, 0.05); border-left: 3px solid var(--accent); border-radius: 4px;">
                <h4 style="margin: 0 0 8px 0; color: var(--accent); font-size: 0.9rem;">Bu Sürgünün Temel Nedenleri:</h4>
                <ul style="margin: 0; padding-left: 15px; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
                    ${event.reasons.map(r => `<li style="margin-bottom: 4px;">${r}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    card.innerHTML = `
        <h2>${event.title}</h2>
        <p><b>Tarih:</b> ${event.displayYear}</p>
        <p>${event.description}</p>
        
        ${reasonsHtml}
        
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
    hideSabetayDashboard();
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
    hideSabetayDashboard();
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
    hideSabetayDashboard();
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
    hideSabetayDashboard();
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

        // Determine color based on if they are still alive (Günümüz)
        const isAlive = figure.era && figure.era.includes('Günümüz');
        const markerColor = isAlive ? '#2ecc71' : '#e74c3c'; // Green for living, Red for historical

        const figureIcon = L.divIcon({
            className: 'marker-wrapper',
            html: `<div class="inner-dot" style="width: 16px; height: 16px; background-color: ${markerColor}; border: 2px solid #fff; box-shadow: 0 0 10px ${markerColor};"></div>`,
            iconSize: [44, 44],
            iconAnchor: [22, 22]
        });

        const imageId = `img-fig-${figure.wikiPage || figure.name}`.replace(/[^a-zA-Z0-9-]/g, '-');
        const imageHtml = `<div id="${imageId}-wrap" style="width:100%; height:140px; background:rgba(0,0,0,0.2); border-radius:6px; display:flex; align-items:center; justify-content:center; margin-bottom:12px; overflow:hidden;"><span style="color:var(--text-secondary); font-size:0.8rem;">Yükleniyor...</span></div>`;

        const popup = L.popup({ maxWidth: 300 })
            .setContent(`${imageHtml}<b>${figure.name}</b><br><span style="color: ${markerColor}; font-weight: bold;">${figure.highlight}</span><br><div style="margin: 5px 0; font-size: 0.85em; color: var(--text-secondary);">📍 ${figure.location} • ⏳ ${figure.era}</div><small>${figure.description}</small>`);

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
        <div class="detail-tags" style="gap: 8px;">
            <span id="tag-filter-all" class="tag filter-tag" onclick="filterNotableFigures('all')" style="cursor:pointer; opacity:1; transition:0.3s;">● Tüm İsimler</span>
            <span id="tag-filter-historical" class="tag filter-tag" onclick="filterNotableFigures('historical')" style="cursor:pointer; opacity:0.4; transition:0.3s; background: rgba(231, 76, 60, 0.15); border: 1px solid rgba(231, 76, 60, 0.5); color: #e74c3c; font-weight: 600;">● Tarihi İsimler</span>
            <span id="tag-filter-living" class="tag filter-tag" onclick="filterNotableFigures('living')" style="cursor:pointer; opacity:0.4; transition:0.3s; background: rgba(46, 204, 113, 0.15); border: 1px solid rgba(46, 204, 113, 0.5); color: #2ecc71; font-weight: 600;">● Yaşayanlar</span>
            <span id="tag-filter-business" class="tag filter-tag" onclick="filterNotableFigures('business')" style="cursor:pointer; opacity:0.4; transition:0.3s; background: rgba(241, 196, 15, 0.15); border: 1px solid rgba(241, 196, 15, 0.5); color: #f1c40f; font-weight: 600;">💼 İş İnsanı</span>
            <span id="tag-filter-science" class="tag filter-tag" onclick="filterNotableFigures('science')" style="cursor:pointer; opacity:0.4; transition:0.3s; background: rgba(52, 152, 219, 0.15); border: 1px solid rgba(52, 152, 219, 0.5); color: #3498db; font-weight: 600;">🔬 Bilim İnsanı</span>
            <span id="tag-filter-politics" class="tag filter-tag" onclick="filterNotableFigures('politics')" style="cursor:pointer; opacity:0.4; transition:0.3s; background: rgba(155, 89, 182, 0.15); border: 1px solid rgba(155, 89, 182, 0.5); color: #9b59b6; font-weight: 600;">🏛️ Siyasetçi</span>
            <span id="tag-filter-count" class="tag" style="background: rgba(255,255,255,0.05); cursor:default;">${notableFigures.length} Toplam İsim</span>
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

// Filter Notable Figures by their alive/deceased status and professions
window.filterNotableFigures = function (filterType) {
    if (!markers) return;

    currentLayerGroup.clearLayers();
    const bounds = L.latLngBounds([]);
    let visibleCount = 0;

    // reset tags styles
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.style.opacity = '0.4';
    });

    const activeTag = document.getElementById(`tag-filter-${filterType}`);
    if (activeTag) activeTag.style.opacity = '1';

    const sidebarItems = document.querySelectorAll('#timeline-events .timeline-item');

    const scienceNames = ["Albert Einstein", "Sigmund Freud", "John von Neumann", "Niels Bohr", "J. Robert Oppenheimer", "Émile Durkheim"];
    const politicsNames = ["Theodor Herzl", "David Ben-Gurion", "Chaim Weizmann", "Golda Meir", "Yitzhak Rabin", "Menachem Begin", "Shimon Peres", "Benjamin Disraeli", "Leon Trotsky (Lev Troçki)", "Volodimir Zelenski", "Binyamin Netanyahu", "Janet Yellen", "Michael Bloomberg"];
    const philosophyNames = ["Maimonides (İbn Meymun)", "Baruch Spinoza", "Karl Marx", "Franz Kafka", "Rashi (Şlomo Yitzhaki)", "Moses Mendelssohn"];
    const artNames = ["Bob Dylan", "Leonard Cohen", "Steven Spielberg", "Woody Allen", "Jerry Seinfeld", "Amy Winehouse", "Mark Zuckerberg"]; // Zuckerberg is more tech/business but often grouped with influential figures

    notableFigures.forEach((figure, index) => {
        const isAlive = figure.era && figure.era.includes('Günümüz');

        let shouldShow = true;
        if (filterType === 'historical') shouldShow = !isAlive;
        else if (filterType === 'living') shouldShow = isAlive;
        else if (filterType === 'science') shouldShow = scienceNames.includes(figure.name);
        else if (filterType === 'politics') shouldShow = politicsNames.includes(figure.name);
        else if (filterType === 'philosophy') shouldShow = philosophyNames.includes(figure.name);
        else if (filterType === 'art') shouldShow = artNames.includes(figure.name);
        else if (filterType === 'business') {
            shouldShow = (!scienceNames.includes(figure.name) &&
                !philosophyNames.includes(figure.name) &&
                !artNames.includes(figure.name) &&
                (!politicsNames.includes(figure.name) || figure.name === "Michael Bloomberg")); // Michael Bloomberg is both politics and business
        }

        if (shouldShow && markers[index]) {
            markers[index].addTo(currentLayerGroup);
            bounds.extend(markers[index].getLatLng());
            visibleCount++;
            if (sidebarItems[index]) sidebarItems[index].style.display = 'block';
        } else {
            if (sidebarItems[index]) sidebarItems[index].style.display = 'none';
        }
    });

    if (visibleCount > 0 && bounds.isValid()) {
        map.flyToBounds(bounds, {
            padding: [50, 50],
            duration: 1.0,
            easeLinearity: 0.25
        });
    }

    const countTag = document.getElementById('tag-filter-count');
    if (countTag) countTag.innerText = `${visibleCount} İsim Gösteriliyor`;
};

// Show Turkey Data
function showTurkeyData() {
    hideAnalysisDashboard();
    hideSabetayDashboard();
    const sliderContainer = document.getElementById('time-slider-container');
    if (sliderContainer) sliderContainer.style.display = 'none';

    activeEventId = null;
    document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
    currentLayerGroup.clearLayers();

    const bounds = L.latLngBounds([]);

    // KOORDİNAT BAZLI GRUPLAMA
    const cityGroups = {};
    const getCoordKey = (coords) => {
        if (!coords) return null;
        let parsed = typeof coords === 'string' ? JSON.parse(coords) : coords;
        let lat = parsed[0];
        let lng = parsed[1];
        
        // İstanbul koordinatlarını tekilleştirip tek noktada topla
        if (lat >= 40.9 && lat <= 41.2 && lng >= 28.8 && lng <= 29.2) {
            return `41.01,28.98`; 
        }
        return `${lat.toFixed(2)},${lng.toFixed(2)}`;
    };

    turkeyData.forEach((figure, index) => {
        // Yer ve mekanları filtrele (Sinagog, Neve Şalom vb.)
        if (figure.name.includes("Sinagog") || figure.name.includes("Şalom") || figure.name.includes("Hahambaşılık")) {
            return;
        }

        const key = getCoordKey(figure.coords);
        if (!key) return;
        
        // İstanbul için ana koordinatı ayarla ki marker tam merkeze gitsin
        let groupCoords = typeof figure.coords === 'string' ? JSON.parse(figure.coords) : figure.coords;
        if (key === "41.01,28.98") groupCoords = [41.01, 28.98];

        if (!cityGroups[key]) cityGroups[key] = { coords: groupCoords, turkey: [], sabetay: [] };
        cityGroups[key].turkey.push({ ...figure, originalIndex: index });
    });

    sabetayFamilies.forEach((family, index) => {
        const key = getCoordKey(family.coords);
        if (!key) return;

        let groupCoords = typeof family.coords === 'string' ? JSON.parse(family.coords) : family.coords;
        if (key === "41.01,28.98") groupCoords = [41.01, 28.98];

        if (!cityGroups[key]) cityGroups[key] = { coords: groupCoords, turkey: [], sabetay: [] };
        cityGroups[key].sabetay.push({ ...family, originalIndex: index });
    });

    // HARİTAYA ŞEHİR/KÜME İŞARETÇİLERİNİ EKLE
    Object.keys(cityGroups).forEach(key => {
        const group = cityGroups[key];
        const totalCount = group.turkey.length + group.sabetay.length;
        bounds.extend(group.coords);

        // Küme İcon'u
        const hasSabetay = group.sabetay.length > 0;
        const hasTurkey = group.turkey.length > 0;
        let borderColor = '#e74c3c'; // Default Turkey color
        let glowColor = 'rgba(231, 76, 60, 0.5)';
        if (hasSabetay && !hasTurkey) {
            borderColor = '#9b59b6'; // Sabetay color
            glowColor = 'rgba(155, 89, 182, 0.5)';
        } else if (hasSabetay && hasTurkey) {
            borderColor = '#d4af37'; // Mixed (Gold)
            glowColor = 'rgba(212, 175, 55, 0.5)';
        }

        const clusterIcon = L.divIcon({
            className: 'marker-wrapper cluster-marker',
            html: `<div class="inner-dot" style="width: 32px; height: 32px; background-color: rgba(20, 20, 20, 0.8); border: 2px solid ${borderColor}; box-shadow: 0 0 15px ${glowColor}; border-radius: 50%; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:bold; font-size:14px; pointer-events: auto; cursor: pointer;">${totalCount}</div>`,
            iconSize: [44, 44],
            iconAnchor: [22, 22]
        });

        const marker = L.marker(group.coords, { icon: clusterIcon, interactive: true }).addTo(currentLayerGroup);

        marker.on('click', (e) => {
            L.DomEvent.stopPropagation(e);
            
            const card = document.getElementById('initial-card');
            
            // Şehir İsmini Tahmin Et
            let cityName = "Şehir Bağı";
            if (key.startsWith("41.01")) cityName = "İstanbul";
            else if (key.startsWith("38.42")) cityName = "İzmir";
            else if (key.startsWith("40.64")) cityName = "Selanik";
            else if (key.startsWith("40.18")) cityName = "Bursa";
            else if (key.startsWith("41.67") || key.startsWith("41.68")) cityName = "Edirne";
            else if (key.startsWith("39.92")) cityName = "Ankara";
            else if (key.startsWith("36.89")) cityName = "Antalya";
            else if (key.startsWith("42.73")) cityName = "Balkanlar";

            card.innerHTML = `
                <div style="padding: 5px;">
                    <h3 style="margin: 0 0 15px 0; color: #d4af37; border-bottom: 1px solid rgba(212, 175, 55, 0.3); padding-bottom: 10px; font-size: 1.2rem;">📍 ${cityName} <span style="font-size: 0.9rem; color: var(--text-secondary);">(${totalCount} Kişi/Aile)</span></h3>
                    
                    <div style="max-height: 55vh; overflow-y: auto; padding-right: 5px;" class="city-details-scroll">
                        ${group.turkey.length > 0 ? `
                        <div style="margin-bottom: 20px;">
                            <h4 style="color: #e74c3c; margin: 0 0 12px 0; font-size: 0.95rem; display: flex; align-items: center;"><span style="font-size: 1.2rem; margin-right: 6px;">🕎</span> Türkiye Yahudileri (${group.turkey.length})</h4>
                            ${group.turkey.map(t => `
                                <div class="city-list-item-jewish" style="cursor:pointer;" onclick="document.querySelectorAll('.timeline-item')[${t.originalIndex}].click(); document.querySelectorAll('.timeline-item')[${t.originalIndex}].scrollIntoView({ behavior: 'smooth', block: 'center' });">
                                    <div style="font-weight: 600; font-size: 1rem; color: #fff;">${t.name}</div>
                                    <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px;">${t.highlight || t.category}</div>
                                </div>
                            `).join('')}
                        </div>` : ''}

                        ${group.sabetay.length > 0 ? `
                        <div>
                            <h4 style="color: #8e44ad; margin: 0 0 12px 0; font-size: 0.95rem; display: flex; align-items: center;"><span style="font-size: 1.2rem; margin-right: 6px;">🔗</span> Sabetay Aileleri (${group.sabetay.length})</h4>
                            ${group.sabetay.map(s => `
                                <div class="city-list-item-sabbatean" style="cursor:pointer;" onclick="document.querySelectorAll('.sabetay-sidebar-item')[${s.originalIndex}].click(); document.querySelectorAll('.sabetay-sidebar-item')[${s.originalIndex}].scrollIntoView({ behavior: 'smooth', block: 'center' });">
                                    <div style="font-weight: 600; font-size: 1rem; color: #fff;">${s.name}</div>
                                    <div style="font-size: 0.8rem; color: rgba(255,255,255,0.7); margin-top: 4px; line-height: 1.4;">${s.description.substring(0, 70)}...</div>
                                </div>
                            `).join('')}
                        </div>` : ''}
                    </div>
                    
                    <button class="return-turkey-btn" onclick="showTurkeyData()" style="margin-top: 20px; width: 100%; border-radius: 6px; cursor: pointer; border: 1px solid rgba(212, 175, 55, 0.3); background: rgba(212, 175, 55, 0.1); color: var(--text-primary); padding: 10px; transition: all 0.2s;">
                        ← Paneli Temizle
                    </button>
                </div>
            `;
            
            if (window.innerWidth < 768) {
                card.classList.add('mobile-active');
                document.getElementById('mobile-overlay').classList.add('active');
            }
        });
    });

    buildSidebar(turkeyData, 'turkey');

    // SABETAYLARI TÜRKİYE SEKMESİNE EKLEME
    const timelineContainer = document.getElementById('timeline');
    
    // Ayraç Ekle
    const divider = document.createElement('div');
    divider.className = 'sabetay-divider';
    divider.innerHTML = '<span>Sabetaylar</span>';
    timelineContainer.appendChild(divider);

    // Kategori yapılandırması (Sabetay için)
    const categoryConfig = {
        tarih:   { label: 'Tarihi Aileler', color: '#e74c3c', icon: '🏛️' },
        siyaset: { label: 'Siyaset & Devlet', color: '#9b59b6', icon: '🏛️' },
        is:      { label: 'İş Dünyası', color: '#d4af37', icon: '💼' },
        medya:   { label: 'Medya & Sanat', color: '#3498db', icon: '🎨' },
        akademi: { label: 'Akademi', color: '#2ecc71', icon: '📚' }
    };

    const connectionColors = {
        evlilik: { color: '#e74c3c', label: 'Evlilik' },
        akrabalik: { color: '#9b59b6', label: 'Akrabalık' },
        is_ortakligi: { color: '#d4af37', label: 'İş Ortaklığı' },
        cemaat: { color: '#3498db', label: 'Cemaat' }
    };

    // Sabetay Ailelerini Sidebar'a Ekle
    sabetayFamilies.forEach((family, index) => {
        const item = document.createElement('div');
        item.className = 'timeline-item sabetay-sidebar-item';
        const cfg = categoryConfig[family.category] || categoryConfig.tarih;
        item.innerHTML = `
            <div style="display: flex; align-items:center;">
                <div style="width:40px; height:40px; border-radius:50%; background: ${cfg.color}15; border: 1px solid ${cfg.color}30; margin-right: 12px; flex-shrink: 0; display:flex; align-items:center; justify-content:center;">
                    <span style="font-size:1rem;">🔗</span>
                </div>
                <div>
                    <div class="timeline-year" style="color: #8e44ad; font-size: 0.75rem; margin-bottom:2px;">${cfg.label}</div>
                    <h3 class="timeline-title" style="margin-bottom:0; font-size:0.95rem;">${family.name}</h3>
                    <p class="timeline-summary" style="margin-top:2px; font-size:0.75rem;">Sabetayist Cemaat/Aile</p>
                </div>
            </div>
        `;
        
        item.addEventListener('click', () => {
            closeSidebarOnMobile();
            document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            
            // Seçili Sabetay kişisinin detaylarını detail-card'da göster
            // Üyeler
            let membersHtml = '';
            if (family.members && family.members.length > 0) {
                membersHtml = '<div class="sabetay-detail-section-title">Bilinen Üyeler</div>';
                family.members.forEach(m => {
                    membersHtml += `<span class="sabetay-member-tag">${m}</span>`;
                });
            }

            // Bağlantılar
            let connectionsHtml = '';
            const relatedConns = sabetayConnections.filter(c => c.source === family.id || c.target === family.id);
            if (relatedConns.length > 0) {
                connectionsHtml = '<div class="sabetay-detail-section-title">Ağ Bağlantıları</div>';
                relatedConns.forEach(conn => {
                    const otherId = conn.source === family.id ? conn.target : conn.source;
                    const other = sabetayFamilies.find(f => f.id === otherId);
                    if (!other) return;
                    const connCfg = connectionColors[conn.type] || connectionColors.akrabalik;
                    const typeLabels = { evlilik: 'Evlilik', akrabalik: 'Akrabalık', is_ortakligi: 'İş Ort.', cemaat: 'Cemaat' };
                    connectionsHtml += `
                        <div class="sabetay-connection-item" style="margin-bottom: 8px;">
                            <span class="sabetay-connection-type" style="background:${connCfg.color}20;color:${connCfg.color};border:1px solid ${connCfg.color}40;">${typeLabels[conn.type] || conn.type}</span>
                            <span class="sabetay-connection-name" style="color:var(--text-primary); font-weight:600; font-size:0.9rem;">${other.name}</span>
                            <div class="sabetay-connection-desc" style="font-size:0.8rem; color:var(--text-secondary); margin-top:3px;">${conn.description}</div>
                        </div>
                    `;
                });
            } else {
                connectionsHtml = '<div class="sabetay-detail-section-title">Bağlantı bulunamadı</div>';
            }

            const card = document.getElementById('initial-card');
            card.innerHTML = `
                <h2 style="color: #8e44ad;"><span style="font-size:1.2rem; margin-right:5px;">${cfg.icon}</span>${family.name}</h2>
                <div style="margin-bottom: 15px;">
                    <span class="tag" style="background: rgba(142,68,173,0.1); border-color: rgba(142,68,173,0.3); color: #8e44ad;">${cfg.label}</span>
                </div>
                <p style="margin-bottom: 20px;">${family.description}</p>
                ${membersHtml}
                ${connectionsHtml}
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
                    display: block;
                    width: 100%;
                    text-align: center;
                " onmouseover="this.style.color='var(--text-primary)'; this.style.borderColor='var(--accent)'" 
                   onmouseout="this.style.color='var(--text-secondary)'; this.style.borderColor='var(--border-color)'">
                    ← Tüm Türkiye Verisine Dön
                </button>
            `;
            
            // Eğer haritada marker yoksa (Sabetayların koordinatı yok), haritada Türkiye genel görünümünü koru
            // map.flyToBounds() çağırmaya gerek yok.
        });
        timelineContainer.appendChild(item);
    });

    // Update Detail Card
    const card = document.getElementById('initial-card');
    card.innerHTML = `
        <h2 style="color: #e74c3c;">Türkiye Yahudileri</h2>
        <p>Osmanlı ve Türkiye Cumhuriyeti dönemlerinde ticaret, sanayi, kültür, sanat ve dini hayatta etki yaratan ünlü Türk Yahudileri ve toplumun tarihi dini toplanma merkezleri.</p>
        <div class="detail-tags">
            <span class="tag">Anadolu Sefaradları</span>
            <span class="tag">${turkeyData.length} Ana Merkez</span>
            <span class="tag" style="background: rgba(142,68,173,0.1); border-color: rgba(142,68,173,0.3); color: #8e44ad;">${sabetayFamilies.length} Sabetay Ailesi</span>
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
function hideSabetayDashboard() {
    const dash = document.getElementById('sabetay-dashboard');
    if (dash) dash.style.display = 'none';
    if (window._sabetayAnimFrame) {
        cancelAnimationFrame(window._sabetayAnimFrame);
        window._sabetayAnimFrame = null;
    }
}

function showAnalysisData() {
    hideSabetayDashboard();
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
        <h2>Nüfus / Sermaye Analizi</h2>
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
                    <h2 style="font-size: 1.3rem; color: var(--accent);">Bölgesel Demografi & Servet Dağılımı</h2>
                </div>
    `;

    analysisData.forEach(item => {
        const popVal = parsePercent(item.populationRatio);
        const wealthVal = parsePercent(item.wealthRatio);
        const flag = flags[item.country] || '📍';

        // Calculate a "multiplier" showing disproportionate wealth influence
        let multiplier = '';
        if (popVal > 0 && wealthVal > 0) {
            const ratio = Math.round(wealthVal / popVal);
            if (ratio > 1) multiplier = `<span class="stat-multiplier">${ratio}x</span>`;
        }

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
                <div class="stat-duo">
                    <div class="stat-box pop-box">
                        <div class="stat-box-label">Nüfus Oranı</div>
                        <div class="stat-box-value pop-color">${item.populationRatio}</div>
                    </div>
                    <div class="stat-box-divider">
                        ${multiplier}
                    </div>
                    <div class="stat-box wealth-box">
                        <div class="stat-box-label">Sermaye Etkisi</div>
                        <div class="stat-box-value wealth-color">${item.wealthRatio}</div>
                    </div>
                </div>
                <div class="stat-gauge">
                    <div class="stat-gauge-pop" style="width: 0%;" data-width="${Math.max(3, Math.min(popVal * 1.5, 50))}%"></div>
                    <div class="stat-gauge-wealth" style="width: 0%;" data-width="${Math.max(8, Math.min(wealthVal * 0.7, 50))}%"></div>
                </div>
                ${sectorsHtml}
                <p class="analysis-desc">${item.description}</p>
            </div>
        `;
    });

    html += `
            </div>
            
            <!-- Sağ Sütun: Kişiler -->
            <div class="analysis-column">
                <div style="margin-bottom: 20px; border-bottom: 2px solid var(--border-color); padding-bottom: 10px;">
                    <h2 style="font-size: 1.3rem; color: var(--accent);">Tarihi ve Güncel Zenginler</h2>
                </div>

                <!-- Kişiler Listesi -->
                <div id="analysis-figures-list">
    `;

    if (typeof wealthyFigures !== 'undefined') {
        let figuresHtml = '';
        wealthyFigures.forEach((f, idx) => {
            const num = (idx + 1).toString();
            // Build wiki page slug from name for photo lookup
            const wikiSlug = f.name.replace(/\s&\s/g, '_and_').replace(/\s/g, '_');
            figuresHtml += `
                <div style="display: flex; align-items: center; gap: 14px; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <div class="analysis-fig-img" data-wiki="${wikiSlug}" style="width:50px; height:50px; border-radius:50%; background:rgba(255,255,255,0.05); flex-shrink:0; overflow:hidden; display:flex; align-items:center; justify-content:center; border: 2px solid rgba(212,175,55,0.3);">
                        <span style="font-size:0.55rem; color:#666;">...</span>
                    </div>
                    <div style="flex: 1; min-width: 0;">
                        <div style="font-family: var(--font-serif); font-weight: 600; font-size: 1rem; color: var(--accent); margin-bottom: 2px;">${num}. ${f.name}</div>
                        <div style="font-size: 0.7rem; font-weight: 600; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            ${f.title} <span style="opacity:0.5; margin:0 4px;">|</span> <span style="color:#d4af37;">${f.source}</span>
                        </div>
                        <div style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4; font-weight: 300;">${f.desc}</div>
                    </div>
                    <div class="company-value-badge" style="background: linear-gradient(135deg, #d4af37, #c5a059); color: #000; min-width: 65px; font-size: 0.7rem;">
                        ${f.netWorth}
                    </div>
                </div>
            `;
        });

        html += `
            <div class="analysis-card" style="border-left: 3px solid #d4af37;">
                <h3>Tarihi ve Güncel Zenginler</h3>
                ${figuresHtml}
            </div>
        `;
    }

    html += `
                </div>
            </div>
        </div>
    `;

    inner.innerHTML = html;

    // Animate gauges
    setTimeout(() => {
        inner.querySelectorAll('.stat-gauge-pop, .stat-gauge-wealth').forEach(el => {
            el.style.width = el.getAttribute('data-width');
        });
    }, 100);

    // Lazy load photos for wealthy figures
    inner.querySelectorAll('.analysis-fig-img').forEach(wrap => {
        const wikiPage = wrap.getAttribute('data-wiki');
        if (!wikiPage) return;
        fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiPage)}`)
            .then(r => r.json())
            .then(data => {
                const imgUrl = data.thumbnail && data.thumbnail.source;
                if (imgUrl) {
                    wrap.innerHTML = `<img src="${imgUrl}" alt="${wikiPage}" style="width:100%;height:100%;object-fit:cover;">`;
                } else {
                    return fetch(`https://tr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiPage)}`)
                        .then(r2 => r2.json())
                        .then(data2 => {
                            const imgUrl2 = data2.thumbnail && data2.thumbnail.source;
                            wrap.innerHTML = imgUrl2 ? `<img src="${imgUrl2}" alt="${wikiPage}" style="width:100%;height:100%;object-fit:cover;">` : `<span style="font-size:1.2rem;">👤</span>`;
                        });
                }
            })
            .catch(() => { wrap.innerHTML = `<span style="font-size:1.2rem;">👤</span>`; });
    });

    // Update sidebar
    buildSidebar(analysisData, 'analysis');

    // Update detail card
    const card = document.getElementById('initial-card');
    card.innerHTML = `
        <h2 style="color: #f39c12;">Analiz Panosu</h2>
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

// Removed switchAnalysisTab because Holdingler tab was removed

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

// ==========================================
// SABETAY - AĞ GRAFİĞİ (NETWORK GRAPH)
// ==========================================
function showSabetayData() {
    hideAnalysisDashboard();
    activeEventId = null;
    currentLayerGroup.clearLayers();
    animationIntervals.forEach(clearInterval);
    animationIntervals = [];

    const sliderContainer = document.getElementById('time-slider-container');
    if (sliderContainer) sliderContainer.style.display = 'none';

    const dash = document.getElementById('sabetay-dashboard');
    dash.style.display = 'block';

    // Category config
    const categoryConfig = {
        tarih:   { label: 'Tarihi Aileler', color: '#e74c3c', icon: '🏛️' },
        siyaset: { label: 'Siyaset & Devlet', color: '#9b59b6', icon: '🏛️' },
        is:      { label: 'İş Dünyası', color: '#d4af37', icon: '💼' },
        medya:   { label: 'Medya & Sanat', color: '#3498db', icon: '🎨' },
        akademi: { label: 'Akademi', color: '#2ecc71', icon: '📚' }
    };

    const connectionColors = {
        evlilik: { color: '#e74c3c', label: 'Evlilik', dash: [] },
        akrabalik: { color: '#9b59b6', label: 'Akrabalık', dash: [6, 4] },
        is_ortakligi: { color: '#d4af37', label: 'İş Ortaklığı', dash: [3, 3] },
        cemaat: { color: '#3498db', label: 'Cemaat', dash: [10, 4, 3, 4] }
    };

    // Build legend
    const legendEl = document.getElementById('sabetay-legend');
    let legendHtml = '';
    Object.entries(categoryConfig).forEach(([key, cfg]) => {
        legendHtml += `<div class="sabetay-legend-item active" data-category="${key}"><span class="sabetay-legend-dot" style="background:${cfg.color};"></span>${cfg.label}</div>`;
    });
    legendHtml += `<div class="sabetay-legend-item active" data-category="all" style="border-color:rgba(142,68,173,0.5); background:rgba(142,68,173,0.15);"><span class="sabetay-legend-dot" style="background:#8e44ad;"></span>Tümü</div>`;
    // connection type legend
    legendHtml += '<div class="sabetay-legend-line">';
    Object.entries(connectionColors).forEach(([key, cfg]) => {
        const dashStyle = cfg.dash.length === 0 ? 'solid' : 'dashed';
        legendHtml += `<span style="display:inline-flex;align-items:center;gap:3px;margin-right:8px;"><span class="sabetay-legend-line-sample" style="border-top:2px ${dashStyle} ${cfg.color};background:none;"></span><span>${cfg.label}</span></span>`;
    });
    legendHtml += '</div>';
    legendEl.innerHTML = legendHtml;

    // Active categories
    let activeCategories = new Set(Object.keys(categoryConfig));

    // Legend click handlers
    legendEl.querySelectorAll('.sabetay-legend-item').forEach(item => {
        item.addEventListener('click', () => {
            const cat = item.dataset.category;
            if (cat === 'all') {
                activeCategories = new Set(Object.keys(categoryConfig));
                legendEl.querySelectorAll('.sabetay-legend-item').forEach(i => i.classList.add('active'));
            } else {
                if (activeCategories.size === Object.keys(categoryConfig).length) {
                    activeCategories = new Set([cat]);
                    legendEl.querySelectorAll('.sabetay-legend-item').forEach(i => {
                        i.classList.toggle('active', i.dataset.category === cat || i.dataset.category === 'all');
                    });
                } else if (activeCategories.has(cat)) {
                    if (activeCategories.size > 1) {
                        activeCategories.delete(cat);
                        item.classList.remove('active');
                    }
                } else {
                    activeCategories.add(cat);
                    item.classList.add('active');
                }
                if (activeCategories.size === Object.keys(categoryConfig).length) {
                    legendEl.querySelectorAll('.sabetay-legend-item[data-category="all"]').forEach(i => i.classList.add('active'));
                } else {
                    legendEl.querySelectorAll('.sabetay-legend-item[data-category="all"]').forEach(i => i.classList.remove('active'));
                }
            }
        });
    });

    // Canvas setup
    const canvas = document.getElementById('sabetay-canvas');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    function resizeCanvas() {
        const rect = canvas.parentElement.getBoundingClientRect();
        const detailPanel = document.getElementById('sabetay-detail');
        const panelWidth = window.innerWidth > 900 ? (detailPanel ? detailPanel.offsetWidth : 320) : 0;
        const w = rect.width - panelWidth;
        const h = rect.height;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return { w, h };
    }
    let dims = resizeCanvas();
    let cw = dims.w;
    let ch = dims.h;

    // Initialize node positions
    const nodes = sabetayFamilies.map((f, i) => {
        const angle = (i / sabetayFamilies.length) * Math.PI * 2;
        const radius = Math.min(cw, ch) * 0.35;
        return {
            ...f,
            x: cw / 2 + Math.cos(angle) * radius * (0.6 + Math.random() * 0.4),
            y: ch / 2 + Math.sin(angle) * radius * (0.6 + Math.random() * 0.4),
            vx: 0,
            vy: 0,
            radius: 20 + sabetayConnections.filter(c => c.source === f.id || c.target === f.id).length * 3
        };
    });

    const nodeMap = {};
    nodes.forEach(n => nodeMap[n.id] = n);

    let selectedNode = null;
    let hoveredNode = null;
    let dragNode = null;

    // Force-directed simulation
    function simulate() {
        const visibleIds = new Set(nodes.filter(n => activeCategories.has(n.category)).map(n => n.id));

        nodes.forEach(n => {
            if (dragNode === n || !visibleIds.has(n.id)) return;
            let fx = 0, fy = 0;

            // Center gravity
            fx += (cw / 2 - n.x) * 0.003;
            fy += (ch / 2 - n.y) * 0.003;

            // Repulsion between all visible nodes
            nodes.forEach(m => {
                if (m === n || !visibleIds.has(m.id)) return;
                const dx = n.x - m.x;
                const dy = n.y - m.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                const force = 2500 / (dist * dist);
                fx += (dx / dist) * force;
                fy += (dy / dist) * force;
            });

            // Attraction along edges
            sabetayConnections.forEach(conn => {
                let other = null;
                if (conn.source === n.id && visibleIds.has(conn.target)) other = nodeMap[conn.target];
                if (conn.target === n.id && visibleIds.has(conn.source)) other = nodeMap[conn.source];
                if (!other) return;
                const dx = other.x - n.x;
                const dy = other.y - n.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                const idealDist = 160;
                const force = (dist - idealDist) * 0.008;
                fx += (dx / dist) * force;
                fy += (dy / dist) * force;
            });

            n.vx = (n.vx + fx) * 0.6;
            n.vy = (n.vy + fy) * 0.6;
            n.x += n.vx;
            n.y += n.vy;

            // Boundary constraints
            const pad = 40;
            n.x = Math.max(pad, Math.min(cw - pad, n.x));
            n.y = Math.max(pad, Math.min(ch - pad, n.y));
        });
    }

    // Draw
    function draw() {
        const isLight = document.body.classList.contains('light-theme');
        ctx.clearRect(0, 0, cw, ch);

        const visibleIds = new Set(nodes.filter(n => activeCategories.has(n.category)).map(n => n.id));

        // Draw edges
        sabetayConnections.forEach(conn => {
            const src = nodeMap[conn.source];
            const tgt = nodeMap[conn.target];
            if (!src || !tgt || !visibleIds.has(src.id) || !visibleIds.has(tgt.id)) return;

            const connCfg = connectionColors[conn.type] || connectionColors.akrabalik;
            const isHighlighted = selectedNode && (conn.source === selectedNode.id || conn.target === selectedNode.id);

            ctx.beginPath();
            ctx.moveTo(src.x, src.y);
            ctx.lineTo(tgt.x, tgt.y);
            ctx.strokeStyle = isHighlighted ? connCfg.color : (isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)');
            ctx.lineWidth = isHighlighted ? 2.5 : 1;
            ctx.setLineDash(connCfg.dash);
            ctx.stroke();
            ctx.setLineDash([]);
        });

        // Draw nodes
        nodes.forEach(n => {
            if (!visibleIds.has(n.id)) return;
            const cfg = categoryConfig[n.category] || categoryConfig.tarih;
            const isSelected = selectedNode && selectedNode.id === n.id;
            const isConnected = selectedNode && sabetayConnections.some(c =>
                (c.source === selectedNode.id && c.target === n.id) ||
                (c.target === selectedNode.id && c.source === n.id)
            );
            const isHovered = hoveredNode && hoveredNode.id === n.id;
            const dimmed = selectedNode && !isSelected && !isConnected;

            const r = n.radius;

            // Glow for selected/hovered
            if (isSelected || isHovered) {
                ctx.beginPath();
                ctx.arc(n.x, n.y, r + 8, 0, Math.PI * 2);
                ctx.fillStyle = cfg.color + '25';
                ctx.fill();
            }

            // Node circle
            ctx.beginPath();
            ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
            ctx.fillStyle = dimmed
                ? (isLight ? 'rgba(200,200,200,0.3)' : 'rgba(40,40,40,0.4)')
                : (isLight ? cfg.color + '20' : cfg.color + '30');
            ctx.fill();
            ctx.strokeStyle = dimmed
                ? (isLight ? 'rgba(180,180,180,0.3)' : 'rgba(60,60,60,0.3)')
                : (isSelected ? cfg.color : cfg.color + '80');
            ctx.lineWidth = isSelected ? 3 : 1.5;
            ctx.stroke();

            // Label
            const fontSize = Math.max(9, Math.min(12, r * 0.55));
            ctx.font = `600 ${fontSize}px Inter, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = dimmed
                ? (isLight ? 'rgba(150,150,150,0.5)' : 'rgba(100,100,100,0.5)')
                : (isLight ? '#222' : '#f0f2f5');

            // Word wrap in circle
            const words = n.name.split(/\s+/);
            if (words.length <= 2) {
                if (words.length === 1) {
                    ctx.fillText(words[0], n.x, n.y);
                } else {
                    ctx.fillText(words[0], n.x, n.y - fontSize * 0.5);
                    ctx.fillText(words[1], n.x, n.y + fontSize * 0.5);
                }
            } else {
                const line1 = words.slice(0, Math.ceil(words.length / 2)).join(' ');
                const line2 = words.slice(Math.ceil(words.length / 2)).join(' ');
                ctx.fillText(line1, n.x, n.y - fontSize * 0.5);
                ctx.fillText(line2, n.x, n.y + fontSize * 0.5);
            }
        });
    }

    // Animation loop
    function animate() {
        simulate();
        draw();
        window._sabetayAnimFrame = requestAnimationFrame(animate);
    }
    animate();

    // Mouse interaction
    function getNodeAt(mx, my) {
        const visibleIds = new Set(nodes.filter(n => activeCategories.has(n.category)).map(n => n.id));
        for (let i = nodes.length - 1; i >= 0; i--) {
            const n = nodes[i];
            if (!visibleIds.has(n.id)) continue;
            const dx = mx - n.x;
            const dy = my - n.y;
            if (dx * dx + dy * dy <= n.radius * n.radius) return n;
        }
        return null;
    }

    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        return { x: (e.clientX - rect.left), y: (e.clientY - rect.top) };
    }

    canvas.addEventListener('mousemove', e => {
        const pos = getMousePos(e);
        if (dragNode) {
            dragNode.x = pos.x;
            dragNode.y = pos.y;
            dragNode.vx = 0;
            dragNode.vy = 0;
            return;
        }
        const node = getNodeAt(pos.x, pos.y);
        hoveredNode = node;
        canvas.style.cursor = node ? 'pointer' : 'grab';
    });

    canvas.addEventListener('mousedown', e => {
        const pos = getMousePos(e);
        const node = getNodeAt(pos.x, pos.y);
        if (node) {
            dragNode = node;
            canvas.style.cursor = 'grabbing';
        }
    });

    canvas.addEventListener('mouseup', e => {
        if (dragNode) {
            const pos = getMousePos(e);
            const node = getNodeAt(pos.x, pos.y);
            if (node && node === dragNode) {
                selectSabetayNode(node);
            }
            dragNode = null;
            canvas.style.cursor = 'grab';
        }
    });

    canvas.addEventListener('mouseleave', () => {
        hoveredNode = null;
        dragNode = null;
    });

    // Touch support
    canvas.addEventListener('touchstart', e => {
        e.preventDefault();
        const touch = e.touches[0];
        const pos = getMousePos(touch);
        const node = getNodeAt(pos.x, pos.y);
        if (node) dragNode = node;
    }, { passive: false });

    canvas.addEventListener('touchmove', e => {
        e.preventDefault();
        if (dragNode) {
            const touch = e.touches[0];
            const pos = getMousePos(touch);
            dragNode.x = pos.x;
            dragNode.y = pos.y;
            dragNode.vx = 0;
            dragNode.vy = 0;
        }
    }, { passive: false });

    canvas.addEventListener('touchend', e => {
        if (dragNode) {
            selectSabetayNode(dragNode);
            dragNode = null;
        }
    });

    // Select node and update detail panel
    function selectSabetayNode(node) {
        selectedNode = (selectedNode && selectedNode.id === node.id) ? null : node;
        updateDetailPanel();
    }

    function updateDetailPanel() {
        const titleEl = document.getElementById('sabetay-detail-title');
        const descEl = document.getElementById('sabetay-detail-desc');
        const membersEl = document.getElementById('sabetay-detail-members');
        const connectionsEl = document.getElementById('sabetay-detail-connections');

        if (!selectedNode) {
            titleEl.textContent = 'Bir düğüme tıklayın';
            descEl.textContent = 'Sol taraftaki ağ grafiğinden bir aile veya kişi seçerek bağlantılarını görüntüleyebilirsiniz.';
            membersEl.innerHTML = '';
            connectionsEl.innerHTML = '';
            return;
        }

        const cfg = categoryConfig[selectedNode.category] || categoryConfig.tarih;
        titleEl.innerHTML = `<span style="color:${cfg.color};">${cfg.icon}</span> ${selectedNode.name}`;
        descEl.textContent = selectedNode.description;

        // Members
        if (selectedNode.members && selectedNode.members.length > 0) {
            let mhtml = '<div class="sabetay-detail-section-title">Bilinen Üyeler</div>';
            selectedNode.members.forEach(m => {
                mhtml += `<span class="sabetay-member-tag">${m}</span>`;
            });
            membersEl.innerHTML = mhtml;
        } else {
            membersEl.innerHTML = '';
        }

        // Connections
        const relatedConns = sabetayConnections.filter(c => c.source === selectedNode.id || c.target === selectedNode.id);
        if (relatedConns.length > 0) {
            let chtml = '<div class="sabetay-detail-section-title">Bağlantılar</div>';
            relatedConns.forEach(conn => {
                const otherId = conn.source === selectedNode.id ? conn.target : conn.source;
                const other = nodeMap[otherId];
                if (!other) return;
                const connCfg = connectionColors[conn.type] || connectionColors.akrabalik;
                const typeLabels = { evlilik: 'Evlilik', akrabalik: 'Akrabalık', is_ortakligi: 'İş Ort.', cemaat: 'Cemaat' };
                chtml += `
                    <div class="sabetay-connection-item">
                        <span class="sabetay-connection-type" style="background:${connCfg.color}20;color:${connCfg.color};border:1px solid ${connCfg.color}40;">${typeLabels[conn.type] || conn.type}</span>
                        <span class="sabetay-connection-name">${other.name}</span>
                        <div class="sabetay-connection-desc">${conn.description}</div>
                    </div>
                `;
            });
            connectionsEl.innerHTML = chtml;
        } else {
            connectionsEl.innerHTML = '<div class="sabetay-detail-section-title">Bağlantı bulunamadı</div>';
        }
    }

    // Back button
    document.getElementById('sabetay-back-btn').addEventListener('click', () => {
        resetMap();
    });

    // Resize handler
    window.addEventListener('resize', () => {
        const newDims = resizeCanvas();
        cw = newDims.w;
        ch = newDims.h;
    });

    // Build sidebar with family list
    const timelineContainer = document.getElementById('timeline');
    timelineContainer.innerHTML = '';
    sabetayFamilies.forEach((family, index) => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.id = `sidebar-item-${index}`;
        const cfg = categoryConfig[family.category] || categoryConfig.tarih;
        item.innerHTML = `
            <div style="display: flex; align-items:center;">
                <div style="width:40px; height:40px; border-radius:50%; background: ${cfg.color}20; border: 2px solid ${cfg.color}50; margin-right: 12px; flex-shrink: 0; display:flex; align-items:center; justify-content:center;">
                    <span style="font-size:1rem;">${cfg.icon}</span>
                </div>
                <div>
                    <div class="timeline-year" style="color: ${cfg.color}; font-size: 0.75rem; margin-bottom:2px;">${cfg.label}</div>
                    <h3 class="timeline-title" style="margin-bottom:0; font-size:0.95rem;">${family.name}</h3>
                    <p class="timeline-summary" style="margin-top:2px; font-size:0.7rem;">${family.description.substring(0, 80)}...</p>
                </div>
            </div>
        `;
        item.addEventListener('click', () => {
            closeSidebarOnMobile();
            document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            const node = nodes[index];
            selectedNode = node;
            updateDetailPanel();
        });
        timelineContainer.appendChild(item);
    });

    // Update detail card
    const card = document.getElementById('initial-card');
    card.innerHTML = `
        <h2 style="color: #8e44ad;">Sabetay Aile Ağları</h2>
        <p>Türkiye'deki Sabetayist ailelerin ve cemaatlerin birbirleriyle kurduğu akrabalık, evlilik, cemaat ve iş bağlantılarını keşfedin.</p>
        <div class="detail-tags">
            <span class="tag">${sabetayFamilies.length} Aile / Kişi</span>
            <span class="tag">${sabetayConnections.length} Bağlantı</span>
        </div>
    `;
}
