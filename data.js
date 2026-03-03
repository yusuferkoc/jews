const expulsionEvents = [
    {
        id: "assyrian",
        year: -722,
        displayYear: "MÖ 722",
        title: "Asur Sürgünü",
        origin: { name: "Samiriye (İsrail Krallığı)", coords: [32.27, 35.28] },
        destinations: [
            { name: "Ninova (Asur)", coords: [36.36, 43.15], count: "~ 27.290 Kişi" },
            { name: "Medya Prensliği", coords: [35.5, 48.0], count: "~ 10.000+ Kişi" }
        ],
        description: "İsrail Krallığı'nın on kabilesi (Kayıp On Kabile), Yeni Asur İmparatorluğu kralı V. Salmanasar ve II. Sargon tarafından sürüldü. Bu, Yahudi diasporasının ilk büyük adımı sayılır.",
        category: "Antik Dönem"
    },
    {
        id: "babylonian",
        year: -586,
        displayYear: "MÖ 586",
        title: "Babil Sürgünü",
        origin: { name: "Kudüs (Yehuda Krallığı)", coords: [31.7683, 35.2137] },
        destinations: [
            { name: "Babil", coords: [32.5364, 44.4208], count: "~ 10.000 - 20.000 Kişi" }
        ],
        description: "Babil Kralı II. Nebukadnezar, Kudüs'ü fethedip Birinci Tapınağı yıktı. Siyasi liderler, din adamları ve sanatanaatkerler Babil'e sürüldü. 70 yıl sonra Pers İmparatoru Kiros'un izniyle bir kısmı geri döndü.",
        category: "Antik Dönem"
    },
    {
        id: "roman_70",
        year: 70,
        displayYear: "MS 70 & 135",
        title: "Roma İşgali ve Büyük Dağılma",
        origin: { name: "Kudüs (Yahudiye Eyaleti)", coords: [31.7683, 35.2137] },
        destinations: [
            { name: "Roma", coords: [41.9028, 12.4964], count: "~ 50.000 Kişi" },
            { name: "İskenderiye", coords: [31.2001, 29.9187], count: "~ 30.000 Kişi" },
            { name: "İspanya (İberya)", coords: [40.4168, -3.7038], count: "~ 20.000 Kişi" }
        ],
        description: "Yahudi-Roma Savaşları sonunda Kudüs ve İkinci Tapınak yıkıldı (MS 70). Bar Kohba isyanı (MS 135) sonrası İmparator Hadrianus, Yahudileri Kudüs'ten tamamen sürdü veya köle olarak sattı. Bu olay Avrupa diaspora popülasyonlarının temelini attı.",
        category: "Antik Dönem"
    },
    {
        id: "england_1290",
        year: 1290,
        displayYear: "1290",
        title: "İngiltere'den Sürgün",
        origin: { name: "Londra / İngiltere", coords: [51.5074, -0.1278] },
        destinations: [
            { name: "Fransa", coords: [48.8566, 2.3522], count: "~ 10.000 Kişi" },
            { name: "Polonya", coords: [52.2297, 21.0122], count: "~ 6.000 Kişi" }
        ],
        description: "İngiltere Kralı I. Edward'ın Fermanı (Edict of Expulsion) ile tüm Yahudiler İngiltere'den kovuldu. Bu, Orta Çağ Avrupası'ndaki ilk kalıcı ve ulusal çaplı toplu sürgündü. (1656'ya kadar ülkeye girişleri yasaktı).",
        category: "Orta Çağ"
    },
    {
        id: "france_1306",
        year: 1306,
        displayYear: "1306 / 1394",
        title: "Fransa Sürgünleri",
        origin: { name: "Paris / Fransa", coords: [48.8566, 2.3522] },
        destinations: [
            { name: "Kutsal Roma Cermen İmparatorluğu (Almanya)", coords: [51.1657, 10.4515], count: "~ 60.000 Kişi" },
            { name: "Kuzey İspanya", coords: [42.8805, -2.6805], count: "~ 40.000 Kişi" }
        ],
        description: "Fransa Kralı IV. Philip, mali kaynak yaratmak amacıyla Yahudilerin mallarına el koydu ve 100.000'den fazla kişiyi sürgün etti. Çıkarılan çeşitli fermanlarla bu sürgünler 14. yüzyıl boyunca tekrarlandı.",
        category: "Orta Çağ"
    },
    {
        id: "spain_1492",
        year: 1492,
        displayYear: "1492",
        title: "İspanya ve Elhamra Kararnamesi",
        origin: { name: "Madrid & Toledo / İspanya", coords: [39.8628, -4.0273] },
        destinations: [
            { name: "İstanbul (Osmanlı İmparatorluğu)", coords: [41.0082, 28.9784], count: "~ 90.000 Kişi" },
            { name: "Selanik", coords: [40.6401, 22.9444], count: "~ 20.000 Kişi" },
            { name: "Kuzey Afrika (Fas)", coords: [34.0209, -6.8416], count: "~ 20.000 Kişi" },
            { name: "Portekiz", coords: [38.7223, -9.1393], count: "~ 120.000 Kişi" }
        ],
        description: "Katolik Krallar Kastilyalı Isabella ve Aragonlu Ferdinand, Elhamra Kararnamesi ile ülkedeki tüm Sefarad Yahudilerini Hristiyanlığa geçmeye ya da ülkeyi terk etmeye zorladı. Çoğunluğu Osmanlı padişahı II. Bayezid'in davetiyle Osmanlı topraklarına yerleşti.",
        category: "Orta Çağ"
    },
    {
        id: "portugal_1497",
        year: 1497,
        displayYear: "1497",
        title: "Portekiz Sürgünü ve Zorunlu Vahtiz",
        origin: { name: "Lizbon / Portekiz", coords: [38.7223, -9.1393] },
        destinations: [
            { name: "Amsterdam (Hollanda)", coords: [52.3676, 4.9041], count: "~ 20.000 Kişi" },
            { name: "Brezilya", coords: [-15.7939, -47.8828], count: "~ 5.000 Kişi" }
        ],
        description: "İspanya'nın baskısıyla Portekiz Kralı I. Manuel, Yahudilere ya ayrılma ya da vaftiz olma şartı koştu ancak uygulamada limanları kapatarak binlerce Yahudiyi zorla Hristiyanlaştırdı. Birçok gizli Yahudi daha sonra Hollanda ve Güney Amerika'ya kaçtı.",
        category: "Orta Çağ"
    },
    {
        id: "russian_pogroms",
        year: 1881,
        displayYear: "1881 - 1920",
        title: "Rusya Pogromları",
        origin: { name: "Çarlık Rusyası (Yerleşim Bölgesi / Pale of Settlement)", coords: [50.4501, 30.5234] }, // Kyiv area
        destinations: [
            { name: "New York (ABD)", coords: [40.7128, -74.0060], count: "~ 1.5 Milyon Kişi" },
            { name: "İngiltere", coords: [51.5074, -0.1278], count: "~ 150.000 Kişi" },
            { name: "Filistin", coords: [31.5, 34.8], count: "~ 100.000 Kişi" }
        ],
        description: "Çar II. Alexander'ın suikastinden sonra başlayan ve devlet destekli olan sistemli şiddet eylemleri (pogromlar) sonucunda 2 milyondan fazla Doğu Avrupa Yahudisi çoğunlukla Amerika Birleşik Devletleri'ne göç etti. Bu dalga modern Siyonizm'in de güçlenmesine sebep oldu.",
        category: "Modern Dönem"
    },
    {
        id: "holocaust",
        year: 1939,
        displayYear: "1939 - 1945",
        title: "Holokost ve Gettolar",
        origin: { name: "Orta ve Doğu Avrupa (Polonya/Almanya)", coords: [52.2297, 21.0122] }, // Warsaw
        destinations: [
            { name: "Auschwitz (İmha Kampı)", coords: [50.0274, 19.2020], count: "~ 1.1 Milyon Kişi" },
            { name: "Treblinka", coords: [52.6315, 22.0526], count: "~ 900.000 Kişi" }
        ],
        description: "Nazi Almanya'sı döneminde Avrupa'daki Yahudiler zorla gettolara ve ardından sistematik soykırım için ölüm kamplarına sürüldü. Yaklaşık 6 milyon Yahudi hayatını kaybetti. Hayatta kalanlar savaş sonrası tüm dünyaya dağıldı veya İsrail'e göç etti.",
        category: "Modern Dönem"
    },
    {
        id: "arab_exodus",
        year: 1948,
        displayYear: "1948 - 1970'ler",
        title: "Arap ve İslam Ülkelerinden Çıkış",
        origin: { name: "Orta Doğu ve Kuzey Afrika", coords: [33.3152, 44.3661] }, // Baghdad
        destinations: [
            { name: "İsrail", coords: [31.0461, 34.8516], count: "~ 600.000 Kişi" },
            { name: "Fransa", coords: [48.8566, 2.3522], count: "~ 200.000 Kişi" }
        ],
        description: "İsrail'in kuruluşu ve artan Arap milliyetçiliği sonrası Fas, Cezayir, Irak, Suriye, Mısır ve Yemen gibi ülkelerde yaşayan 800.000 ila 1 milyon Mizrahi ve Sefarad Yahudisi topraklarından kovuldu veya mallarına el konularak zorunlu göçe tabi tutuldu.",
        category: "Modern Dönem"
    }
];

