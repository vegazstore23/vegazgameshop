// ============================================
// SHARED DATA FUNCTIONS
// ============================================

// Load data from localStorage with fallback
function getPackageData() {
    let packages = JSON.parse(localStorage.getItem('packageData')) || [];
    
    // Default packages if empty
    if (packages.length === 0) {
        packages = [
            { id: 1, diamond: '86', bonus: '+10', price: 20000 },
            { id: 2, diamond: '172', bonus: '+20', price: 39000 },
            { id: 3, diamond: '257', bonus: '+30', price: 57000 },
            { id: 4, diamond: '344', bonus: '+40', price: 76000 },
            { id: 5, diamond: '429', bonus: '+50', price: 95000 },
            { id: 6, diamond: '514', bonus: '+60', price: 113000 },
            { id: 7, diamond: '706', bonus: '+80', price: 152000 },
            { id: 8, diamond: '1050', bonus: '+120', price: 228000 },
            { id: 9, diamond: '2195', bonus: '+250', price: 475000 },
        ];
        localStorage.setItem('packageData', JSON.stringify(packages));
    }
    
    return packages;
}

function getStockData() {
    let stockData = JSON.parse(localStorage.getItem('stockData')) || [];
    
    // Default stock data if empty
    if (stockData.length === 0) {
        stockData = [
            {
                id: 1,
                rank: 'Mythical Glory',
                hero: 120,
                skin: 350,
                emblem: 'Max All',
                price: 750000,
                status: 'available',
                image: 'https://via.placeholder.com/400x400/667eea/ffffff?text=MG+Account'
            },
            {
                id: 2,
                rank: 'Mythic',
                hero: 110,
                skin: 280,
                emblem: 'Max All',
                price: 500000,
                status: 'available',
                image: 'https://via.placeholder.com/400x400/764ba2/ffffff?text=Mythic+Account'
            },
            {
                id: 3,
                rank: 'Legend',
                hero: 95,
                skin: 200,
                emblem: 'Lv 60',
                price: 350000,
                status: 'available',
                image: 'https://via.placeholder.com/400x400/f093fb/ffffff?text=Legend+Account'
            },
            {
                id: 4,
                rank: 'Mythical Glory',
                hero: 115,
                skin: 320,
                emblem: 'Max All',
                price: 680000,
                status: 'sold',
                image: 'https://via.placeholder.com/400x400/4facfe/ffffff?text=MG+Account+2'
            },
            {
                id: 5,
                rank: 'Epic',
                hero: 80,
                skin: 150,
                emblem: 'Lv 50',
                price: 250000,
                status: 'available',
                image: 'https://via.placeholder.com/400x400/00f2fe/ffffff?text=Epic+Account'
            },
            {
                id: 6,
                rank: 'Mythic',
                hero: 105,
                skin: 260,
                emblem: 'Max All',
                price: 480000,
                status: 'available',
                image: 'https://via.placeholder.com/400x400/43e97b/ffffff?text=Mythic+Account+2'
            },
            {
                id: 7,
                rank: 'Legend',
                hero: 100,
                skin: 220,
                emblem: 'Max All',
                price: 400000,
                status: 'available',
                image: 'https://via.placeholder.com/400x400/667eea/ffffff?text=Legend+Account+2'
            },
            {
                id: 8,
                rank: 'Epic',
                hero: 85,
                skin: 180,
                emblem: 'Lv 55',
                price: 280000,
                status: 'available',
                image: 'https://via.placeholder.com/400x400/764ba2/ffffff?text=Epic+Account+2'
            },
            {
                id: 9,
                rank: 'Mythic',
                hero: 108,
                skin: 270,
                emblem: 'Max All',
                price: 520000,
                status: 'sold',
                image: 'https://via.placeholder.com/400x400/f093fb/ffffff?text=Mythic+Account+3'
            }
        ];
        localStorage.setItem('stockData', JSON.stringify(stockData));
    }
    
    return stockData;
}

function getSettings() {
    let settings = JSON.parse(localStorage.getItem('shopSettings')) || {};
    
    if (!settings.adminPhone) {
        settings = {
            adminPhone: '6281234567890',
            shopName: 'VEGAZGAMESHOP',
            shopDescription: 'Top Up Mobile Legends & Jual Akun MLBB Terpercaya'
        };
        localStorage.setItem('shopSettings', JSON.stringify(settings));
    }
    
    return settings;
}

