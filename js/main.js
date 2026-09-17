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
        threshold: 0.15
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
                // Number animation for stat boxes
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
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Map existing animation classes to AOS
    document.querySelectorAll('.slide-in-bottom').forEach(el => el.setAttribute('data-aos', 'fade-up'));
    document.querySelectorAll('.slide-in-left').forEach(el => el.setAttribute('data-aos', 'fade-right'));
    document.querySelectorAll('.slide-in-right').forEach(el => el.setAttribute('data-aos', 'fade-left'));

    // Animate cards coming from sides (Staggered effect by mapping index to delay)
    const animateFromSides = (selector, defaultDir) => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.setAttribute('data-aos', index % 2 === 0 ? 'fade-right' : 'fade-left');
            el.setAttribute('data-aos-delay', (index % 4) * 100);
        });
    };
    
    animateFromSides('.feature-card');
    animateFromSides('.cap-card');
    animateFromSides('.solution-card, .solution-card-new');
    
    // Observe stat boxes for number counting
    document.querySelectorAll('.stat-box').forEach((el, index) => {
        el.setAttribute('data-aos', 'fade-up');
        el.setAttribute('data-aos-delay', (index % 4) * 100);
        observer.observe(el);
    });
});
