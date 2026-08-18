import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const API_URL = 'http://localhost:5000/api'

export function DashboardPage() {
  const { user, logout } = useAuth()
  const [savedSchemes, setSavedSchemes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true)
      const token = localStorage.getItem('token')
      
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const res = await fetch(`${API_URL}/schemes/saved/list`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.ok) {
          const data = await res.json()
          setSavedSchemes(data || [])
        }
      } catch (err) {
        console.error('Failed to fetch saved schemes', err)
      }

      setLoading(false)
    }

    fetchDashboardData()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
        <div className="mt-8">
          <Skeleton className="h-48 w-full max-w-2xl" />
        </div>
      </div>
    )
  }

  return (
    <>
      <PageHeader title="Your Dashboard" subtitle="Manage your profile and saved schemes" />
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* Profile Section */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{user?.full_name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  <Button variant="outline" className="w-full" onClick={handleLogout}>
                    Log out
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Saved Schemes Section */}
            <div className="lg:col-span-2">
              <div className="grid gap-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Saved Schemes</h2>
                  {savedSchemes.length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center text-muted-foreground">
                        <p>You haven't saved any schemes yet.</p>
                        <Link to="/schemes">
                          <Button className="mt-4" variant="outline">Browse Schemes</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {savedSchemes.map((scheme) => (
                        <Card key={scheme._id} className="flex flex-col h-full">
                          <CardHeader>
                            <CardTitle className="line-clamp-1">{scheme.name}</CardTitle>
                            <CardDescription>{scheme.ministry}</CardDescription>
                          </CardHeader>
                          <CardContent className="flex-1">
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {scheme.description}
                            </p>
                          </CardContent>
                          <div className="p-6 pt-0 mt-auto">
                            <Link to={`/schemes/${scheme.slug}`}>
                              <Button variant="secondary" className="w-full">View Details</Button>
                            </Link>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
