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

    // Mobile Dropdown Toggle
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const parent = toggle.closest('.nav-item.dropdown');
                parent.classList.toggle('active');

                // Optional: Close other dropdowns
                dropdownToggles.forEach(otherToggle => {
                    if (otherToggle !== toggle) {
                        otherToggle.closest('.nav-item.dropdown').classList.remove('active');
                    }
                });
            }
        });
    });

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

    // Standard FAQ Helper Functions
    const closeStandardFaq = (item) => {
        item.classList.remove('active');
        const answer = item.querySelector('.faq-answer');
        if (answer) {
            answer.style.maxHeight = null;
        }
    };

    const openStandardFaq = (item) => {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        if (answer) {
            answer.style.maxHeight = (answer.scrollHeight + 50) + "px"; // +50 buffer for padding
        }
    };

    faqQuestions.forEach(question => {
        question.addEventListener('click', (e) => {
            e.preventDefault();
            const item = question.parentElement;
            // Find container (e.g., .faq-category)
            const container = item.parentElement;

            // Allow for slightly different structures by finding closest container if needed?
            // But usually parentElement is safe.

            // Robustly select all potential items in this container
            const allItems = container.querySelectorAll('.faq-item, .faq-acc-item');

            const isAlreadyActive = item.classList.contains('active');

            // Close ALL other items
            allItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    closeStandardFaq(otherItem);
                }
            });

            // Toggle current item
            if (isAlreadyActive) {
                closeStandardFaq(item);
            } else {
                openStandardFaq(item);
            }
        });
    });

    // Modern FAQ Accordion
    const modernFaqQuestions = document.querySelectorAll('.faq-question-modern');

    // Helper to close an item
    const closeFaqItem = (item) => {
        item.classList.remove('active');
        const answer = item.querySelector('.faq-answer-modern');
        if (answer) {
            answer.style.maxHeight = null;
            answer.style.paddingTop = '0';
            answer.style.paddingBottom = '0';
        }
    };

    // Helper to open an item
    const openFaqItem = (item) => {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer-modern');
        if (answer) {
            // Reset padding to get accurate scrollHeight or set explicitly if needed
            // We'll set style to match CSS expected open state
            answer.style.paddingTop = '0px'; // actually we want the CSS padding to take effect? 
            // Better: reset style so CSS takes over, then calculate height
            answer.style.removeProperty('padding-top');
            answer.style.removeProperty('padding-bottom');

            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    };

    modernFaqQuestions.forEach(question => {
        question.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any weird default behaviors
            const currentItem = question.closest('.faq-item-modern');
            if (!currentItem) return;

            // Robust container finding: try specific class first, then fallback to direct parent
            let container = currentItem.closest('.faq-list-modern');
            if (!container) container = currentItem.parentElement;

            const allItems = container.querySelectorAll('.faq-item-modern');

            const isAlreadyActive = currentItem.classList.contains('active');

            // Close ALL items first
            allItems.forEach(item => {
                closeFaqItem(item);
            });

            // If it wasn't active before, open it now (toggle behavior)
            if (!isAlreadyActive) {
                openFaqItem(currentItem);
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
    const indicatorsContainer = document.getElementById('program-indicators');
    const cards = document.querySelectorAll('.program-highlight-card');

    if (carousel) {
        const scrollAmount = 350; // Adjust based on card width + gap

        // Navigation Buttons
        if (prevBtn && nextBtn) {
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

            // Toggle Arrows
            const toggleArrows = () => {
                prevBtn.style.opacity = carousel.scrollLeft <= 0 ? '0.5' : '1';
                prevBtn.style.pointerEvents = carousel.scrollLeft <= 0 ? 'none' : 'auto';

                const maxScroll = carousel.scrollWidth - carousel.clientWidth;
                nextBtn.style.opacity = carousel.scrollLeft >= maxScroll - 5 ? '0.5' : '1';
                nextBtn.style.pointerEvents = carousel.scrollLeft >= maxScroll - 5 ? 'none' : 'auto';
            };

            carousel.addEventListener('scroll', toggleArrows);
            window.addEventListener('resize', toggleArrows);
            toggleArrows();
        }

        // Indicators Logic
        if (indicatorsContainer && cards.length > 0) {
            // Generate dots
            cards.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('indicator-dot');
                if (index === 0) dot.classList.add('active');

                dot.addEventListener('click', () => {
                    const cardWidth = cards[0].offsetWidth + 30; // Width + gap
                    carousel.scrollTo({
                        left: index * cardWidth,
                        behavior: 'smooth'
                    });
                });

                indicatorsContainer.appendChild(dot);
            });

            // Update active dot on scroll
            const updateActiveDot = () => {
                const cardWidth = cards[0].offsetWidth + 30; // Width + gap
                const scrollPosition = carousel.scrollLeft;
                const activeIndex = Math.round(scrollPosition / cardWidth);

                const dots = document.querySelectorAll('.indicator-dot');
                dots.forEach((dot, index) => {
                    if (index === activeIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            };

            carousel.addEventListener('scroll', updateActiveDot);
        }
    }
});

// Video Playback Logic - Ensure only one video plays at a time
document.addEventListener('DOMContentLoaded', function () {
    const videos = document.querySelectorAll('video');

    videos.forEach(video => {
        video.addEventListener('play', () => {
            videos.forEach(otherVideo => {
                if (otherVideo !== video && !otherVideo.paused) {
                    otherVideo.pause();
                }
            });
        });
    });
});

// Testimonial Carousel Logic
document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const dotsContainer = document.getElementById('testimonial-dots');

    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

    let items = Array.from(track.children);
    let currentIndex = 0;

    // Function to setup carousel
    const setupCarousel = () => {
        dotsContainer.innerHTML = '';
        items = Array.from(track.children);

        items.forEach((item, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');

            dot.addEventListener('click', () => {
                goToSlide(index);
            });

            dotsContainer.appendChild(dot);
        });

        updateButtons(0);
    };

    const goToSlide = (index) => {
        const itemWidth = items[0].getBoundingClientRect().width;
        const gap = 30; // 30px gap from CSS
        const amountToMove = (itemWidth + gap) * index;

        track.style.transform = `translateX(-${amountToMove}px)`;
        currentIndex = index;

        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });

        updateButtons(index);
    };

    const updateButtons = (index) => {
        const containerWidth = track.parentElement.offsetWidth;
        const itemWidth = items[0].getBoundingClientRect().width;
        const itemsPerView = Math.floor(containerWidth / itemWidth);
        const maxIndex = Math.max(0, items.length - itemsPerView);

        if (prevBtn) {
            prevBtn.style.opacity = index === 0 ? '0.5' : '1';
            prevBtn.style.pointerEvents = index === 0 ? 'none' : 'auto';
        }

        if (nextBtn) {
            nextBtn.style.opacity = index >= maxIndex ? '0.5' : '1';
            nextBtn.style.pointerEvents = index >= maxIndex ? 'none' : 'auto';
        }
    };

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const containerWidth = track.parentElement.offsetWidth;
            const itemWidth = items[0].getBoundingClientRect().width;
            const itemsPerView = Math.floor(containerWidth / itemWidth); // Use floor to be safe
            const maxIndex = Math.max(0, items.length - itemsPerView);

            if (currentIndex < maxIndex) {
                goToSlide(currentIndex + 1);
            }
        });
    }

    // Handle Resize
    window.addEventListener('resize', () => {
        setupCarousel(); // Re-setup to handle itemsPerView changes if needed, or just update button state
        goToSlide(currentIndex);
    });

    // Initialize
    setTimeout(setupCarousel, 100);
});
