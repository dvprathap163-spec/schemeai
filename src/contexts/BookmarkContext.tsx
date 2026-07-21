import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

interface BookmarkContextType {
  bookmarks: string[]
  toggleBookmark: (schemeId: string) => void
  isBookmarked: (schemeId: string) => boolean
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined)
const STORAGE_KEY = 'schemeai-bookmarks'

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as string[]
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
  }, [bookmarks])

  const toggleBookmark = useCallback((schemeId: string) => {
    setBookmarks((prev) =>
      prev.includes(schemeId) ? prev.filter((id) => id !== schemeId) : [...prev, schemeId],
    )
  }, [])

  const isBookmarked = useCallback(
    (schemeId: string) => bookmarks.includes(schemeId),
    [bookmarks],
  )

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  )
}

export function useBookmarks() {
  const context = useContext(BookmarkContext)
  if (!context) throw new Error('useBookmarks must be used within BookmarkProvider')
  return context
}
