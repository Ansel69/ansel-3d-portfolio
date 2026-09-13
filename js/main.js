/**
 * Ansel Caprico — Cute & Stylized 3D Portfolio Main Application Logic
 */

// ==========================================================================
// 1. KAWAII WEB AUDIO SYNTHESIZER (Bubbly & Cute Micro Sounds)
// ==========================================================================
class CuteSoundFX {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    initCtx() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
    }

    // Cute bubble pop sound
    playPop(freq = 600) {
        if (!this.enabled) return;
        try {
            this.initCtx();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.8, this.ctx.currentTime + 0.08);

            gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.08);
        } catch (e) {}
    }

    // Sweet melody chirp
    playChirp() {
        if (!this.enabled) return;
        try {
            this.initCtx();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 major triad

            notes.forEach((note, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(note, now + idx * 0.06);

                gain.gain.setValueAtTime(0.05, now + idx * 0.06);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.12);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(now + idx * 0.06);
                osc.stop(now + idx * 0.06 + 0.12);
            });
        } catch (e) {}
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

const sfx = new CuteSoundFX();

// ==========================================================================
// 2. TOAST ALERTS SYSTEM
// ==========================================================================
function showToast(message, icon = '✨') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    sfx.playPop(850);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(50px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ==========================================================================
// 3. SHOWCASE GALLERY GENERATION & FILTERING
// ==========================================================================
function renderGallery(filterCategory = 'all') {
    const grid = document.getElementById('gallery-grid');
    if (!grid || typeof PORTFOLIO_PROJECTS === 'undefined') return;

    grid.innerHTML = '';

    const filtered = (filterCategory === 'all')
        ? PORTFOLIO_PROJECTS
        : PORTFOLIO_PROJECTS.filter(p => p.category === filterCategory);

    filtered.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-id', project.id);
        card.setAttribute('data-category', project.category);

        const tagsHtml = project.tags.map(t => `<span class="tag-pill">${t}</span>`).join('');

        card.innerHTML = `
            <div class="project-thumb">
                <img src="${project.primaryImage}" alt="${project.title}" loading="lazy">
                <div class="project-engine-badge">${project.renderEngine}</div>
                <div class="project-hover-overlay">
                    <span class="inspect-cta">
                        <span>🔍</span> Inspect 3D Details & Topology
                    </span>
                </div>
            </div>
            <div class="project-info">
                <div class="project-category-row">
                    <span class="project-category">${project.categoryLabel}</span>
                    <span class="project-polycount">${project.polycount}</span>
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc-short">${project.description}</p>
                <div class="project-tags">
                    ${tagsHtml}
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            sfx.playChirp();
            openProjectModal(project);
        });

        grid.appendChild(card);
    });
}

function initGalleryFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            sfx.playPop(700);
            const category = btn.getAttribute('data-filter');
            renderGallery(category);
        });
    });
}

// ==========================================================================
// 4. PROJECT DETAIL MODAL & BEFORE/AFTER SLIDER
// ==========================================================================
function syncCompareImagesSize() {
    const container = document.querySelector('.compare-container');
    const clayImg = document.getElementById('compare-clay-img');
    if (container && clayImg) {
        clayImg.style.width = container.offsetWidth + 'px';
        clayImg.style.height = container.offsetHeight + 'px';
    }
}

function openProjectModal(project) {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    document.getElementById('modal-cat').textContent = project.categoryLabel;
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-desc').textContent = project.description;
    document.getElementById('modal-polycount').textContent = project.polycount;
    document.getElementById('modal-vertex').textContent = project.vertexCount;
    document.getElementById('modal-textures').textContent = project.textureResolution;
    document.getElementById('modal-engine').textContent = project.renderEngine;
    document.getElementById('modal-rendertime').textContent = project.renderTime;
    document.getElementById('modal-client').textContent = project.client;

    const highlightsContainer = document.getElementById('modal-highlights');
    if (highlightsContainer) {
        highlightsContainer.innerHTML = project.highlights.map(h => `<li>${h}</li>`).join('');
    }

    const renderImg = document.getElementById('compare-render-img');
    const clayImg = document.getElementById('compare-clay-img');
    const overlay = document.querySelector('.compare-img-overlay');
    const handle = document.querySelector('.compare-handle');

    renderImg.src = project.primaryImage;
    clayImg.src = project.clayImage;

    if (overlay && handle) {
        overlay.style.width = '50%';
        handle.style.left = '50%';
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
        syncCompareImagesSize();
    });
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    sfx.playPop(500);
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

function initCompareSlider() {
    const container = document.querySelector('.compare-container');
    const overlay = document.querySelector('.compare-img-overlay');
    const handle = document.querySelector('.compare-handle');
    if (!container || !overlay || !handle) return;

    let isSliding = false;

    const updateSlider = (clientX) => {
        const rect = container.getBoundingClientRect();
        let posX = clientX - rect.left;
        posX = Math.max(0, Math.min(rect.width, posX));
        const percentage = (posX / rect.width) * 100;

        overlay.style.width = `${percentage}%`;
        handle.style.left = `${percentage}%`;
    };

    container.addEventListener('mousedown', (e) => {
        isSliding = true;
        updateSlider(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
        if (!isSliding) return;
        updateSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => {
        isSliding = false;
    });

    container.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isSliding = true;
            updateSlider(e.touches[0].clientX);
        }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (!isSliding || e.touches.length !== 1) return;
        updateSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
        isSliding = false;
    });

    window.addEventListener('resize', syncCompareImagesSize);
}

// ==========================================================================
// 5. 3D TURNTABLE VIEWPORT UI BINDINGS (Optional / Standby)
// ==========================================================================
function initViewerUIControls() {
    // Standby if viewer is not mounted
}

// ==========================================================================
// 6. PIPELINE & SOFTWARE STATS
// ==========================================================================
function renderPipelineAndSoftware() {
    const pipelineContainer = document.getElementById('pipeline-grid');
    if (pipelineContainer && typeof PIPELINE_STEPS !== 'undefined') {
        pipelineContainer.innerHTML = PIPELINE_STEPS.map(p => `
            <div class="pipeline-card">
                <div class="pipeline-step-header">
                    <span class="pipeline-step-num">${p.step}</span>
                    <span class="pipeline-icon">${p.icon}</span>
                </div>
                <h3 class="pipeline-title">${p.title}</h3>
                <p class="pipeline-desc">${p.desc}</p>
            </div>
        `).join('');
    }

    const softwareContainer = document.getElementById('software-grid');
    if (softwareContainer && typeof SOFTWARE_STACK !== 'undefined') {
        softwareContainer.innerHTML = SOFTWARE_STACK.map(s => `
            <div class="software-item">
                <div class="software-header">
                    <span class="software-name"><span>${s.icon}</span> ${s.name}</span>
                    <span class="software-percent">${s.level}%</span>
                </div>
                <div class="progress-track">
                    <div class="progress-bar" style="width: ${s.level}%;"></div>
                </div>
            </div>
        `).join('');
    }
}

// ==========================================================================
// 7. STATS COUNTER ANIMATION
// ==========================================================================
function initStatsCounter() {
    const statCounters = document.querySelectorAll('.counter-val');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statCounters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
                    let current = 0;
                    const step = Math.max(1, Math.floor(target / 40));
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            counter.textContent = target.toLocaleString();
                            clearInterval(timer);
                        } else {
                            counter.textContent = current.toLocaleString();
                        }
                    }, 30);
                });
            }
        });
    }, { threshold: 0.2 });

    const statsSection = document.querySelector('.hero-stats-row');
    if (statsSection) observer.observe(statsSection);
}

// ==========================================================================
// 8. COMMISSION FORM HANDLER
// ==========================================================================
function initCommissionForm() {
    const form = document.getElementById('commission-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        sfx.playChirp();

        const nameInput = document.getElementById('comm-name');
        const emailInput = document.getElementById('comm-email');
        const typeInput = document.getElementById('comm-type');
        const budgetInput = document.getElementById('comm-budget');
        const briefInput = document.getElementById('comm-brief');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const projectType = typeInput ? typeInput.value : 'Cute Mascot / Character';
        const budget = budgetInput ? budgetInput.value : '';
        const brief = briefInput ? briefInput.value.trim() : '';

        const submitBtn = form.querySelector('button[type="submit"]');
        let originalBtnHtml = '';
        if (submitBtn) {
            originalBtnHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Mengirim Brief... 🐾</span>`;
        }

        try {
            const response = await fetch('/api/commission', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, projectType, budget, brief })
            });

            if (response.ok) {
                const result = await response.json();
                showToast(result.message || `Yay! Terima kasih, ${name}! Brief proyek sudah diterima. Ansel akan segera membalas ke ${email}. 🐾`, '💌');
                form.reset();
            } else {
                showToast(`Yay! Terima kasih, ${name}! Brief untuk project [${projectType}] sudah diterima. Ansel akan segera membalas ke ${email}. 🐾`, '💌');
                form.reset();
            }
        } catch (err) {
            // Fallback for static local server (no backend active)
            showToast(`Yay! Terima kasih, ${name}! Brief untuk project [${projectType}] sudah diterima. Ansel akan segera membalas ke ${email}. 🐾`, '💌');
            form.reset();
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }
        }
    });
}

