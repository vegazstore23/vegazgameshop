// ============================================
// LOGIN FUNCTIONALITY
// ============================================
const loginScreen = document.getElementById('loginScreen');
const adminDashboard = document.getElementById('adminDashboard');
const loginForm = document.getElementById('loginForm');
const logoutButton = document.getElementById('logoutButton');

// Check if already logged in
if (localStorage.getItem('adminLoggedIn') === 'true') {
    showDashboard();
}

// Login form submit
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Simple authentication (in production, use proper backend authentication)
        if (email === 'admin@vegazgameshop.com' && password === 'admin123') {
            localStorage.setItem('adminLoggedIn', 'true');
            showDashboard();
        } else {
            alert('Email atau password salah!');
        }
    });
}

// Logout
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('adminLoggedIn');
        location.reload();
    });
}

function showDashboard() {
    if (loginScreen) loginScreen.style.display = 'none';
    if (adminDashboard) adminDashboard.style.display = 'flex';
    initializeDashboard();
}

// ============================================
// DASHBOARD INITIALIZATION
// ============================================
function initializeDashboard() {
    loadStatistics();
    loadPackages();
    loadStock();
    loadTestimonials();
    loadSettings();
    initializeCheckRegion();
    initializeOrderForm();
}

// ============================================
// NAVIGATION
// ============================================
const navItems = document.querySelectorAll('.nav-item');
const contentSections = document.querySelectorAll('.content-section');
const sectionTitle = document.getElementById('sectionTitle');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.getAttribute('data-section');
        switchSection(section);
    });
});

function switchSection(sectionName) {
    // Update active nav item
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === sectionName) {
            item.classList.add('active');
        }
    });

    // Show selected section
    contentSections.forEach(section => {
        section.style.display = 'none';
        if (section.id === sectionName) {
            section.style.display = 'block';
        }
    });

    // Update section title
    const titles = {
        'statistics': 'Dashboard',
        'packages': 'Paket Diamond',
        'stock': 'Stock Akun',
        'testimonials': 'Testimoni Customer',
        'settings': 'Settings',
        'check-region': 'Check Region',
        'topup': 'Top Up Diamond'
    };
    if (sectionTitle) {
        sectionTitle.textContent = titles[sectionName] || 'Dashboard';
    }
}

// Make switchSection global for inline onclick
window.switchSection = switchSection;

// ============================================
// STATISTICS
// ============================================
function loadStatistics() {
    const packages = JSON.parse(localStorage.getItem('packageData')) || [];
    const stock = JSON.parse(localStorage.getItem('stockData')) || [];

    const totalPackages = document.getElementById('totalPackages');
    const totalStock = document.getElementById('totalStock');

    if (totalPackages) totalPackages.textContent = packages.length;
    if (totalStock) totalStock.textContent = stock.length;
}

