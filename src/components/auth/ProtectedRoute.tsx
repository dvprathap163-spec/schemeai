import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Skeleton } from '@/components/ui/skeleton'

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Skeleton className="h-8 w-32" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export const AdminRoute = () => {
  const { user, isAdmin, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Skeleton className="h-8 w-32" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!isAdmin) {
    // Redirect to home if they are logged in but not an admin
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
