# VEGAZGAMESHOP - Website Toko Game

Website landing page profesional untuk toko game online dengan fitur lengkap:
- ✅ Homepage dengan profil toko & stock akun
- ✅ Check Region MLBB (halaman terpisah)
- ✅ Top Up Diamond (halaman terpisah)
- ✅ Admin Dashboard untuk kelola data
- ✅ Data terhubung via localStorage
- ✅ Struktur modular dengan komponen reusable

## 📁 Struktur Folder

```
vegazgameshop/
├── index.html              # Homepage utama
├── check-region.html       # Halaman Check Region
├── topup.html             # Halaman Top Up Diamond
├── admin.html             # Admin Dashboard
├── assets/
│   ├── css/
│   │   ├── styles.css     # CSS utama untuk homepage
│   │   ├── pages.css      # CSS untuk halaman terpisah
│   │   └── admin.css      # CSS untuk admin dashboard
│   └── js/
│       ├── main.js        # JavaScript utama
│       ├── check-region.js # JS untuk Check Region
│       ├── topup.js       # JS untuk Top Up
│       └── admin.js       # JS untuk Admin Dashboard
├── components/
│   ├── header.js          # Komponen header (reusable)
│   └── footer.js          # Komponen footer (reusable)
└── README.md              # Dokumentasi ini
```

## 🚀 Cara Deploy ke GitHub Pages

### 1. Buat Repository Baru di GitHub
```bash
# Di terminal/command prompt:
cd path/to/vegazgameshop
git init
git add .
git commit -m "Initial commit"
```

### 2. Push ke GitHub
```bash
# Ganti USERNAME dengan username GitHub Anda
git branch -M main
git remote add origin https://github.com/USERNAME/vegazgameshop.git
git push -u origin main
```

### 3. Aktifkan GitHub Pages
1. Buka repository di GitHub
2. Klik **Settings** > **Pages**
3. Di bagian **Source**, pilih **main** branch
4. Klik **Save**
5. Website akan live di: `https://USERNAME.github.io/vegazgameshop/`

## 💻 Cara Menggunakan

### Homepage (index.html)
- Menampilkan profil toko
- Contact person (WhatsApp & Telegram)
- Stock akun MLBB (9 item pertama dari localStorage)
- Testimonial slider
- Quick access ke Check Region dan Top Up

### Check Region (check-region.html)
- User input User ID dan Zone ID
- Simulasi pengecekan akun MLBB
- Auto-save data untuk Top Up

### Top Up Diamond (topup.html)
- Pilih paket diamond (data dari localStorage)
- Form order lengkap
- Auto-fill jika datang dari Check Region
- Order langsung via WhatsApp

### Admin Dashboard (admin.html)
**Login Default:**
- Email: `admin@vegazgameshop.com`
- Password: `admin123`

**Fitur:**
- Kelola paket diamond (CRUD)
- Kelola stock akun MLBB (CRUD)
- Statistik toko
- Settings (nomor admin, nama toko, dll)
- Export/Import data

## 🔗 Koneksi Data

Data tersimpan di `localStorage` browser dengan key:
- `packageData` - Paket diamond
- `stockData` - Stock akun MLBB
- `shopSettings` - Pengaturan toko
- `adminLoggedIn` - Status login admin

**Homepage otomatis membaca data dari localStorage** yang diupdate di Admin Dashboard.

## 🎨 Kustomisasi

### Mengubah Warna
Edit file `assets/css/styles.css` di bagian `:root`:
```css
:root {
    --primary: #667eea;      /* Warna utama */
    --secondary: #764ba2;    /* Warna sekunder */
    --accent: #f093fb;       /* Warna aksen */
    --success: #10b981;      /* Warna sukses */
    --danger: #ef4444;       /* Warna bahaya */
}
```

### Mengubah Font
Edit di `<head>` setiap halaman HTML:
```html
<link href="https://fonts.googleapis.com/css2?family=FONT_PILIHAN" rel="stylesheet">
```

### Mengubah Nomor WhatsApp Admin Default
1. Login ke Admin Dashboard
2. Klik menu **Settings**
3. Update **Nomor WhatsApp Admin**
4. Klik **Simpan Pengaturan**

## 📱 Fitur Responsif

Website sudah responsive untuk:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (< 768px)

## 🔧 Troubleshooting

### Data tidak muncul di Homepage
1. Pastikan sudah login ke Admin Dashboard
2. Tambahkan data paket atau stock di dashboard
3. Refresh homepage (F5)

### WhatsApp tidak terbuka
1. Pastikan nomor WhatsApp sudah diupdate di Settings
2. Format nomor: `62812345678` (tanpa +, tanpa 0 di awal)

### GitHub Pages tidak loading CSS
1. Pastikan semua path file menggunakan **relative path**
2. Jangan gunakan `/assets/` tapi `assets/`
3. Clear cache browser (Ctrl + Shift + R)

## 📝 Catatan Penting

1. **localStorage** hanya tersimpan di browser yang sama
2. Data akan hilang jika cache browser dibersihkan
3. Untuk production, gunakan backend database (Firebase, Supabase, dll)
4. Mock API untuk Check Region - ganti dengan API real untuk production

## 🆘 Support

Jika ada pertanyaan atau issue:
1. Cek documentation ini
2. Periksa console browser (F12) untuk error
3. Pastikan semua file ada di struktur folder yang benar

## 📄 License

Free to use for personal and commercial projects.

---

**Dibuat dengan ❤️ untuk VEGAZGAMESHOP**
