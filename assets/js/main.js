// ===== GUIDE MOUNTAIN - MAIN JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initMobileMenu();
    initFloatingButtons();
    initSearchBar();
    initTOC();
    initFAQ();
    initGalleryFilters();
    initSmoothScroll();
});

// ===== MOBILE MENU =====
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// ===== FLOATING BUTTONS =====
function initFloatingButtons() {
    const floatingTop = document.querySelector('.floating-top');

    if (floatingTop) {
        // Show/hide scroll to top button
        window.addEventListener('scroll', function () {
            if (window.scrollY > 500) {
                floatingTop.classList.add('visible');
            } else {
                floatingTop.classList.remove('visible');
            }
        });

        // Scroll to top on click
        floatingTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== SEARCH BAR =====
function initSearchBar() {
    const searchInput = document.querySelector('.search-bar input');

    if (searchInput) {
        // Mountain data for search suggestions
        const mountains = [
            { name: 'Semeru', keyword: 'semeru mahameru', difficulty: 'hard' },
            { name: 'Kawah Ijen', keyword: 'ijen blue fire banyuwangi', difficulty: 'medium' },
            { name: 'Bromo', keyword: 'bromo sunrise penanjakan', difficulty: 'easy' },
            { name: 'Raung', keyword: 'raung kalibaru bondowoso', difficulty: 'expert' },
            { name: 'Arjuno-Welirang', keyword: 'arjuno welirang tretes', difficulty: 'hard' },
            { name: 'Penanggungan', keyword: 'penanggungan trawas mojokerto', difficulty: 'easy' },
            { name: 'Kelud', keyword: 'kelud kediri blitar', difficulty: 'medium' },
            { name: 'Argopuro', keyword: 'argopuro probolinggo', difficulty: 'expert' }
        ];

        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const query = this.value.trim().toLowerCase();
                if (query) {
                    // Redirect to mountains page with search query
                    window.location.href = 'mountains.html?search=' + encodeURIComponent(query);
                }
            }
        });

        // Check if we're on mountains page and have a search query
        if (window.location.pathname.includes('mountains.html')) {
            const urlParams = new URLSearchParams(window.location.search);
            const searchQuery = urlParams.get('search');
            if (searchQuery) {
                searchInput.value = searchQuery;
                // Trigger search after page loads
                setTimeout(() => {
                    if (typeof searchMountains === 'function') {
                        searchMountains();
                    }
                }, 100);
            }
        }
    }
}

// ===== TABLE OF CONTENTS =====
function initTOC() {
    const tocHeader = document.querySelector('.toc-header');
    const tocContent = document.querySelector('.toc-content');
    const tocToggle = document.querySelector('.toc-toggle');

    if (tocHeader && tocContent && tocToggle) {
        tocHeader.addEventListener('click', function () {
            tocContent.classList.toggle('collapsed');
            tocToggle.classList.toggle('collapsed');
        });
    }

    // Auto-generate TOC from headings
    generateTOC();
}

function generateTOC() {
    const tocList = document.querySelector('.toc-list');
    const articleContent = document.querySelector('.article-content');

    if (tocList && articleContent) {
        const headings = articleContent.querySelectorAll('h2, h3');
        let currentH2Item = null;
        let subList = null;

        headings.forEach((heading, index) => {
            // Add ID to heading for linking
            if (!heading.id) {
                heading.id = 'section-' + (index + 1);
            }

            if (heading.tagName === 'H2') {
                const li = document.createElement('li');
                li.className = 'toc-item';

                const a = document.createElement('a');
                a.href = '#' + heading.id;
                a.className = 'toc-link';
                a.textContent = heading.textContent;

                li.appendChild(a);
                tocList.appendChild(li);

                currentH2Item = li;
                subList = null;
            } else if (heading.tagName === 'H3' && currentH2Item) {
                if (!subList) {
                    subList = document.createElement('ul');
                    subList.className = 'toc-sublist';
                    currentH2Item.appendChild(subList);
                }

                const li = document.createElement('li');
                li.className = 'toc-subitem';

                const a = document.createElement('a');
                a.href = '#' + heading.id;
                a.className = 'toc-sublink';
                a.textContent = heading.textContent;

                li.appendChild(a);
                subList.appendChild(li);
            }
        });
    }
}

// ===== FAQ ACCORDION =====
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', function () {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

// ===== GALLERY FILTERS =====
function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.dataset.filter;

            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const offsetTop = target.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===== SHARE BUTTONS =====
function shareToFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
}

function shareToTwitter() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank', 'width=600,height=400');
}

function shareToWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://wa.me/?text=${title}%20${url}`, '_blank');
}

function shareToLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link berhasil disalin!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// ===== ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.peak-card, .service-card, .blog-card, .team-card, .stat-card').forEach(el => {
    observer.observe(el);
});

// Add fadeIn animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: fadeIn 0.6s ease forwards;
    }
`;
document.head.appendChild(style);