const currentPopulation = [
    { country: "İsrail", coords: [31.0461, 34.8516], population: 7200000, description: "Dünyadaki Yahudi nüfusunun büyük çoğunluğu (%46) İsrail'de yaşamaktadır." },
    { country: "ABD", coords: [37.0902, -95.7129], population: 6300000, description: "Dünyanın en büyük ikinci Yahudi nüfusu (yaklaşık %40)." },
    { country: "Fransa", coords: [46.2276, 2.2137], population: 440000, description: "Avrupa'nın en büyük Yahudi cemaati." },
    { country: "Kanada", coords: [56.1304, -106.3468], population: 398000, description: "Kuzey Amerika'nın ikinci büyük topluluğu." },
    { country: "Birleşik Krallık", coords: [51.5098, -0.1180], population: 312000, description: "Avrupa'nın önde gelen tarihi cemaatlerinden." },
    { country: "Arjantin", coords: [-38.4161, -63.6167], population: 171000, description: "Latin Amerika'nın en büyük Yahudi nüfusu." },
    { country: "Rusya", coords: [61.5240, 105.3188], population: 132000, description: "Tarihi olarak çok büyük olsa da, çoğu 20. yüzyıl sonlarında İsrail ve ABD'ye göç etmiştir." },
    { country: "Almanya", coords: [51.1657, 10.4515], population: 125000, description: "Son yıllarda eski Sovyet ülkelerinden gelen göçlerle büyüyen topluluk." },
    { country: "Avustralya", coords: [-25.2744, 133.7751], population: 117000, description: "Okyanusya'nın en büyük cemaati." },
    { country: "Brezilya", coords: [-14.2350, -51.9253], population: 90000, description: "Güney Amerika'nın önemli diasporalarından biri." },
    { country: "Güney Afrika", coords: [-30.5595, 22.9375], population: 50000, description: "Afrika kıtasındaki en aktif ve yoğun Yahudi nüfusu." },
    { country: "Macaristan", coords: [47.1625, 19.5033], population: 46000, description: "Orta Avrupa'nın en büyük Yahudi topluluğuna sahip ülkelerinden." },
    { country: "Meksika", coords: [23.6345, -102.5528], population: 40000, description: "Tarihi ve modern göçlerle oluşmuş önemli bir topluluk." },
    { country: "Ukrayna", coords: [48.3794, 31.1656], population: 33000, description: "Tarihsel olarak çok büyük bir merkez iken, büyük göçler ve savaşlardan dolayı azalmıştır." },
    { country: "Hollanda", coords: [52.1326, 5.2913], population: 29700, description: "İber yarımadasından kaçanların tarihsel sığınma noktası." },
    { country: "Belçika", coords: [50.5039, 4.4699], population: 29000, description: "Özellikle Anvers (Antwerp), Ortodoks Yahudiliğin Avrupa'daki merkezlerindendir." },
    { country: "İtalya", coords: [41.8719, 12.5674], population: 27000, description: "Roma döneminden beri varlığını sürdüren köklü bir cemaat." },
    { country: "İsviçre", coords: [46.8182, 8.2275], population: 18500, description: "Önemli Siyonist kongrelerinin yapıldığı ve tarihi göçlere ev sahipliği yapan bir ülke." },
    { country: "Şili", coords: [-35.6751, -71.5430], population: 15700, description: "Güney Amerika diasporası." },
    { country: "Uruguay", coords: [-32.5228, -55.7658], population: 15200, description: "Özellikle başkent Montevideo'da yoğunlaşan bir topluluk." },
    { country: "Türkiye", coords: [38.9637, 35.2433], population: 14000, description: "Tarihi Sefarad (İspanya'dan sürülen) Yahudilerinin Osmanlı'dan bu yana yaşadığı önemli merkez." },
    { country: "İsveç", coords: [60.1282, 18.6435], population: 14000, description: "İskandinavya'daki en büyük cemaat." },
    { country: "İspanya", coords: [40.4637, -3.7492], population: 13000, description: "1492 Elhamra Kararnamesi ile kovulmalarından yüzyıllar sonra yeniden gelişen cemaat." },
    { country: "Belarus", coords: [53.7098, 27.9534], population: 8300, description: "Bir zamanlar 'Yerleşim Bölgesi'nin kalbi olan, bugün nüfusu büyük oranda azalmış bir diaspora." },
    { country: "Panama", coords: [8.5380, -80.7821], population: 8000, description: "Nüfusuna oranla oldukça güçlü ve aktif bir Orta Amerika Yahudi topluluğu." }
];

// Wikipedia REST API returns reliable, properly-sized thumbnails.
// Format: https://en.wikipedia.org/api/rest_v1/page/summary/{Page_Title}
// We store wikiPage so we can fetch the thumbnail dynamically if needed,
// and also a direct stable fallbackImage.
const holyPlaces = [
    {
        name: "Kudüs (Yeruşalayim)", coords: [31.7683, 35.2137],
        highlight: "En Kutsal Şehir",
        description: "Yahudilikteki en kutsal şehirdir. Süleyman Mabedi'nin bulunduğu yer ve Batı (Ağlama) Duvarı bu şehirdedir.",
        wikiPage: "Western_Wall"
    },
    {
        name: "El Halil (Hebron)", coords: [31.5326, 35.0998],
        highlight: "Kutsal Şehir (Mezarlar)",
        description: "İbrahim, İshak ve Yakup peygamberlerin eşleriyle birlikte gömülü olduğuna inanılan Atababalar Mağarası buradadır.",
        wikiPage: "Cave_of_the_Patriarchs"
    },
    {
        name: "Safed (Tzfat)", coords: [32.9646, 35.4960],
        highlight: "Kabala'nın Merkezi",
        description: "Özellikle 15. ve 16. yüzyıllarda İspanya'dan sürülen Yahudilerin yerleştiği ve Yahudi mistisizminin (Kabala) geliştiği kutsal şehirdir.",
        wikiPage: "Safed"
    },
    {
        name: "Taberiye", coords: [32.7940, 35.5311],
        highlight: "Tarihi ve Dini Merkez",
        description: "Roma yıkımından sonra din bilginlerinin odak noktası olmuş, Mişna ve Talmud'un derlendiği önemli dört kutsal şehirden biridir.",
        wikiPage: "Tiberias"
    },
    {
        name: "Masada Kalesi", coords: [31.3156, 35.3533],
        highlight: "Tarihi Direniş",
        description: "Romalılar tarafından kuşatılan 960 Yahudi isyancının teslim olmak yerine toplu intiharı seçtiği trajik ve sembolik bir tarihi kaledir.",
        wikiPage: "Masada"
    },
    {
        name: "Auschwitz (Polonya)", coords: [50.0274, 19.2020],
        highlight: "Holokost Anıtı",
        description: "Modern Yahudi tarihinin en karanlık sembolü olan bu ölüm kampı, Avrupa Yahudiliğinin İkinci Dünya Savaşı'ndaki trajedisinin merkezidir.",
        wikiPage: "Auschwitz_concentration_camp"
    },
    {
        name: "Toledo (İspanya)", coords: [39.8628, -4.0273],
        highlight: "Sefarad Altın Çağı",
        description: "Endülüs İspanyası'nda 'Altın Çağ' döneminde Yahudi sanat, bilim ve felsefesinin kalbiydi (1492 sürgününden önce).",
        wikiPage: "Toledo,_Spain"
    },
    {
        name: "Uman (Ukrayna)", coords: [48.7484, 30.2215],
        highlight: "Hasidik Hac Merkezi",
        description: "Rabi Nachman'ın mezarının bulunduğu, her yıl Roş Aşana bayramında on binlerce Ortodoks Yahudinin akın ettiği hac yeridir.",
        wikiPage: "Uman"
    },
    {
        name: "El-Griba Sinagogu (Tunus)", coords: [33.8138, 10.8593],
        highlight: "Antik Sinagog",
        description: "Kuzey Afrika'nın en eski sinagogudur. Köklerinin MÖ 6. yüzyıldaki ilk Babil Sürgünü'ne utandığına inanılır.",
        wikiPage: "El_Ghriba_Synagogue"
    },
    {
        name: "Eski Yeni Sinagog (Prag)", coords: [50.0899, 14.4187],
        highlight: "Avrupa'nın En Eskisi",
        description: "1270'te tamamlanan ve Avrupa'da hala aktif olarak kullanılan en eski sinagogdur. Efsanevi Golem hikayesiyle de bilinir.",
        wikiPage: "Old-New_Synagogue"
    },
    {
        name: "Dohány Sokağı Sinagogu (Budapeşte)", coords: [47.4959, 19.0605],
        highlight: "Avrupa'nın En Büyüğü",
        description: "Dünyanın en büyük ikinci, Avrupa'nın ise en büyük sinagogudur. 19. yüzyıldaki Neolog (liberal) Yahudilik akımının merkezidir.",
        wikiPage: "Dohány_Street_Synagogue"
    },
    {
        name: "Crown Heights, Brooklyn (New York)", coords: [40.6681, -73.9448],
        highlight: "Modern Hasidik Merkez",
        description: "Dünya çapında etkili olan Ortodoks Chabad-Lubavitch hareketinin küresel karargahı (770 Eastern Parkway) buradadır.",
        wikiPage: "770_Eastern_Parkway"
    },
    {
        name: "Yad Vashem (Kudüs)", coords: [31.7742, 35.1755],
        highlight: "Holokost Anma Merkezi",
        description: "İsrail'in Holokost şehitleri ve kahramanları için kurduğu ulusal anıt ve müzedir. Modern Yahudi kimliği için kritik bir noktadır.",
        wikiPage: "Yad_Vashem"
    },
    {
        name: "Babi Yar (Kiev)", coords: [50.4795, 30.4485],
        highlight: "Katliam Anıtı",
        description: "Eylül 1941'de sadece iki gün içinde 33.771 Kievli Yahudinin Naziler tarafından kurşuna dizildiği trajik alan.",
        wikiPage: "Babi_Yar"
    },
    {
        name: "Sura ve Pumbedita (Irak)", coords: [32.5364, 44.4208], // Using Babylon coords for general Talmudic academies region
        highlight: "Antik Eğitim Merkezleri",
        description: "Babil Sürgünü sonrası kurulan, Babil Talmudu'nun yazıldığı antik Yeshivalar (din okulları). Yüzyıllarca Yahudi hukukunu şekillendirdi.",
        wikiPage: "Talmudic_academies_in_Babylonia"
    },
    {
        name: "Vilnius (Vilna)", coords: [54.6872, 25.2797],
        highlight: "Litvanya'nın Kudüs'ü",
        description: "Holokost öncesi Avrupa'da Yahudi ruhani liderliğinin ve entelektüel yaşamın ('Litvak' kültürü) kalbiydi. Ünlü Vilna Gaon burada yaşadı.",
        wikiPage: "Vilna_Gaon"
    },
    {
        name: "Sina Dağı (Mısır)", coords: [28.5391, 33.9749],
        highlight: "On Emir'in Yeri",
        description: "Tevrat'ta Musa peygambere On Emir'in ve Tevrat'ın verildiğine inanılan kutsal dağı barındıran tarihi yarımada.",
        wikiPage: "Mount_Sinai"
    },
    {
        name: "Touro Sinagogu (Rhode Island, ABD)", coords: [41.4886, -71.3115],
        highlight: "ABD'nin En Eski Sinagogu",
        description: "1763'te tamamlanan ve hala ayakta olan ABD'deki en eski sinagogdur. George Washington'un dini özgürlükler mektubuna ev sahipliği yapmıştır.",
        wikiPage: "Touro_Synagogue"
    },
    {
        name: "Emanu-El Tapınağı (New York)", coords: [40.7672, -73.9696],
        highlight: "Reform Yahudiliği Merkezi",
        description: "Dünyanın en büyük sinagoglarından biridir ve Amerika'daki Reform Yahudiliği hareketinin amiral gemisi konumundadır.",
        wikiPage: "Temple_Emanu-El_of_New_York"
    },
    {
        name: "Boro Park, Brooklyn (New York)", coords: [40.6339, -73.9968],
        highlight: "Ortodoks Nüfus Merkezi",
        description: "İsrail dışındaki en yoğun Ortodoks Yahudi ve Hasidik nüfus barındıran semtlerden biridir, Amerikan Yahudi kültürünü derinden yaşatır.",
        wikiPage: "Borough_Park,_Brooklyn"
    },
    {
        name: "Yeshiva Üniversitesi (New York)", coords: [40.8504, -73.9292],
        highlight: "Modern Ortodoks Akademi",
        description: "Geleneksel Yahudi eğitimi (Torah) ile seküler Batı eğitimini birleştiren (Torah Umadda) dünyadaki en saygın akademik kurumlardan biridir.",
        wikiPage: "Yeshiva_University"
    }
];

