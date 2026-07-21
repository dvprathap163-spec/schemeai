import { useTranslation } from 'react-i18next'
import { EligibilityForm } from '@/components/forms/EligibilityForm'
import { PageHeader } from '@/components/layout/PageHeader'

export function CheckEligibilityPage() {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader title={t('form.title')} subtitle={t('form.subtitle')} />
      <section className="py-12 pb-24 sm:pb-12">
        <EligibilityForm />
      </section>
    </>
  )
}
