// Header Component
function renderHeader(activePage = '') {
    return `
    <nav class="navbar">
        <div class="container">
            <div class="nav-brand">
                <span class="brand-icon">⚡</span>
                <span class="brand-text">VEGAZGAMESHOP</span>
            </div>
            <ul class="nav-menu">
                <li><a href="index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">Home</a></li>
                <li><a href="check-region.html" class="nav-link ${activePage === 'check' ? 'active' : ''}">Check Region</a></li>
                <li><a href="topup.html" class="nav-link ${activePage === 'topup' ? 'active' : ''}">Top Up</a></li>
                <li><a href="index.html#stock" class="nav-link">Stock</a></li>
                <li><a href="index.html#contact" class="nav-link">Contact</a></li>
                <li><a href="admin.html" class="nav-link nav-link-special">Dashboard</a></li>
            </ul>
            <button class="mobile-toggle" id="mobileToggle">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>
    `;
}

// Initialize header
function initHeader(activePage = '') {
    const headerContainer = document.getElementById('header');
    if (headerContainer) {
        headerContainer.innerHTML = renderHeader(activePage);
        
        // Re-initialize mobile toggle after inserting HTML
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });

            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                });
            });
        }
    }
}
