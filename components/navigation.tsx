'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Menu, X, History, HelpCircle, Info, LogOut, LogIn } from 'lucide-react'

export function Navigation() {
  const { user, logout, isLoading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  // Fungsi untuk menutup sidebar setelah link diklik
  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl shadow-sm">
              B
            </div>
            <span className="font-bold text-xl text-foreground">
              Batik Kemang
            </span>
          </Link>

          {/* Desktop & Mobile Menu Area (Kanan) */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="hidden sm:block font-medium text-muted-foreground hover:text-foreground transition-colors mr-2"
            >
              Beranda
            </Link>

            {/* Tombol Hamburger (Garis 3) */}
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setIsOpen(true)}
              className="border-border hover:bg-muted"
              aria-label="Buka Menu"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay Gelap saat Sidebar Terbuka */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm transition-opacity" 
          onClick={closeMenu}
        >
          {/* Sidebar / Drawer Panel */}
          <div 
            className="fixed right-0 top-0 bottom-0 w-72 bg-background border-l border-border shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col"
            onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam sidebar menutup overlay
          >
            {/* Header Sidebar */}
            <div className="p-5 flex justify-between items-center border-b border-border/50">
              <span className="font-bold text-lg tracking-wide">Menu Navigasi</span>
              <Button variant="ghost" size="icon" onClick={closeMenu} className="hover:bg-muted rounded-full">
                <X className="w-5 h-5 text-muted-foreground" />
              </Button>
            </div>

            {/* Isi Sidebar */}
            <div className="flex flex-col py-4 flex-grow">
              
              {/* Beranda (Khusus Mobile) */}
              <Link 
                href="/" 
                onClick={closeMenu} 
                className="sm:hidden flex items-center px-6 py-4 text-foreground hover:bg-primary/5 hover:text-primary transition-colors border-l-4 border-transparent hover:border-primary"
              >
                <div className="w-5 h-5 mr-4 flex items-center justify-center font-bold font-serif text-muted-foreground">B</div>
                <span className="font-medium">Beranda</span>
              </Link>

              {/* 1. Riwayat (Hanya Muncul Jika Login) */}
              {user && (
                <Link 
                  href="/history" 
                  onClick={closeMenu} 
                  className="flex items-center px-6 py-4 text-foreground hover:bg-primary/5 hover:text-primary transition-colors border-l-4 border-transparent hover:border-primary"
                >
                  <History className="w-5 h-5 mr-4 text-muted-foreground" />
                  <span className="font-medium">Riwayat Deteksi</span>
                </Link>
              )}
              
              {/* 2. Cara Penggunaan */}
              <Link 
                href="/cara-penggunaan" 
                onClick={closeMenu} 
                className="flex items-center px-6 py-4 text-foreground hover:bg-primary/5 hover:text-primary transition-colors border-l-4 border-transparent hover:border-primary"
              >
                <HelpCircle className="w-5 h-5 mr-4 text-muted-foreground" />
                <span className="font-medium">Cara Penggunaan</span>
              </Link>
              
              {/* 3. Informasi Pembuat */}
              <Link 
                href="/informasi-pembuat" 
                onClick={closeMenu} 
                className="flex items-center px-6 py-4 text-foreground hover:bg-primary/5 hover:text-primary transition-colors border-l-4 border-transparent hover:border-primary"
              >
                <Info className="w-5 h-5 mr-4 text-muted-foreground" />
                <span className="font-medium">Informasi Pembuat</span>
              </Link>
            </div>

            {/* 4. Bagian Bawah: Login / Keluar */}
            <div className="p-6 border-t border-border/50 bg-muted/20">
              {isLoading ? (
                <div className="w-full h-12 rounded-lg bg-muted animate-pulse" />
              ) : user ? (
                <button 
                  onClick={() => {
                    logout()
                    closeMenu()
                  }} 
                  className="flex items-center w-full justify-center bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground py-3 rounded-lg transition-colors font-semibold shadow-sm"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Keluar Akun
                </button>
              ) : (
                <Link 
                  href="/login" 
                  onClick={closeMenu} 
                  className="flex items-center w-full justify-center bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-lg transition-colors font-semibold shadow-sm"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Login / Daftar
                </Link>
              )}
            </div>

          </div>
        </div>
      )}
    </nav>
  )
}