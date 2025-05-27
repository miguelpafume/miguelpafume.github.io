function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.style.display = 'none';
    });

    const selectedSection = document.getElementById(sectionId);

    if (selectedSection) {
        sessionStorage.setItem('currentSection', sectionId);
        selectedSection.style.display = 'block';
    }

    if (sectionId == 'resume') {
        document.getElementById('download-btn').style.display = 'inline-flex';
    } else {
        document.getElementById('download-btn').style.display = 'none';
    }
}

document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        const sectionId = this.getAttribute('href').substring(1); // Get the section ID
        showSection(sectionId); // Show the selected section
    });
});

window.onload = function () {
    const savedSection = sessionStorage.getItem('currentSection');
    if (savedSection) {
        showSection(savedSection);
    } else {
        showSection('home');
    }
};

const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

// Handle click outside the image to close
lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
        lightbox.classList.remove('fade-in');
        lightbox.classList.add('fade-out');

        setTimeout(() => {
            lightbox.classList.remove('active', 'fade-out');
            lightbox.innerHTML = '';
        }, 300); // Match this to your CSS animation duration
    }
});

// Setup images
const images = document.querySelectorAll('.gallery img');
images.forEach(image => {
    image.style.cursor = 'zoom-in';
    image.addEventListener('click', () => {
        const img = document.createElement('img');
        img.src = image.src;

        lightbox.innerHTML = ''; // Clear previous content
        lightbox.appendChild(img);
        lightbox.classList.add('active', 'fade-in');
        lightbox.classList.remove('fade-out');
    });
});
