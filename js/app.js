function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.style.display = 'none';
    });

    const selectedSection = document.getElementById(sectionId);

    if (selectedSection) {
        selectedSection.style.display = 'block';
    }

    if (sectionId == 'resume') {
        document.getElementById('download-btn').style.display = 'inline-flex';
    } else {
        document.getElementById('download-btn').style.display = 'none';
    }

    // Save the current section in localStorage
    localStorage.setItem('currentSection', sectionId);
}

document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        const sectionId = this.getAttribute('href').substring(1); // Get the section ID
        showSection(sectionId); // Show the selected section
    });
});

window.onload = function() {
    const savedSection = localStorage.getItem('currentSection');
    if (savedSection) {
        showSection(savedSection);
    } else {
        showSection('home');
    }
};

document.getElementById("download-btn").addEventListener("click", () => {
    fetch("resume.html")
        .then(response => response.text())
        .then(html => {
            const container = document.createElement("div");
            container.innerHTML = html;
            container.style.display = "none"; // hide the content
            document.body.appendChild(container);

            html2pdf()
                .set({
                    margin: 0.5,
                    filename: 'curriculo-miguel.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
                })
                .from(container)
                .save()
                .then(() => document.body.removeChild(container));
        })
        .catch(error => {
            console.error("ERROR:", error);
        });
});