import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold shadow-sm">
                B
              </div>
              <span className="font-bold text-lg text-foreground">Batik Kemang</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Platform identifikasi kecerdasan buatan (ResNet-50) yang didedikasikan untuk digitalisasi dan pelestarian warisan budaya Batik Kemang Bogor.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-foreground mb-4 uppercase tracking-wider text-sm">Navigasi Utama</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  Riwayat Deteksi
                </Link>
              </li>
              <li>
                <Link href="/informasi-pembuat" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  Informasi Pembuat
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-foreground mb-4 uppercase tracking-wider text-sm">Informasi & Edukasi</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/haki" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  Koleksi HAKI
                </Link>
              </li>
              <li>
                <Link href="/cara-penggunaan" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  Cara Kerja AI
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-foreground mb-4 uppercase tracking-wider text-sm">Legal & Bantuan</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/kebijakan-privasi" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/syarat-penggunaan" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  Syarat Penggunaan
                </Link>
              </li>
              <li>
                <Link href="/hubungi-kami" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            © {currentYear} Batik Kemang. Penelitian Skripsi Universitas Pakuan.
          </p>
          <p className="flex items-center">
            Dibuat dengan <span className="text-primary mx-1">❤</span> untuk melestarikan budaya Indonesia.
          </p>
        </div>
      </div>
    </footer>
  )
}