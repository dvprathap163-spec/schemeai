import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const API_URL = 'http://localhost:5000/api'

const CATEGORIES = [
  'all', 'Education', 'Health', 'Agriculture', 'Employment', 'Housing',
  'Women', 'Senior Citizen', 'Startup', 'Skill Development', 'Social Welfare',
]

export function SchemesPage() {
  const [schemes, setSchemes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  useEffect(() => {
    const fetchSchemes = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${API_URL}/schemes`)
        if (res.ok) setSchemes(await res.json())
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    fetchSchemes()
  }, [])

  const filtered = useMemo(() => {
    return schemes.filter((s) => {
      const matchesSearch = !search ||
        s.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.description?.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'all' || s.category === category
      return matchesSearch && matchesCategory
    })
  }, [schemes, search, category])

  return (
    <>
      <PageHeader title="Government Schemes" />
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row">
            <Input
              placeholder="Search schemes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sm:max-w-sm"
            />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="sm:w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>{c === 'all' ? 'All Categories' : c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} className="h-48 w-full" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-4xl mb-4">📭</p>
              <p>{schemes.length === 0 ? 'No schemes added yet. Check back soon!' : 'No schemes match your filters.'}</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((scheme) => (
                <Card key={scheme._id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    {scheme.category && <Badge className="w-fit mb-2">{scheme.category}</Badge>}
                    <CardTitle className="line-clamp-2">{scheme.name}</CardTitle>
                    <CardDescription>{scheme.ministry}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{scheme.description}</p>
                    <Link to={`/schemes/${scheme.slug}`}>
                      <Button variant="secondary" className="w-full">View Details</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
