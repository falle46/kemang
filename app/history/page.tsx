'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { ArrowRight, Trash2, Calendar, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

// Sesuaikan nama field ini jika di database Supabase Anda berbeda
interface HistoryItem {
  id: string
  batik_type: string
  confidence: number
  created_at: string
}

export default function HistoryPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      router.push('/login')
      return
    }

    const fetchHistory = async () => {
      try {
        setIsLoading(true)
        // Menarik data dari Supabase (Asumsi nama tabel Anda adalah 'history')
        // Pastikan nama tabel di '.from()' sesuai dengan yang Anda buat di Supabase
        const { data, error: fetchError } = await supabase
          .from('history') 
          .select('*')
          .eq('user_id', user.id) // Hanya ambil riwayat milik user yang sedang login
          .order('created_at', { ascending: false }) // Urutkan dari yang paling baru

        if (fetchError) throw fetchError

        if (data) {
          setHistory(data)
        }
      } catch (err) {
        console.error('Error fetching history:', err)
        setError('Gagal memuat riwayat identifikasi dari server.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistory()
  }, [user, authLoading, router])

  const handleDelete = async (id: string) => {
    // Konfirmasi sebelum menghapus agar tidak terhapus tidak sengaja
    if (!window.confirm('Apakah Anda yakin ingin menghapus riwayat ini?')) return;

    try {
      // Menghapus data dari Supabase
      const { error: deleteError } = await supabase
        .from('history')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id) // Keamanan ganda, pastikan milik user tersebut

      if (deleteError) throw deleteError

      // Perbarui tampilan dengan menghapus item dari state lokal
      setHistory(history.filter((item) => item.id !== id))
    } catch (err) {
      console.error('Error deleting history:', err)
      setError('Gagal menghapus item riwayat.')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12 flex-grow w-full">
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 bg-muted rounded-xl animate-pulse border border-border" />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-bold text-foreground mb-3">Riwayat Identifikasi</h1>
          <p className="text-muted-foreground text-lg">
            Semua identifikasi Batik Kemang Anda disimpan di sini. Klik detail untuk melihat hasil analisis AI.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 mb-8 flex items-center text-destructive">
            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Empty State */}
        {history.length === 0 && !error ? (
          <div className="text-center py-20 bg-card rounded-2xl border border-dashed shadow-sm">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Belum ada riwayat identifikasi
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Mulai unggah foto atau gunakan kamera untuk mendeteksi Batik Kemang. Hasilnya akan otomatis tersimpan di sini.
            </p>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 rounded-full px-8 h-12 text-md font-semibold shadow-md">
                Identifikasi Batik Sekarang
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {history.map((item) => (
              <div
                key={item.id}
                className="group bg-card border border-border rounded-xl p-5 md:p-6 hover:border-primary/50 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <Link href={`/result/${item.id}`} className="flex-1">
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {item.batik_type}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground font-medium bg-muted/50 w-max px-3 py-1.5 rounded-md">
                        <Calendar className="w-4 h-4 mr-2 text-primary/70" />
                        <span>{formatDate(item.created_at)}</span>
                      </div>
                    </div>
                  </Link>

                  <div className="flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0 border-t border-border/50 md:border-0 mt-2 md:mt-0">
                    {/* Confidence Score */}
                    <div className="text-left md:text-right">
                      <div className="text-3xl font-black text-primary">
                        {item.confidence.toFixed(1)}%
                      </div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Akurasi AI
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <Link href={`/result/${item.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center space-x-2 rounded-full border-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <span className="hidden sm:inline font-semibold">Detail</span>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-full h-9 w-9 p-0 flex items-center justify-center transition-colors"
                        title="Hapus Riwayat"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}