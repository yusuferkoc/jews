const fs = require('fs');
const css = `

/* ŞEHİR ÖZETİ - DETAIL CARD LİSTE STİLLERİ */

.city-details-scroll::-webkit-scrollbar {
    width: 6px;
}
.city-details-scroll::-webkit-scrollbar-track {
    background: rgba(0,0,0,0.1);
    border-radius: 4px;
}
.city-details-scroll::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.2);
    border-radius: 4px;
}
.city-details-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(255,255,255,0.4);
}

.city-list-item-jewish {
    background: rgba(0, 0, 0, 0.4);
    border-left: 3px solid #e74c3c;
    border-radius: 4px;
    padding: 10px 12px;
    margin-bottom: 8px;
    transition: all 0.2s ease;
    border-top: 1px solid rgba(231, 76, 60, 0.1);
    border-right: 1px solid rgba(231, 76, 60, 0.1);
    border-bottom: 1px solid rgba(231, 76, 60, 0.1);
}

.city-list-item-jewish:hover {
    background: rgba(231, 76, 60, 0.1);
    transform: translateX(4px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    border-color: rgba(231, 76, 60, 0.4);
}

.city-list-item-sabbatean {
    background: rgba(0, 0, 0, 0.4);
    border-left: 3px solid #8e44ad;
    border-radius: 4px;
    padding: 10px 12px;
    margin-bottom: 8px;
    transition: all 0.2s ease;
    border-top: 1px solid rgba(142, 68, 173, 0.1);
    border-right: 1px solid rgba(142, 68, 173, 0.1);
    border-bottom: 1px solid rgba(142, 68, 173, 0.1);
}

.city-list-item-sabbatean:hover {
    background: rgba(142, 68, 173, 0.15);
    transform: translateX(4px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    border-color: rgba(142, 68, 173, 0.4);
}

.cluster-marker {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cluster-marker:hover {
    transform: scale(1.1) !important;
    z-index: 2000 !important;
}
`;
fs.appendFileSync('c:\\Users\\yusuf\\OneDrive\\Desktop\\je2\\style.css', css, 'utf8');
console.log('Appended CSS to style.css');
