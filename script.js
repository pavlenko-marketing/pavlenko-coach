// ===================================
// NAVIGATION FUNCTIONALITY
// ===================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// FAQ ACCORDION
// ===================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
animatedElements.forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});

// ===================================
// FORM VALIDATION (if you add a form)
// ===================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===================================
// SCROLL TO TOP BUTTON (optional)
// ===================================

function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    
    // Styles for the button
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--deep-teal);
            color: var(--white);
            border: none;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 999;
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            background: var(--deep-teal-dark);
            transform: translateY(-3px);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
        }
        
        @media (max-width: 768px) {
            .scroll-to-top {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
                font-size: 20px;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// ===================================
// LOADING ANIMATION
// ===================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===================================
// PARALLAX EFFECT (optional)
// ===================================

function addParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Uncomment to enable parallax
// addParallaxEffect();

// ===================================
// TESTIMONIAL CAROUSEL (optional enhancement)
// ===================================

function initTestimonialCarousel() {
    const testimonialGrid = document.querySelector('.testimonials-grid');
    if (!testimonialGrid || window.innerWidth > 768) return;
    
    let currentIndex = 0;
    const cards = testimonialGrid.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;
    
    // Create navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'testimonial-dots';
    dotsContainer.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 30px;
    `;
    
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('button');
        dot.className = 'dot';
        dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        dot.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid var(--deep-teal);
            background: transparent;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        if (i === 0) {
            dot.style.background = 'var(--deep-teal)';
        }
        
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel();
        });
        
        dotsContainer.appendChild(dot);
    }
    
    testimonialGrid.parentElement.appendChild(dotsContainer);
    
    function updateCarousel() {
        cards.forEach((card, index) => {
            card.style.display = index === currentIndex ? 'flex' : 'none';
        });
        
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.style.background = index === currentIndex ? 'var(--deep-teal)' : 'transparent';
        });
    }
    
    // Initialize
    updateCarousel();
    
    // Auto-advance (optional)
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    }, 5000);
}

// Initialize on mobile
if (window.innerWidth <= 768) {
    initTestimonialCarousel();
}

// ===================================
// COUNTER ANIMATION (for stats if added)
// ===================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ===================================
// LAZY LOADING FOR IMAGES (if you add real images)
// ===================================

function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// ===================================
// CTA BUTTON TRACKING (for analytics)
// ===================================

const ctaButtons = document.querySelectorAll('.cta-button, .pricing-button');

ctaButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        // Track button click (integrate with your analytics)
        console.log(`CTA Button clicked: ${button.textContent.trim()}`);
        
        // Example: Google Analytics event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                'event_category': 'CTA',
                'event_label': button.textContent.trim(),
                'value': index
            });
        }
    });
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Use debounced scroll events for better performance
const debouncedScroll = debounce(() => {
    // Any scroll-based updates
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Add skip to main content link
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#hero';
    skipLink.textContent = 'Перейти до основного вмісту';
    skipLink.className = 'skip-link';
    
    const style = document.createElement('style');
    style.textContent = `
        .skip-link {
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--deep-teal);
            color: var(--white);
            padding: 8px 16px;
            text-decoration: none;
            z-index: 9999;
        }
        
        .skip-link:focus {
            top: 0;
        }
    `;
    
    document.head.appendChild(style);
    document.body.insertBefore(skipLink, document.body.firstChild);
}

addSkipLink();

// Keyboard navigation for cards
const interactiveCards = document.querySelectorAll('.card, .pricing-card, .testimonial-card');
interactiveCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            card.click();
        }
    });
});

// ===================================
// FORM HANDLING (for when you add contact form)
// ===================================

function handleFormSubmission() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Add loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Відправка...';
            submitBtn.disabled = true;
            
            try {
                // Replace with your actual endpoint
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                
                if (response.ok) {
                    // Success message
                    showNotification('Дякуємо! Ваше повідомлення відправлено.', 'success');
                    form.reset();
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                showNotification('Виникла помилка. Спробуйте ще раз.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            background: var(--white);
            box-shadow: var(--shadow-medium);
            z-index: 9999;
            animation: slideInRight 0.3s ease;
        }
        
        .notification-success {
            border-left: 4px solid #4CAF50;
        }
        
        .notification-error {
            border-left: 4px solid #f44336;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===================================
// INITIALIZE ALL FEATURES
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎉 Landing page loaded successfully!');
    
    // Initialize any additional features here
    handleFormSubmission();
    
    // Add custom cursor effect (optional)
    // addCustomCursor();
});

// ===================================
// CONSOLE EASTER EGG
// ===================================

console.log('%c👋 Привіт!', 'font-size: 24px; font-weight: bold; color: #2B6B6B;');
console.log('%cЯкщо ви читаєте це, значить вам цікаво, як працює цей сайт. Я теж люблю розбиратися в коді! 😊', 'font-size: 14px; color: #666;');
console.log('%cІнна - Коучинг Переходів', 'font-size: 16px; font-weight: bold; color: #2B6B6B;');

// ===================================
// EXPORT FOR TESTING (if needed)
// ===================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        animateCounter,
        showNotification
    };
}