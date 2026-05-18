function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });

    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        sessionStorage.setItem('currentSection', sectionId);
        selectedSection.style.display = 'block';
    }

    const downloadBtn = document.getElementById('download-btn');
    downloadBtn.style.display = sectionId === 'resume' ? 'inline-flex' : 'none';
}

document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        showSection(link.getAttribute('href').substring(1));
    });
});

window.addEventListener('load', () => {
    showSection(sessionStorage.getItem('currentSection') || 'home');
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = lightbox.querySelector('.close');

function closeLightbox() {
    lightbox.classList.add('fade-out');
    setTimeout(() => {
        lightbox.classList.remove('active', 'fade-out');
        lightboxImg.src = '';
    }, 300);
}

lightbox.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
});

lightboxClose.addEventListener('click', closeLightbox);

document.querySelectorAll('.gallery img').forEach(image => {
    image.addEventListener('click', () => {
        lightboxImg.src = image.src;
        lightbox.classList.remove('fade-out');
        lightbox.classList.add('active');
    });
});