// ============================================
// PACKAGES MANAGEMENT
// ============================================
function loadPackages() {
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

    const tableBody = document.getElementById('packagesTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = packages.map(pkg => `
        <tr>
            <td>${pkg.id}</td>
            <td>${pkg.diamond}</td>
            <td>${pkg.bonus}</td>
            <td>Rp ${pkg.price.toLocaleString('id-ID')}</td>
            <td>
                <button class="edit-btn" onclick="editPackage(${pkg.id})">Edit</button>
                <button class="delete-btn" onclick="deletePackage(${pkg.id})">Hapus</button>
            </td>
        </tr>
    `).join('');
}

function showAddPackageModal() {
    document.getElementById('packageModalTitle').textContent = 'Tambah Paket';
    document.getElementById('packageForm').reset();
    document.getElementById('packageId').value = '';
    document.getElementById('packageModal').style.display = 'flex';
}

function closePackageModal() {
    document.getElementById('packageModal').style.display = 'none';
}

function editPackage(id) {
    const packages = JSON.parse(localStorage.getItem('packageData')) || [];
    const pkg = packages.find(p => p.id === id);
    
    if (pkg) {
        document.getElementById('packageModalTitle').textContent = 'Edit Paket';
        document.getElementById('packageId').value = pkg.id;
        document.getElementById('packageDiamond').value = pkg.diamond;
        document.getElementById('packageBonus').value = pkg.bonus;
        document.getElementById('packagePrice').value = pkg.price;
        document.getElementById('packageModal').style.display = 'flex';
    }
}

function deletePackage(id) {
    if (confirm('Yakin ingin menghapus paket ini?')) {
        let packages = JSON.parse(localStorage.getItem('packageData')) || [];
        packages = packages.filter(p => p.id !== id);
        localStorage.setItem('packageData', JSON.stringify(packages));
        loadPackages();
        loadStatistics();
    }
}

// Package form submit
const packageForm = document.getElementById('packageForm');
if (packageForm) {
    packageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = document.getElementById('packageId').value;
        const diamond = document.getElementById('packageDiamond').value;
        const bonus = document.getElementById('packageBonus').value;
        const price = parseInt(document.getElementById('packagePrice').value);

        let packages = JSON.parse(localStorage.getItem('packageData')) || [];

        if (id) {
            // Edit existing
            const index = packages.findIndex(p => p.id === parseInt(id));
            if (index !== -1) {
                packages[index] = { id: parseInt(id), diamond, bonus, price };
            }
        } else {
            // Add new
            const newId = packages.length > 0 ? Math.max(...packages.map(p => p.id)) + 1 : 1;
            packages.push({ id: newId, diamond, bonus, price });
        }

        localStorage.setItem('packageData', JSON.stringify(packages));
        loadPackages();
        loadStatistics();
        closePackageModal();
    });
}

// Make functions global
window.showAddPackageModal = showAddPackageModal;
window.closePackageModal = closePackageModal;
window.editPackage = editPackage;
window.deletePackage = deletePackage;

// ============================================
// STOCK MANAGEMENT
// ============================================
function loadStock() {
    let stock = JSON.parse(localStorage.getItem('stockData')) || [];

    // Default stock if empty
    if (stock.length === 0) {
        stock = [
            { id: 1, rank: 'Mythical Glory', hero: 120, skin: 350, emblem: 'Max All', price: 750000, status: 'available', image: 'https://via.placeholder.com/400x400/1e5bb8/ffffff?text=MG+Account' },
            { id: 2, rank: 'Mythic', hero: 110, skin: 280, emblem: 'Max All', price: 500000, status: 'available', image: 'https://via.placeholder.com/400x400/dc3545/ffffff?text=Mythic+Account' },
            { id: 3, rank: 'Legend', hero: 95, skin: 200, emblem: 'Lv 60', price: 350000, status: 'available', image: 'https://via.placeholder.com/400x400/ffc107/ffffff?text=Legend+Account' },
        ];
        localStorage.setItem('stockData', JSON.stringify(stock));
    }

    const tableBody = document.getElementById('stockTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = stock.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.rank}</td>
            <td>${item.hero}</td>
            <td>${item.skin}</td>
            <td>${item.emblem}</td>
            <td>Rp ${item.price.toLocaleString('id-ID')}</td>
            <td><span class="status-badge ${item.status}">${item.status === 'available' ? 'Available' : 'Sold'}</span></td>
            <td>
                <button class="edit-btn" onclick="editStock(${item.id})">Edit</button>
                <button class="delete-btn" onclick="deleteStock(${item.id})">Hapus</button>
            </td>
        </tr>
    `).join('');
}

function showAddStockModal() {
    document.getElementById('stockModalTitle').textContent = 'Tambah Stock';
    document.getElementById('stockForm').reset();
    document.getElementById('stockId').value = '';
    document.getElementById('stockModal').style.display = 'flex';
}

function closeStockModal() {
    document.getElementById('stockModal').style.display = 'none';
}

function editStock(id) {
    const stock = JSON.parse(localStorage.getItem('stockData')) || [];
    const item = stock.find(s => s.id === id);
    
    if (item) {
        document.getElementById('stockModalTitle').textContent = 'Edit Stock';
        document.getElementById('stockId').value = item.id;
        document.getElementById('stockRank').value = item.rank;
        document.getElementById('stockHero').value = item.hero;
        document.getElementById('stockSkin').value = item.skin;
        document.getElementById('stockEmblem').value = item.emblem;
        document.getElementById('stockPrice').value = item.price;
        document.getElementById('stockStatus').value = item.status;
        document.getElementById('stockModal').style.display = 'flex';
    }
}

