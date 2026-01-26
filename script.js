document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. КОНФІГУРАЦІЯ (РЕДАГУВАТИ ТУТ)
       ========================================= */

    // --- А. БРЕНДИ (Бігучий рядок) ---
    const brandsData = [
        "Bogenia", "Fitoproduct", "White & White", "Gerdan Jewelry",
        "Neverti", "Genabelle", "Blacktouch", "2wenty5ive"
    ];

    // --- Б. КАТЕГОРІЇ (Фільтри) ---
    // filter: це id, який ми пишемо в portfolioData (ugc, ai, beauty...)
    // name: те, що відображається на кнопці
    const categoriesData = [
        { filter: 'all', name: 'Всі', active: 0 },
        { filter: 'ugc', name: 'UGC Реклама', active: 0 },
        { filter: 'beauty', name: 'Beauty & Care', active: 1 },
        { filter: 'fashion', name: 'Fashion & Style', active: 0 },
        { filter: 'jewelry', name: 'Jewelry', active: 0 },
        { filter: 'commercial', name: 'Commercial', active: 0 }
    ];

    // --- В. ПОРТФОЛІО (Відео) ---
    // Важливо: поле category має співпадати з filter у списку вище!
    // Файли мають називатись video.mp4 та poster.png у відповідних папках
    const portfolioData = [
        // Існуючі
        {
            folder: 'bogenia_peel_gel',
            category: 'beauty',
            title: 'Огляд Peel Gel',
            brand: 'Bogenia'
        },
        {
            folder: 'bogenia_shampoo',
            category: 'beauty',
            title: 'Огляд шампуня',
            brand: 'Bogenia'
        },
        {
            folder: 'bogenia_spf',
            category: 'beauty',
            title: 'Огляд SPF крему',
            brand: 'Bogenia'
        },
        {
            folder: 'genabelle_3_in_1',
            category: 'beauty',
            title: 'Огляд Aquaporin лінійки',
            brand: 'Genabelle'
        },
        {
            folder: 'gerdan_robber',
            category: 'jewelry',
            title: 'Ювелірні прикраси',
            brand: 'Gerdan Jewelry'
        },
        {
            folder: 'lifestyle_clothes',
            category: 'fashion',
            title: 'Fashion Look',
            brand: 'Lifestyle'
        },
        {
            folder: 'losyny',
            category: 'fashion',
            title: 'Огляд лосинів',
            brand: 'Лосини'
        },
        {
            folder: 'neverti_pomady_1',
            category: 'beauty',
            title: 'Огляд помад 1',
            brand: 'Neverti'
        },
        {
            folder: 'neverti_pomady_2',
            category: 'beauty',
            title: 'Огляд помад 2',
            brand: 'Neverti'
        },
        {
            folder: 'whiteandwhite',
            category: 'commercial',
            title: 'Стоматологія',
            brand: 'White & White Lviv'
        }
    ];

    // --- Г. ВІДГУКИ ---
    const reviewsData = [
        {
            type: 'instagram',
            brand: 'Bogenia',
            platform: 'Instagram',
            logo: 'assets/logos/logo_bogenia.png',
            image: 'assets/reviews/review_bogenia.png'
        },
        {
            type: 'instagram',
            brand: 'Fitoproduct',
            platform: 'Instagram',
            logo: 'assets/logos/logo_fitoproduct.png',
            image: 'assets/reviews/review_fitoproduct.png'
        },
        {
            type: 'instagram',
            brand: 'White & White',
            platform: 'Instagram',
            logo: 'assets/logos/logo_whiteandwhite.png',
            image: 'assets/reviews/review_whiteandwhite.png'
        },
        {
            type: 'instagram',
            brand: 'Gerdan Jewelry',
            platform: 'Instagram',
            logo: 'assets/logos/logo_gerdan.png',
            image: 'assets/reviews/review_gerdan.png'
        },
        {
            type: 'instagram',
            brand: '2wenty5ive',
            platform: 'Instagram',
            logo: 'assets/logos/logo_2wenty5ive.png',
            image: 'assets/reviews/review_2wenty5ive.png'
        }
    ];


    /* =========================================
       2. ГЕНЕРАЦІЯ КОНТЕНТУ
       ========================================= */

    const svgs = {
        play: `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>`,
        pause: `<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>`,
        soundOn: `<svg viewBox="0 0 24 24"><path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" /></svg>`,
        soundOff: `<svg viewBox="0 0 24 24"><path d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" /></svg>`,
        instagram: `<svg class="platform-icon" viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" /></svg>`,
        telegram: `<svg class="platform-icon" viewBox="0 0 24 24"><path d="M9.78,18.65L10.06,14.42L17.74,7.5C18.08,7.19 17.67,7.04 17.22,7.31L7.74,13.3L3.64,12C2.76,11.75 2.75,11.14 3.84,10.7L19.81,4.54C20.54,4.21 21.24,4.72 20.96,5.84L18.24,18.65C18.05,19.56 17.5,19.78 16.74,19.36L12.6,16.3L10.61,18.23C10.38,18.46 10.19,18.65 9.78,18.65Z" /></svg>`,
        tiktok: `<svg class="platform-icon" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>`
    };

    // 2.1 БРЕНДИ
    const marqueeContainer = document.querySelector('.marquee-content');
    if (marqueeContainer) {
        const repeatedBrands = [...brandsData, ...brandsData, ...brandsData];
        marqueeContainer.innerHTML = repeatedBrands.map(brand => `<span>${brand}</span> • `).join('');
    }

    // 2.2 КАТЕГОРІЇ (НОВЕ!)
    const tabsContainer = document.querySelector('.portfolio-tabs');
    if (tabsContainer) {
        tabsContainer.innerHTML = categoriesData.map(cat =>
            `<button class="tab-btn ${cat.active === 1 ? 'active' : ''}" data-filter="${cat.filter}">${cat.name}</button>`
        ).join('');
    }

    // 2.3 ВІДЕО
    const videoGrid = document.querySelector('.video-grid');
    if (videoGrid) {
        videoGrid.innerHTML = portfolioData.map(item => `
            <div class="portfolio-item" data-category="${item.category}">
                <div class="phone-mockup">
                    <video class="video-element"
                           src="assets/video/${item.folder}/video.mp4"
                           poster="assets/video/${item.folder}/poster.png"
                           preload="metadata" loop playsinline muted></video>

                    <div class="video-controls">
                        <div class="center-play-btn paused">
                            <span class="play-icon">${svgs.play}</span>
                        </div>
                        <div class="bottom-controls">
                            <div class="control-row">
                                <span style="font-size: 0.8rem; color: white; opacity: 0.8;"></span>
                                <div class="volume-container">
                                    <button class="mute-btn" aria-label="Звук">${svgs.soundOff}</button>
                                    <input type="range" class="volume-slider" min="0" max="1" step="0.1" value="1">
                                </div>
                            </div>
                            <input type="range" class="seek-bar" value="0" min="0" max="100" step="0.1">
                        </div>
                    </div>
                </div>
                <div class="video-info">
                    <h4>${item.title}</h4>
                    <span class="client-tag">${item.brand}</span>
                </div>
            </div>
        `).join('');
    }

    // 2.4 ВІДГУКИ
    const reviewsSlider = document.querySelector('.reviews-slider');
    if (reviewsSlider) {
        reviewsSlider.innerHTML = reviewsData.map(review => {
            let iconSvg = svgs.instagram;
            if (review.type === 'telegram') iconSvg = svgs.telegram;
            if (review.type === 'tiktok') iconSvg = svgs.tiktok;

            return `
            <div class="review-card ${review.type}">
                <div class="card-header">
                    <div class="brand-info">
                        <img src="${review.logo}" alt="${review.brand} Logo" class="brand-logo">
                        <div class="brand-text">
                            <span class="brand-name">${review.brand}</span>
                            <span class="platform-name">${review.platform}</span>
                        </div>
                    </div>
                    ${iconSvg}
                </div>
                <div class="review-image-container">
                    <img src="${review.image}" alt="${review.brand} Review" class="review-img">
                </div>
            </div>
            `;
        }).join('');
    }


    /* =========================================
       3. ЛОГІКА ІНТЕРФЕЙСУ
       ========================================= */

    // 3.1 ТАБИ (Оновлена логіка)
    // Отримуємо кнопки ТІЛЬКИ після їх генерації
    const tabBtns = document.querySelectorAll('.tab-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Функція, яка ховає/показує відео
    function filterItems(filterValue) {
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filterValue === 'all' || filterValue === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
                // Зупиняємо відео, якщо воно сховане
                const hiddenVideo = item.querySelector('video');
                if(hiddenVideo) hiddenVideo.pause();
            }
        });
    }

    // Навішуємо кліки на кнопки
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            filterItems(filterValue); // Викликаємо функцію
        });
    });

    // --- АВТОМАТИЧНИЙ ЗАПУСК ФІЛЬТРУ ПРИ СТАРТІ ---
    // Знаходимо категорію, яка має active: 1
    const initialActiveCategory = categoriesData.find(c => c.active === 1);
    if (initialActiveCategory) {
        filterItems(initialActiveCategory.filter);
    } else {
        // Якщо раптом нічого не вибрано, показуємо все
        filterItems('all');
    }


    // 3.2 ВІДЕО ПЛЕЄР (Без змін)
    const allMockups = document.querySelectorAll('.phone-mockup');

    function muteAllExcept(currentVideo) {
        allMockups.forEach(mockup => {
            const video = mockup.querySelector('video');
            const muteBtn = mockup.querySelector('.mute-btn');
            const volumeSlider = mockup.querySelector('.volume-slider');

            if (video !== currentVideo) {
                video.muted = true;
                video.volume = 0;
                video.pause();

                if(muteBtn) muteBtn.innerHTML = svgs.soundOff;
                if(volumeSlider) volumeSlider.value = 0;

                const playIcon = mockup.querySelector('.play-icon');
                const playBtnBlock = mockup.querySelector('.center-play-btn');
                if(playIcon) {
                    playIcon.innerHTML = svgs.play;
                    playBtnBlock.classList.remove('paused');
                }
                mockup.classList.remove('is-playing');
            }
        });
    }

    allMockups.forEach(mockup => {
        const video = mockup.querySelector('video');
        const playBtnBlock = mockup.querySelector('.center-play-btn');
        const playIcon = mockup.querySelector('.play-icon');
        const muteBtn = mockup.querySelector('.mute-btn');
        const volumeSlider = mockup.querySelector('.volume-slider');
        const seekBar = mockup.querySelector('.seek-bar');

        let isManuallyMuted = true;
        let isHoveringControls = false;
        let returnToPosterTimeout;

        function updateUI() {
            if (video.paused) {
                playIcon.innerHTML = svgs.play;
                playBtnBlock.classList.remove('paused');
                mockup.classList.remove('is-playing');
            } else {
                playIcon.innerHTML = svgs.pause;
                playBtnBlock.classList.add('paused');
                mockup.classList.add('is-playing');
            }

            if (video.muted || video.volume < 0.05) {
                muteBtn.innerHTML = svgs.soundOff;
            } else {
                muteBtn.innerHTML = svgs.soundOn;
            }
        }

        video.muted = true;
        video.volume = 0;
        if(volumeSlider) volumeSlider.value = 0;
        updateUI();

        [muteBtn, volumeSlider, playBtnBlock].forEach(el => {
            if(!el) return;
            el.addEventListener('mouseenter', () => { isHoveringControls = true; });
            el.addEventListener('mouseleave', () => { isHoveringControls = false; });
        });

        mockup.addEventListener('mouseenter', () => {
            if (window.matchMedia("(min-width: 769px)").matches) {
                if (isHoveringControls) return;
                clearTimeout(returnToPosterTimeout);
                muteAllExcept(video);
                if (isManuallyMuted === false || video.paused) {
                    video.muted = false;
                    video.volume = 1;
                    if(volumeSlider) volumeSlider.value = 1;
                    isManuallyMuted = false;
                }
                if(video.paused) video.play().catch(e=>{});
                updateUI();
            }
        });

        mockup.addEventListener('mouseleave', () => {
            if (window.matchMedia("(min-width: 769px)").matches) {
                video.muted = true;
                updateUI();
            }
        });

        muteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const hasSound = !video.muted && video.volume > 0.1;
            if (!hasSound) {
                clearTimeout(returnToPosterTimeout);
                muteAllExcept(video);
                video.muted = false;
                video.volume = 1;
                if(volumeSlider) volumeSlider.value = 1;
                isManuallyMuted = false;
                if(video.paused) video.play();
            } else {
                video.muted = true;
                video.volume = 0;
                if(volumeSlider) volumeSlider.value = 0;
                isManuallyMuted = true;
            }
            updateUI();
        });

        if(volumeSlider) {
            ['mousedown', 'click', 'touchstart'].forEach(evt =>
                volumeSlider.addEventListener(evt, e => e.stopPropagation())
            );
            volumeSlider.addEventListener('input', (e) => {
                clearTimeout(returnToPosterTimeout);
                const val = parseFloat(e.target.value);
                video.volume = val;
                if(val > 0) {
                    video.muted = false;
                    muteAllExcept(video);
                    isManuallyMuted = false;
                } else {
                    video.muted = true;
                    isManuallyMuted = true;
                }
                updateUI();
            });
        }

        mockup.addEventListener('click', (e) => {
            if (muteBtn.contains(e.target) || (volumeSlider && volumeSlider.contains(e.target))) return;

            if (!e.target.closest('.bottom-controls')) {
                clearTimeout(returnToPosterTimeout);
                if (video.paused) {
                    muteAllExcept(video);
                    video.muted = false;
                    video.volume = 1;
                    if(volumeSlider) volumeSlider.value = 1;
                    isManuallyMuted = false;
                    video.play();
                } else {
                    video.pause();
                }
                updateUI();
            }
        });

        let isDragging = false;
        video.addEventListener('timeupdate', () => {
            if (!isDragging) {
                const value = (video.currentTime / video.duration) * 100;
                if(Number.isFinite(value)) seekBar.value = value;
            }
        });
        seekBar.addEventListener('input', () => {
            isDragging = true;
            clearTimeout(returnToPosterTimeout);
            video.pause();
            const time = (seekBar.value / 100) * video.duration;
            video.currentTime = time;
        });
        seekBar.addEventListener('change', () => {
            isDragging = false;
            video.play();
            updateUI();
        });

        video.addEventListener('pause', () => {
            if (!isDragging) {
                clearTimeout(returnToPosterTimeout);
                returnToPosterTimeout = setTimeout(() => {
                    video.load();
                    updateUI();
                }, 3000);
            }
        });
        video.addEventListener('play', () => clearTimeout(returnToPosterTimeout));

        let hideControlsTimeout;
        function showControls() {
            mockup.classList.remove('interface-hidden');
            clearTimeout(hideControlsTimeout);
        }
        function startHideTimer() {
            clearTimeout(hideControlsTimeout);
            if (!video.paused) {
                hideControlsTimeout = setTimeout(() => {
                    mockup.classList.add('interface-hidden');
                }, 2000);
            }
        }
        video.addEventListener('play', startHideTimer);
        video.addEventListener('pause', showControls);
        ['mousemove', 'touchstart', 'click', 'input'].forEach(event => {
            mockup.addEventListener(event, () => {
                showControls();
                startHideTimer();
            });
        });
    });

    // 3.3 SCROLL PAUSE
    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                const video = entry.target.querySelector('video');
                if (video) {
                    video.pause();
                    video.muted = true;
                    const mockup = entry.target;
                    const playIcon = mockup.querySelector('.play-icon');
                    const playBtnBlock = mockup.querySelector('.center-play-btn');
                    const muteBtn = mockup.querySelector('.mute-btn');
                    const volumeSlider = mockup.querySelector('.volume-slider');

                    if(playIcon) playIcon.innerHTML = svgs.play;
                    if(playBtnBlock) playBtnBlock.classList.remove('paused');
                    mockup.classList.remove('is-playing');
                    if(muteBtn) muteBtn.innerHTML = svgs.soundOff;
                    if(volumeSlider) volumeSlider.value = 0;
                }
            }
        });
    }, { threshold: 0.6 });
    allMockups.forEach(mockup => observer.observe(mockup));


    // 3.4 REVIEWS NAVIGATION
    const navSlider = document.querySelector('.reviews-slider');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');

    if (navSlider && prevArrow && nextArrow) {
        const scrollAmount = 420;
        nextArrow.addEventListener('click', () => {
            navSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
        prevArrow.addEventListener('click', () => {
            navSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }
});