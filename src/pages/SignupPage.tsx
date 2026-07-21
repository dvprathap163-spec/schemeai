import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useNotifications } from '@/contexts/NotificationContext'

const API_URL = 'http://localhost:5000/api'

export function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { addNotification } = useNotifications()
  const navigate = useNavigate()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, email, password })
      })

      const data = await res.json()

      if (res.ok) {
        addNotification('Success', 'Account created! You can now log in.', 'success')
        navigate('/login')
      } else {
        addNotification('Signup Failed', data.message || 'Error', 'error')
      }
    } catch (err: any) {
      addNotification('Signup Failed', err.message, 'error')
    }

    setLoading(false)
  }

  return (
    <>
      <PageHeader title="Sign Up" subtitle="Create an account to save schemes and preferences" />
      <section className="py-12 flex justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Enter your details to get started</CardDescription>
          </CardHeader>
          <form onSubmit={handleSignup}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password (min 6 characters)</Label>
                <Input 
                  id="password" 
                  type="password" 
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Sign up'}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </section>
    </>
  )
}