function deleteStock(id) {
    if (confirm('Yakin ingin menghapus stock ini?')) {
        let stock = JSON.parse(localStorage.getItem('stockData')) || [];
        stock = stock.filter(s => s.id !== id);
        localStorage.setItem('stockData', JSON.stringify(stock));
        loadStock();
        loadStatistics();
    }
}

// Stock form submit
const stockForm = document.getElementById('stockForm');
if (stockForm) {
    stockForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = document.getElementById('stockId').value;
        const rank = document.getElementById('stockRank').value;
        const hero = parseInt(document.getElementById('stockHero').value);
        const skin = parseInt(document.getElementById('stockSkin').value);
        const emblem = document.getElementById('stockEmblem').value;
        const price = parseInt(document.getElementById('stockPrice').value);
        const status = document.getElementById('stockStatus').value;

        let stock = JSON.parse(localStorage.getItem('stockData')) || [];

        if (id) {
            // Edit existing
            const index = stock.findIndex(s => s.id === parseInt(id));
            if (index !== -1) {
                stock[index] = { 
                    ...stock[index], 
                    rank, hero, skin, emblem, price, status 
                };
            }
        } else {
            // Add new
            const newId = stock.length > 0 ? Math.max(...stock.map(s => s.id)) + 1 : 1;
            const image = `https://via.placeholder.com/400x400/1e5bb8/ffffff?text=${rank.replace(' ', '+')}`;
            stock.push({ id: newId, rank, hero, skin, emblem, price, status, image });
        }

        localStorage.setItem('stockData', JSON.stringify(stock));
        loadStock();
        loadStatistics();
        closeStockModal();
    });
}

// Make functions global
window.showAddStockModal = showAddStockModal;
window.closeStockModal = closeStockModal;
window.editStock = editStock;
window.deleteStock = deleteStock;

// ============================================
// SETTINGS
// ============================================
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('shopSettings')) || {
        adminPhone: '6281234567890',
        shopName: 'VEGAZGAMESHOP',
        shopDescription: 'Top Up Mobile Legends Diamond Termurah & Tercepat'
    };

    document.getElementById('adminPhone').value = settings.adminPhone;
    document.getElementById('shopName').value = settings.shopName;
    document.getElementById('shopDescription').value = settings.shopDescription;
}

const settingsForm = document.getElementById('settingsForm');
if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const settings = {
            adminPhone: document.getElementById('adminPhone').value,
            shopName: document.getElementById('shopName').value,
            shopDescription: document.getElementById('shopDescription').value
        };

        localStorage.setItem('shopSettings', JSON.stringify(settings));
        alert('Pengaturan berhasil disimpan!');
    });
}

