import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import type { Notification } from '@/types'

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (title: string, message: string, type?: Notification['type']) => void
  markAsRead: (id: string) => void
  unreadCount: number
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = useCallback(
    (title: string, message: string, type: Notification['type'] = 'info') => {
      const notification: Notification = {
        id: crypto.randomUUID(),
        title,
        message,
        type,
        read: false,
        createdAt: new Date().toISOString(),
      }
      setNotifications((prev) => [notification, ...prev].slice(0, 20))
    },
    [],
  )

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    )
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('useNotifications must be used within NotificationProvider')
  return context
}
