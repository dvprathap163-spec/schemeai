import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNotifications } from '@/contexts/NotificationContext'
import { Skeleton } from '@/components/ui/skeleton'
import { schemes as defaultSchemes } from '@/data/schemes'

const API_URL = 'http://localhost:5000/api'

const EMPTY_SCHEME = {
  name: '', description: '', ministry: '', category: 'Social Welfare',
  applyUrl: '', officialUrl: '', deadline: '', benefits: [''], documents: [''],
}

export function AdminPage() {
  const { addNotification } = useNotifications()

  type TabType = 'schemes' | 'stats' | 'faqs' | 'contact' | 'feedback'
  const [activeTab, setActiveTab] = useState<TabType>('schemes')

  // Schemes
  const [schemes, setSchemes] = useState<any[]>([])
  const [editingScheme, setEditingScheme] = useState<any | null>(null)
  const [savingScheme, setSavingScheme] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  // Stats
  const [stats, setStats] = useState({ schemesCount: 0, usersCount: 0, statesCount: 1, accuracy: 93 })
  const [savingStats, setSavingStats] = useState(false)

  // FAQs
  const [faqs, setFaqs] = useState<any[]>([])
  const [editingFaq, setEditingFaq] = useState<any | null>(null)

  // Contact
  const [contactInfo, setContactInfo] = useState({
    email: 'support@schemeai.com',
    phone: '1800-XXX-XXXX',
    address: 'New Delhi, India',
  })

  // Feedback
  const [feedbacks, setFeedbacks] = useState<any[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (activeTab === 'schemes') fetchSchemes()
    else if (activeTab === 'stats') fetchStats()
    else if (activeTab === 'faqs') fetchFaqs()
    else if (activeTab === 'contact') fetchContact()
    else if (activeTab === 'feedback') fetchFeedbacks()
  }, [activeTab])

  // ── Fetch helpers ──
  const fetchSchemes = async () => { setLoading(true); try { const r = await fetch(`${API_URL}/schemes`); if (r.ok) setSchemes(await r.json()) } catch { } setLoading(false) }
  const fetchStats = async () => { setLoading(true); try { const r = await fetch(`${API_URL}/stats`); if (r.ok) setStats(await r.json()) } catch { } setLoading(false) }
  const fetchFaqs = async () => { setLoading(true); try { const r = await fetch(`${API_URL}/faqs`); if (r.ok) setFaqs(await r.json()) } catch { } setLoading(false) }
  const fetchContact = async () => { setLoading(true); try { const r = await fetch(`${API_URL}/contact`); if (r.ok) setContactInfo(await r.json()) } catch { } setLoading(false) }
  const fetchFeedbacks = async () => { setLoading(true); try { const r = await fetch(`${API_URL}/feedback`); if (r.ok) setFeedbacks(await r.json()) } catch { } setLoading(false) }

  const handleDeleteFeedback = async (id: string) => {
    if (!confirm('Delete this feedback?')) return
    try {
      const r = await fetch(`${API_URL}/feedback/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token()}` }
      })
      if (r.ok) {
        addNotification('Deleted', 'Feedback removed.', 'success')
        fetchFeedbacks()
      } else {
        const d = await r.json()
        addNotification('Error', d.message || 'Failed to delete feedback.', 'error')
      }
    } catch (e: any) {
      addNotification('Error', e.message, 'error')
    }
  }

  const token = () => localStorage.getItem('token')

  // ── Stats save ──
  const handleSaveStats = async () => {
    setSavingStats(true)
    try {
      const r = await fetch(`${API_URL}/stats`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` }, body: JSON.stringify(stats) })
      if (r.ok) addNotification('Success', 'Homepage stats updated!', 'success')
      else { const d = await r.json(); addNotification('Error', d.message, 'error') }
    } catch (e: any) { addNotification('Error', e.message, 'error') }
    setSavingStats(false)
  }

  // ── Scheme CRUD ──
  const handleDeleteScheme = async (id: string) => {
    if (!confirm('Delete this scheme?')) return
    const r = await fetch(`${API_URL}/schemes/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token()}` } })
    if (r.ok) { addNotification('Deleted', 'Scheme removed.', 'success'); fetchSchemes() }
  }
  const handleSaveScheme = async () => {
    if (!editingScheme) return
    setSavingScheme(true)
    const cleanBenefits = editingScheme.benefits.filter((b: string) => b.trim())
    const cleanDocuments = editingScheme.documents.filter((d: string) => d.trim())
    const data = {
      ...editingScheme,
      slug: editingScheme.slug || editingScheme.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      benefits: cleanBenefits,
      documents: cleanDocuments,
    }
    const url = editingScheme._id ? `${API_URL}/schemes/${editingScheme._id}` : `${API_URL}/schemes`
    try {
      const r = await fetch(url, { method: editingScheme._id ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` }, body: JSON.stringify(data) })
      if (r.ok) { addNotification('Success', 'Scheme saved and translated into all supported languages.', 'success'); fetchSchemes(); setEditingScheme(null) }
      else { const d = await r.json(); addNotification('Error', d.message, 'error') }
    } catch (error: any) {
      addNotification('Error', error.message || 'Could not save the scheme.', 'error')
    } finally {
      setSavingScheme(false)
    }
  }

  // ── FAQ CRUD ──
  const handleSaveFaq = async () => {
    if (!editingFaq) return
    const url = editingFaq._id ? `${API_URL}/faqs/${editingFaq._id}` : `${API_URL}/faqs`
    const r = await fetch(url, { method: editingFaq._id ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` }, body: JSON.stringify(editingFaq) })
    if (r.ok) { addNotification('Success', 'FAQ saved.', 'success'); fetchFaqs(); setEditingFaq(null) }
    else { const d = await r.json(); addNotification('Error', d.message, 'error') }
  }
  const handleDeleteFaq = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return
    const r = await fetch(`${API_URL}/faqs/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token()}` } })
    if (r.ok) { addNotification('Deleted', 'FAQ removed.', 'success'); fetchFaqs() }
  }

  const handleSaveContact = async () => {
    try {
      const r = await fetch(`${API_URL}/contact`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify(contactInfo),
      })
      if (r.ok) { addNotification('Success', 'Contact details updated.', 'success'); setContactInfo(await r.json()) }
      else { const d = await r.json(); addNotification('Error', d.message, 'error') }
    } catch (e: any) { addNotification('Error', e.message, 'error') }
  }

  // ── List helpers ──
  const updateListItem = (field: 'benefits' | 'documents', idx: number, value: string) => {
    const arr = [...editingScheme[field]]; arr[idx] = value; setEditingScheme({ ...editingScheme, [field]: arr })
  }
  const addListItem = (field: 'benefits' | 'documents') => setEditingScheme({ ...editingScheme, [field]: [...editingScheme[field], ''] })
  const removeListItem = (field: 'benefits' | 'documents', idx: number) => {
    const arr = editingScheme[field].filter((_: any, i: number) => i !== idx)
    setEditingScheme({ ...editingScheme, [field]: arr.length ? arr : [''] })
  }

  const TAB_BTN = (tab: TabType, label: string) => (
    <Button key={tab} variant={activeTab === tab ? 'default' : 'outline'} onClick={() => setActiveTab(tab)}>{label}</Button>
  )

  return (
    <>
      <PageHeader title="Admin Dashboard" subtitle="Manage all website content from one place" />
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">

          {/* Tab Bar */}
          <div className="flex flex-wrap gap-2 mb-8">
            {TAB_BTN('schemes', '📋 Schemes')}
            {TAB_BTN('faqs', '❓ FAQs')}
            {TAB_BTN('contact', '☎️ Contact')}
            {TAB_BTN('stats', '📊 Statistics')}
            {TAB_BTN('feedback', '💬 Feedback')}
          </div>

          {/* ─── SCHEMES ─── */}
          {activeTab === 'schemes' && (() => {
            const categories = ['All', ...Array.from(new Set(schemes.map((s) => s.category).filter(Boolean)))]
            const filteredSchemes = selectedCategory === 'All'
              ? schemes
              : schemes.filter((s) => s.category === selectedCategory)

            return (
              <div>
                <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-muted-foreground">{schemes.length} schemes in database</p>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="border border-input rounded-md px-3 py-1 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <Button onClick={() => setEditingScheme({ ...EMPTY_SCHEME })}>+ Add Scheme</Button>
                </div>
                {loading ? <div className="space-y-4"><Skeleton className="h-24 w-full" /><Skeleton className="h-24 w-full" /></div> : (
                  <div className="grid gap-4">
                    {filteredSchemes.map((s) => (
                      <Card key={s._id}><CardContent className="flex items-center justify-between pt-6">
                        <div>
                          <p className="font-semibold">{s.name}</p>
                          <p className="text-sm text-muted-foreground">{s.category} · {s.ministry}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{s.description}</p>
                        </div>
                        <div className="flex gap-2 ml-4 shrink-0">
                          <Button variant="outline" size="sm" onClick={() => setEditingScheme({ ...s, benefits: s.benefits?.length ? s.benefits : [''], documents: s.documents?.length ? s.documents : [''] })}>Edit</Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteScheme(s._id)}>Delete</Button>
                        </div>
                      </CardContent></Card>
                    ))}
                    {filteredSchemes.length === 0 && <div className="text-center py-16 text-muted-foreground"><p className="text-4xl mb-4">📭</p><p>No schemes matched this category.</p></div>}
                  </div>
                )}
              </div>
            )
          })()}

          {/* ─── FAQs ─── */}
          {activeTab === 'faqs' && (
            <div>
              <div className="mb-6 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">{faqs.length} FAQs · shown on Homepage & FAQ page</p>
                <Button onClick={() => setEditingFaq({ question: '', answer: '' })}>+ Add FAQ</Button>
              </div>
              {loading ? <div className="space-y-4"><Skeleton className="h-20 w-full" /><Skeleton className="h-20 w-full" /></div> : (
                <div className="grid gap-4">
                  {faqs.map((f) => (
                    <Card key={f._id}><CardContent className="flex items-start justify-between pt-6 gap-4">
                      <div className="flex-1">
                        <p className="font-semibold">{f.question}</p>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{f.answer}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button variant="outline" size="sm" onClick={() => setEditingFaq(f)}>Edit</Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteFaq(f._id)}>Delete</Button>
                      </div>
                    </CardContent></Card>
                  ))}
                  {faqs.length === 0 && <div className="text-center py-16 text-muted-foreground"><p className="text-4xl mb-4">❓</p><p>No FAQs yet. Add one!</p></div>}
                </div>
              )}
            </div>
          )}

          {/* ─── CONTACT ─── */}
          {activeTab === 'contact' && (
            <div>
              <div className="mb-6 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Update the public contact information shown on the contact page.</p>
              </div>
              {loading ? <div className="space-y-4"><Skeleton className="h-24 w-full" /><Skeleton className="h-24 w-full" /></div> : (
                <Card className="max-w-2xl">
                  <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2"><Label>Email</Label><Input value={contactInfo.email} onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Helpline</Label><Input value={contactInfo.phone} onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })} /></div>
                    <div className="space-y-2"><Label>Address</Label><Input value={contactInfo.address} onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })} /></div>
                    <Button className="w-full" onClick={handleSaveContact}>Save Contact Details</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* ─── STATS ─── */}
          {activeTab === 'stats' && (
            <div>
              <p className="text-sm text-muted-foreground mb-6">Update the four statistics shown on the homepage.</p>
              {loading ? <Skeleton className="h-64 w-full max-w-xl" /> : (
                <Card className="max-w-xl">
                  <CardHeader><CardTitle>Homepage Statistics</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2"><Label>🗂️ Government Schemes Count</Label><Input type="number" value={stats.schemesCount} onChange={(e) => setStats({ ...stats, schemesCount: Number(e.target.value) })} /></div>
                    <div className="space-y-2"><Label>👥 Citizens Helped</Label><Input type="number" value={stats.usersCount} onChange={(e) => setStats({ ...stats, usersCount: Number(e.target.value) })} /></div>
                    <div className="space-y-2"><Label>🗺️ States Covered</Label><Input type="number" value={stats.statesCount} onChange={(e) => setStats({ ...stats, statesCount: Number(e.target.value) })} /></div>
                    <div className="space-y-2"><Label>🎯 Match Accuracy (%)</Label><Input type="number" min={0} max={100} value={stats.accuracy} onChange={(e) => setStats({ ...stats, accuracy: Number(e.target.value) })} /></div>
                    <Button className="w-full mt-2" onClick={handleSaveStats} disabled={savingStats}>{savingStats ? 'Saving...' : 'Save Stats to Database'}</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* ─── FEEDBACK ─── */}
          {activeTab === 'feedback' && (
            <div>
              <div className="mb-6 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">{feedbacks.length} feedback submissions in database</p>
              </div>
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                </div>
              ) : (
                <div className="grid gap-4">
                  {feedbacks.map((f) => (
                    <Card key={f._id}>
                      <CardContent className="flex items-start justify-between pt-6 gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-lg">{f.subject}</span>
                            <span className="text-sm text-muted-foreground">({f.email})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <span
                                key={idx}
                                className={`text-sm ${idx < (f.rating || 5) ? 'text-amber-400' : 'text-muted/40'
                                  }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <p className="text-sm text-foreground bg-muted p-3 rounded-lg border border-border">
                            {f.comment}
                          </p>
                          <div className="text-xs text-muted-foreground">
                            Submitted by <span className="font-semibold">{f.name}</span> on{' '}
                            {new Date(f.createdAt).toLocaleString()}
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteFeedback(f._id)}
                          className="shrink-0"
                        >
                          Delete
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  {feedbacks.length === 0 && (
                    <div className="text-center py-16 text-muted-foreground">
                      <p className="text-4xl mb-4">💬</p>
                      <p>No feedback received yet.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ─── SCHEME MODAL ─── */}
          {editingScheme && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border bg-background p-6 space-y-5 shadow-xl">
                <h2 className="text-xl font-semibold">{editingScheme._id ? 'Edit Scheme' : 'New Scheme'}</h2>
                <p className="text-sm text-muted-foreground">Enter the scheme in English. Saving automatically translates every detail into Hindi, Telugu, Kannada, Malayalam, and Tamil.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2"><Label>Scheme Name *</Label><Input placeholder="e.g. PM-KISAN Samman Nidhi" value={editingScheme.name || ''} onChange={(e) => setEditingScheme({ ...editingScheme, name: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Category</Label>
                    <select
                      className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={editingScheme.category || 'Social Welfare'}
                      onChange={(e) => setEditingScheme({ ...editingScheme, category: e.target.value })}
                    >
                      {['Education', 'Health', 'Agriculture', 'Employment', 'Housing', 'Women', 'Senior Citizen', 'Startup', 'Skill Development', 'Social Welfare'].map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2"><Label>Ministry</Label><Input placeholder="e.g. Ministry of Agriculture" value={editingScheme.ministry || ''} onChange={(e) => setEditingScheme({ ...editingScheme, ministry: e.target.value })} /></div>
                  <div className="col-span-2 space-y-2"><Label>Description</Label><Input placeholder="Short description" value={editingScheme.description || ''} onChange={(e) => setEditingScheme({ ...editingScheme, description: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Apply Now URL</Label><Input placeholder="https://..." value={editingScheme.applyUrl || ''} onChange={(e) => setEditingScheme({ ...editingScheme, applyUrl: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Official Website URL</Label><Input placeholder="https://..." value={editingScheme.officialUrl || ''} onChange={(e) => setEditingScheme({ ...editingScheme, officialUrl: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Deadline</Label><Input type="date" value={editingScheme.deadline || ''} onChange={(e) => setEditingScheme({ ...editingScheme, deadline: e.target.value })} /></div>
                </div>
                <div className="space-y-2">
                  <Label>Benefits</Label>
                  {editingScheme.benefits.map((b: string, i: number) => (
                    <div key={i} className="flex gap-2"><Input placeholder={`Benefit ${i + 1}`} value={b} onChange={(e) => updateListItem('benefits', i, e.target.value)} /><Button variant="ghost" size="sm" onClick={() => removeListItem('benefits', i)}>✕</Button></div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => addListItem('benefits')}>+ Add Benefit</Button>
                </div>
                <div className="space-y-2">
                  <Label>Required Documents</Label>
                  {editingScheme.documents.map((d: string, i: number) => (
                    <div key={i} className="flex gap-2"><Input placeholder={`Document ${i + 1}`} value={d} onChange={(e) => updateListItem('documents', i, e.target.value)} /><Button variant="ghost" size="sm" onClick={() => removeListItem('documents', i)}>✕</Button></div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => addListItem('documents')}>+ Add Document</Button>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1" onClick={handleSaveScheme} disabled={savingScheme}>{savingScheme ? 'Translating and saving...' : 'Save to Database'}</Button>
                  <Button variant="outline" onClick={() => setEditingScheme(null)} disabled={savingScheme}>Cancel</Button>
                </div>
              </div>
            </div>
          )}

          {/* ─── FAQ MODAL ─── */}
          {editingFaq && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="w-full max-w-lg rounded-xl border bg-background p-6 space-y-4 shadow-xl">
                <h2 className="text-xl font-semibold">{editingFaq._id ? 'Edit FAQ' : 'New FAQ'}</h2>
                <div className="space-y-2"><Label>Question</Label><Input value={editingFaq.question || ''} onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })} placeholder="e.g. How do I apply?" /></div>
                <div className="space-y-2"><Label>Answer</Label><textarea className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-ring" value={editingFaq.answer || ''} onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })} placeholder="Provide a clear answer..." /></div>
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1" onClick={handleSaveFaq}>Save</Button>
                  <Button variant="outline" onClick={() => setEditingFaq(null)}>Cancel</Button>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  )
}