const notableFigures = [
    { name: "Maimonides (İbn Meymun)", coords: [30.0444, 31.2357], location: "Cordoba / Kahire", era: "1138 - 1204", highlight: "Tora Bilgini & Filozof", description: "Orta Çağ'ın en büyük Tora bilginlerinden, Endülüs doğumlu filozof ve doktor. Felsefesi ve tıp alanındaki eserleriyle büyük iz bıraktı.", wikiPage: "Maimonides" },
    { name: "Albert Einstein", coords: [40.3573, -74.6672], location: "Almanya / ABD", era: "1879 - 1955", highlight: "Fizikçi & Deha", description: "Görelilik teorisini geliştiren Nobel ödüllü teorik fizikçi. Nazi Almanyasından kaçarak yerleştiği ABD'de bilimin seyrini değiştirdi.", wikiPage: "Albert_Einstein" },
    { name: "Sigmund Freud", coords: [48.2082, 16.3738], location: "Viyana, Avusturya", era: "1856 - 1939", highlight: "Psikanalizin Kurucusu", description: "İnsan psikolojisi ve bilinçaltı üzerine olan öncü çalışmalarıyla modern bilim ve kültür tarihini derinden şekillendirdi.", wikiPage: "Sigmund_Freud" },
    { name: "Baruch Spinoza", coords: [52.3676, 4.9041], location: "Amsterdam, Hollanda", era: "1632 - 1677", highlight: "Aydınlanma Filozofu", description: "Sefarad kökenli Rasyonalist filozof. Panteist ve devrimci görüşleri sebebiyle içinde bulunduğu Yahudi cemaati tarafından aforoz edildi.", wikiPage: "Baruch_Spinoza" },
    { name: "Theodor Herzl", coords: [47.5596, 7.5886], location: "Viyana / Basel", era: "1860 - 1904", highlight: "Modern Siyonizmin Kurucusu", description: "1897'de İlk Siyonist Kongresi'ni Basel'de toplayarak modern bağımsız İsrail devletinin fikri ve hukuki temellerini attı.", wikiPage: "Theodor_Herzl" },
    { name: "David Ben-Gurion", coords: [32.0853, 34.7818], location: "Tel Aviv / Kudüs", era: "1886 - 1973", highlight: "İsrail'in Kurucu Başbakanı", description: "Modern İsrail Devleti'nin kurucusu ve ilk Başbakanıdır. 1948'de İsrail'in Bağımsızlık Bildirgesi'ni okumuştur.", wikiPage: "David_Ben-Gurion" },
    { name: "Chaim Weizmann", coords: [31.9029, 34.8092], location: "Rehovot, İsrail", era: "1874 - 1952", highlight: "İsrail'in İlk Cumhurbaşkanı", description: "Siyonist lider ve kimyager. Balfour Deklarasyonu'nun ilan edilmesinde başrolü oynamış İngilizlerle etkili diplomasi yürütmüştür.", wikiPage: "Chaim_Weizmann" },
    { name: "Golda Meir", coords: [31.7683, 35.2137], location: "Kyiv / Kudüs", era: "1898 - 1978", highlight: "İsrail Başbakanı", description: "İsrail'in ilk kadın başbakanı ve 'İsrail siyasetinin demir leydisi'. Yom Kippur Savaşı gibi krizlerde ülkeyi yönetti.", wikiPage: "Golda_Meir" },
    { name: "Yitzhak Rabin", coords: [32.0853, 34.7818], location: "Kudüs / Tel Aviv", era: "1922 - 1995", highlight: "İsrail Başbakanı", description: "Altı Gün Savaşı'nda İsrail ordusunun komutanı ve Oslo Anlaşmaları'nı imzalayarak Nobel Barış Ödülü alan Başbakan.", wikiPage: "Yitzhak_Rabin" },
    { name: "Menachem Begin", coords: [31.7683, 35.2137], location: "Kudüs, İsrail", era: "1913 - 1992", highlight: "İsrail Başbakanı", description: "İsrail sağının tarihi lideri. Mısır ile Camp David sözleşmesini imzalayarak Nobel Barış Ödülü'nü kazandı.", wikiPage: "Menachem_Begin" },
    { name: "Shimon Peres", coords: [31.7683, 35.2137], location: "Kudüs, İsrail", era: "1923 - 2016", highlight: "İsrail Cumhurbaşkanı", description: "İsrail devletinin kuruluşundan itibaren siyasetin her kademesinde bulunmuş ve Oslo sürecindeki çabasıyla Nobel almış devlet adamı.", wikiPage: "Shimon_Peres" },
    { name: "Karl Marx", coords: [51.5074, -0.1278], location: "Trier / Londra", era: "1818 - 1883", highlight: "Filozof & Devrimci", description: "Modern komünizmin fikir babası, filozof ve ekonomist. Das Kapital'i uzun sürgün hayatı yaşadığı Londra'da yazdı.", wikiPage: "Karl_Marx" },
    { name: "Franz Kafka", coords: [50.0755, 14.4378], location: "Prag, Çekya", era: "1883 - 1924", highlight: "Edebiyat Kahramanı", description: "20. yüzyıl edebiyatının en önemli figürlerinden biri. Eserlerindeki yabancılaşma ve bürokrasi temaları kalıcı etkiler yarattı.", wikiPage: "Franz_Kafka" },
    { name: "Rashi (Şlomo Yitzhaki)", coords: [48.2973, 4.0744], location: "Troyes, Fransa", era: "1040 - 1105", highlight: "En Büyük Talmud Yorumcusu", description: "Talmud ve Tanah üzerine yaptığı son derece anlaşılır ve kapsamlı yorumları günümüz Yahudi eğitiminin temel taşı olan Fransız haham.", wikiPage: "Rashi" },
    { name: "Moses Mendelssohn", coords: [52.5200, 13.4050], location: "Berlin, Almanya", era: "1729 - 1786", highlight: "Haskala (Aydınlanma) Öncüsü", description: "Avrupa Yahudi Aydınlanmasının (Haskala) fikir babasıdır. Yahudilerin modern Avrupa kültürüyle entegrasyonuna öncülük etti.", wikiPage: "Moses_Mendelssohn" },
    { name: "Benjamin Disraeli", coords: [51.5074, -0.1278], location: "Londra, İngiltere", era: "1804 - 1881", highlight: "İngiltere Başbakanı", description: "Tarihin ilk ve tek Yahudi kökenli İngiliz Başbakanı. Victoria Dönemi Britanya İmparatorluğu'nun en güçlü siyasetçilerindendi.", wikiPage: "Benjamin_Disraeli" },
    { name: "Leon Trotsky (Lev Troçki)", coords: [55.7558, 37.6173], location: "Moskova / Meksika", era: "1879 - 1940", highlight: "Kızıl Ordu Kurucusu", description: "Ekim Devriminin baş mimarlarından ve Kızıl Ordu'nun kurucusu olan ünlü Marksist ideolog ve devrimci.", wikiPage: "Leon_Trotsky" },
    { name: "John von Neumann", coords: [38.8951, -77.0364], location: "Budapeşte / ABD", era: "1903 - 1957", highlight: "Matematik ve Bilgisayar Dehası", description: "Oyun teorisinin, modern bilgisayar mimarisinin (von Neumann mimarisi) ve kuantum mekaniğinin temel taşlarını atan polimat.", wikiPage: "John_von_Neumann" },
    { name: "Niels Bohr", coords: [55.6761, 12.5683], location: "Kopenhag, Danimarka", era: "1885 - 1962", highlight: "Kuantum Fizikçisi", description: "Atomun yapısı ve kuantum mekaniği üzerine yaptığı çalışmalarla Nobel ödülü alan tarihin en önemli fizikçilerinden biri.", wikiPage: "Niels_Bohr" },
    { name: "J. Robert Oppenheimer", coords: [35.8813, -106.3031], location: "Los Alamos, ABD", era: "1904 - 1967", highlight: "Atom Bombasının Babası", description: "Manhattan Projesi'nin yöneticisi ve ilk nükleer silahların geliştirilmesine liderlik eden Amerikalı teorik fizikçi.", wikiPage: "J._Robert_Oppenheimer" },
    { name: "Émile Durkheim", coords: [48.8566, 2.3522], location: "Paros, Fransa", era: "1858 - 1917", highlight: "Sosyolojinin Kurucularından", description: "Modern sosyolojinin akademik bir disiplin olarak kurulmasını sağlayan, toplumsal yapılar üzerine çığır açan düşünür.", wikiPage: "Émile_Durkheim" },
    // Historical Business Tycoons
    { name: "Mayer Amschel Rothschild", coords: [50.1109, 8.6821], location: "Frankfurt, Almanya", era: "1744 - 1812", highlight: "Küresel Finansın Babası", description: "Muazzam serveti ve Avrupa'yı inşa eden hanedanlığı ile tarihin en ikonik bankacısı.", wikiPage: "Mayer_Amschel_Rothschild" },
    { name: "Solomon Guggenheim", coords: [40.7128, -74.0060], location: "ABD", era: "1861 - 1949", highlight: "Sanayici & Sanat Hamisi", description: "Büyük çaplı madencilik faaliyetleriyle zenginleşti. Guggenheim Müzesi aracılığıyla sanat tarihini şekillendirdi.", wikiPage: "Solomon_R._Guggenheim" },
    { name: "Levi Strauss", coords: [37.7749, -122.4194], location: "San Francisco, ABD", era: "1829 - 1902", highlight: "Levi's Kurucusu", description: "Mavi Jean (Kot Pantolon) markasını kurup Silikon Vadisi / San Francisco'dan dünyaya yayan Alman kökenli girişimci.", wikiPage: "Levi_Strauss" },
    { name: "Paul Julius Reuter", coords: [51.5074, -0.1278], location: "Londra, İngiltere", era: "1816 - 1899", highlight: "Reuters Ajansı Kurucusu", description: "Küresel medya devi Reuters Haber Ajansı'nı kurarak dünya haberciliğinde çığır açtı.", wikiPage: "Paul_Julius_Reuter" },
    { name: "Marcus Goldman", coords: [40.7128, -74.0060], location: "New York, ABD", era: "1821 - 1904", highlight: "Goldman Sachs Kurucusu", description: "Wall Street'in efsanevi yatırım bankası Goldman Sachs'ı tek odalı bir dükkânda kuran dahi bankacı.", wikiPage: "Marcus_Goldman" },
    { name: "Edmond Safra", coords: [46.2044, 6.1432], location: "Cenevre / Beyrut", era: "1932 - 1999", highlight: "Bankacılık Devi", description: "Orta Doğu ve Avrupa'nın en prestijli, altın rezervlerine dayalı güçlü bankası Republic New York Corp. ve Safra Bank'ın Sefarad Yahudisi kurucusu.", wikiPage: "Edmond_Safra" },
    { name: "Marcel Dassault", coords: [48.8566, 2.3522], location: "Paris, Fransa", era: "1892 - 1986", highlight: "Havacılık Endüstrisi Lideri", description: "Fransa'nın uçak sanayisinin kurucusu (Mirage jetlerinin yaratıcısı) ve Dassault Grubu'nun patronu efsanevi sanayici.", wikiPage: "Marcel_Dassault" },
    { name: "André Citroën", coords: [48.8566, 2.3522], location: "Paris, Fransa", era: "1878 - 1935", highlight: "Otomotiv Öncüsü", description: "Dünyaca ünlü Citroën otomotiv markasının kurucusu ve Avrupa'da kitlesel araba üretiminin babası.", wikiPage: "André_Citroën" },
    { name: "Helena Rubinstein", coords: [40.7128, -74.0060], location: "New York / Polonya", era: "1872 - 1965", highlight: "Kozmetik İmparatoriçesi", description: "Kozmetik devi Helena Rubinstein Inc.'in kurucusu ve tarihteki ilk kadın milyonerlerden biri.", wikiPage: "Helena_Rubinstein" },
    { name: "Samuel Bronfman", coords: [45.5017, -73.5673], location: "Montreal, Kanada", era: "1889 - 1971", highlight: "Seagram Şirketler Grubu", description: "Küresel içecek ve eğlence imparatorluğu Seagram markasının kurucusu milyarder sanayici.", wikiPage: "Samuel_Bronfman" },
    // Modern Figures
    { name: "Mark Zuckerberg", coords: [37.4419, -122.1430], location: "Palo Alto, ABD", era: "1984 - Günümüz", highlight: "Teknoloji Lideri (Meta)", description: "Facebook'un kurucu ortağı ve Meta Platforms CEO'su. Sosyal medyanın gelişiminde ve küresel iletişimde devrim yaratan en etkili teknoloji milyarderlerinden biri.", wikiPage: "Mark_Zuckerberg" },
    { name: "Michael Bloomberg", coords: [40.7128, -74.0060], location: "New York, ABD", era: "1942 - Günümüz", highlight: "Medya İmparatoru & Politikacı", description: "Bloomberg L.P. kurucusu, milyarder iş insanı ve 12 yıl boyunca New York Belediye Başkanlığı yapmış önemli bir medya ve ekonomi figürü.", wikiPage: "Michael_Bloomberg" },
    { name: "Larry Ellison", coords: [37.5255, -122.2536], location: "Silikon Vadisi / Hawaii", era: "1944 - Günümüz", highlight: "Yazılım Devi (Oracle)", description: "Oracle'ın kurucusu ve dünyanın en zengin insanlarından biri. Kurumsal veritabanı yazılımlarının gelişmesinde öncü oldu.", wikiPage: "Larry_Ellison" },
    { name: "Janet Yellen", coords: [38.8951, -77.0364], location: "Washington D.C., ABD", era: "1946 - Günümüz", highlight: "Ekonomi Yöneticisi", description: "Mevcut ABD Hazine Bakanı ve Amerikan Merkez Bankası'nın (FED) eski başkanı. Küresel ekonominin en güçlü kadınlarından biridir.", wikiPage: "Janet_Yellen" },
    { name: "George Soros", coords: [40.7829, -73.9654], location: "New York / Londra", era: "1930 - Günümüz", highlight: "Yatırımcı & Hayırsever", description: "Küresel finans piyasalarında bıraktığı tarihi etki ve Open Society Foundations aracılığıyla yaptığı milyarlarca dolarlık bağışlarla tanınan milyarder fon yöneticisi.", wikiPage: "George_Soros" },
    { name: "Volodimir Zelenski", coords: [50.4501, 30.5234], location: "Kiev, Ukrayna", era: "1978 - Günümüz", highlight: "Ukrayna Devlet Başkanı", description: "Komediden siyasete atılan, Rusya-Ukrayna Savaşı sırasında gösterdiği liderlikle küresel çapta büyük bir tanınırlık ve siyasi güce kavuşan Ukrayna lideri.", wikiPage: "Volodymyr_Zelenskyy" },
    { name: "Sam Altman", coords: [37.7749, -122.4194], location: "San Francisco, ABD", era: "1985 - Günümüz", highlight: "Yapay Zeka Öncüsü", description: "OpenAI CEO'su olarak ChatGPT'nin geliştirilmesine ve küresel yapay zeka devrimine liderlik eden girişimcidir.", wikiPage: "Sam_Altman" },
    { name: "Binyamin Netanyahu", coords: [31.7683, 35.2137], location: "Kudüs, İsrail", era: "1949 - Günümüz", highlight: "İsrail Başbakanı", description: "İsrail tarihindeki en uzun süre görev yapan başbakandır. İsrail ve Ortadoğu siyasetinin güncel seyrinde belirleyici bir figürdür.", wikiPage: "Benjamin_Netanyahu" },
    // Wealthiest and Top Influential Business Figures
    { name: "Larry Page", coords: [37.3861, -122.0839], location: "Mountain View, ABD", era: "1973 - Günümüz", highlight: "Google Kurucu Ortağı", description: "Alphabet Inc.'in kurucu ortağı. Dünyanın en zengin teknoloji liderlerinden biri.", wikiPage: "Larry_Page" },
    { name: "Sergey Brin", coords: [37.3681, -122.0975], location: "Los Altos, ABD", era: "1973 - Günümüz", highlight: "Google Kurucu Ortağı", description: "Google'ın diğer kurucu ortağı ve dünyanın en saygın bilgisayar bilimcilerinden biri.", wikiPage: "Sergey_Brin" },
    { name: "Steve Ballmer", coords: [47.6253, -122.2393], location: "Hunts Point, ABD", era: "1956 - Günümüz", highlight: "Eski Microsoft CEO'su", description: "Microsoft'un eski CEO'su ve Los Angeles Clippers takımının sahibi.", wikiPage: "Steve_Ballmer" },
    { name: "Michael Dell", coords: [30.2672, -97.7431], location: "Austin, ABD", era: "1965 - Günümüz", highlight: "Dell Technologies Kurucusu", description: "Dünyanın en önde gelen kişisel bilgisayar ve teknoloji altyapısı şirketlerinden Dell'in kurucusu.", wikiPage: "Michael_Dell" },
    { name: "Stephen Schwarzman", coords: [40.7128, -74.0060], location: "New York, ABD", era: "1947 - Günümüz", highlight: "Blackstone Group CEO", description: "Dünyanın en büyük alternatif yatırım firması Blackstone'un kurucu ortağı.", wikiPage: "Stephen_A._Schwarzman" },
    { name: "Miriam Adelson", coords: [36.1699, -115.1398], location: "Las Vegas / İsrail", era: "1945 - Günümüz", highlight: "Las Vegas Sands / Hayırsever", description: "Eşi Sheldon Adelson'dan miras kalan Las Vegas Sands imparatorluğunun başındaki isim ve büyük bir hayırsever.", wikiPage: "Miriam_Adelson" },
    { name: "Carl Icahn", coords: [40.7128, -74.0060], location: "New York, ABD", era: "1936 - Günümüz", highlight: "Icahn Enterprises", description: "Wall Street'in en ünlü milyarder aktivist yatırımcılarından ve kurumsal akıncılarından biri.", wikiPage: "Carl_Icahn" },
    { name: "Len Blavatnik", coords: [51.5074, -0.1278], location: "Londra, İngiltere", era: "1957 - Günümüz", highlight: "Access Industries", description: "Eğlence, müzik ve enerji sektörlerinde yatırımları olan İngiliz-Amerikan kökenli milyarder.", wikiPage: "Len_Blavatnik" },
    { name: "David Tepper", coords: [25.7617, -80.1918], location: "Miami, ABD", era: "1957 - Günümüz", highlight: "Appaloosa Management", description: "Carolina Panthers takımının sahibi ve tarihin en başarılı serbest fon (hedge fund) yöneticilerinden biri.", wikiPage: "David_Tepper" },
    { name: "Steve Cohen", coords: [41.0265, -73.6285], location: "Greenwich, ABD", era: "1956 - Günümüz", highlight: "Point72 / NY Mets", description: "Point72 Asset Management'ın kurucusu ve New York Mets beyzbol takımının sahibi.", wikiPage: "Steve_Cohen_(businessman)" },
    { name: "Roman Abramovich", coords: [55.7558, 37.6173], location: "Moskova / Tel Aviv", era: "1966 - Günümüz", highlight: "Yatırımcı / Eski Chelsea Sahibi", description: "Tanınmış bir Rus-İsrailli milyarder oligark, Chelsea FC'nin eski sahibi.", wikiPage: "Roman_Abramovich" },
    { name: "Dustin Moskovitz", coords: [37.7749, -122.4194], location: "San Francisco, ABD", era: "1984 - Günümüz", highlight: "Asana / Facebook Kurucu Ort.", description: "Facebook'un kurucu ortaklarından ve iş yönetimi yazılımı Asana'nın kurucusu.", wikiPage: "Dustin_Moskovitz" },
    { name: "Eduardo Saverin", coords: [1.3521, 103.8198], location: "Singapur", era: "1982 - Günümüz", highlight: "Facebook Kurucu Ort.", description: "Facebook'un Brezilya doğumlu kurucu ortağı. Şu an Singapur'da girişim sermayesi grubunu yönetiyor.", wikiPage: "Eduardo_Saverin" },
    { name: "Jan Koum", coords: [37.3541, -121.9552], location: "Santa Clara, ABD", era: "1976 - Günümüz", highlight: "WhatsApp Kurucu Ort.", description: "Ukrayna doğumlu milyarder girişimci. Meta'ya satılan dünyaca ünlü mesajlaşma uygulaması WhatsApp'ın eş kurucusu.", wikiPage: "Jan_Koum" },
    { name: "Marc Benioff", coords: [37.7749, -122.4194], location: "San Francisco, ABD", era: "1964 - Günümüz", highlight: "Salesforce Kurucusu", description: "Bulut bilişim devi Salesforce'un vizyoner kurucusu ve Time dergisinin sahibi.", wikiPage: "Marc_Benioff" },
    { name: "Brian Chesky", coords: [37.7749, -122.4194], location: "San Francisco, ABD", era: "1981 - Günümüz", highlight: "Airbnb CEO / Kurucu Ort.", description: "Küresel konaklama endüstrisini baştan şekillendiren platform olan Airbnb'nin kurucu ortağı ve CEO'su.", wikiPage: "Brian_Chesky" },
    { name: "Daniel Gilbert", coords: [42.3314, -83.0458], location: "Detroit, ABD", era: "1962 - Günümüz", highlight: "Rocket Mortgage / Kavalierler", description: "Quicken Loans kurucusu ve NBA takımı Cleveland Cavaliers'ın sahibi.", wikiPage: "Dan_Gilbert" },
    { name: "Mickey Arison", coords: [25.7617, -80.1918], location: "Miami, ABD", era: "1949 - Günümüz", highlight: "Carnival Corp / Miami Heat", description: "Carnival Cruises'ın yönetim kurulu başkanı ve NBA takımı Miami Heat'in sahibi.", wikiPage: "Mickey_Arison" },
    { name: "Ralph Lauren", coords: [40.7128, -74.0060], location: "New York, ABD", era: "1939 - Günümüz", highlight: "Ralph Lauren Fashion", description: "Küresel moda ve yaşam tarzı markası Ralph Lauren Corporation'ın kurucusu ikonik tasarımcı.", wikiPage: "Ralph_Lauren" },
    { name: "Barry Diller", coords: [34.0522, -118.2437], location: "Los Angeles / New York", era: "1942 - Günümüz", highlight: "IAC / Expedia Lideri", description: "Medya ve internet devi. IAC şirketinin başkanı. Hollywood'un da efsanevi eski yöneticilerinden biri.", wikiPage: "Barry_Diller" },
    { name: "David Geffen", coords: [34.0736, -118.4004], location: "Beverly Hills, ABD", era: "1943 - Günümüz", highlight: "Geffen Records / DreamWorks", description: "Medya ve müzik dünyasının efsanevi figürü, DreamWorks ve Geffen Records kurucusu müzik patronu.", wikiPage: "David_Geffen" },
    { name: "Les Wexner", coords: [39.9612, -82.9988], location: "Columbus, ABD", era: "1937 - Günümüz", highlight: "L Brands (Victoria's Secret)", description: "Victoria's Secret, Bath & Body Works gibi dev perakende markalarının yaratıcısı milyarder iş insanı.", wikiPage: "Les_Wexner" },
    { name: "Arthur Blank", coords: [33.7490, -84.3880], location: "Atlanta, ABD", era: "1942 - Günümüz", highlight: "Home Depot / Atlanta Falcons", description: "Home Depot'un eş kurucusu; ayrıca Atlanta Falcons (NFL) ve Atlanta United (MLS) takımlarının sahibi.", wikiPage: "Arthur_Blank" },
    { name: "Henry Kravis", coords: [40.7128, -74.0060], location: "New York, ABD", era: "1944 - Günümüz", highlight: "KKR Kurucu Ort.", description: "Dünyanın en büyük özel sermaye(private equity) fonlarından biri olan KKR'nin efsanevi kurucusu.", wikiPage: "Henry_Kravis" },
    { name: "Leon Black", coords: [40.7128, -74.0060], location: "New York, ABD", era: "1951 - Günümüz", highlight: "Apollo Global Management", description: "Alternatif yatırım ürünlerinde lider kuruluşlardan Apollo'nun kurucularından.", wikiPage: "Leon_Black" },
    { name: "Paul Singer", coords: [26.7153, -80.0534], location: "West Palm Beach, ABD", era: "1944 - Günümüz", highlight: "Elliott Management", description: "Tarihteki en ünlü ve etkili hedge fund (serbest fon) kurucularından ve yöneticilerinden biri.", wikiPage: "Paul_Singer_(businessman)" },
    { name: "Bill Ackman", coords: [40.7128, -74.0060], location: "New York, ABD", era: "1966 - Günümüz", highlight: "Pershing Square", description: "Aktivist yatırımcı yaklaşımıyla bilinen etkili ve tanınan milyarder serbest fon yöneticisi.", wikiPage: "Bill_Ackman" },
    { name: "Howard Marks", coords: [34.0522, -118.2437], location: "Los Angeles, ABD", era: "1946 - Günümüz", highlight: "Oaktree Capital", description: "Ekonomik piyasalar hakkındaki saygıdeğer 'notları' ve büyük yatırım hamleleriyle tanınan efsanevi yatırımcı.", wikiPage: "Howard_Marks_(investor)" },
    { name: "Israel Englander", coords: [40.7128, -74.0060], location: "New York, ABD", era: "1948 - Günümüz", highlight: "Millennium Management", description: "Devasa kantitatif işlem kapasitesiyle Millennium fonlarını trilyonlarca dolarlık değere çıkaran yatırımcı.", wikiPage: "Israel_Englander" },
    { name: "Mark Cuban", coords: [32.7767, -96.7970], location: "Dallas, ABD", era: "1958 - Günümüz", highlight: "Broadcoast.com / D. Mavericks", description: "Shark Tank dizisinin yıldızı, teknoloji girişimcisi ve eski Dallas Mavericks sahibi.", wikiPage: "Mark_Cuban" },
    { name: "Yuri Milner", coords: [37.3681, -122.0975], location: "Los Altos, ABD", era: "1961 - Günümüz", highlight: "DST Global", description: "Teknoloji devlerine (Facebook, Twitter vb.) ilk yıllarında dev yatırımlar yaparak adını duyuran Rus-Amerikan yatırımcı.", wikiPage: "Yuri_Milner" },
    { name: "Mikhail Fridman", coords: [51.5074, -0.1278], location: "Londra / Moskova", era: "1964 - Günümüz", highlight: "Alfa Group", description: "Sovyetler çöktükten sonra Rusya'nın ekonomik sisteminde çok büyük etkiye sahip olmuş oligark milyarder.", wikiPage: "Mikhail_Fridman" },
    { name: "Eyal Ofer", coords: [43.7384, 7.4246], location: "Monaco", era: "1950 - Günümüz", highlight: "Ofer Global", description: "Dünyanın en zengin küresel gemicilik ve deniz taşımacılığı patronlarından, İsrailli milyarder iş insanı.", wikiPage: "Eyal_Ofer" },
    { name: "Idan Ofer", coords: [51.5074, -0.1278], location: "Londra, İngiltere", era: "1955 - Günümüz", highlight: "Quantum Pacific Group", description: "İsrailli gemi patronu ve otomotiv (özellikle Çin otomotivine yatırım ile) yatırımcısı.", wikiPage: "Idan_Ofer" },
    { name: "Patrick Drahi", coords: [46.2044, 6.1432], location: "Cenevre / Paris", era: "1963 - Günümüz", highlight: "Altice", description: "Fransa, İsrail ve ABD'de çok sayıda şirketi kontrol eden Altice iletişim grubunun ve Sotheby's'in sahibi kurumsal girişimci.", wikiPage: "Patrick_Drahi" },
    { name: "Alain Wertheimer", coords: [48.8566, 2.3522], location: "Paris / New York", era: "1948 - Günümüz", highlight: "Chanel Eş Sahibi", description: "Ünlü efsanevi Chanel moda evinin ve parfüm şirketinin sahibi.", wikiPage: "Alain_Wertheimer" },
    { name: "Gérard Wertheimer", coords: [46.2044, 6.1432], location: "Cenevre, İsviçre", era: "1951 - Günümüz", highlight: "Chanel Eş Sahibi", description: "Chanel moda devinin ve dev saat markalarının eş sahibi.", wikiPage: "Gérard_Wertheimer" },
    { name: "Ronald Perelman", coords: [40.7128, -74.0060], location: "New York, ABD", era: "1943 - Günümüz", highlight: "Revlon Sahibi", description: "1980'lerden bu yana aktif olan kurumsal satın almalar uzmanı; Revlon markasının sahibi milyarder.", wikiPage: "Ronald_Perelman" },
    { name: "Leonard Lauder", coords: [40.7128, -74.0060], location: "New York, ABD", era: "1933 - Günümüz", highlight: "Estée Lauder", description: "Kozmetik devi Estée Lauder'in onursal başkanı ve devasa ölçülerde sanat bağışçısı milyarder.", wikiPage: "Leonard_Lauder" },
    { name: "Stephen Ross", coords: [40.7128, -74.0060], location: "New York, ABD", era: "1940 - Günümüz", highlight: "Related Companies", description: "Hudson Yards emlak kompleksi inşaatçısı ve Amerikan futbol takımı Miami Dolphins sahibi.", wikiPage: "Stephen_M._Ross" },
    { name: "Donald Newhouse", coords: [40.7128, -74.0060], location: "New York, ABD", era: "1929 - Günümüz", highlight: "Advance Publications", description: "Conde Nast (Vogue, Vanity Fair vb) gibi markaları elinde bulunduran dev dergi/gazete patronu.", wikiPage: "Donald_Newhouse" },
    { name: "Sheryl Sandberg", coords: [37.4530, -122.1817], location: "Atherton, ABD", era: "1969 - Günümüz", highlight: "Eski Meta (Facebook) COO", description: "Dünyanın en etkili kadın teknoloji yöneticilerinden biri. Facebook'u büyük bir kârlılık şirketine dönüştürdü.", wikiPage: "Sheryl_Sandberg" },
    { name: "Igor Makarov", coords: [34.0522, -118.2437], location: "Kıbrıs / ABD / Rusya", era: "1962 - Günümüz", highlight: "ARETI International", description: "Küresel enerji sektöründe servet elde etmiş ve Uluslararası Bisiklet Birliğine sponsorluklar sağlamış enerji patronu.", wikiPage: "Igor_Makarov" },
    { name: "Viatcheslav Kantor", coords: [51.5074, -0.1278], location: "Londra, İngiltere", era: "1953 - Günümüz", highlight: "Acron Group / Avrupa Yahudi", description: "Gübre devi Acron Group'un eski patronu ve uzun dönem Avrupa Yahudi Kongresi başkanlığı yapmış sanayici.", wikiPage: "Viatcheslav_Kantor" }
];

