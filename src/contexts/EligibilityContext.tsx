import { createContext, useContext, useState, type ReactNode } from 'react'
import type { EligibilityResult, UserProfile } from '@/types'

interface EligibilityContextType {
  profile: UserProfile | null
  results: EligibilityResult[]
  setEligibilityData: (profile: UserProfile, results: EligibilityResult[]) => void
  clearEligibilityData: () => void
}

const EligibilityContext = createContext<EligibilityContextType | undefined>(undefined)

export function EligibilityProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [results, setResults] = useState<EligibilityResult[]>([])

  const setEligibilityData = (p: UserProfile, r: EligibilityResult[]) => {
    setProfile(p)
    setResults(r)
    sessionStorage.setItem('schemeai-results', JSON.stringify({ profile: p, results: r }))
  }

  const clearEligibilityData = () => {
    setProfile(null)
    setResults([])
    sessionStorage.removeItem('schemeai-results')
  }

  return (
    <EligibilityContext.Provider value={{ profile, results, setEligibilityData, clearEligibilityData }}>
      {children}
    </EligibilityContext.Provider>
  )
}

export function useEligibility() {
  const context = useContext(EligibilityContext)
  if (!context) throw new Error('useEligibility must be used within EligibilityProvider')
  return context
}
