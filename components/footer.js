// Footer Component
function renderFooter() {
    const settings = JSON.parse(localStorage.getItem('shopSettings')) || {
        shopName: 'VEGAZGAMESHOP',
        shopDescription: 'Top Up Mobile Legends & Jual Akun MLBB Terpercaya'
    };
    
    return `
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <h3>⚡ ${settings.shopName}</h3>
                    <p>${settings.shopDescription}</p>
                </div>
                <div class="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="check-region.html">Check Region</a></li>
                        <li><a href="topup.html">Top Up</a></li>
                        <li><a href="index.html#stock">Stock</a></li>
                        <li><a href="index.html#contact">Contact</a></li>
                        <li><a href="admin.html">Dashboard</a></li>
                    </ul>
                </div>
                <div class="footer-info">
                    <h4>Jam Operasional</h4>
                    <p>Customer Service: 24/7</p>
                    <p>Proses Order: 08:00 - 22:00 WIB</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} ${settings.shopName}. All rights reserved.</p>
            </div>
        </div>
    </footer>
    `;
}

// Initialize footer
function initFooter() {
    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
        footerContainer.innerHTML = renderFooter();
    }
}
