import { z } from 'zod'

export const personalDetailsSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  age: z.number({ error: 'Age is required' }).min(1, 'Age is required').max(120, 'Invalid age'),
  gender: z.enum(['Male', 'Female', 'Other']),
  maritalStatus: z.enum(['Single', 'Married', 'Widowed', 'Divorced']),
  disabilityStatus: z.boolean(),
})

export const socialDetailsSchema = z.object({
  casteCategory: z.enum(['General', 'OBC', 'SC', 'ST', 'EWS']),
})

export const economicDetailsSchema = z.object({
  familyIncome: z.number({ error: 'Income is required' }).min(0, 'Income is required').max(100000000),
  employmentStatus: z.enum(['Employed', 'Unemployed', 'Self-Employed', 'Student', 'Retired']),
  bplStatus: z.boolean(),
})

export const educationDetailsSchema = z.object({
  isStudent: z.boolean(),
  qualification: z.enum(['Below 10th', '10th', '12th', 'Graduate', 'Post Graduate', 'PhD']),
  collegeType: z.enum(['Government', 'Private', 'NA']),
})

export const locationDetailsSchema = z.object({
  state: z.string().min(1, 'State is required'),
  district: z.string().min(1, 'District is required'),
  areaType: z.enum(['Rural', 'Urban']),
})

export const otherFiltersSchema = z.object({
  isFarmer: z.boolean(),
  isWidow: z.boolean(),
  isSeniorCitizen: z.boolean(),
  isMinority: z.boolean(),
  isStartupOwner: z.boolean(),
  skillDevelopmentInterest: z.boolean(),
})

export const eligibilityFormSchema = personalDetailsSchema
  .merge(socialDetailsSchema)
  .merge(economicDetailsSchema)
  .merge(educationDetailsSchema)
  .merge(locationDetailsSchema)
  .merge(otherFiltersSchema)

export type EligibilityFormData = z.infer<typeof eligibilityFormSchema>

export const FORM_STEPS = [
  { id: 'personal', title: 'Personal Details', titleHi: 'व्यक्तिगत विवरण', schema: personalDetailsSchema },
  { id: 'social', title: 'Social Details', titleHi: 'सामाजिक विवरण', schema: socialDetailsSchema },
  { id: 'economic', title: 'Economic Details', titleHi: 'आर्थिक विवरण', schema: economicDetailsSchema },
  { id: 'education', title: 'Education Details', titleHi: 'शिक्षा विवरण', schema: educationDetailsSchema },
  { id: 'location', title: 'Location Details', titleHi: 'स्थान विवरण', schema: locationDetailsSchema },
  { id: 'other', title: 'Other Filters', titleHi: 'अन्य फ़िल्टर', schema: otherFiltersSchema },
] as const

export const DRAFT_STORAGE_KEY = 'schemeai-eligibility-draft'
