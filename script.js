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
                if (entry.target.hasAttribute('data-once')) {
                    observer.unobserve(entry.target);
                }
            } else {
                if (!entry.target.hasAttribute('data-once')) {
                    entry.target.classList.remove('visible');
                }
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

    // Bio Section Reveal
    const bioContainer = document.querySelector('.bio-container');
    if (bioContainer) {
        const bioObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    bioObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        bioObserver.observe(bioContainer);
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

    // GSAP Projects Showcase Logic
    const data = [
        {
            place: 'Project 1',
            title: 'PedalPull',
            title2: '',
            description: 'A product design case study focused on solving complex user problems through iterative design and testing.',
            image: 'assets/images/pedalpull.png'
        },
        {
            place: 'Project 2',
            title: 'NCW Redesign',
            title2: '',
            description: 'Designing intuitive experiences that balance user needs and business goals with careful prototyping.',
            image: 'assets/images/ncw.png'
        },
        {
            place: 'Project 3',
            title: 'CraftSphere',
            title2: '',
            description: 'A research-driven redesign aimed at improving usability and engagement across digital touchpoints.',
            image: 'https://placehold.co/800x600/1a1a2e/21d4fd?text=Project+3'
        },
        {
            place: 'Project 4',
            title: 'Feedo',
            title2: '',
            description: 'Transforming insights into seamless digital experiences through interactive prototyping and user testing.',
            image: 'https://placehold.co/800x600/1a1a2e/21d4fd?text=Project+4'
        }
    ];

    const container = document.getElementById('projects-showcase');
    if (container && window.gsap) {
        const _ = (id) => document.getElementById(id);

        const cards = data.map((i, index) => `<div class="card" id="card${index}" style="background-image:url(${i.image})"></div>`).join('');
        const cardContents = data.map((i, index) => `<div class="card-content" id="card-content-${index}">
            <div class="content-title">${i.title} ${i.title2}</div>
        </div>`).join('');
        const slideNumbers = data.map((_, index) => `<div class="item" id="slide-item-${index}">${index + 1}</div>`).join('');

        _('demo').innerHTML = cards + cardContents;
        _('slide-numbers').innerHTML = slideNumbers;

        // Populate Mobile Projects
        const mobileContainer = document.getElementById('mobile-projects');
        if (mobileContainer) {
            const mobileHTML = data.map(item => `
                <div class="mobile-project-card">
                    <div class="mobile-project-image" style="background-image: url(${item.image})"></div>
                    <div class="mobile-project-details">
                        <div class="place-box">${item.place}</div>
                        <div class="title">${item.title} ${item.title2}</div>
                        <div class="desc">${item.description}</div>
                        <a href="#" class="view-project-btn">View Project</a>
                    </div>
                </div>
            `).join('');
            mobileContainer.innerHTML = mobileHTML;
        }

        const set = gsap.set;

        function getCard(index) { return `#card${index}`; }
        function getCardContent(index) { return `#card-content-${index}`; }
        function getSliderItem(index) { return `#slide-item-${index}`; }

        function animate(target, duration, properties) {
            return new Promise((resolve) => {
                gsap.to(target, {
                    ...properties,
                    duration: duration,
                    onComplete: resolve,
                });
            });
        }

        let order = [0, 1, 2, 3];
        let detailsEven = true;

        let offsetTop = 200;
        let offsetLeft = 700;
        let cardWidth = 200;
        let cardHeight = 300;
        let gap = 40;
        let numberSize = 50;
        const ease = "sine.inOut";

        let activeWidth, activeHeight, activeX, activeY;

        function updateDimensionsAndOffsets() {
            const rect = container.getBoundingClientRect();
            const width = rect.width || 950;
            const height = rect.height || 450;

            if (window.innerWidth <= 768) {
                cardWidth = 80;
                cardHeight = 60;
                gap = 10;
                activeWidth = width;
                activeHeight = activeWidth * 0.75;
                activeX = 0;
                activeY = 0;
            } else if (window.innerWidth <= 1024) {
                cardWidth = 120;
                cardHeight = 90;
                gap = 15;
                activeWidth = width - 350; // text width
                activeHeight = height;
                activeX = 350;
                activeY = 0;
            } else {
                cardWidth = 160;
                cardHeight = 120;
                gap = 20;
                activeWidth = width - 350; // text width
                activeHeight = height;
                activeX = 350;
                activeY = 0;
            }

            offsetTop = height - cardHeight + 60; // Pushed below active image
            offsetLeft = width - (3 * (cardWidth + gap)) + gap;

            return { width, height };
        }

        function init() {
            const [active, ...rest] = order;
            const detailsActive = detailsEven ? "#details-even" : "#details-odd";
            const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
            const { width, height } = updateDimensionsAndOffsets();

            gsap.set("#pagination", {
                top: height + 30, // Position it below the container
                left: 20, // Align it to the left (20px padding)
                y: 50,
                opacity: 0,
                zIndex: 60,
            });

            gsap.set(getCard(active), {
                x: activeX,
                y: activeY,
                width: activeWidth,
                height: activeHeight,
                borderRadius: window.innerWidth > 768 ? '0 20px 20px 0' : '20px 20px 0 0'
            });
            gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
            gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
            gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
            gsap.set(`${detailsInactive} .text`, { y: 100 });
            gsap.set(`${detailsInactive} .title-1`, { y: 100 });
            gsap.set(`${detailsInactive} .title-2`, { y: 100 });
            gsap.set(`${detailsInactive} .desc`, { y: 50 });
            gsap.set(`${detailsInactive} .cta`, { y: 60 });

            gsap.set(".progress-sub-foreground", {
                width: 200 * (1 / order.length) * (active + 1), // 200 is width of progress bg
            });

            rest.forEach((i, index) => {
                gsap.set(getCard(i), {
                    x: offsetLeft + 400 + index * (cardWidth + gap), // Start further right for intro animation
                    y: offsetTop,
                    width: cardWidth,
                    height: cardHeight,
                    zIndex: 30,
                    borderRadius: 10,
                });
                gsap.set(getCardContent(i), {
                    x: offsetLeft + 400 + index * (cardWidth + gap),
                    y: offsetTop + cardHeight + 10,
                    width: cardWidth,
                    height: 'auto',
                    zIndex: 40,
                    display: 'block',
                });
                gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
            });

            gsap.set(".indicator", { x: -width });

            const startDelay = 0.6;

            rest.forEach((i, index) => {
                gsap.to(getCard(i), {
                    x: offsetLeft + index * (cardWidth + gap),
                    zIndex: 30,
                    ease,
                    delay: startDelay + 0.05 * index,
                });
                gsap.to(getCardContent(i), {
                    x: offsetLeft + index * (cardWidth + gap),
                    zIndex: 40,
                    ease,
                    delay: startDelay + 0.05 * index,
                });
            });
            gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });

            // Populate active details
            document.querySelector(`${detailsActive} .place-box .text`).textContent = data[active].place;
            document.querySelector(`${detailsActive} .title-1`).textContent = data[active].title;
            document.querySelector(`${detailsActive} .title-2`).textContent = data[active].title2;
            document.querySelector(`${detailsActive} .desc`).textContent = data[active].description;

            gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
        }

        let isAnimating = false;

        function step() {
            return new Promise((resolve) => {
                if (isAnimating) return resolve();
                isAnimating = true;

                order.push(order.shift());
                detailsEven = !detailsEven;

                const detailsActive = detailsEven ? "#details-even" : "#details-odd";
                const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

                document.querySelector(`${detailsActive} .place-box .text`).textContent = data[order[0]].place;
                document.querySelector(`${detailsActive} .title-1`).textContent = data[order[0]].title;
                document.querySelector(`${detailsActive} .title-2`).textContent = data[order[0]].title2;
                document.querySelector(`${detailsActive} .desc`).textContent = data[order[0]].description;

                gsap.set(detailsActive, { zIndex: 22 });
                gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
                gsap.to(`${detailsActive} .text`, { y: 0, delay: 0.1, duration: 0.7, ease });
                gsap.to(`${detailsActive} .title-1`, { y: 0, delay: 0.15, duration: 0.7, ease });
                gsap.to(`${detailsActive} .title-2`, { y: 0, delay: 0.15, duration: 0.7, ease });
                gsap.to(`${detailsActive} .desc`, { y: 0, delay: 0.3, duration: 0.4, ease });
                gsap.to(`${detailsActive} .cta`, { y: 0, delay: 0.35, duration: 0.4, ease });

                gsap.set(detailsInactive, { zIndex: 12 });

                const [active, ...rest] = order;
                const prv = rest[rest.length - 1]; // The one that was just active

                gsap.set(getCard(prv), { zIndex: 10 });
                gsap.set(getCard(active), { zIndex: 20 });
                gsap.to(getCard(prv), { scale: 1.2, ease });

                gsap.to(getCardContent(active), {
                    y: offsetTop + cardHeight - 10,
                    opacity: 0,
                    duration: 0.3,
                    ease,
                });
                gsap.to(getSliderItem(active), { x: 0, ease });
                gsap.to(getSliderItem(prv), { x: -numberSize, ease });
                gsap.to(".progress-sub-foreground", {
                    width: 200 * (1 / order.length) * (active + 1),
                    ease,
                });

                const { width, height } = updateDimensionsAndOffsets();

                gsap.to(getCard(active), {
                    x: activeX,
                    y: activeY,
                    ease,
                    width: activeWidth,
                    height: activeHeight,
                    borderRadius: window.innerWidth > 768 ? '0 20px 20px 0' : '20px 20px 0 0',
                    onComplete: () => {
                        const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
                        gsap.set(getCard(prv), {
                            x: xNew,
                            y: offsetTop,
                            width: cardWidth,
                            height: cardHeight,
                            zIndex: 30,
                            borderRadius: 10,
                            scale: 1,
                        });

                        gsap.set(getCardContent(prv), {
                            x: xNew,
                            y: offsetTop + cardHeight + 10,
                            width: cardWidth,
                            height: 'auto',
                            opacity: 1,
                            zIndex: 40,
                            display: 'block',
                        });
                        gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

                        gsap.set(detailsInactive, { opacity: 0 });
                        gsap.set(`${detailsInactive} .text`, { y: 100 });
                        gsap.set(`${detailsInactive} .title-1`, { y: 100 });
                        gsap.set(`${detailsInactive} .title-2`, { y: 100 });
                        gsap.set(`${detailsInactive} .desc`, { y: 50 });
                        gsap.set(`${detailsInactive} .cta`, { y: 60 });

                        isAnimating = false;
                        resolve();
                    },
                });

                rest.forEach((i, index) => {
                    if (i !== prv) {
                        const xNew = offsetLeft + index * (cardWidth + gap);
                        gsap.set(getCard(i), { zIndex: 30 });
                        gsap.to(getCard(i), {
                            x: xNew,
                            y: offsetTop,
                            width: cardWidth,
                            height: cardHeight,
                            ease,
                            delay: 0.1 * (index + 1),
                        });

                        gsap.to(getCardContent(i), {
                            x: xNew,
                            y: offsetTop + cardHeight + 10,
                            width: cardWidth,
                            height: 'auto',
                            opacity: 1,
                            zIndex: 40,
                            display: 'block',
                            ease,
                            delay: 0.1 * (index + 1),
                        });
                        gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
                    }
                });
            });
        }

        // Add click listener to progress sub-background or an indicator to trigger next
        const pagination = document.getElementById('pagination');
        if (pagination) {
            pagination.style.cursor = 'pointer';
            pagination.addEventListener('click', () => {
                if (!isAnimating) step();
            });
        }

        // Also allow clicking the next card in the queue
        const demo = document.getElementById('demo');
        demo.style.cursor = 'pointer';
        demo.addEventListener('click', (e) => {
            if (!isAnimating) {
                step();
            }
        });

        // Small delay to ensure layout is ready
        setTimeout(init, 100);
    }
});