const turkeyData = [
    { name: "Vitali Hakko", coords: [41.0082, 28.9784], location: "İstanbul", era: "1913 - 2007", highlight: "Vakko Kurucusu", description: "Türkiye'nin lüks moda devlerinden Vakko'nun kurucusu ünlü iş insanı.", wikiPage: "Vitali_Hakko" },
    { name: "İshak Alaton", coords: [41.0582, 29.0084], location: "İstanbul", era: "1927 - 2016", highlight: "Alarko Holding Eş Kurucusu", description: "Türkiye'nin en büyük enerji, altyapı ve sanayi gruplarından Alarko'nun kurucularından.", wikiPage: "Ishak_Alaton" },
    { name: "Üzeyir Garih", coords: [41.0482, 28.9884], location: "İstanbul", era: "1929 - 2001", highlight: "Alarko Holding Eş Kurucusu", description: "Alarko Holding'in İshak Alaton ile birlikte kurucusu ve yöneticisi akademisyen, iş adamı.", wikiPage: "Üzeyir_Garih" },
    { name: "Sabetay Sevi", coords: [38.4237, 27.1428], location: "İzmir", era: "1626 - 1676", highlight: "Sabetayizm Hareketi", description: "17. yüzyılda kendini Mesih ilan eden ve binlerce takipçi toplayan, din ve kültür tarihinde sarsıcı bir figür.", wikiPage: "Sabbatai_Zevi" },
    { name: "Dona Gracia Nasi", coords: [41.0082, 28.9784], location: "İstanbul / Avrupa", era: "1510 - 1569", highlight: "La Señora / Sefarad Lideri", description: "Avrupa'nın en zengin kadınlarından biri. İspanya'dan kaçan Sefaradları korumuş, Osmanlı'da büyük siyasi güç olmuştur.", wikiPage: "Gracia_Mendes_Nasi" },
    { name: "Moiz Kohen (Munis Tekinalp)", coords: [41.0112, 28.9814], location: "İstanbul / Selanik", era: "1883 - 1961", highlight: "Türk Milliyetçisi Düşünür", description: "Özellikle Cumhuriyet'in ilk yıllarında Türk milliyetçiliğinin ideolojik gelişimine yazılarıyla büyük etkilerde bulunmuş yazar.", wikiPage: "Munis_Tekinalp" },
    { name: "Hahambaşılık & Neve Şalom", coords: [41.0261, 28.9734], location: "Karaköy, İstanbul", era: "1951 - Günümüz", highlight: "Türkiye Yahudileri Dini Merkezi", description: "Türkiye'deki en büyük, sembolik ve en bilinen sinagog; aynı zamanda cemaatin idari merkezi. Toplumun buluşma noktasıdır.", wikiPage: "Neve_Shalom_Synagogue" },
    { name: "Ahrida Sinagogu", coords: [41.0335, 28.9482], location: "Balat, İstanbul", era: "15. Yüzyıl", highlight: "En Eski Sefarad Sinagogu", description: "Tarihi Balat semtinde yüzyıllardır ibadete açık olan, tekne şeklindeki okuma kürsüsüyle efsaneleşmiş mimari alan.", wikiPage: "Ahrida_Synagogue" },
    { name: "Can Bonomo", coords: [38.4237, 27.1428], location: "İzmir / İstanbul", era: "1987 - Günümüz", highlight: "Müzisyen & Sanatçı", description: "Türkiye'yi Eurovision'da temsil etmiş ve modern müzik dünyasında çok popüler olmuş Türk-Yahudi şarkıcı.", wikiPage: "Can_Bonomo" },
    { name: "Bensiyon Pinto", coords: [41.0082, 28.9784], location: "İstanbul", era: "1936 - 2022", highlight: "Türk Yahudi Toplumu Lideri", description: "Türkiye Hahambaşılığı Müşavirliği ve Türk Yahudi Toplumu'nun (eski) Onursal Başkanı.", wikiPage: "Bensiyon_Pinto" },
    { name: "Mario Levi", coords: [41.0082, 28.9784], location: "İstanbul", era: "1957 - 2024", highlight: "Yazar & Edebiyatçı", description: "'İstanbul Bir Masaldı' eseri başta olmak üzere, İstanbul'daki azınlık kültürünü harika dille aktaran ölümsüz yazar.", wikiPage: "Mario_Levi" },
    { name: "Jak Kamhi", coords: [41.0082, 28.9784], location: "İstanbul", era: "1925 - 2020", highlight: "Profilo Holding Kurucusu", description: "Türkiye sanayisinin gelişimine büyük katkıları olan duayen iş insanı ve Profilo Holding'in kurucusu.", wikiPage: "Jak_Kamhi" },
    { name: "Dario Moreno", coords: [38.4237, 27.1428], location: "Aydın / İzmir / Paris", era: "1921 - 1968", highlight: "Müzisyen & Oyuncu", description: "Uluslararası üne kavuşan yetenekli müzisyen ve aktör. 'Deniz ve Mehtap' gibi şarkılarıyla Türkiye'de kalıcı bir miras bıraktı.", wikiPage: "Dario_Moreno" },
    { name: "Hayim Nahum Efendi", coords: [38.4237, 27.1428], location: "Manisa / İstanbul / Kahire", era: "1872 - 1960", highlight: "Eski Hahambaşı / Lozan Delegesi", description: "Osmanlı Hahambaşısı ve Cumhuriyetin kuruluş aşamasında Lozan Barış Konferansında Türk delegasyonu üyesi.", wikiPage: "Haim_Nahoum" },
    { name: "Yasef Nasi", coords: [41.0082, 28.9784], location: "İstanbul", era: "1524 - 1579", highlight: "Osmanlı Diplomatı & Naksos Dükü", description: "Kanuni ve II. Selim döneminde Osmanlı dış politikasını Avrupalı devletlere karşı yöneten, büyük güç sahibi tüccar.", wikiPage: "Joseph_Nasi" },
    { name: "Sami Kohen", coords: [41.0261, 28.9734], location: "İstanbul", era: "1928 - 2021", highlight: "Duayen Gazeteci", description: "Türkiye'de dış haberler ve uluslararası diplomasi haberciliğini başlatan ünlü Milliyet yazarı.", wikiPage: "Sami_Kohen" },
    { name: "Avram Galanti Bodrumlu", coords: [37.0345, 27.4261], location: "Bodrum / İstanbul", era: "1873 - 1961", highlight: "Akademisyen & Siyasetçi", description: "Tarihçi, dilbilimci ve Atatürk'ün yakın çalışma arkadaşlarından olan milletvekili.", wikiPage: "Avram_Galanti" },
    { name: "Moris Şinasi", coords: [38.6191, 27.4289], location: "Manisa / ABD", era: "1855 - 1928", highlight: "Tütün Kralı / Hayırsever", description: "Manisa'dan ABD'ye göç edip uluslararası tütün imparatorluğu kuran ve memleketine kendi adıyla çocuk hastanesi inşa ettiren iş insanı.", wikiPage: "Morris_Schinasi" },
    { name: "Edirne Büyük Sinagogu", coords: [41.6771, 26.5557], location: "Edirne", era: "1907 - Günümüz", highlight: "Balkanların En Büyük Sinagogu", description: "Avrupa'nın üçüncü, Balkanların en büyük sinagogudur. Restore edilerek hem inanç turizmine hem kültürel hayata kazandırılmıştır.", wikiPage: "Grand_Synagogue_of_Edirne" },
    { name: "Eli Acıman", coords: [41.0082, 28.9784], location: "İstanbul", era: "1919 - 2011", highlight: "Türkiye Reklamcılığının Kurucusu", description: "Türkiye'nin en ünlü reklam ajansı Manajans'ın kurucusu ve Türk reklam, PR ve tanıtım sektörünün efsanevi hocası.", wikiPage: "Eli_Aciman" },
    { name: "Beki L. Bahar", coords: [41.0082, 28.9784], location: "İstanbul", era: "1927 - 2011", highlight: "Yazar & Şair", description: "Türkiye'de İbranice, Ladino ve Türkçe dillerinde eser veren ünlü araştırmacı yazar ve şair.", wikiPage: "Beki_L._Bahar" }
];

