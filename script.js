document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // Nav Background Transition on Scroll
    const nav = document.querySelector('.glass-nav');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(15, 17, 16, 0.5)';
            nav.style.padding = '20px 60px'; /* Keep padding consistent or slightly reduce */
            nav.style.borderBottom = '1px solid var(--glass-border)';
            scrollIndicator.style.opacity = '0';
        } else {
            nav.style.background = 'rgba(15, 17, 16, 0.0)'; /* Transparent at top */
            nav.style.padding = '30px 60px';
            nav.style.borderBottom = '1px solid transparent';
            scrollIndicator.style.opacity = '0.6';
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });


    // Typewriter Effect
    const typewriterElement = document.querySelector('.typewriter-text');

    if (typewriterElement) {
        // Get text, replace newlines/tabs with space, and collapse multiple spaces to one
        const textToType = typewriterElement.textContent.replace(/\s+/g, ' ').trim();
        typewriterElement.textContent = ''; // Clear it initially

        const typeWriterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startTyping(entry.target, textToType);
                    typeWriterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 }); // Start when 50% visible

        typeWriterObserver.observe(typewriterElement);
    }

    function startTyping(element, text) {
        element.innerHTML = ''; // Ensure clear start
        const bioBar = document.querySelector('.bio-bar');
        if (bioBar) bioBar.style.height = '0px'; // Reset bar height

        // Pre-render all characters as invisible spans to lock layout
        const chars = text.split('').map(char => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            element.appendChild(span);
            return span;
        });

        let i = 0;
        const speed = 25; // Speed in ms

        function type() {
            if (i < chars.length) {
                // Reveal character
                chars[i].style.opacity = '1';

                // Update bar height to match the bottom of the current character
                if (bioBar) {
                    const currentHeight = chars[i].offsetTop + chars[i].offsetHeight;
                    bioBar.style.height = `${currentHeight}px`;
                }

                i++;
                setTimeout(() => requestAnimationFrame(type), speed);
            }
        }
        type();
    }

    // Mobile Optimization Notice Logic
    const mobileNotice = document.getElementById('mobile-notice');

    if (mobileNotice) {
        // Show notice only on mobile screens (width <= 1024px to cover tablets too)
        if (window.innerWidth <= 1024) {
            mobileNotice.style.display = 'flex';
            // Force reflow to ensure transition works
            void mobileNotice.offsetWidth;
            // Add a small delay before showing the notice for better UX
            setTimeout(() => {
                mobileNotice.classList.add('show');

                // Auto-hide the notice after 5 seconds
                setTimeout(() => {
                    mobileNotice.classList.remove('show');
                    setTimeout(() => {
                        mobileNotice.style.display = 'none';
                    }, 400); // Wait for CSS transition opacity to fade out
                }, 5000);

            }, 100);
        }
    }
});
