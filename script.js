const SUPABASE_URL = 'https://chhkghparlgsikxzxasw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_z0Fv9IFDXOCCdCCUqF6j0w_J0bWFIET';

document.body.classList.add('loading');

function revealSite() {
    const loader = document.getElementById('preloader');
    const body = document.body;
    
    if (loader) {
        loader.classList.add('fade-out');
        body.classList.remove('loading');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 600);
    } else {
        body.classList.remove('loading');
    }
}

window.addEventListener('load', () => {
    setTimeout(revealSite, 800);
});

setTimeout(revealSite, 3000);

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('open');
}
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initScrollAnimations === "function") initScrollAnimations();
});



let currentSlide = 0;

function showPage(pageName) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    const targetPage = document.getElementById('page-' + pageName);
    if (targetPage) targetPage.classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageName) {
            link.classList.add('active');
        }
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(initScrollAnimations, 100);
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const icon = document.getElementById('menuIcon');
    if (menu) {
        menu.classList.toggle('open');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    }
}

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(ind => {
        ind.classList.remove('active', 'bg-white');
        ind.classList.add('bg-white/50');
    });
    
    slides[index].classList.add('active');
    indicators[index].classList.add('active', 'bg-white');
    indicators[index].classList.remove('bg-white/50');
    currentSlide = index;
}

window.nextSlide = function() {
    showSlide(currentSlide + 1);
};

window.prevSlide = function() {
    showSlide(currentSlide - 1);
};

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 1.0 });
    
    counters.forEach(counter => observer.observe(counter));
}

window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

function handleScroll() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    if (window.scrollY > 300) {
        backToTop.classList.remove('opacity-0', 'invisible');
        backToTop.classList.add('opacity-100', 'visible');
    } else {
        backToTop.classList.add('opacity-0', 'invisible');
        backToTop.classList.remove('opacity-100', 'visible');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    if (slides.length > 0) {
        showSlide(0);
        setInterval(() => {
            window.nextSlide();
        }, 5000);
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => showSlide(index));
        });
    }
    
    initScrollAnimations();
    animateCounters();
    window.addEventListener('scroll', handleScroll);
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});
