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
            nav.style.background = 'rgba(15, 17, 16, 0.8)';
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
        const textToType = typewriterElement.textContent.trim(); // Get the original text
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
        let i = 0;
        element.textContent = ''; // Ensure clear start
        const speed = 30; // ms per character

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
});
