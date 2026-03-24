const fs = require('fs');

const path = 'c:\\Users\\yusuf\\OneDrive\\Desktop\\je2\\data.js';
let content = fs.readFileSync(path, 'utf8');

const reasonsMap = {
    "assyrian": ["Asur İmparatorluğu'nun fethettiği halkları asimile etme stratejisi", "İsrail Krallığı'nın siyasi varlığını yok etme amacı"],
    "babylonian": ["Kudüs isyanlarını kökünden kazıma politikası", "Siyasi liderler ve teolojik elitlerin sürülerek otoritenin kırılması"],
    "roman_70": ["Roma İmparatorluğu'na karşı tekrarlanan büyük isyanlar (Örn: Bar Kohba)", "Kudüs'ün isyankar bir merkez olmasını tamamen engelleme ve radikal demografik değişim"],
    "england_1290": ["Kral I. Edward'ın savaş borçlarından kurtulmak için varlıklara el koyması", "Toplumda giderek tırmanan 'kan iftiraları' (blood libel) ve dini düşmanlık"],
    "france_1306": ["Kral IV. Philip'in ekonomik darboğazı aşmak için fon arayışı", "Devlet hazinesini, sürülenlerin el konulan nakitleri üzerinden finanse etme stratejisi"],
    "spain_1492": ["'Saf Kan' (Limpieza de sangre) ve homojen Katolik bir İspanya yaratma arzusu", "İspanyol Engizisyonu'nun dini temizlik ve sapkınlık(heretik) algısı"],
    "portugal_1497": ["İspanya krallığı ile yapılan siyasi ittifakın ve evliliğin değişmez ön şartı", "Mal varlıklarının ülke dışına çıkmasını önlemek için kovmak yerine 'zorunlu vaftiz' uygulaması"],
    "russian_pogroms": ["Çar II. Alexander suikastinde Yahudilerin asılsız yere günah keçisi ilan edilmesi", "Toplumsal ve ekonomik buhranların devlet destekli şiddete (pogromlara) kanalize edilmesi"],
    "holocaust": ["Nazi Almanyası'nın Ari ırk ideolojisi", "Endüstriyel imha (Soykırım) politikası ile Avrupa'dan varlığın tamamen silinmek istenmesi"],
    "arab_exodus": ["1948'de İsrail Devleti'nin kurulması ve Arap-İsrail savaşlarının yarattığı gerilim", "Kuzey Afrika ve Orta Doğu'da yükselen Arap milliyetçiliğiyle birlikte gelen misilleme/el koyma politikaları"]
};

for (const [id, reasons] of Object.entries(reasonsMap)) {
    const regex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?description:\\s*".*?")`);
    const reasonsStr = `,\n        reasons: ${JSON.stringify(reasons)}`;
    content = content.replace(regex, `$1${reasonsStr}`);
}

fs.writeFileSync(path, content, 'utf8');
console.log("Successfully added specific reasons to data.js");
