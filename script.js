// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Profile Picture Upload
    const fileInput = document.getElementById('fileInput');
    const profileImage = document.getElementById('profileImage');

    // Event listener for file input change
    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImage.src = e.target.result;
                localStorage.setItem('profileImage', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Load saved profile image
    const savedProfileImage = localStorage.getItem('profileImage');
    if (savedProfileImage) {
        profileImage.src = savedProfileImage;
    }

    // Form Submission
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form from submitting the default way

        const formData = new FormData(contactForm);
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                alert('Thank you for your message!');
                contactForm.reset(); // Clear the form fields
            } else {
                alert('There was a problem with your submission. Please try again.');
            }
        }).catch(error => {
            alert('There was an error. Please try again.');
        });
    });

    //Add toggle function
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('hidden'); // Toggle the menu visibility
        navToggle.textContent = navMenu.classList.contains('hidden') ? '☰' : '✖'; // Change icon between hamburger and close (X)
    });

    // Close the menu when a link is clicked (optional)
    navMenu.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') { // Check if a link was clicked
            navMenu.classList.add('hidden'); // Hide the menu
            navToggle.textContent = '☰'; // Revert to hamburger icon
        }
    });

});
