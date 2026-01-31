// Smooth Scroll to Top Function
function scrollToTop(event) {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// WhatsApp Modal Functions
function openWhatsAppModal() {
    document.getElementById('whatsappModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeWhatsAppModal() {
    document.getElementById('whatsappModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openWhatsAppDirect(phoneNumber) {
    const message = encodeURIComponent('Hello Moon Gems, I am enquiring regarding gemstone availability for trade. Kindly let me know the next steps.');
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
    closeWhatsAppModal();
}

// Contact Form Modal Functions
function openContactModal() {
    document.getElementById('contactModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    document.getElementById('contactModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    // Reset form and messages
    document.getElementById('contactForm').reset();
    document.getElementById('formSuccess').style.display = 'none';
    document.getElementById('formError').style.display = 'none';
    document.getElementById('contactForm').style.display = 'block';
}

// WhatsApp Function (Legacy - redirect to modal)
function openWhatsApp(country) {
    openWhatsAppModal();
}

// Smooth Scroll Function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // WhatsApp Modal Close Handlers
    const whatsappModal = document.getElementById('whatsappModal');
    const contactModal = document.getElementById('contactModal');
    
    // Close modals on outside click
    window.onclick = function(event) {
        if (event.target === whatsappModal) {
            closeWhatsAppModal();
        }
        if (event.target === contactModal) {
            closeContactModal();
        }
    };
    
    // Close modals on ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (whatsappModal.style.display === 'block') {
                closeWhatsAppModal();
            }
            if (contactModal.style.display === 'block') {
                closeContactModal();
            }
        }
    });

    // Contact Form Submission (using mailto as fallback)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone') || 'Not provided',
                gemstone: formData.get('gemstone') || 'Not specified',
                message: formData.get('message')
            };
            
            // Create mailto link as fallback
            const subject = encodeURIComponent(`Gemstone Enquiry from ${data.name}`);
            const body = encodeURIComponent(
                `Name: ${data.name}\n` +
                `Email: ${data.email}\n` +
                `Phone: ${data.phone}\n` +
                `Gemstone Interest: ${data.gemstone}\n\n` +
                `Message:\n${data.message}`
            );
            
            const mailtoLink = `mailto:trade@moongemsglobal.com?subject=${subject}&body=${body}`;
            
            // Open mailto and show success
            window.location.href = mailtoLink;
            
            // Show success message
            document.getElementById('contactForm').style.display = 'none';
            document.getElementById('formSuccess').style.display = 'block';
            
            // Auto-close after 3 seconds
            setTimeout(() => {
                closeContactModal();
            }, 3000);
        });
    }

    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.pillar-card, .trade-card, .gallery-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Parallax effect for floating gems
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const gems = document.querySelectorAll('.floating-gem');
        
        gems.forEach((gem, index) => {
            const speed = (index + 1) * 0.05;
            gem.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Add hover effect to cards
    const cards = document.querySelectorAll('.pillar-card, .trade-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Smooth reveal for hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }

    // Add sparkle effect to title on hover
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 30px rgba(212, 175, 55, 0.5)';
            this.style.transition = 'text-shadow 0.3s ease';
        });
        
        heroTitle.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
        });
    }

    // Add active state to nav links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Add cursor glow effect
document.addEventListener('mousemove', (e) => {
    const glow = document.createElement('div');
    glow.style.position = 'fixed';
    glow.style.width = '400px';
    glow.style.height = '400px';
    glow.style.borderRadius = '50%';
    glow.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 0.03) 0%, transparent 70%)';
    glow.style.pointerEvents = 'none';
    glow.style.left = (e.clientX - 200) + 'px';
    glow.style.top = (e.clientY - 200) + 'px';
    glow.style.zIndex = '0';
    glow.id = 'cursor-glow';
    
    // Remove existing glow
    const existingGlow = document.getElementById('cursor-glow');
    if (existingGlow) {
        existingGlow.remove();
    }
    
    document.body.appendChild(glow);
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});