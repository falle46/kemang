```mermaid
graph TD
    A([Mulai: User/Guest Masuk Halaman Utama]) --> B[Klik Tombol 'Tambah Gambar']
    B --> C{Mau Simpan ke History?}
    
    %% Jalur Guest
    C -- Tidak / Tetap Guest --> D[Upload Gambar]
    D --> E[Proses Identifikasi via ResNet-50]
    E --> F[Tampil Halaman Hasil: Batik Kemang / Bukan]
    F --> G([Selesai])
    
    %% Jalur Register/Login
    C -- Ya --> H{Sudah Punya Akun?}
    H -- Belum --> I[Halaman Daftar / Sign Up]
    I --> J[Simpan Data User ke Database]
    J --> K[Halaman Login]
    H -- Sudah --> K
    
    K --> L[Login Berhasil]
    L --> M[Upload Gambar & Simpan ke Database]
    M --> N[Proses Identifikasi via ResNet-50]
    N --> O[Tampil Halaman Hasil: Batik Kemang / Bukan]
    O --> P[Bisa Akses Halaman History User]
    P --> G
    
    %% Halaman Tentang
    A --> Q[Halaman Tentang / Developer]
    Q --> G