const analysisData = [
    {
        country: "Küresel (Dünya Geneli)",
        coords: [0, 0], // Center of map usually
        populationRatio: "%0.2",
        wealthRatio: "Tahmini %20+",
        sectors: ["Teknoloji (Big Tech)", "Finans & Bankacılık", "Medya ve Eğlence", "Eczacılık / Medikal"],
        description: "Dünya nüfusunun sadece yaklaşık yüzde 0.2'si (binde iki) Yahudi olmasına rağmen, küresel servetin, finans ağının, medya devlerinin ve teknoloji endüstrisinin (örn. Google, Facebook, Oracle, Dell, OpenAI) çok ciddi bir oranı Yahudi asıllı girişimciler veya özel sermaye fonları (örn. Blackstone, Elliott) tarafından yönetilmektedir."
    },
    {
        country: "ABD (Amerika Birleşik Devletleri)",
        coords: [37.0902, -95.7129],
        populationRatio: "%2.4",
        wealthRatio: "Tahmini %30-35 (En zengin 400 listesinin üçte biri)",
        sectors: ["Silikon Vadisi (Tech)", "Wall Street (Finans)", "Hollywood (Sinema/TV)", "Girişim Sermayesi (VC)"],
        description: "ABD nüfusunun yaklaşık %2.4'ünü oluşturmalarına karşın Forbes 400 listesindeki en büyük milyarderlerin oransal olarak yaklaşık üçte birini (#100+ milyarder) oluştururlar. Wall Street finans ağı, Hollywood medya endüstrisi ve Silikon Vadisi teknolojisinde en yoğun etkiye sahip gruptur."
    },
    {
        country: "Birleşik Krallık",
        coords: [55.3781, -3.4360],
        populationRatio: "%0.4",
        wealthRatio: "Tahmini %10-15 (İngiltere'nin en zenginleri listelerinde)",
        sectors: ["Finans (City of London)", "Perakende", "Gayrimenkul", "Medya"],
        description: "Birleşik Krallık nüfusunun oldukça küçük bir kısmını oluşturmalarına rağmen, ülkenin finansal merkezi Londra'daki Rothschild ailesinin tarihsel mirasından günümüzün büyük serbest fonlarına, perakende devleri (Marks & Spencer vb.) ve medya organlarına kadar çok yoğun etkilere sahiplerdir."
    },
    {
        country: "İsrail",
        coords: [31.0461, 34.8516],
        populationRatio: "%73.5",
        wealthRatio: "Milli Servet",
        sectors: ["Savunma Sanayii", "Siber Güvenlik", "Biyoteknoloji", "Tarım Teknolojileri"],
        description: "Nüfusunun büyük çoğunluğu Yahudi olan tek devlettir. Çok dar bir coğrafyada yer almasına rağmen 'Start-Up Nation' olarak bilinir; kişi başına düşen inovasyon, teknoloji borsalarındaki (NASDAQ) şirket sayısı ve savunma sanayii bütçelerinde dünya çapında bir dev gibi işlev görür."
    },
    {
        country: "Rusya ve Doğu Avrupa Oligarkları",
        coords: [61.5240, 105.3188],
        populationRatio: "%0.1",
        wealthRatio: "Doğu Bloku özelleştirmelerinde ciddi oranda pay",
        sectors: ["Enerji (Petrol & Doğalgaz)", "Madencilik", "Bankacılık", "Telekomünikasyon"],
        description: "Sovyetler Birliği'nin dağılması sonrası 90'larda yaşanan özelleştirme fırtınasında oluşan ilk Rus milyarderlerin (oligarkların) önemli bir yüzdesi Yahudi asıllıydı (örneğin Abramovich, Fridman, vb.). Günümüzde ülkenin enerji ve madencilik sektörlerinde oldukça etkin durumdalar."
    },
    {
        country: "Fransa",
        coords: [46.2276, 2.2137],
        populationRatio: "%0.7",
        wealthRatio: "Tahmini %15",
        sectors: ["Lüks Tüketim & Moda", "Telekomünikasyon", "Medya", "Bankacılık"],
        description: "Avrupa'nın en büyük Yahudi nüfusuna sahip ülkesi olan Fransa'da, özellikle Chanel gibi köklü moda devleri (Wertheimer ailesi), Altice gibi telekomünikasyon ağları (Drahi) ve medya-finans sektörlerinin en stratejik noktalarında önemli oranlarda aktif pay sahibidirler."
    },
    {
        country: "Kanada",
        coords: [56.1304, -106.3468],
        populationRatio: "%1.0",
        wealthRatio: "Tahmini %15-20",
        sectors: ["Gayrimenkul", "Medya", "Perakende", "Madencilik"],
        description: "Kanada nüfusunun %1'ini oluşturmalarına rağmen ülkenin en zenginler listesinde (örn. Bronfman ailesi, Reisman, Schwartz) oransal olarak çok yüksek temsil edilirler. Gayrimenkul, medya ve perakende (Indigo, Loblaws) sektörlerinde baskın oyunculardır."
    },
    {
        country: "Avustralya",
        coords: [-25.2744, 133.7751],
        populationRatio: "%0.5",
        wealthRatio: "Tahmini %10-12",
        sectors: ["Gayrimenkul", "Perakende", "Finans", "Medya"],
        description: "Avustralya'da Yahudi nüfusu 120.000 civarında olmasına rağmen ülkenin en zengin ailelerinin (Lowy ailesi - Westfield, Pratt ailesi - Visy) önemli bir kısmını oluştururlar. Gayrimenkul ve perakende devlerinin kuruculuğu dikkat çekicidir."
    },
    {
        country: "Güney Afrika",
        coords: [-30.5595, 22.9375],
        populationRatio: "%0.08",
        wealthRatio: "Tahmini %15-20",
        sectors: ["Madencilik & Elmas", "Finans", "Perakende", "Sigorta"],
        description: "Güney Afrika'daki Yahudi cemaati nüfusun binde birinden az olmasına rağmen, De Beers elmas imparatorluğu (Oppenheimer ailesi), sigorta devleri ve perakende zincirlerinin kurucuları arasında en yüksek orana sahip azınlık gruplarından biridir."
    },
    {
        country: "İsviçre",
        coords: [46.8182, 8.2275],
        populationRatio: "%0.2",
        wealthRatio: "Tahmini %10-15",
        sectors: ["Özel Bankacılık", "Emtia Ticareti", "İlaç", "Lüks Saat"],
        description: "İsviçre'nin dünyaca ünlü özel bankacılık sektöründe ve emtia ticaretinde Yahudi kökenli aileler ve firmalar tarihsel olarak ciddi bir ağırlığa sahiptir. Glencore (Glasenberg), Swatch grubundaki belirli markalar ve ilaç sektöründe etkindirler."
    },
    {
        country: "Ukrayna",
        coords: [48.3794, 31.1656],
        populationRatio: "%0.2",
        wealthRatio: "Tahmini %20-30 (Oligark sınıfı)",
        sectors: ["Çelik & Metal", "Medya", "Bankacılık", "Tarım"],
        description: "Bağımsızlık sonrası özelleştirme sürecinde Ukrayna'nın en büyük milyarderlerinin önemli bir bölümü (Kolomoisky, Pinchuk, Rabinovich) Yahudi asıllıdır. Çelik, medya ve bankacılık sektörlerinde en yüksek nüfus-servet oransızlığına sahip ülkelerden biridir."
    },
    {
        country: "Brezilya",
        coords: [-14.2350, -51.9253],
        populationRatio: "%0.04",
        wealthRatio: "Tahmini %8-12",
        sectors: ["Bankacılık", "Perakende", "Medya", "Gayrimenkul"],
        description: "Latin Amerika'nın en büyük ekonomisinde Yahudi nüfusu 90.000 civarındadır ancak Safra ailesi (bankacılık), Lemann ailesi (3G Capital - Burger King, AB InBev) gibi isimler ülkenin ve dünyanın en zenginleri arasındadır."
    },
    {
        country: "Arjantin",
        coords: [-38.4161, -63.6167],
        populationRatio: "%0.4",
        wealthRatio: "Tahmini %10-15",
        sectors: ["Tarım & Gıda", "Finans", "Gayrimenkul", "Medya"],
        description: "Latin Amerika'nın Yahudi nüfusu en yüksek ülkesi olan Arjantin'de topluluk özellikle Buenos Aires'in finans, tarım ticareti ve medya sektörlerinde oransal olarak çok yüksek bir ekonomik etkiye sahiptir."
    },
    {
        country: "Macaristan",
        coords: [47.1625, 19.5033],
        populationRatio: "%0.5",
        wealthRatio: "Tahmini %15-20",
        sectors: ["Finans", "Gayrimenkul", "İlaç", "Telekomünikasyon"],
        description: "Tarihi olarak Budapeşte'nin ticari hayatının bel kemiğini oluşturan Macar Yahudi toplumu, Holokost sonrası nüfusu ciddi azalmasına rağmen günümüzde de finans, gayrimenkul ve teknoloji sektörlerinde (OTP Bank'ın tarihi kurucu ortakları gibi) güçlü bir temsile sahiptir."
    }
];

