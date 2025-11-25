// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate stats on scroll
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const hasPlus = text.includes('+');
                const hasPercent = text.includes('%');
                const hasSlash = text.includes('/');
                
                let finalNumber;
                if (hasSlash) {
                    // Handle ratings like "4.9/5"
                    finalNumber = parseFloat(text);
                    animateRating(target, finalNumber);
                } else {
                    finalNumber = parseInt(text.replace(/[^0-9.]/g, ''));
                    animateNumber(target, finalNumber, hasPlus, hasPercent);
                }
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
};

// Animate number counting
const animateNumber = (element, target, hasPlus, hasPercent) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (hasPercent) {
            element.textContent = displayValue + '%';
        } else if (hasPlus) {
            element.textContent = displayValue.toLocaleString() + '+';
        } else {
            element.textContent = displayValue.toLocaleString();
        }
    }, 30);
};

// Animate rating numbers
const animateRating = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = current.toFixed(1) + '/5';
    }, 30);
};

// Add fade-in animation to feature cards on scroll
const animateFeatures = () => {
    const cards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
};

// Handle CTA button clicks
const handleCTAClicks = () => {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Only prevent default if it's a # link
            if (button.getAttribute('href') === '#') {
                e.preventDefault();
                
                // Add a pulse animation
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 150);
                
                // You can add your form submission or modal logic here
                console.log('CTA button clicked!');
                
                // Example: Show an alert (replace with your actual functionality)
                alert('Thanks for your interest! This is where you would redirect to a signup form.');
            }
        });
    });
};

// Add scroll progress indicator
const addScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.prepend(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateStats();
    animateFeatures();
    handleCTAClicks();
    addScrollProgress();
    
    console.log('Landing page loaded successfully! 🚀');
});