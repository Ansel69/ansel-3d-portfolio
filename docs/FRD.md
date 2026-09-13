# Functional Requirements Document (FRD)

## Project Name: Ansel Caprico — Cute & Stylized 3D Blender Portfolio Showcase
**Target Host:** Vercel (Serverless Node.js + HTML5 / CSS3 / WebGL)  
**Author:** Ansel Caprico  
**Email:** ansel003455@gmail.com  
**Instagram:** [@3d_npcdaily](https://www.instagram.com/3d_npcdaily/)  
**Support (Trakteer):** [teer.id/ansel-caprico-ubqyc](https://teer.id/ansel-caprico-ubqyc)  
**Version:** 3.0.0 (Production & Vercel Ready Edition)  

---

## 1. System Architecture & Tech Stack

```
Frontend Client & Backend Serverless
├── HTML5: Semantic Structure, Bubbly Accessible Elements, SEO Meta Tags
├── CSS3: Pastel Candy Design System, Claymorphism, Rounded UI, Keyframe Animations, Compare Slider
├── JavaScript (ES6+):
│   ├── Three.js (r128) WebGL: Ambient Particle Background
│   ├── main.js: Dynamic Gallery Rendering, Modal Handlers, Compare Slider, Async Form Submitter
│   └── data-projects.js: 5 Cute Artworks Dataset & Learning Journey Progress
├── Serverless API (Vercel):
│   └── api/commission.js: POST /api/commission handler with input sanitization & response formatting
├── Configuration & Deployment:
│   ├── vercel.json: Security Headers, Clean URLs, Static Asset Caching
│   ├── package.json: Project Metadata & Scripts
│   └── .gitignore: Leak-prevention & Clean Deployment Rules
└── Assets:
    ├── Original 3D Renders (kocheng_oren.png, ayam.png, eskrim.png, gelas_coffee.png, cute_boba.jpg)
    ├── Authentic Clay Renders (kocheng_clay.png, ayam_clay.png, eskrim_clay.png, gelas_coffee_clay.png)
    └── Blender Sources (.blend)
```

---

## 2. Functional Requirements

### FR-01: Hero Section & Authentic Storytelling
- Menampilkan narasi jujur dan antusias: Ansel Caprico adalah kreator yang baru 3 hari belajar Blender dan bersemangat mendalami stylized 3D.
- Counter statistik: `5+` Aset 3D Dibuat, `3` Hari Belajar Blender, `100%` Semangat Belajar.
- CTA ganda ke Showcase dan Trakteer.

### FR-02: 5 Cute Creations Showcase & Before/After Slider
- Menampilkan 5 karya imut dengan modal detail dan slider perbandingan (Render vs Clay otentik dari Blender).

### FR-03: Commission Form & Serverless Backend
- Formulir terhubung secara asinkron ke endpoint `/api/commission.js` dengan pesan toast interaktif dan sanitasi data yang aman.

### FR-04: Keamanan, Privasi & Vercel Deployment
- `vercel.json` menyediakan header keamanan `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, dan `X-XSS-Protection: 1; mode=block`.
- `.gitignore` menyaring semua berkas sensitif, cache, dan backup.