const majorCompanies = [
    {
        sector: "Teknoloji",
        icon: "💻",
        color: "#c5a059", // copper-gold
        companies: [
            { name: "Google (Alphabet)", founder: "Larry Page & Sergey Brin", value: "$1.9T", desc: "Dünyanın en büyük arama motoru ve reklam platformu" },
            { name: "Meta (Facebook)", founder: "Mark Zuckerberg", value: "$1.4T", desc: "WhatsApp, Instagram dahil en büyük sosyal medya holdingi" },
            { name: "Oracle", founder: "Larry Ellison", value: "$380B", desc: "Kurumsal veritabanı ve bulut altyapısı devi" },
            { name: "Dell Technologies", founder: "Michael Dell", value: "$95B", desc: "Dünyanın en büyük bilgisayar üreticilerinden" },
            { name: "OpenAI", founder: "Sam Altman (CEO)", value: "$150B+", desc: "ChatGPT ve yapay zeka devriminin öncüsü" },
            { name: "Broadcom", founder: "Henry Samueli", value: "$800B", desc: "Yarı iletken ve altyapı yazılımları devi" },
            { name: "Qualcomm", founder: "Andrew Viterbi & Irwin Jacobs", value: "$190B", desc: "Mobil çip ve telekomünikasyon teknoloji lideri" }
        ]
    },
    {
        sector: "Finans & Yatırım",
        icon: "🏦",
        color: "#d4af37", // primary gold
        companies: [
            { name: "Goldman Sachs", founder: "Marcus Goldman", value: "$160B", desc: "Wall Street'in en prestijli yatırım bankası" },
            { name: "Blackstone Group", founder: "Stephen Schwarzman", value: "$950B AUM", desc: "Dünyanın en büyük alternatif yatırım fonu" },
            { name: "BlackRock", founder: "Larry Fink", value: "$10T+ AUM", desc: "Gezegendeki en büyük varlık yönetim şirketi" },
            { name: "Citadel", founder: "Ken Griffin*", value: "$60B AUM", desc: "Dünyanın en kârlı hedge fonlarından (*Yahudi değil, sektör bağlamı)" },
            { name: "Elliott Management", founder: "Paul Singer", value: "$65B AUM", desc: "Aktivist yatırım stratejisiyle ünlü hedge fon" },
            { name: "Two Sigma", founder: "David Siegel & John Overdeck", value: "$60B AUM", desc: "AI-destekli kantitatif yatırım fonu" },
            { name: "Soros Fund", founder: "George Soros", value: "$25B AUM", desc: "Bank of England'ı yenen efsanevi fon yöneticisi" }
        ]
    },
    {
        sector: "Medya & Eğlence",
        icon: "🎬",
        color: "#a89f91", // warm grey/silver
        companies: [
            { name: "Warner Bros. Discovery", founder: "Warner kardeşler", value: "$25B", desc: "Hollywood'un en köklü stüdyolarından, HBO dahil" },
            { name: "Comcast (NBCUniversal)", founder: "Ralph Roberts", value: "$160B", desc: "NBC, Universal, DreamWorks dahil medya imparatorluğu" },
            { name: "Paramount Global", founder: "Sumner Redstone", value: "$8B", desc: "CBS, MTV, Paramount Pictures dahil" },
            { name: "Bloomberg LP", founder: "Michael Bloomberg", value: "$100B+", desc: "Kürsel finansal veri ve medya devi" },
            { name: "The New York Times", founder: "Adolph Ochs", value: "$8B", desc: "Amerika'nın en prestijli gazetesi" },
            { name: "DreamWorks", founder: "Steven Spielberg", value: "NBCU", desc: "NBCUniversal bünyesinde animasyon ve sinema yapım devi" }
        ]
    },
    {
        sector: "Perakende & Tüketim",
        icon: "🛍️",
        color: "#b39b5b", // muted gold
        companies: [
            { name: "Starbucks", founder: "Howard Schultz", value: "$105B", desc: "Dünyanın en büyük kahve zinciri (Schultz CEO/Yönetici)" },
            { name: "Ralph Lauren", founder: "Ralph Lauren (Lifshitz)", value: "$12B", desc: "Küresel lüks moda markası" },
            { name: "Calvin Klein (PVH)", founder: "Calvin Klein", value: "$6B", desc: "İkonik Amerikan moda markası" },
            { name: "Estée Lauder", founder: "Estée Lauder", value: "$25B", desc: "Dünyanın en büyük kozmetik şirketlerinden" },
            { name: "Costco", founder: "Jeffrey Brotman & James Sinegal", value: "$390B", desc: "ABD'nin en büyük toptan satış zinciri" },
            { name: "Marks & Spencer", founder: "Michael Marks", value: "£5B", desc: "İngiltere'nin en büyük perakende devlerinden" }
        ]
    },
    {
        sector: "Savunma & Siber Güvenlik",
        icon: "🛡️",
        color: "#8c7b60", // bronze
        companies: [
            { name: "Check Point Software", founder: "Gil Shwed", value: "$18B", desc: "İsrail merkezli siber güvenlik öncüsü" },
            { name: "Palo Alto Networks", founder: "Nir Zuk", value: "$120B", desc: "Kurumsal siber güvenliğin küresel lideri" },
            { name: "CyberArk", founder: "Udi Mokady", value: "$14B", desc: "Privileged access management pazar lideri" },
            { name: "Wix.com", founder: "Avishai Abrahami", value: "$8B", desc: "İsrail merkezli web sitesi oluşturma platformu" },
            { name: "Mobileye (Intel)", founder: "Amnon Shashua", value: "$16B", desc: "Otonom sürüş teknolojilerinin küresel lideri" },
            { name: "NSO Group", founder: "Shalev Hulio & Omri Lavie", value: "Özel", desc: "Pegasus casus yazılımıyla bilinen İsrailli istihbarat firması" }
        ]
    },
    {
        sector: "İlaç & Biyoteknoloji",
        icon: "💊",
        color: "#e5c983", // light gold
        companies: [
            { name: "Teva Pharmaceutical", founder: "İsrail merkezli", value: "$18B", desc: "Dünyanın en büyük jenerik ilaç üreticisi" },
            { name: "Moderna", founder: "Noubar Afeyan & yatırımcılar", value: "$45B", desc: "mRNA aşı teknolojisinin öncüsü (CEO Stéphane Bancel)" },
            { name: "Regeneron", founder: "Leonard Schleifer", value: "$100B", desc: "Biyoteknoloji devlerinden, COVID tedavisi geliştirdi" },
            { name: "Mylan (Viatris)", founder: "Milan Puskar", value: "$12B", desc: "Küresel jenerik ilaç şirketi (CEO: Robert Coury)" },
            { name: "Pfizer", founder: "Charles Pfizer", value: "$155B", desc: "Dünyanın en büyük ilaç şirketlerinden (kurucu Alman-Yahudi göçmen)" },
            { name: "BioNTech", founder: "Uğur Şahin & Özlem Türeci (Yatırım: Strüngmann Kardeşler/Pfizer*)", value: "$25B", desc: "mRNA aşı öncüsü (*Sektörel etkileşim bağlamında)" }
        ]
    }
];

