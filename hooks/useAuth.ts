import { useState, useEffect } from 'react'

export function useAuth() {
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')
    if (storedToken) {
      setToken(storedToken)
    } else {
      // Redirect to login if no token
      window.location.href = '/auth/login'
    }
    setIsLoading(false)
  }, [])

  return { token, isLoading }
}
