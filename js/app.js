// Function to show the selected section and hide others
function showSection(sectionId) {
    // Get all sections
    const sections = document.querySelectorAll('section'); // Include main divs if needed
    
    // Hide all sections
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }

    // Save the current section in localStorage
    localStorage.setItem('currentSection', sectionId);
}

// Event listeners for navigation links
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        const sectionId = this.getAttribute('href').substring(1); // Get the section ID
        showSection(sectionId); // Show the selected section
    });
});

// On page load, check if there's a saved section in localStorage
window.onload = function() {
    const savedSection = localStorage.getItem('currentSection');
    if (savedSection) {
        showSection(savedSection); // Show the saved section
    } else {
        showSection('home'); // Default to home if no section is saved
    }
};