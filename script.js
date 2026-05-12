// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Navbar Scroll Interaction (Hide on scroll down, show on scroll up)
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        if (scrollTop > lastScrollTop) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }
    } else {
        navbar.classList.remove('nav-hidden');
    }
    
    // Smooth padding transition
    if (scrollTop > 50) {
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.style.padding = '1rem 0';
    }
    
    lastScrollTop = scrollTop;
});

// Service Card Booking Logic
const serviceCards = document.querySelectorAll('.service-card');
const bookingSection = document.getElementById('booking');
const serviceTitle = document.getElementById('selected-service-title');
const serviceName = document.getElementById('selected-service-name');
const whatsappBtn = document.getElementById('whatsapp-btn');

serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        const service = card.getAttribute('data-service');
        
        // Show booking section
        bookingSection.style.display = 'block';
        serviceTitle.innerText = service;
        serviceName.innerText = service;
        
        // Update WhatsApp Link
        const message = encodeURIComponent(`Hi Sticky Creatives! I'm interested in your ${service} services. Let's discuss!`);
        whatsappBtn.href = `https://wa.me/254723973677?text=${message}`;
        
        // Scroll to booking section
        window.scrollTo({
            top: bookingSection.offsetTop - 100,
            behavior: 'smooth'
        });
    });
});

// Reveal Animations on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate').forEach(el => {
    observer.observe(el);
});

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});