// ============================================
// DATA MANAGEMENT
// ============================================
function exportData() {
    const data = {
        packages: JSON.parse(localStorage.getItem('packageData')) || [],
        stock: JSON.parse(localStorage.getItem('stockData')) || [],
        settings: JSON.parse(localStorage.getItem('shopSettings')) || {}
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'vegazgameshop-data.json';
    link.click();
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                
                if (data.packages) localStorage.setItem('packageData', JSON.stringify(data.packages));
                if (data.stock) localStorage.setItem('stockData', JSON.stringify(data.stock));
                if (data.settings) localStorage.setItem('shopSettings', JSON.stringify(data.settings));
                
                alert('Data berhasil diimport!');
                location.reload();
            } catch (error) {
                alert('File tidak valid!');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

function clearAllData() {
    if (confirm('PERINGATAN: Ini akan menghapus semua data! Yakin ingin melanjutkan?')) {
        if (confirm('Apakah Anda sudah export data terlebih dahulu?')) {
            localStorage.removeItem('packageData');
            localStorage.removeItem('stockData');
            localStorage.removeItem('shopSettings');
            alert('Semua data berhasil dihapus!');
            location.reload();
        }
    }
}

window.exportData = exportData;
window.importData = importData;
window.clearAllData = clearAllData;

// ============================================
// CHECK REGION FEATURE (Moved from Homepage)
// ============================================
function initializeCheckRegion() {
    // Add check region section to dashboard if not exists
    const mainContent = document.querySelector('.main-content');
    if (!document.getElementById('check-region')) {
        const checkRegionSection = document.createElement('section');
        checkRegionSection.id = 'check-region';
        checkRegionSection.className = 'content-section';
        checkRegionSection.style.display = 'none';
        checkRegionSection.innerHTML = `
            <div class="check-region-card">
                <h3>Check Region MLBB</h3>
                <p>Cek ID & Server Mobile Legends sebelum order</p>
                
                <form id="checkRegionForm" class="check-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="checkUserId">User ID</label>
                            <input type="number" id="checkUserId" placeholder="Masukkan User ID" required>
                        </div>
                        <div class="form-group">
                            <label for="checkZoneId">Zone ID</label>
                            <input type="number" id="checkZoneId" placeholder="Masukkan Zone ID" required>
                        </div>
                    </div>
                    <button type="submit" class="check-button">
                        <span id="checkBtnText">Check Region</span>
                        <div id="checkLoader" class="loader" style="display: none;"></div>
                    </button>
                </form>
                
                <div id="checkResult" class="check-result" style="display: none;">
                    <div class="result-success">
                        <div class="result-icon">✓</div>
                        <div class="result-info">
                            <h4>Akun Ditemukan!</h4>
                            <p id="playerNameResult"></p>
                        </div>
                    </div>
                </div>
                
                <div id="checkError" class="check-error" style="display: none;">
                    <div class="error-icon">✗</div>
                    <p id="errorMsg"></p>
                </div>
            </div>
        `;
        mainContent.appendChild(checkRegionSection);

        // Add to navigation
        const sidebar = document.querySelector('.sidebar-nav');
        const checkRegionNav = document.createElement('a');
        checkRegionNav.href = '#';
        checkRegionNav.className = 'nav-item';
        checkRegionNav.setAttribute('data-section', 'check-region');
        checkRegionNav.innerHTML = `
            <span class="nav-icon">🔍</span>
            <span>Check Region</span>
        `;
        sidebar.insertBefore(checkRegionNav, sidebar.children[1]);
        
        // Re-bind navigation event
        checkRegionNav.addEventListener('click', (e) => {
            e.preventDefault();
            switchSection('check-region');
        });
    }

    // Check region form handler
    const checkForm = document.getElementById('checkRegionForm');
    if (checkForm) {
        checkForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const userId = document.getElementById('checkUserId').value;
            const zoneId = document.getElementById('checkZoneId').value;
            const btnText = document.getElementById('checkBtnText');
            const loader = document.getElementById('checkLoader');
            const resultDiv = document.getElementById('checkResult');
            const errorDiv = document.getElementById('checkError');
            
            // Show loading
            btnText.style.display = 'none';
            loader.style.display = 'block';
            resultDiv.style.display = 'none';
            errorDiv.style.display = 'none';
            
            // Simulate API call
            setTimeout(() => {
                // Mock response
                const mockPlayers = [
                    'Player123', 'GamerPro', 'MLBBMaster', 'LegendPlayer', 
                    'EpicGamer', 'MythicHero', 'VegazPlayer'
                ];
                const randomPlayer = mockPlayers[Math.floor(Math.random() * mockPlayers.length)];
                
                // Show result
                document.getElementById('playerNameResult').textContent = randomPlayer;
                resultDiv.style.display = 'block';
                
                // Reset button
                btnText.style.display = 'inline';
                loader.style.display = 'none';
            }, 1500);
        });
    }
}