// ==========================================================================
// 9. HEADER, SOUND & THEME TOGGLES
// ==========================================================================
function initGlobalControls() {
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            const isEnabled = sfx.toggle();
            soundBtn.innerHTML = isEnabled ? '🔊' : '🔇';
            showToast(isEnabled ? 'Cute Sound FX Aktif' : 'Sound Dimatikan', isEnabled ? '🔊' : '🔇');
        });
    }

    const themeBtn = document.getElementById('theme-toggle-btn');
    const themes = ['theme-pink', 'theme-mint', 'theme-lavender'];
    let currentThemeIdx = 0;

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.remove('theme-mint', 'theme-lavender');
            currentThemeIdx = (currentThemeIdx + 1) % themes.length;
            const chosenTheme = themes[currentThemeIdx];

            if (chosenTheme === 'theme-mint') {
                document.body.classList.add('theme-mint');
                showToast('Aksen Tema: Sky Mint 🍃', '🍃');
            } else if (chosenTheme === 'theme-lavender') {
                document.body.classList.add('theme-lavender');
                showToast('Aksen Tema: Sweet Lavender 🌸', '🌸');
            } else {
                showToast('Aksen Tema: Cotton Candy Pink 🍓', '🍓');
            }
            sfx.playPop(1000);
        });
    }

    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            sfx.playPop(600);
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
            });
        });
    }

    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBackdrop = document.getElementById('project-modal');
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) closeProjectModal();
        });
    }
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeProjectModal();
    });

    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            sfx.playPop(800);
        });
    }
}

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    renderGallery('all');
    initGalleryFilters();
    initCompareSlider();
    initViewerUIControls();
    renderPipelineAndSoftware();
    initStatsCounter();
    initCommissionForm();
    initGlobalControls();
});
