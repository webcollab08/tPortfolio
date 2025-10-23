document.addEventListener('DOMContentLoaded', () => {
    const loadComponent = (url, elementId) => {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
                if (elementId === 'main-footer') {
                    // After loading footer, update the year
                    const currentYearSpan = document.getElementById('current-year');
                    if (currentYearSpan) {
                        currentYearSpan.textContent = new Date().getFullYear();
                    }
                }
                if (elementId === 'main-header') {
                    // After loading header, re-initialize smooth scrolling and active nav links
                    initializeNav();
                }
            });
    }

    loadComponent('header.html', 'main-header');
    loadComponent('footer.html', 'main-footer');

    const initializeNav = () => {
        // Smooth scrolling for navigation links
        document.querySelectorAll('nav a[href^="#"], nav a[href^="index.html#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#') || href.startsWith('index.html#')) {
                    const targetId = '#' + href.split('#')[1];
                    // If on a different page, go to that page first
                    if (!window.location.pathname.endsWith('index.html') && !window.location.pathname.endsWith('/')) {
                        window.location.href = 'index.html' + targetId;
                        return;
                    }

                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        const navbarHeight = document.querySelector('.navbar').offsetHeight;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Add active class to nav links on scroll (only for index.html)
        if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
            const sections = document.querySelectorAll('section');
            const navLi = document.querySelectorAll('nav .navbar-nav .nav-item a');

            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                        current = section.getAttribute('id');
                    }
                })

                navLi.forEach(a => {
                    a.classList.remove('active');
                    const href = a.getAttribute('href');
                    if (href.includes(current)) {
                        a.classList.add('active');
                    }
                })
            });
        }
    }
});