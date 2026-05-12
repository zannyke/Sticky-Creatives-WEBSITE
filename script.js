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
        navbar.style.padding = '0.3rem 0';
    } else {
        navbar.style.padding = '0.6rem 0';
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

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('user-name').value;
        const email = document.getElementById('user-email').value;
        const message = document.getElementById('user-message').value;
        
        const selectedServices = [];
        document.querySelectorAll('input[name="service"]:checked').forEach(cb => {
            selectedServices.push(cb.value);
        });
        
        const servicesText = selectedServices.length > 0 ? selectedServices.join(', ') : 'No specific service selected';
        
        const subject = encodeURIComponent(`New Project Inquiry from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Services Interested: ${servicesText}\n\n` +
            `Message:\n${message}`
        );
        
        const mailtoLink = `mailto:samwuelkaranja6991@gmail.com?subject=${subject}&body=${body}`;
        
        window.location.href = mailtoLink;
    });
}// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});
