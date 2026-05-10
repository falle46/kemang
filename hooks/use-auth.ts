'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 1. Cek status login saat halaman pertama kali dimuat
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setIsLoading(false)
    }

    checkAuth()

    // 2. Dengarkan perubahan (misal: user tiba-tiba logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Fungsi Logout Supabase
  const logout = async () => {
    try {
      await supabase.auth.signOut()
      window.location.href = '/' // Lempar kembali ke beranda
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  // Fungsi Login Supabase (Menggunakan Email, bukan Username)
  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      throw new Error(error.message)
    }
    
    return data
  }

  // Fungsi Daftar Supabase
  const signup = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    
    if (error) {
      throw new Error(error.message)
    }
    
    return data
  }

  return { user, isLoading, logout, login, signup }
}