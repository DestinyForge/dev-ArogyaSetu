// Professional JavaScript for ArogyaSetu Website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupIntersectionObserver();
    setupSymptomSuggestion(); // ✅ added for fetching from JSON
});

// Main initialization function
function initializeWebsite() {
    setupMobileMenu();
    setupScrollEffects();
    setupSmoothScrolling();
    setupButtonHandlers();
    setupAnimations();
    setupAccessibility();
}

// Mobile menu functionality
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', function() {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';

        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', !isExpanded);

        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

// Symptom Suggestion Logic (from JSON)
function setupSymptomSuggestion() {
    const input = document.getElementById('symptom-input');
    const button = document.getElementById('getSuggestionsBtn');
    const list = document.getElementById('suggestions');

    if (!input || !button || !list) return;

    button.addEventListener('click', () => {
        const symptomQuery = input.value.trim().toLowerCase();
        list.innerHTML = '';

        if (!symptomQuery) {
            list.innerHTML = '<li>Please enter a symptom first.</li>';
            return;
        }

        fetch('symptomTestData.json')
            .then(response => response.json())
            .then(data => {
                const matchedTests = data[symptomQuery];

                if (matchedTests && matchedTests.length) {
                    matchedTests.forEach(test => {
                        const li = document.createElement('li');
                        li.textContent = test;
                        list.appendChild(li);
                    });
                } else {
                    list.innerHTML = '<li>No test suggestions found for the entered symptom.</li>';
                }
            })
            .catch(err => {
                list.innerHTML = '<li>Error fetching suggestions. Please try again later.</li>';
                console.error('Error:', err);
            });
    });
}

// The rest of your original JavaScript remains unchanged...

// Header scroll effects
function setupScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            header.style.background = 'rgba(79, 70, 229, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #4F46E5 0%, #6366f1 100%)';
            header.style.backdropFilter = 'none';
        }

        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = currentScrollY * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }

        lastScrollY = currentScrollY;
    }, { passive: true });
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

function setupButtonHandlers() {
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            showNotification('Login functionality will be implemented here!', 'info');
        });
    }

    const signupBtn = document.querySelector('.btn-signup');
    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            showNotification('Sign up functionality will be implemented here!', 'info');
        });
    }

    const getStartedBtn = document.querySelector('.btn-primary');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            showNotification('Get Started functionality will be implemented here!', 'success');
        });
    }
}

function setupAnimations() {
    const interactiveElements = document.querySelectorAll('.btn, .nav-link, .service-card');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    const heroTitle = document.querySelector('#hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.animation = 'float 2s ease-in-out infinite';
        });

        logo.addEventListener('mouseleave', function() {
            this.style.animation = 'heartbeat 2s infinite';
        });
    }
}

function setupAccessibility() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');

            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }
    });

    const focusableElements = document.querySelectorAll('button, a, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #4F46E5';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" aria-label="Close notification">×</button>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#4F46E5'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });

    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
}

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

const optimizedScrollHandler = debounce(function() {}, 16);
window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) scale(1.02); }
        50% { transform: translateY(-10px) scale(1.02); }
    }
    .service-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    .service-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(additionalStyles);