// ============================================
// TOP UP ORDER FEATURE (Moved from Homepage)
// ============================================
function initializeOrderForm() {
    // Add topup section to dashboard if not exists
    const mainContent = document.querySelector('.main-content');
    if (!document.getElementById('topup')) {
        const topupSection = document.createElement('section');
        topupSection.id = 'topup';
        topupSection.className = 'content-section';
        topupSection.style.display = 'none';
        topupSection.innerHTML = `
            <div class="topup-card">
                <h3>Order Diamond MLBB</h3>
                <p>Pilih paket diamond dan lengkapi form order</p>
                
                <div id="topupPackageList" class="package-grid"></div>

                <form id="topupOrderForm" class="order-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="topupUserId">User ID *</label>
                            <input type="number" id="topupUserId" placeholder="Masukkan User ID" required>
                        </div>
                        <div class="form-group">
                            <label for="topupZoneId">Zone ID *</label>
                            <input type="number" id="topupZoneId" placeholder="Masukkan Zone ID" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="topupPackageSelect">Paket Diamond *</label>
                        <select id="topupPackageSelect" required>
                            <option value="">Pilih Paket</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="topupWhatsapp">Nomor WhatsApp *</label>
                        <input type="tel" id="topupWhatsapp" placeholder="08xxxxxxxxxx" required>
                    </div>

                    <div class="form-group">
                        <label for="topupNote">Catatan (Opsional)</label>
                        <textarea id="topupNote" placeholder="Tambahkan catatan jika ada" rows="3"></textarea>
                    </div>

                    <div class="order-summary" id="topupSummary" style="display: none;">
                        <h4>Ringkasan Order</h4>
                        <div class="summary-item">
                            <span>Paket:</span>
                            <span id="summaryPkg">-</span>
                        </div>
                        <div class="summary-item">
                            <span>Harga:</span>
                            <span id="summaryPrc" class="price">-</span>
                        </div>
                    </div>

                    <button type="submit" class="submit-button">
                        <span>Order via WhatsApp</span>
                    </button>
                </form>
            </div>
        `;
        mainContent.appendChild(topupSection);

        // Add to navigation
        const sidebar = document.querySelector('.sidebar-nav');
        const topupNav = document.createElement('a');
        topupNav.href = '#';
        topupNav.className = 'nav-item';
        topupNav.setAttribute('data-section', 'topup');
        topupNav.innerHTML = `
            <span class="nav-icon">💎</span>
            <span>Top Up Diamond</span>
        `;
        sidebar.insertBefore(topupNav, sidebar.children[2]);
        
        // Re-bind navigation event
        topupNav.addEventListener('click', (e) => {
            e.preventDefault();
            switchSection('topup');
            loadTopupPackages();
        });
    }

    loadTopupPackages();
}

function loadTopupPackages() {
    const packages = JSON.parse(localStorage.getItem('packageData')) || [];
    const packageList = document.getElementById('topupPackageList');
    const packageSelect = document.getElementById('topupPackageSelect');
    
    if (!packageList || !packageSelect) return;

    // Display package cards
    packageList.innerHTML = packages.map(pkg => `
        <div class="package-card" onclick="selectTopupPackage(${pkg.id})">
            <div class="package-diamond">💎 ${pkg.diamond}</div>
            <div class="package-bonus">${pkg.bonus}</div>
            <div class="package-price">Rp ${pkg.price.toLocaleString('id-ID')}</div>
        </div>
    `).join('');

    // Populate select dropdown
    packageSelect.innerHTML = '<option value="">Pilih Paket</option>' + 
        packages.map(pkg => `
            <option value="${pkg.id}" data-price="${pkg.price}">
                ${pkg.diamond} ${pkg.bonus} - Rp ${pkg.price.toLocaleString('id-ID')}
            </option>
        `).join('');

    // Handle package selection
    packageSelect.addEventListener('change', (e) => {
        const selected = e.target.selectedOptions[0];
        if (selected.value) {
            const summary = document.getElementById('topupSummary');
            const summaryPkg = document.getElementById('summaryPkg');
            const summaryPrc = document.getElementById('summaryPrc');
            
            summaryPkg.textContent = selected.textContent;
            summaryPrc.textContent = `Rp ${parseInt(selected.dataset.price).toLocaleString('id-ID')}`;
            summary.style.display = 'block';
        }
    });

    // Handle form submission
    const orderForm = document.getElementById('topupOrderForm');
    if (orderForm) {
        orderForm.onsubmit = (e) => {
            e.preventDefault();
            
            const userId = document.getElementById('topupUserId').value;
            const zoneId = document.getElementById('topupZoneId').value;
            const packageId = document.getElementById('topupPackageSelect').value;
            const whatsapp = document.getElementById('topupWhatsapp').value;
            const note = document.getElementById('topupNote').value;
            
            if (!packageId) {
                alert('Pilih paket diamond terlebih dahulu!');
                return;
            }
            
            const pkg = packages.find(p => p.id === parseInt(packageId));
            const settings = JSON.parse(localStorage.getItem('shopSettings')) || { adminPhone: '6281234567890' };
            
            const message = `Halo Admin, saya mau order:%0A%0A` +
                `User ID: ${userId}%0A` +
                `Zone ID: ${zoneId}%0A` +
                `Paket: ${pkg.diamond} ${pkg.bonus}%0A` +
                `Harga: Rp ${pkg.price.toLocaleString('id-ID')}%0A` +
                `Nomor WA: ${whatsapp}%0A` +
                (note ? `Catatan: ${note}%0A` : '') +
                `%0ATerima kasih!`;
            
            window.open(`https://wa.me/${settings.adminPhone}?text=${message}`, '_blank');
        };
    }
}

