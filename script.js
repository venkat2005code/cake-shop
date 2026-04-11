document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const dirToggle = document.getElementById('dir-toggle');

    // 1. Mobile Menu Toggle - DELEGATED PRIORITY (Safe Access)
    document.addEventListener('click', (e) => {
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu) return;

        if (e.target.closest('.hamburger')) {
            e.preventDefault();
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        if (e.target.closest('#menu-close')) {
            e.preventDefault();
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            // Reset mobile dropdowns on close
            document.querySelectorAll('.mobile-nav-item').forEach(item => item.classList.remove('active'));
        }

        // 2. Toggle Mobile Dropdowns (Defensive Selection)
        const dropdownItem = e.target.closest('.mobile-nav-item');
        const isSublink = e.target.closest('.mobile-sublinks');

        if (dropdownItem) {
            if (isSublink) {
                // It's a sublink, let it navigate and close the menu
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            } else {
                // It's the parent, toggle dropdown and prevent default link behavior
                e.preventDefault();
                dropdownItem.classList.toggle('active');
            }
        } else if (e.target.closest('.mobile-nav-links a')) {
            // It's a direct link (like About, Services), let it navigate and close menu
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Theme Toggle (Safe Access)
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const theme = body.getAttribute('data-theme');
            if (theme === 'dark') {
                body.removeAttribute('data-theme');
                themeToggle.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
                localStorage.setItem('theme', 'light');
            } else {
                body.setAttribute('data-theme', 'dark');
                themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        if (themeToggle) themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }

    // RTL/LTR Toggle (Safe Access)
    if (dirToggle) {
        dirToggle.addEventListener('click', () => {
            const dir = html.getAttribute('dir');
            if (dir === 'rtl') {
                html.setAttribute('dir', 'ltr');
                localStorage.setItem('dir', 'ltr');
            } else {
                html.setAttribute('dir', 'rtl');
                localStorage.setItem('dir', 'rtl');
            }
        });
    }

    const savedDir = localStorage.getItem('dir');
    if (savedDir) {
        html.setAttribute('dir', savedDir);
    }

    // Scroll Reveal Animation (Intersection Observer)
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => revealOnScroll.observe(reveal));

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Active Tab Logic
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const dropdown = item.querySelector('.dropdown');
            if (dropdown) {
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.transform = 'translateX(-50%) translateY(0)';
            }
        });

        item.addEventListener('mouseleave', () => {
            const dropdown = item.querySelector('.dropdown');
            if (dropdown) {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateX(-50%) translateY(10px)';
            }
        });
    });

    // Auto-update copyright year
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // Connect Mobile Secondary Toggles
    const mobTheme = document.getElementById('mobile-theme-toggle');
    const mobDir = document.getElementById('mobile-dir-toggle');

    if (mobTheme && themeToggle) mobTheme.addEventListener('click', () => themeToggle.click());
    if (mobDir && dirToggle) mobDir.addEventListener('click', () => dirToggle.click());

});
