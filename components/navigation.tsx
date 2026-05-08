'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { LogOut, Menu, X, History } from 'lucide-react'

export function Navigation() {
  const { user, logout, isLoading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
              B
            </div>
            <span className="hidden sm:inline font-bold text-lg text-foreground">
              Batik Kemang
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Beranda
            </Link>
            {user && (
              <Link
                href="/history"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
              >
                <History className="w-4 h-4" />
                <span>Riwayat</span>
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoading && !user ? (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Masuk
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Daftar
                  </Button>
                </Link>
              </>
            ) : isLoading ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Keluar</span>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link href="/" className="block text-foreground hover:text-primary">
              Beranda
            </Link>
            {user && (
              <Link href="/history" className="block text-foreground hover:text-primary">
                Riwayat
              </Link>
            )}
            {!user ? (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm" className="w-full">
                    Masuk
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                    Daftar
                  </Button>
                </Link>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="w-full flex items-center justify-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar</span>
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
