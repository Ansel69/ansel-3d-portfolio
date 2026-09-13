// Ansel Caprico — Cute & Stylized 3D Portfolio Dataset (5 Cute Creations Edition)
const PORTFOLIO_PROJECTS = [
    {
        id: "project-kocheng-oren",
        title: "Kocheng Oren in Delivery Box",
        category: "character",
        categoryLabel: "Cute Character / Mascot",
        renderEngine: "Blender Cycles 4.2",
        primaryImage: "assets/renders/kocheng_oren.png",
        clayImage: "assets/renders/kocheng_clay.png",
        sourceFile: "Kocheng.blend",
        tags: ["Blender 4.2", "Kocheng.blend", "Sub-D Modeling", "Cycles 4.2"],
        polycount: "6,800 Tris",
        vertexCount: "3,520 Verts",
        textureResolution: "Procedural Soft Clay Shaders",
        renderTime: "8 mins @ 512 Samples",
        client: "Original Mascot Design",
        year: "2026",
        description: "Karakter kucing oranye menggemaskan (Kocheng Oren) yang sedang mengintip santai dari dalam kotak kardus paket delivery. Dibuat dengan teknik Subdivision Surface modeling yang sangat halus, ekspresi mata hitam bulat berkilau, pipi tembem, hidung pink kancing, mulut kurva ':3', 6 helai kumis putih, dan cakar mungil 3-jari yang bertengger di tepi kardus.",
        highlights: [
            "Topologi quad bersih berbasis Sub-D modifier non-destruktif di Blender 4.2",
            "Shader bodi kucing oranye dengan material procedural soft sheen dan subsurface scattering",
            "Kardus lipat trapesium dengan 4 flap terbuka dan sudut tekukan alami",
            "Cakar kucing 3-jari bulat menggemaskan yang bertengger di bibir depan kardus",
            "Pencahayaan studio lembut dengan fill light biru langit pastel untuk suasana hangat"
        ]
    },
    {
        id: "project-ayam-egg",
        title: "Chicky Chick in Egg Shell (Ayam)",
        category: "character",
        categoryLabel: "Cute Character / Animals",
        renderEngine: "Blender Cycles 4.2",
        primaryImage: "assets/renders/ayam.png",
        clayImage: "assets/renders/ayam_clay.png",
        sourceFile: "ayam.blend",
        tags: ["Blender 4.2", "ayam.blend", "Stylized 3D", "Bonnet Hat", "Clay Matcap"],
        polycount: "5,400 Tris",
        vertexCount: "2,840 Verts",
        textureResolution: "Procedural Soft Gloss Shaders",
        renderTime: "6 mins @ 512 Samples",
        client: "Cute Character Series",
        year: "2026",
        description: "Karakter anak ayam mungil berwarna kuning cerah yang baru menetas dari pecahan cangkang telur. Mengenakan topi renda bunga berwarna merah muda pastel (*ruffled flower bonnet*) dengan tali dagu dan pita simpul manis, jambul bulu kuning di kepala, dan paruh piramida berlian oranye di atas lantai lavender lembut dengan serpihan cangkang telur.",
        highlights: [
            "Cangkang telur retak bergerigi (*cracked eggshell*) dengan pecahan serpihan di lantai studio",
            "Topi renda bunga merah muda dengan kelopak melengkung halus mengelilingi kepala",
            "Tali dagu pink melingkar dengan aksen simpul pita (bow ribbon) di bawah leher",
            "Paruh piramida berlian oranye dan mata hitam bulat dengan pantulan specular studio cerah",
            "Pencahayaan studio terfokus dengan latar belakang ungu lavender yang tenang"
        ]
    },
    {
        id: "project-eskrim-kawaii",
        title: "Sweet Berry-Choco Ice Cream Pop (Eskrim)",
        category: "food",
        categoryLabel: "Cute Food & Props",
        renderEngine: "Blender Cycles 4.2",
        primaryImage: "assets/renders/eskrim.png",
        clayImage: "assets/renders/eskrim_clay.png",
        sourceFile: "ESKRIM.blend",
        tags: ["Blender 4.2", "ESKRIM.blend", "Kawaii Prop", "PBR Clay", "Splash FX"],
        polycount: "4,200 Tris",
        vertexCount: "2,150 Verts",
        textureResolution: "Procedural Strawberry & Wood Texture",
        renderTime: "5 mins @ 512 Samples",
        client: "Kawaii Food Props",
        year: "2026",
        description: "Es krim stik rasa stroberi merah muda yang ceria dengan gigitan renyah berisi cokelat gelap lumer di bagian kiri atas. Dilengkapi dengan 3 butir percikan tetesan cokelat (*splash droplets*) yang melayang di atas gigitan, 3 tetesan embun sirup segar di permukaan, mata berkilau, senyuman manis, dan stik kayu berpola serat organik alami.",
        highlights: [
            "Bentuk bodi es krim popsicle dengan sudut kanan atas membulat yang manis dipandang",
            "Efek gigitan bergerigi dengan lapisan cokelat gelap tebal di bagian dalam",
            "3 tetesan cokelat melayang (*splash droplets*) di atas area gigitan untuk efek dinamis",
            "Detail 3 butir tetesan sirup embun timbul di permukaan es krim",
            "Stik es krim kayu dengan tekstur garis serat kayu procedural yang halus"
        ]
    },
    {
        id: "project-gelas-coffee",
        title: "Sleepy Latte Coffee Mug (Gelas Coffe)",
        category: "food",
        categoryLabel: "Cute Food & Props",
        renderEngine: "Blender Cycles 4.2",
        primaryImage: "assets/renders/gelas_coffee.png",
        clayImage: "assets/renders/gelas_coffee_clay.png",
        sourceFile: "Coffe.blend",
        tags: ["Blender 4.2", "Coffe.blend", "Stylized Prop", "Cozy Coffee", "Cycles 4.2"],
        polycount: "5,800 Tris",
        vertexCount: "3,100 Verts",
        textureResolution: "Procedural Ceramic & Roasted Coffee Shaders",
        renderTime: "7 mins @ 512 Samples",
        client: "Cozy Mascot & Prop Design",
        year: "2026",
        description: "Maskot cangkir kopi keramik warna krem latte yang sedang tertidur lelap di atas tatakan kayu bundar. Menampilkan ekspresi wajah super menggemaskan dengan mata terpejam santai ('⌒  ⌒'), mulut menganga lebar saat menguap/mendengkur dengan liur yang menetes lucu, dan 3 huruf 3D 'Z Z Z' yang melayang keluar dari genangan kopi pekat hangat.",
        highlights: [
            "Bodi cangkir keramik latte tebal dengan lengkungan bibir gelas dan gagang C membulat",
            "Genangan cairan kopi hitam pekat dengan kilau specular hangat di dalam cangkir",
            "Tatakan coaster kayu warna cokelat tua dengan bevel melingkar yang proporsional",
            "Ekspresi mengantuk lucu: mata garis terpejam, mulut menganga, dan tetesan liur di bibir bawah",
            "Efek 3 huruf 3D 'Z Z Z' melayang diagonal menandakan tidur lelap yang damai"
        ]
    },
    {
        id: "project-cute-boba",
        title: "Sweet Matcha Boba Buddy",
        category: "food",
        categoryLabel: "Cute Food & Props",
        renderEngine: "Blender Cycles 4.2",
        primaryImage: "assets/renders/cute_boba.jpg",
        clayImage: "assets/renders/cute_boba.jpg",
        sourceFile: "Boba.blend",
        tags: ["Blender 4.2", "Boba.blend", "Kawaii Mascot", "Glass & Liquid Shader", "Cycles 4.2"],
        polycount: "6,200 Tris",
        vertexCount: "3,300 Verts",
        textureResolution: "Procedural Milk Tea & Glass Shaders",
        renderTime: "7 mins @ 512 Samples",
        client: "Cute Beverage Series",
        year: "2026",
        description: "Karakter cup boba milk tea manis menggemaskan dengan sedotan bergaris pink-putih, butiran mutiara boba kenyal melayang, gantungan charm hati kecil, dan ekspresi wajah bahagia dengan pipi merona.",
        highlights: [
            "Gelas plastik transparan dengan shader refraction kaca realistis di Blender Cycles",
            "Cairan milk tea gradasi dengan butiran boba mutiara hitam di bagian bawah",
            "Sedotan bengkok bermotif candy cane dengan hiasan charm hati pink",
            "Ekspresi wajah super ceria dengan mata berbinar dan pipi pink merona",
            "Partikel boba dan kilau bintang melayang untuk kesan dinamis dan magis"
        ]
    }
];