function selectTopupPackage(id) {
    const select = document.getElementById('topupPackageSelect');
    if (select) {
        select.value = id;
        select.dispatchEvent(new Event('change'));
    }
}

window.selectTopupPackage = selectTopupPackage;

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});
// ============================================
// TESTIMONIALS MANAGEMENT
// ============================================
function loadTestimonials() {
    let testimonials = JSON.parse(localStorage.getItem('testimonialData')) || [];
    
    // Default testimonials if empty
    if (testimonials.length === 0) {
        testimonials = [
            { id: 1, image: 'https://via.placeholder.com/400x800/667eea/ffffff?text=Testimoni+1' },
            { id: 2, image: 'https://via.placeholder.com/400x800/764ba2/ffffff?text=Testimoni+2' },
            { id: 3, image: 'https://via.placeholder.com/400x800/f093fb/ffffff?text=Testimoni+3' },
            { id: 4, image: 'https://via.placeholder.com/400x800/4facfe/ffffff?text=Testimoni+4' },
            { id: 5, image: 'https://via.placeholder.com/400x800/00f2fe/ffffff?text=Testimoni+5' },
            { id: 6, image: 'https://via.placeholder.com/400x800/43e97b/ffffff?text=Testimoni+6' }
        ];
        localStorage.setItem('testimonialData', JSON.stringify(testimonials));
    }
    
    const grid = document.getElementById('testimonialsGrid');
    if (!grid) return;
    
    grid.innerHTML = testimonials.map(testi => `
        <div class="testimonial-admin-item">
            <img src="${testi.image}" alt="Testimoni ${testi.id}">
            <div class="testimonial-actions">
                <button class="delete-btn" onclick="deleteTestimonial(${testi.id})">Hapus</button>
            </div>
        </div>
    `).join('');
}

function showAddTestimonialModal() {
    document.getElementById('testimonialForm').reset();
    document.getElementById('testimonialPreview').style.display = 'none';
    document.getElementById('testimonialModal').style.display = 'flex';
}

function closeTestimonialModal() {
    document.getElementById('testimonialModal').style.display = 'none';
}

function previewTestimonial() {
    const imageUrl = document.getElementById('testimonialImage').value;
    if (imageUrl) {
        document.getElementById('testimonialPreviewImg').src = imageUrl;
        document.getElementById('testimonialPreview').style.display = 'block';
    } else {
        alert('Masukkan URL gambar terlebih dahulu!');
    }
}

function deleteTestimonial(id) {
    if (confirm('Yakin ingin menghapus testimoni ini?')) {
        let testimonials = JSON.parse(localStorage.getItem('testimonialData')) || [];
        testimonials = testimonials.filter(t => t.id !== id);
        localStorage.setItem('testimonialData', JSON.stringify(testimonials));
        loadTestimonials();
    }
}

// Testimonial form submit
const testimonialForm = document.getElementById('testimonialForm');
if (testimonialForm) {
    testimonialForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const image = document.getElementById('testimonialImage').value;
        let testimonials = JSON.parse(localStorage.getItem('testimonialData')) || [];
        
        const newId = testimonials.length > 0 ? Math.max(...testimonials.map(t => t.id)) + 1 : 1;
        testimonials.push({
            id: newId,
            image: image
        });
        
        localStorage.setItem('testimonialData', JSON.stringify(testimonials));
        loadTestimonials();
        closeTestimonialModal();
        alert('Testimoni berhasil ditambahkan!');
    });
}

// Make functions global
window.showAddTestimonialModal = showAddTestimonialModal;
window.closeTestimonialModal = closeTestimonialModal;
window.previewTestimonial = previewTestimonial;
window.deleteTestimonial = deleteTestimonial;
