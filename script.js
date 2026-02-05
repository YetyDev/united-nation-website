document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            navbar.classList.toggle('mobile-open');
        });
    }

    // Scroll Effect for Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            navbar.classList.remove('mobile-open');
        });
    });

    // Hero Slider Animation
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    const slideInterval = 5000; // Change slide every 5 seconds

    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, slideInterval);
    }

    // FAQ Accordion (Supports both main FAQ page and Home page)
    const faqQuestions = document.querySelectorAll('.faq-question, .faq-acc-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            item.classList.toggle('active');

            // For the plus/minus icon toggle on home page if needed
            const icon = question.querySelector('i');
            if (icon && icon.classList.contains('fa-plus')) {
                // The icon rotation is handled by CSS, but we could swap classes if not using rotation
            }
        });
    });

    // FAQ Category Tabs
    const faqTabs = document.querySelectorAll('.faq-tab');
    const faqCategories = document.querySelectorAll('.faq-category');

    faqTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');

            // Update active tab
            faqTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show current category, hide others
            faqCategories.forEach(cat => {
                if (cat.getAttribute('data-category') === category) {
                    cat.style.display = 'block';
                } else {
                    cat.style.display = 'none';
                }
            });
        });
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter-number');
    const counterOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                let start = 0;
                const increment = target / (duration / 16); // 60fps

                const updateCount = () => {
                    if (start < target) {
                        start += increment;
                        counter.innerText = Math.ceil(start).toLocaleString() + '+';
                        setTimeout(updateCount, 16);
                    } else {
                        counter.innerText = target.toLocaleString() + '+';
                    }
                };

                updateCount();
                observer.unobserve(counter);
            }
        });
    }, counterOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    /* Counter Animation (Kept but without reveal dependency) */

    // Drag-to-Scroll for Program Highlights
    const slider = document.querySelector('.program-carousel');
    let isDown = false;
    let startX;
    let scrollLeft;

    if (slider) {
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            slider.style.scrollSnapType = 'none'; // Disable snapping while dragging
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.scrollSnapType = 'x mandatory';
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.scrollSnapType = 'x mandatory';
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    // Back to Top Logic
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Scroll Reveal Animation (Restored)
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up, .zoom-in');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});


// Program Carousel Slider
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('program-carousel');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');

    if (carousel && prevBtn && nextBtn) {
        const scrollAmount = 350; // Adjust based on card width + gap

        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // Optional: Hide/Show arrows based on scroll position
        const toggleArrows = () => {
            prevBtn.style.opacity = carousel.scrollLeft <= 0 ? '0.5' : '1';
            prevBtn.style.pointerEvents = carousel.scrollLeft <= 0 ? 'none' : 'auto';

            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            nextBtn.style.opacity = carousel.scrollLeft >= maxScroll - 5 ? '0.5' : '1';
            nextBtn.style.pointerEvents = carousel.scrollLeft >= maxScroll - 5 ? 'none' : 'auto';
        };

        carousel.addEventListener('scroll', toggleArrows);
        window.addEventListener('resize', toggleArrows);
        toggleArrows(); // Initial state
    }
});
