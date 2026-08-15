const sharedHeaderMarkup = `
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <img src="assets/icons/icon_64_64.png" alt="TinySpark Apps Logo" class="logo-img" />
                <span class="logo-text">Tinyspark Apps</span>
            </div>
            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="index.html#about">About Us</a></li>
                <li><a href="index.html#contact">Contact</a></li>
                <li><a href="internship.html" class="nav-cta">Apply for Internship</a></li>
            </ul>
            <div class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>
`;

const sharedFooterMarkup = `
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <div class="footer-logo">
                        <img src="assets/icons/icon_64_64.png" alt="TinySpark Apps Logo" class="logo-img" />
                        <span>TinySpark Apps</span>
                    </div>
                    <p>Building tomorrow's software, today.</p>
                </div>
                <div class="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="index.html#about">About Us</a></li>
                        <li><a href="index.html#contact">Contact</a></li>
                        <li><a href="internship.html">Internship</a></li>
                    </ul>
                </div>
                <div class="footer-contact">
                    <h4>Get in Touch</h4>
                    <p><i class="fas fa-envelope"></i> tinysparkapps.care@gmail.com</p>
                    <p><i class="fas fa-map-marker-alt"></i> Remote — Global</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 TinySpark Apps. All rights reserved.</p>
            </div>
        </div>
    </footer>
`;

function normalizeNavHash(href) {
    if (!href) return '';
    const hashIndex = href.indexOf('#');
    return hashIndex >= 0 ? href.slice(hashIndex) : href;
}

function initializeSharedLayout() {
    const headerTarget = document.getElementById('site-header');
    const footerTarget = document.getElementById('site-footer');

    if (headerTarget) {
        headerTarget.innerHTML = sharedHeaderMarkup;
    }

    if (footerTarget) {
        footerTarget.innerHTML = sharedFooterMarkup;
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const normalizedHref = normalizeNavHash(href);
        if ((href === 'index.html' && currentPage === 'index.html') || (href === 'internship.html' && currentPage === 'internship.html')) {
            link.classList.add('active');
        }

        if (normalizedHref === '#home' && currentPage === 'index.html') {
            link.classList.add('active');
        }
    });

    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    const hamburger = document.getElementById('hamburger');
    const navLinksList = document.querySelector('.nav-links');

    if (hamburger && navLinksList) {
        const closeMenu = () => {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            navLinksList.classList.remove('open');
            document.body.classList.remove('menu-open');
        };

        const toggleMenu = () => {
            const isOpen = navLinksList.classList.toggle('open');
            hamburger.classList.toggle('active', isOpen);
            hamburger.setAttribute('aria-expanded', String(isOpen));
            document.body.classList.toggle('menu-open', isOpen);
        };

        hamburger.addEventListener('click', toggleMenu);

        navLinksList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a:not(.nav-cta)');

    if (sections.length && navItems.length) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(link => {
                const href = link.getAttribute('href');
                const normalizedHref = normalizeNavHash(href);
                link.classList.remove('active');
                if (normalizedHref === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const animateElements = document.querySelectorAll('.solution-card, .contact-card, .value-item, .stat');
    if (animateElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    }
}

initializeSharedLayout();