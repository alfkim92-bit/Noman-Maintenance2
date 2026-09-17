document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Function to animate numbers
    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + (obj.dataset.suffix || '');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's a stat-box, trigger number animation
                if(entry.target.classList.contains('stat-box') && !entry.target.classList.contains('animated-number')) {
                    entry.target.classList.add('animated-number');
                    const h3 = entry.target.querySelector('h3');
                    if(h3) {
                        const text = h3.innerText;
                        const number = parseInt(text.replace(/[^0-9]/g, ''));
                        const suffix = text.replace(/[0-9]/g, '');
                        if(!isNaN(number)) {
                            h3.dataset.suffix = suffix;
                            animateValue(h3, 0, number, 2000);
                        }
                    }
                }
                
                // Unobserve after animating
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Select all elements with slide-in classes and stat boxes
    const animatedElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-bottom, .stat-box, .feature-card, .project-card, .solution-card, .content-gallery img');
    
    animatedElements.forEach((el, index) => {
        // Add staggered delay for feature cards
        if(el.classList.contains('feature-card') || el.classList.contains('solution-card')) {
            if(!el.classList.contains('slide-in-left') && !el.classList.contains('slide-in-right') && !el.classList.contains('slide-in-bottom')) {
                el.classList.add('slide-in-bottom');
            }
            el.style.transitionDelay = `${(index % 3) * 0.15}s`;
        }
        if(el.classList.contains('project-card')) {
            if(!el.classList.contains('slide-in-left') && !el.classList.contains('slide-in-right') && !el.classList.contains('slide-in-bottom')) {
                el.classList.add('slide-in-bottom');
            }
        }
        if(el.classList.contains('stat-box')) {
            if(!el.classList.contains('slide-in-left') && !el.classList.contains('slide-in-right') && !el.classList.contains('slide-in-bottom')) {
                el.classList.add('slide-in-bottom');
            }
            el.style.transitionDelay = `${(index % 4) * 0.15}s`;
        }
        if(el.tagName === 'IMG' && el.parentElement.classList.contains('content-gallery')) {
            el.classList.add('slide-in-bottom');
            el.style.transitionDelay = `${(index % 4) * 0.1}s`;
        }
        observer.observe(el);
    });
});
