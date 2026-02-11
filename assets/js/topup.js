// Load package data and populate grid & select
function loadTopUpPackages() {
    // Get data from shared function in main.js
    const packages = getPackageData();
    const packageList = document.getElementById('packageList');
    const packageSelect = document.getElementById('selectedPackage');
    
    if (!packageList || !packageSelect) return;

    // Display package cards
    packageList.innerHTML = packages.map(pkg => `
        <div class="package-card" onclick="selectPackage(${pkg.id})" data-package-id="${pkg.id}">
            <div class="package-diamond">💎 ${pkg.diamond}</div>
            <div class="package-bonus">${pkg.bonus}</div>
            <div class="package-price">Rp ${pkg.price.toLocaleString('id-ID')}</div>
        </div>
    `).join('');

    // Populate select dropdown
    packageSelect.innerHTML = '<option value="">Pilih Paket</option>' + 
        packages.map(pkg => `
            <option value="${pkg.id}" data-diamond="${pkg.diamond}" data-bonus="${pkg.bonus}" data-price="${pkg.price}">
                ${pkg.diamond} ${pkg.bonus} - Rp ${pkg.price.toLocaleString('id-ID')}
            </option>
        `).join('');
}

// Select package function
function selectPackage(id) {
    // Remove previous selection
    document.querySelectorAll('.package-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to clicked card
    const selectedCard = document.querySelector(`[data-package-id="${id}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
    
    // Update select dropdown
    const select = document.getElementById('selectedPackage');
    if (select) {
        select.value = id;
        select.dispatchEvent(new Event('change'));
    }
}

// Handle package selection change
const packageSelect = document.getElementById('selectedPackage');
if (packageSelect) {
    packageSelect.addEventListener('change', (e) => {
        const selected = e.target.selectedOptions[0];
        if (selected.value) {
            const summary = document.getElementById('orderSummary');
            const summaryPkg = document.getElementById('summaryPackage');
            const summaryPrice = document.getElementById('summaryPrice');
            
            summaryPkg.textContent = `${selected.dataset.diamond} ${selected.dataset.bonus}`;
            summaryPrice.textContent = `Rp ${parseInt(selected.dataset.price).toLocaleString('id-ID')}`;
            summary.style.display = 'block';
            
            // Update card selection
            document.querySelectorAll('.package-card').forEach(card => {
                card.classList.remove('selected');
            });
            const card = document.querySelector(`[data-package-id="${selected.value}"]`);
            if (card) {
                card.classList.add('selected');
            }
        } else {
            document.getElementById('orderSummary').style.display = 'none';
        }
    });
}

// Handle order form submission
const orderForm = document.getElementById('orderForm');
if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const userId = document.getElementById('orderUserId').value;
        const zoneId = document.getElementById('orderZoneId').value;
        const packageId = document.getElementById('selectedPackage').value;
        const whatsapp = document.getElementById('whatsappNumber').value;
        const note = document.getElementById('orderNote').value;
        
        if (!packageId) {
            alert('Pilih paket diamond terlebih dahulu!');
            return;
        }
        
        const packages = getPackageData();
        const pkg = packages.find(p => p.id === parseInt(packageId));
        const settings = getSettings();
        
        const message = `Halo Admin, saya mau order:%0A%0A` +
            `User ID: ${userId}%0A` +
            `Zone ID: ${zoneId}%0A` +
            `Paket: ${pkg.diamond} ${pkg.bonus}%0A` +
            `Harga: Rp ${pkg.price.toLocaleString('id-ID')}%0A` +
            `Nomor WA: ${whatsapp}%0A` +
            (note ? `Catatan: ${note}%0A` : '') +
            `%0ATerima kasih!`;
        
        window.open(`https://wa.me/${settings.adminPhone}?text=${message}`, '_blank');
    });
}

// Auto-fill if coming from check region
document.addEventListener('DOMContentLoaded', () => {
    loadTopUpPackages();
    
    const userId = sessionStorage.getItem('mlbb_userId');
    const zoneId = sessionStorage.getItem('mlbb_zoneId');
    
    if (userId && zoneId) {
        document.getElementById('orderUserId').value = userId;
        document.getElementById('orderZoneId').value = zoneId;
    }
});
