import React, { createContext, useContext, useEffect, useState } from 'react'

const API_URL = 'http://localhost:5000/api'

interface AuthContextType {
  user: any | null
  isLoading: boolean
  isAdmin: boolean
  login: (token: string, userData: any) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAdmin: false,
  login: () => {},
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.ok) {
          const data = await res.json()
          setUser(data)
          setIsAdmin(data.is_admin)
        } else {
          localStorage.removeItem('token')
        }
      } catch (err) {
        console.error(err)
      }
      setIsLoading(false)
    }

    fetchUser()
  }, [])

  const login = (token: string, userData: any) => {
    localStorage.setItem('token', token)
    setUser(userData)
    setIsAdmin(userData.is_admin)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