// ============================================
// MOBILE NAVIGATION
// ============================================
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// LOAD STOCK DATA (Homepage)
// ============================================
function loadStockData() {
    const stockList = document.getElementById('stockList');
    if (!stockList) return;

    const stockData = getStockData(); // Get from localStorage
    const displayStock = stockData.slice(0, 9); // Show first 9 items

    stockList.innerHTML = displayStock.map(item => `
        <div class="stock-item" onclick="viewStockDetail(${item.id})">
            <img src="${item.image}" alt="${item.rank}" class="stock-image">
            <span class="stock-status ${item.status}">${item.status === 'available' ? 'Available' : 'Sold'}</span>
            <div class="stock-overlay">
                <div class="stock-rank">${item.rank}</div>
                <div class="stock-details">
                    🦸 ${item.hero} Hero | 🎨 ${item.skin} Skin<br>
                    ⚡ ${item.emblem}
                </div>
                <div class="stock-price">Rp ${item.price.toLocaleString('id-ID')}</div>
            </div>
        </div>
    `).join('');
}

// View Stock Detail
function viewStockDetail(id) {
    window.location.href = `admin.html#stock-${id}`;
}

// ============================================
// TESTIMONIALS SLIDER
// ============================================
class TestimonialsSlider {
    constructor() {
        this.track = document.getElementById('testimonialsTrack');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dotsContainer = document.getElementById('sliderDots');
        this.currentIndex = 0;
        this.itemsPerView = this.getItemsPerView();
        
        if (!this.track) return;
        
        // Load testimonials from localStorage
        this.loadTestimonials();
        
        this.items = Array.from(this.track.children);
        this.totalItems = this.items.length;
        this.maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
        
        this.init();
    }
    
    loadTestimonials() {
        const testimonials = JSON.parse(localStorage.getItem('testimonialData')) || [];
        
        // Use default if no testimonials
        if (testimonials.length === 0) {
            return; // Keep placeholder testimonials in HTML
        }
        
        // Replace with actual testimonials
        this.track.innerHTML = testimonials.map(testi => `
            <div class="testimonial-item">
                <img src="${testi.image}" alt="Testimoni ${testi.id}">
            </div>
        `).join('');
    }

    getItemsPerView() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        return 3;
    }

    init() {
        this.createDots();
        this.updateDots();
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }

        // Auto slide every 5 seconds
        this.autoSlide = setInterval(() => this.next(), 5000);

        // Pause auto slide on hover
        if (this.track) {
            this.track.addEventListener('mouseenter', () => {
                clearInterval(this.autoSlide);
            });

            this.track.addEventListener('mouseleave', () => {
                this.autoSlide = setInterval(() => this.next(), 5000);
            });
        }

        // Handle resize
        window.addEventListener('resize', () => {
            const newItemsPerView = this.getItemsPerView();
            if (newItemsPerView !== this.itemsPerView) {
                this.itemsPerView = newItemsPerView;
                this.maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
                if (this.currentIndex > this.maxIndex) {
                    this.currentIndex = this.maxIndex;
                }
                this.updateSlider();
                this.createDots();
                this.updateDots();
            }
        });
    }

    createDots() {
        if (!this.dotsContainer) return;
        
        this.dotsContainer.innerHTML = '';
        
        for (let i = 0; i <= this.maxIndex; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
        
        this.dots = Array.from(this.dotsContainer.children);
    }

    updateDots() {
        if (!this.dots) return;
        
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    updateSlider() {
        const itemWidth = this.items[0].offsetWidth;
        const gap = 24;
        const offset = -(this.currentIndex * (itemWidth + gap));
        this.track.style.transform = `translateX(${offset}px)`;
    }

    next() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
        this.updateSlider();
        this.updateDots();
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.maxIndex;
        }
        this.updateSlider();
        this.updateDots();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlider();
        this.updateDots();
    }
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(15, 15, 35, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 15, 35, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.contact-card, .stock-item, .testimonial-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    loadStockData();
    new TestimonialsSlider();
    initScrollAnimations();
    
    // Handle hash navigation from admin
    const hash = window.location.hash;
    if (hash.startsWith('#stock-')) {
        const stockSection = document.getElementById('stock');
        if (stockSection) {
            setTimeout(() => {
                stockSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
});

// ============================================
// LISTEN FOR DATA CHANGES
// ============================================
// Reload stock when localStorage changes (e.g., from admin dashboard)
window.addEventListener('storage', (e) => {
    if (e.key === 'stockData') {
        loadStockData();
    }
});
