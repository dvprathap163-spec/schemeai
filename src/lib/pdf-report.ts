import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { EligibilityResult, UserProfile } from '@/types'

export function generateEligibilityReport(
  profile: UserProfile,
  results: EligibilityResult[],
): void {
  const doc = new jsPDF()
  const date = new Date().toLocaleDateString('en-IN')

  doc.setFontSize(20)
  doc.setTextColor(30, 64, 175)
  doc.text('Government Scheme Eligibility Report', 14, 22)

  doc.setFontSize(10)
  doc.setTextColor(100)
  doc.text(`Generated on: ${date}`, 14, 30)
  doc.text('SchemeAI - Government Scheme Eligibility Checker', 14, 36)

  doc.setFontSize(14)
  doc.setTextColor(0)
  doc.text('Applicant Details', 14, 48)

  autoTable(doc, {
    startY: 52,
    head: [['Field', 'Value']],
    body: [
      ...(profile.fullName ? [['Name', profile.fullName]] : []),
      ['Age', String(profile.age)],
      ['Gender', profile.gender],
      ['Category', profile.casteCategory],
      ['State', profile.state],
      ['Income', `₹${profile.familyIncome.toLocaleString('en-IN')}`],
      ['Employment', profile.employmentStatus],
      ['BPL Status', profile.bplStatus ? 'Yes' : 'No'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [30, 64, 175] },
  })

  const finalY = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10

  doc.setFontSize(14)
  doc.text(`Eligible Schemes (${results.length})`, 14, finalY)

  autoTable(doc, {
    startY: finalY + 4,
    head: [['Scheme', 'Status', 'Score', 'Ministry']],
    body: results.map((r) => [
      r.scheme.name,
      r.status === 'eligible' ? 'Eligible' : 'Partial',
      `${Math.round(r.score)}%`,
      r.scheme.ministry,
    ]),
    theme: 'striped',
    headStyles: { fillColor: [22, 163, 74] },
  })

  doc.setFontSize(8)
  doc.setTextColor(150)
  doc.text(
    'Disclaimer: This report is for informational purposes only. Please verify eligibility on official government portals.',
    14,
    doc.internal.pageSize.height - 10,
  )

  doc.save(`eligibility-report-${date.replace(/\//g, '-')}.pdf`)
}
