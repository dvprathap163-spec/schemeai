import { z } from 'zod'

// These are the simple categories shown to citizens in the eligibility form.
// They intentionally group several detailed catalogue categories together.
export const PREFERRED_SCHEME_CATEGORIES = [
  'Education', 'Health', 'Agriculture', 'Employment', 'Housing', 'Women',
  'Senior Citizen', 'Startup', 'Skill Development', 'Social Welfare',
] as const

// ─── Per-page field schemas (order matches UI step indices 0–5) ─────────────

/** Page 1 (step 0) – Personal Details */
export const aboutYourselfSchema = z.object({
  fullName: z.string().max(100).optional(),
  age: z.number({ error: 'Age is required' }).min(1, 'Age is required').max(120, 'Invalid age'),
  gender: z.enum(['Male', 'Female', 'Other']),
  maritalStatus: z.enum(['Single', 'Married', 'Widowed', 'Divorced']),
})

/** Page 2 (step 1) – Social / Caste Details */
export const socialDetailsSchema = z.object({
  casteCategory: z.enum(['General', 'OBC', 'PVTG', 'SC', 'ST', 'DNT', 'EWS']),
})

/** Page 3 (step 2) – Economic Details */
export const economicDetailsSchema = z.object({
  occupation: z.string().min(1, 'Please select your occupation!'),
  familyIncome: z.number().min(0).max(100000000).optional(),
  parentGuardianIncome: z.number().min(0).max(100000000).optional(),
  bplStatus: z.boolean(),
  isInHardship: z.boolean(),
})

/** Page 4 (step 3) – Education Details */
export const educationDetailsSchema = z.object({
  qualification: z.enum(['Below 10th', '10th', '12th', 'Graduate', 'Post Graduate', 'PhD']),
  collegeType: z.enum(['Government', 'Private', 'NA']).default('NA'),
})

/** Page 5 (step 4) – Location Details */
export const locationDetailsSchema = z.object({
  state: z.string().min(1, 'State is required'),
  district: z.string().default(''),
  areaType: z.enum(['Rural', 'Urban']),
})

/** Page 6 (step 5) – Preferences & Additional Filters */
export const otherFiltersSchema = z.object({
  isFarmer: z.boolean(),
  isWidow: z.boolean(),
  isSeniorCitizen: z.boolean(),
  isStartupOwner: z.boolean(),
  skillDevelopmentInterest: z.boolean(),
  isArtisan: z.boolean().default(false),
  isAnimalHusbandryOrFisheries: z.boolean().default(false),
  preferredCategories: z.array(z.enum(PREFERRED_SCHEME_CATEGORIES)).default([]),
})

/** Page 4 (step 3) – Disability & Minority Details */
export const disabilityMinoritySchema = z.object({
  disabilityStatus: z.boolean(),
  disabilityPercentage: z.string().default(''),
  isMinority: z.boolean(),
})

/** Page 5 (step 4) – Student & Employment Details */
export const studentEmploymentSchema = z.object({
  isStudent: z.boolean(),
  employmentStatus: z.enum(['Employed', 'Unemployed', 'Self-Employed', 'Student', 'Retired', 'Farmer', 'Startup Owner']),
  isGovernmentEmployee: z.boolean(),
})

// ─── Full merged schema (used by zodResolver) ──────────────────────────────

export const eligibilityFormSchema = aboutYourselfSchema
  .merge(locationDetailsSchema)
  .merge(socialDetailsSchema)
  .merge(disabilityMinoritySchema)
  .merge(studentEmploymentSchema)
  .merge(economicDetailsSchema)
  .merge(educationDetailsSchema)
  .merge(otherFiltersSchema)
  .refine((data) => {
    // If not a student and not a government employee:
    if (!data.isStudent && !(data.employmentStatus === 'Employed' && data.isGovernmentEmployee)) {
      if (data.bplStatus === false) {
        return data.familyIncome !== undefined && !isNaN(data.familyIncome) && data.familyIncome > 0
      }
    }
    return true
  }, {
    message: 'Income is required',
    path: ['familyIncome'],
  })

export type EligibilityFormData = z.infer<typeof eligibilityFormSchema>

// ─── Step definitions (index MUST match the UI step 0–7) ────────────────────

export const FORM_STEPS = [
  { id: 'personal',           title: 'Personal Details',          titleHi: 'व्यक्तिगत विवरण', schema: aboutYourselfSchema },
  { id: 'location',           title: 'Location Details',          titleHi: 'स्थान विवरण',      schema: locationDetailsSchema },
  { id: 'social',             title: 'Social Details',            titleHi: 'सामाजिक विवरण',   schema: socialDetailsSchema },
  { id: 'disabilityMinority', title: 'Disability & Minority Info', titleHi: 'दिव्यांगता और अल्पसंख्यक विवरण', schema: disabilityMinoritySchema },
  { id: 'studentEmployment',  title: 'Student & Employment Info', titleHi: 'छात्र और रोजगार विवरण', schema: studentEmploymentSchema },
  { id: 'economic',           title: 'Economic Details',          titleHi: 'आर्थिक विवरण',     schema: economicDetailsSchema },
  { id: 'preferences',        title: 'Preferences',               titleHi: 'प्राथमिकताएँ',      schema: otherFiltersSchema },
] as const

export const DRAFT_STORAGE_KEY = 'schemeai-eligibility-draft'
