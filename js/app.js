const DEFAULT_SECTION = 'home';
const STORAGE_KEY = 'currentSection';

const sections = Array.from(document.querySelectorAll('.wrapper > section'));
const navLinks = Array.from(document.querySelectorAll('.nav-list a[href^="#"]'));
const downloadBtn = document.getElementById('download-btn');
const scroller = document.querySelector('.wrapper');

function isKnownSection(id) {
    return sections.some(section => section.id === id);
}

function loadImagesInView(section) {
    if (!section) return;

    const margin = window.innerHeight;

    section.querySelectorAll('img[loading="lazy"]').forEach(image => {
        if (image.complete) return;

        const box = image.getBoundingClientRect();
        if (box.top < window.innerHeight + margin && box.bottom > -margin) {
            image.loading = 'eager';
        }
    });
}

function showSection(sectionId, { resetScroll = true } = {}) {
    const id = isKnownSection(sectionId) ? sectionId : DEFAULT_SECTION;

    sections.forEach(section => {
        section.style.display = section.id === id ? 'block' : 'none';
    });

    navLinks.forEach(link => {
        const isCurrent = link.getAttribute('href') === `#${id}`;
        if (isCurrent) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });

    if (downloadBtn) {
        downloadBtn.style.display = id === 'resume' ? 'inline-flex' : 'none';
    }

    if (resetScroll && scroller) {
        scroller.scrollTop = 0;
    }

    loadImagesInView(sections.find(section => section.id === id));

    try {
        sessionStorage.setItem(STORAGE_KEY, id);
    } catch (error) {
    }

    return id;
}

function storedSection() {
    try {
        return sessionStorage.getItem(STORAGE_KEY);
    } catch (error) {
        return null;
    }
}

function routeInitial() {
    const fromHash = decodeURIComponent(location.hash.slice(1));
    const requested = isKnownSection(fromHash) ? fromHash : storedSection();
    const shown = showSection(requested, { resetScroll: false });

    if (location.hash !== `#${shown}`) {
        history.replaceState(null, '', `#${shown}`);
    }
}

window.addEventListener('hashchange', () => {
    showSection(decodeURIComponent(location.hash.slice(1)));
});

routeInitial();

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

if (lightbox && lightboxImg) {
    const lightboxClose = lightbox.querySelector('.close');

    const closeLightbox = () => {
        lightbox.classList.add('fade-out');
        setTimeout(() => {
            lightbox.classList.remove('active', 'fade-out');
            lightboxImg.src = '';
            lightboxImg.alt = '';
        }, 300);
    };

    lightbox.addEventListener('click', event => {
        if (event.target === lightbox) closeLightbox();
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    document.querySelectorAll('.gallery img').forEach(image => {
        image.addEventListener('click', () => {
            lightboxImg.src = image.currentSrc || image.src;
            lightboxImg.alt = image.alt;
            lightbox.classList.remove('fade-out');
            lightbox.classList.add('active');
        });
    });
}
