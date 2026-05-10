'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, UserPlus, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'

export default function SignupPage() {
  const router = useRouter()
  const { signup } = useAuth()
  
  // PERUBAHAN: Ganti state username menjadi email
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    // Validasi email sederhana
    if (!email.includes('@')) {
      setError('Masukkan alamat email yang valid')
      return false
    }
    if (password.length < 6) {
      setError('Kata sandi minimal 6 karakter')
      return false
    }
    if (password !== confirmPassword) {
      setError('Konfirmasi kata sandi tidak cocok')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // PERUBAHAN: Memanggil fungsi signup dengan email
      await signup(email, password)
      alert('Pendaftaran berhasil! Silakan login untuk melanjutkan.')
      router.push('/login')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Pendaftaran gagal')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
              B
            </div>
            <span className="font-bold text-lg text-foreground">Batik Kemang</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Buat Akun Baru</h1>
          <p className="text-muted-foreground text-sm px-4">
            Daftar untuk menyimpan riwayat identifikasi dan mengelola preferensi batik Anda.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Error Message */}
          {error && (
            <div className="flex items-start space-x-3 bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive font-medium">{error}</p>
            </div>
          )}

          {/* Features Highlights */}
          <div className="bg-primary/5 rounded-lg p-4 space-y-2 mb-6 border border-primary/10">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Simpan riwayat hasil identifikasi AI</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Akses data historis kapan saja</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-1.5">
                Alamat Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                disabled={isLoading}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-1.5">
                Kata Sandi
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                disabled={isLoading}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50"
                required
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-semibold text-foreground mb-1.5">
                Konfirmasi Sandi
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ketik ulang sandi Anda"
                disabled={isLoading}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg flex items-center justify-center space-x-2 transition-all"
            >
              <UserPlus className="w-5 h-5" />
              <span>{isLoading ? 'Memproses Pendaftaran...' : 'Daftar Sekarang'}</span>
            </Button>
          </form>

          {/* Divider */}
          <div className="relative pt-2">
            <div className="absolute inset-0 flex items-center pt-2">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm pt-2">
              <span className="px-3 bg-card text-muted-foreground">atau</span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center pt-2">
            <p className="text-muted-foreground text-sm">
              Sudah memiliki akun?{' '}
              <Link href="/login" className="text-primary hover:underline font-semibold transition-colors">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-8">
          <Link href="/" className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors">
            &larr; Kembali ke halaman utama
          </Link>
        </div>
      </div>
    </div>
  )
}