const wealthyFigures = [
    { name: "Mayer Amschel Rothschild", title: "Rothschild Hanedanı", netWorth: "Tarihi Servet", source: "Finans & Bankacılık", desc: "19. yüzyıldan itibaren küresel para sistemlerini ve Avrupa'yı inşa eden hanedanlığın kurucusu." },
    { name: "Marcus Goldman", title: "Goldman Sachs Kurucusu", netWorth: "Tarihi Servet", source: "Yatırım Bankacılığı", desc: "Bugün 160 milyar dolar değere sahip Wall Street devi Goldman Sachs'ın temellerini attı." },
    { name: "Solomon Guggenheim", title: "Sanayici & Sanat Hamisi", netWorth: "Tarihi Servet", source: "Madencilik", desc: "Büyük çaplı madencilik faaliyetleriyle zenginleşti. Sanat dünyasını derinden şekillendirdi." },
    { name: "Edmond Safra", title: "Republic New York / Safra Bank", netWorth: "Tarihi Servet", source: "Bankacılık", desc: "Orta Doğu ve Avrupa'nın en prestijli bankalarının Sefarad Yahudisi efsanevi kurucusu." },
    { name: "Marcel Dassault", title: "Dassault Grubu (Mirage)", netWorth: "Tarihi Servet", source: "Havacılık Sanayisi", desc: "Fransa'nın küresel havacılık devinin kurucu patronu." },
    { name: "André Citroën", title: "Citroën Otomotiv", netWorth: "Tarihi Servet", source: "Otomotiv Sanayisi", desc: "Dünyaca ünlü Citroën otomobil markasının efsanevi kurucusu." },
    { name: "Helena Rubinstein", title: "Helena Rubinstein Inc.", netWorth: "Tarihi Servet", source: "Kozmetik", desc: "Moda/Bakım tarihi ve endüstrisini şekillendiren efsanevi ilk kadın milyonerlerden." },
    { name: "Levi Strauss", title: "Levi Strauss & Co.", netWorth: "Tarihi Servet", source: "Giyim & Tekstil", desc: "Efsanevi Levi's markasının kurucusu ve Batı Amerika'nın en büyük sermayedarlarındandı." },
    { name: "Paul Julius Reuter", title: "Reuters Ajansı Kurucusu", netWorth: "Tarihi Servet", source: "Medya & Haber", desc: "Küresel medya devi Reuters Haber Ajansı'nı kurarak dünya haberciliğini tekelinde tuttu." },
    { name: "Mark Zuckerberg", title: "Meta CEO'su", netWorth: "$170B+", source: "Meta (Facebook)", desc: "Sosyal medya imparatorluğunun kurucusu ve yöneticisi." },
    { name: "Larry Ellison", title: "Oracle Kurucusu", netWorth: "$140B+", source: "Oracle Corporation", desc: "Veritabanı ve yazılım devi Oracle'ın kurucu ortağı." },
    { name: "Larry Page & Sergey Brin", title: "Google Kurucuları", netWorth: "$120B+ (Her biri)", source: "Alphabet (Google)", desc: "Arama motoru ve internet teknolojileri liderleri." },
    { name: "Steve Ballmer", title: "Eski Microsoft CEO'su", netWorth: "$120B+", source: "Microsoft, LA Clippers", desc: "Microsoft'un erken dönem en önemli yöneticisi, takım sahibi." },
    { name: "Michael Bloomberg", title: "Bloomberg LP Kurucusu", netWorth: "$106B", source: "Bloomberg, Finans", desc: "Küresel finansal bilgi ve medya devi, eski NY Belediye Başkanı." },
    { name: "Michael Dell", title: "Dell Kurucusu", netWorth: "$90B+", source: "Dell Technologies", desc: "Bilgisayar teknolojileri ve kurum donanımları devinin kurucusu." },
    { name: "Stephen Schwarzman", title: "Blackstone CEO", netWorth: "$40B+", source: "Özel Sermaye (Private Equity)", desc: "Dünyanın en büyük alternatif yatırım ve özel sermaye şirketlerinden birinin kurucusu." },
    { name: "Miriam Adelson", title: "Las Vegas Sands / NBA", netWorth: "$35B+", source: "Casinolar, Dallas Mavericks", desc: "Sheldon Adelson'ın dul eşi, devasa kumarhane imparatorluğunun ve takımın varisi." },
    { name: "Len Blavatnik", title: "Access Industries", netWorth: "$30B+", source: "Warner Music, Yatırım", desc: "Müzik, medya ve petrol sektörlerinde devasa yatırımları bulunan melek yatırımcı." },
    { name: "Dustin Moskovitz", title: "Asana CEO", netWorth: "$15B+", source: "Facebook, Asana", desc: "Facebook'un kurucu ortağı ve genç teknoloji girişimcisi." },
    { name: "Jan Koum", title: "WhatsApp Kurucusu", netWorth: "$15B+", source: "WhatsApp (Meta)", desc: "Dünyanın en popüler mesajlaşma uygulamasını yaratıp Meta'ya satan milyarder göçmen." },
    { name: "Marc Benioff", title: "Salesforce CEO", netWorth: "$10B+", source: "Salesforce (Bulut Bilişim)", desc: "Kurumsal bulut yazılım devinin kurucusu ve medyada TIME dergisi sahibi." },
    { name: "Brian Chesky", title: "Airbnb CEO", netWorth: "$10B+", source: "Airbnb (Turizm/Teknoloji)", desc: "Küresel ev paylaşım ve turizm devini baştan yaratan kurucu ortak." },
    { name: "Ralph Lauren", title: "Moda İmparatoru", netWorth: "$7B+", source: "Ralph Lauren Corp", desc: "Klasikleşmiş 'Polo' markasıyla küresel Amerikan modasını tanımlayan ikon tasarımcı." },
    { name: "George Soros", title: "Hedge Fon Yöneticisi", netWorth: "$6.7B (Bağış öncesi $30B+)", source: "Soros Fund Management", desc: "Finans dünyasının efsanesi ve Açık Toplum Vakıfları kurucusu." },
    { name: "Larry Fink", title: "BlackRock CEO", netWorth: "$1B+", source: "BlackRock ($10T+ AUM)", desc: "Gezegenin en büyük varlık yönetim şirketi BlackRock'un kurucusu ve CEO'su." },
    { name: "Howard Schultz", title: "Starbucks Kurucusu", netWorth: "$5B+", source: "Starbucks", desc: "Küresel kahve kültürünü baştan yaratan Starbucks'ın efsanevi CEO'su." },
    { name: "Carl Icahn", title: "Aktivist Yatırımcı", netWorth: "$7B+", source: "Icahn Enterprises", desc: "Wall Street'in en korkulan aktivist yatırımcısı ve kurumsal baskıncısı." },
    { name: "Leon Black", title: "Apollo Global Kurucusu", netWorth: "$10B+", source: "Apollo Global Management", desc: "Dünyanın en büyük özel sermaye fonlarından Apollo'nun kurucusu." },
    { name: "Henry Kravis", title: "KKR Kurucu Ortağı", netWorth: "$7B+", source: "KKR & Co.", desc: "Özel sermaye endüstrisinin babası, kaldıraçlı satın almaların mucidi." },
    { name: "David Geffen", title: "Medya Mogulu", netWorth: "$9B+", source: "DreamWorks / Müzik", desc: "Hollywood ve müzik endüstrisinin en güçlü isimlerinden biri. DreamWorks kurucu ortağı." },
    { name: "Sumner Redstone", title: "Viacom / CBS", netWorth: "Tarihi Servet", source: "Medya İmparatorluğu", desc: "MTV, CBS, Paramount Pictures gibi devleri elinde tutan medya imparatoru." },
    { name: "Edgar Bronfman Sr.", title: "Seagram CEO", netWorth: "Tarihi Servet", source: "Seagram / Warner Music", desc: "Küresel içecek ve eğlence devinin uzun yıllar CEO'su ve Dünya Yahudi Kongresi başkanı." },
    { name: "Rupert Murdoch", title: "News Corp / Fox", netWorth: "$7B+", source: "Medya & Haber", desc: "Fox News, The Wall Street Journal gibi devleri yöneten küresel medya patronu. (*Anne tarafı Yahudi)" },
    { name: "Paul Singer", title: "Elliott Management", netWorth: "$6B+", source: "Hedge Fon", desc: "Dünyanın en agresif aktivist yatırımcısı ve Elliott Management'ın kurucusu." },
    { name: "Bernard Marcus", title: "Home Depot Kurucusu", netWorth: "$6B+", source: "Home Depot / Hayırseverlik", desc: "Dünyanın en büyük yapı market zinciri Home Depot'un kurucu ortağı." },
    { name: "Sheldon Adelson", title: "Las Vegas Sands", netWorth: "Tarihi Servet ($35B)", source: "Kumarhaneler / Siyaset", desc: "Las Vegas ve Makao'daki devasa kumarhane imparatorluğunun kurucusu ve Amerikan siyasetinin en büyük bağışçısı." },
    { name: "Estée Lauder", title: "Kozmetik Devi", netWorth: "Tarihi Servet", source: "Estée Lauder Companies", desc: "Dünyanın en büyük kozmetik imparatorluklarından birini kuran efsanevi kadın girişimci." },
    { name: "Calvin Klein", title: "Moda Tasarımcısı", netWorth: "$1B+", source: "Calvin Klein Inc.", desc: "Minimalist Amerikan modasını dünyaya yayan ikonik tasarımcı." },
    { name: "Diane von Fürstenberg", title: "Moda İkonu", netWorth: "$1.2B+", source: "DVF / CFDA", desc: "Wrap elbiseyi dünyaya tanıtan ve Amerikan Moda Konseyi başkanlığı yapan tasarımcı." },
    { name: "Stef Wertheimer", title: "İsrailli Sanayici", netWorth: "$5B+", source: "ISCAR / Berkshire Hathaway", desc: "Metal kesme aletleri üreticisi ISCAR'ın kurucusu, Warren Buffett'a satışıyla ünlü İsrailli." },
    { name: "Eyal Ofer", title: "Denizcilik & Gayrimenkul", netWorth: "$18B+", source: "Zodiac Maritime / Global Holdings", desc: "İsrail'in en zengin insanı, küresel denizcilik ve gayrimenkul imparatoru." },
    { name: "Roman Abramovich", title: "Chelsea FC Eski Sahibi", netWorth: "$8B+", source: "Petrol / Spor", desc: "Rus-İsrailli oligark. Sibneft petrol şirketi ve Chelsea futbol kulübünün eski sahibi." },
    { name: "Mikhail Fridman", title: "Alfa Group Kurucusu", netWorth: "$10B+", source: "Alfa Bank / Yatırım", desc: "Rusya'nın en büyük özel bankası Alfa Bank dahil dev yatırım grubunun kurucusu." },
    { name: "Sir Philip Green", title: "Perakende Baronu", netWorth: "$2B+", source: "Arcadia / Topshop", desc: "İngiliz perakende devleri Topshop ve BHS'in sahibi." },
    { name: "Arnon Milchan", title: "Film Yapımcısı", netWorth: "$4B+", source: "New Regency / Hollywood", desc: "Pretty Woman, Fight Club gibi kült filmleri üreten İsrailli Hollywood yapımcısı." },
    { name: "Haim Saban", title: "Medya & Siyaset", netWorth: "$3B+", source: "Saban Capital / Power Rangers", desc: "Power Rangers markasını yaratan ve Amerikan siyasetine güçlü bağışlar yapan İsrailli-Amerikalı milyarder." },
    { name: "Gil Shwed", title: "Check Point Kurucusu", netWorth: "$5B+", source: "Siber Güvenlik", desc: "İsrail siber güvenlik endüstrisinin babası ve Check Point Software kurucusu." },
    { name: "Nir Zuk", title: "Palo Alto Networks", netWorth: "$4B+", source: "Siber Güvenlik", desc: "Kurumsal ateş duvarı teknolojisinin öncüsü ve Palo Alto Networks kurucusu." },
    { name: "Jeff Yass", title: "Susquehanna Int. Group", netWorth: "$12B+", source: "Kantitatif Finans / TikTok", desc: "ABD'nin en büyük opsiyon tüccarlarından ve TikTok'un arkasındaki ByteDance'ın en büyük Amerikalı yatırımcısı." },
    { name: "Sam Altman", title: "OpenAI CEO", netWorth: "$1B+", source: "OpenAI (Yapay Zeka)", desc: "ChatGPT'nin yaratıcısı OpenAI'ın CEO'su, küresel yapay zeka devriminin en etkili ismi." }
];