// Cute Pipeline Steps Data
const PIPELINE_STEPS = [
    {
        step: "01",
        title: "Doodle & Cute Silhouette",
        icon: "✏️",
        desc: "Menggambar sketsa kasar 2D untuk menemukan proporsi tubuh yang bulat, ramah, dan siluet karakter yang langsung dikenali."
    },
    {
        step: "02",
        title: "Clay Blockout & Rounding",
        icon: "🥔",
        desc: "Membuat bentuk dasar menggunakan primitive shapes (spheres, rounded cylinders, boxes) dan menjaga kelengkungan sudut yang lembut."
    },
    {
        step: "03",
        title: "Sub-D Smoothing & Facial Charm",
        icon: "🎀",
        desc: "Menerapkan modifier Subdivision Surface di Blender, menyempurnakan mata kancing berkilau, pipi merona, dan ekspresi senyum manis."
    },
    {
        step: "04",
        title: "Pastel Color Harmony & Shading",
        icon: "🎨",
        desc: "Menyusun skema warna pastel lembut (Cotton Pink, Sunshine Yellow, Latte Cream, Lavender) dengan shader clay glossy yang hangat."
    },
    {
        step: "05",
        title: "Soft Studio Lighting in Blender",
        icon: "💡",
        desc: "Penataan lighting studio lembut 3-point dengan soft area lights untuk menghasilkan bayangan yang halus dan highlight specular cerah."
    },
    {
        step: "06",
        title: "Final Render & Cute Sparkles",
        icon: "✨",
        desc: "Proses render di Blender Cycles dengan sentuhan partikel bintang, floating hearts, dan signature watermark Ansel C."
    }
];

// Software Stack Data (Honest Beginner Learning Journey)
const SOFTWARE_STACK = [
    { name: "Blender 3D Modeling (Sub-D & Primitives)", role: "Belajar Pemodelan Karakter & Props", level: 85, icon: "🟠" },
    { name: "Blender Cycles & Lighting", role: "Pencahayaan Studio & Soft Shadows", level: 80, icon: "✨" },
    { name: "Procedural Shaders & Pastel Colors", role: "Eksplorasi Material Clay & Glossy", level: 78, icon: "🎨" },
    { name: "Concept Sketching & Silhouette", role: "Sketsa 2D & Moodboard Ide", level: 88, icon: "✏️" },
    { name: "Antusiasme & Semangat Belajar", role: "Konsisten Praktik Setiap Hari", level: 100, icon: "💖" }
];
