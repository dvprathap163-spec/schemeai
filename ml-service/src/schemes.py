"""
Scheme definitions mirroring src/data/schemes.ts in the React frontend.
Used as ground-truth rules for synthetic dataset labelling.
"""

from __future__ import annotations

from typing import Any, TypedDict


class SchemeRules(TypedDict, total=False):
    minAge: int
    maxAge: int
    incomeLimit: int
    categories: list[str]
    studentOnly: bool
    bplOnly: bool
    farmerOnly: bool
    widowOnly: bool
    seniorCitizenOnly: bool
    minorityOnly: bool
    startupOwnerOnly: bool
    skillDevelopmentOnly: bool
    disabilityOnly: bool
    artisanOnly: bool
    husbandryOrFisheriesOnly: bool
    genders: list[str]
    states: list[str]
    areaTypes: list[str]
    qualifications: list[str]
    employmentStatuses: list[str]


class Scheme(TypedDict):
    id: str
    name: str
    rules: SchemeRules
    featured: bool
    popularity: int


SCHEMES: list[Scheme] = [
    {
        "id": "pm-kisan-samman-nidhi",
        "name": "PM-KISAN Samman Nidhi",
        "rules": {
            "farmerOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "pradhan-mantri-fasal-bima-yojana-pmfby",
        "name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        "rules": {
            "farmerOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "kisan-credit-card-kcc",
        "name": "Kisan Credit Card (KCC)",
        "rules": {
            "farmerOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "pradhan-mantri-krishi-sinchayee-yojana-pmksy",
        "name": "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
        "rules": {
            "farmerOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "soil-health-card-scheme",
        "name": "Soil Health Card Scheme",
        "rules": {
            "farmerOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "national-agriculture-market-e-nam",
        "name": "National Agriculture Market (e-NAM)",
        "rules": {
            "farmerOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "paramparagat-krishi-vikas-yojana-pkvy",
        "name": "Paramparagat Krishi Vikas Yojana (PKVY)",
        "rules": {
            "farmerOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "rashtriya-krishi-vikas-yojana-rkvy",
        "name": "Rashtriya Krishi Vikas Yojana (RKVY)",
        "rules": {
            "farmerOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "national-horticulture-mission--mission-for-integrated-development-of-horticulture-midh",
        "name": "National Horticulture Mission / Mission for Integrated Development of Horticulture (MIDH)",
        "rules": {
            "farmerOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "agriculture-infrastructure-fund-aif",
        "name": "Agriculture Infrastructure Fund (AIF)",
        "rules": {
            "farmerOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "national-means-cum-merit-scholarship-scheme-nmmss",
        "name": "National Means-cum-Merit Scholarship Scheme (NMMSS)",
        "rules": {
            "studentOnly": True,
            "incomeLimit": 300000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "central-sector-scheme-of-scholarship-for-college-and-university-students-csss",
        "name": "Central Sector Scheme of Scholarship for College and University Students (CSSS)",
        "rules": {
            "studentOnly": True,
            "incomeLimit": 300000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "post-matric-scholarship-for-sc-students",
        "name": "Post Matric Scholarship for SC Students",
        "rules": {
            "studentOnly": True,
            "incomeLimit": 300000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "post-matric-scholarship-for-obcebcdnt-students",
        "name": "Post Matric Scholarship for OBC/EBC/DNT Students",
        "rules": {
            "studentOnly": True,
            "incomeLimit": 300000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "post-matric-scholarship-for-minorities",
        "name": "Post Matric Scholarship for Minorities",
        "rules": {
            "studentOnly": True,
            "incomeLimit": 300000,
            "minorityOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "pre-matric-scholarship-for-minorities",
        "name": "Pre-Matric Scholarship for Minorities",
        "rules": {
            "studentOnly": True,
            "incomeLimit": 300000,
            "minorityOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "aicte-pragati-scholarship-for-girls",
        "name": "AICTE Pragati Scholarship for Girls",
        "rules": {
            "studentOnly": True,
            "incomeLimit": 300000,
            "genders": [
                "Female"
            ]
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "aicte-saksham-scholarship-scheme",
        "name": "AICTE Saksham Scholarship Scheme",
        "rules": {
            "studentOnly": True,
            "incomeLimit": 300000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "pm-yasasvi-scholarship-scheme",
        "name": "PM YASASVI Scholarship Scheme",
        "rules": {
            "studentOnly": True,
            "incomeLimit": 300000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "national-overseas-scholarship",
        "name": "National Overseas Scholarship",
        "rules": {
            "studentOnly": True,
            "incomeLimit": 300000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "ayushman-bharat-pm-jay",
        "name": "Ayushman Bharat PM-JAY",
        "rules": {
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "ayushman-arogya-mandir",
        "name": "Ayushman Arogya Mandir",
        "rules": {
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "pradhan-mantri-bhartiya-janaushadhi-pariyojana-pmbjp",
        "name": "Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)",
        "rules": {
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "janani-suraksha-yojana-jsy",
        "name": "Janani Suraksha Yojana (JSY)",
        "rules": {
            "incomeLimit": 250000,
            "genders": [
                "Female"
            ]
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "janani-shishu-suraksha-karyakram-jssk",
        "name": "Janani Shishu Suraksha Karyakram (JSSK)",
        "rules": {
            "incomeLimit": 250000,
            "genders": [
                "Female"
            ]
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "pradhan-mantri-matru-vandana-yojana-pmmvy",
        "name": "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
        "rules": {
            "incomeLimit": 250000,
            "genders": [
                "Female"
            ]
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "national-programme-for-health-care-of-the-elderly-nphce",
        "name": "National Programme for Health Care of the Elderly (NPHCE)",
        "rules": {
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "national-programme-for-prevention-and-control-of-cancer-diabetes-cardiovascular-diseases-and-stroke-npcdcs",
        "name": "National Programme for Prevention and Control of Cancer, Diabetes, Cardiovascular Diseases and Stroke (NPCDCS)",
        "rules": {
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "national-tuberculosis-elimination-programme-ntep",
        "name": "National Tuberculosis Elimination Programme (NTEP)",
        "rules": {
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "mission-indradhanush",
        "name": "Mission Indradhanush",
        "rules": {
            "incomeLimit": 250000,
            "genders": [
                "Female"
            ]
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "pradhan-mantri-awas-yojana---gramin-pmay-g",
        "name": "Pradhan Mantri Awas Yojana - Gramin (PMAY-G)",
        "rules": {
            "incomeLimit": 500000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "pradhan-mantri-awas-yojana---urban-20-pmay-u-20",
        "name": "Pradhan Mantri Awas Yojana - Urban 2.0 (PMAY-U 2.0)",
        "rules": {
            "incomeLimit": 500000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "credit-linked-subsidy--interest-subsidy-under-pmay-u-20",
        "name": "Credit Linked Subsidy / Interest Subsidy under PMAY-U 2.0",
        "rules": {
            "incomeLimit": 500000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "affordable-rental-housing-arh-under-pmay-u-20",
        "name": "Affordable Rental Housing (ARH) under PMAY-U 2.0",
        "rules": {
            "incomeLimit": 500000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "beneficiary-led-construction-blc-under-pmay-u-20",
        "name": "Beneficiary Led Construction (BLC) under PMAY-U 2.0",
        "rules": {
            "incomeLimit": 500000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "affordable-housing-in-partnership-ahp-under-pmay-u-20",
        "name": "Affordable Housing in Partnership (AHP) under PMAY-U 2.0",
        "rules": {
            "incomeLimit": 500000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "national-urban-livelihoods-mission---housingurban-shelter-component",
        "name": "National Urban Livelihoods Mission - Housing/Urban Shelter Component",
        "rules": {
            "incomeLimit": 500000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "deendayal-antyodaya-yojana---national-rural-livelihoods-mission-housing-convergence",
        "name": "Deendayal Antyodaya Yojana - National Rural Livelihoods Mission (housing convergence)",
        "rules": {
            "incomeLimit": 500000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "pm-janman-housing-component",
        "name": "PM-JANMAN Housing Component",
        "rules": {
            "incomeLimit": 500000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "rajiv-gandhi-grameen-vidyutikaran--saubhagya-linked-household-electrification-support",
        "name": "Rajiv Gandhi Grameen Vidyutikaran / Saubhagya-linked household electrification support",
        "rules": {
            "incomeLimit": 500000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "pradhan-mantri-kaushal-vikas-yojana-pmkvy",
        "name": "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
        "rules": {
            "minAge": 18
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "national-apprenticeship-promotion-scheme-naps",
        "name": "National Apprenticeship Promotion Scheme (NAPS)",
        "rules": {
            "minAge": 18
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "deen-dayal-upadhyaya-grameen-kaushalya-yojana-ddu-gky",
        "name": "Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)",
        "rules": {
            "minAge": 18
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "mahatma-gandhi-national-rural-employment-guarantee-scheme-mgnregs",
        "name": "Mahatma Gandhi National Rural Employment Guarantee Scheme (MGNREGS)",
        "rules": {
            "minAge": 18
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "prime-ministers-employment-generation-programme-pmegp",
        "name": "Prime Minister's Employment Generation Programme (PMEGP)",
        "rules": {
            "minAge": 18
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "rural-self-employment-training-institutes-rsetis",
        "name": "Rural Self Employment Training Institutes (RSETIs)",
        "rules": {
            "minAge": 18
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "national-career-service-ncs",
        "name": "National Career Service (NCS)",
        "rules": {
            "minAge": 18
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "pradhan-mantri-rojgar-protsahan-yojana-legacy-employment-incentive",
        "name": "Pradhan Mantri Rojgar Protsahan Yojana (legacy employment incentive)",
        "rules": {
            "minAge": 18
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "skill-loan-scheme",
        "name": "Skill Loan Scheme",
        "rules": {
            "minAge": 18
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "pm-vishwakarma",
        "name": "PM Vishwakarma",
        "rules": {
            "minAge": 18,
            "artisanOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "national-social-assistance-programme-nsap",
        "name": "National Social Assistance Programme (NSAP)",
        "rules": {
            "bplOnly": True,
            "incomeLimit": 150000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "pradhan-mantri-jan-dhan-yojana-pmjdy",
        "name": "Pradhan Mantri Jan-Dhan Yojana (PMJDY)",
        "rules": {
            "bplOnly": True,
            "incomeLimit": 150000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "pradhan-mantri-jeevan-jyoti-bima-yojana-pmjjby",
        "name": "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
        "rules": {
            "bplOnly": True,
            "incomeLimit": 150000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "pradhan-mantri-suraksha-bima-yojana-pmsby",
        "name": "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
        "rules": {
            "bplOnly": True,
            "incomeLimit": 150000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "atal-pension-yojana-apy",
        "name": "Atal Pension Yojana (APY)",
        "rules": {
            "bplOnly": True,
            "incomeLimit": 150000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "pradhan-mantri-garib-kalyan-anna-yojana--nfsa-foodgrain-support",
        "name": "Pradhan Mantri Garib Kalyan Anna Yojana / NFSA foodgrain support",
        "rules": {
            "bplOnly": True,
            "incomeLimit": 150000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "pm-svanidhi",
        "name": "PM SVANidhi",
        "rules": {
            "bplOnly": True,
            "incomeLimit": 150000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "national-family-benefit-scheme-nfbs",
        "name": "National Family Benefit Scheme (NFBS)",
        "rules": {
            "bplOnly": True,
            "incomeLimit": 150000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "disability-pension-under-nsap--state-linked-pension",
        "name": "Disability Pension under NSAP / State-linked pension",
        "rules": {
            "bplOnly": True,
            "incomeLimit": 150000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "senior-citizen-welfare--integrated-programme-for-senior-citizens-avyay",
        "name": "Senior Citizen Welfare / Integrated Programme for Senior Citizens (AVYAY)",
        "rules": {
            "bplOnly": True,
            "incomeLimit": 150000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "beti-bachao-beti-padhao-bbbp",
        "name": "Beti Bachao Beti Padhao (BBBP)",
        "rules": {
            "genders": [
                "Female"
            ]
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "sukanya-samriddhi-account",
        "name": "Sukanya Samriddhi Account",
        "rules": {
            "genders": [
                "Female"
            ]
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "one-stop-centre-osc-scheme",
        "name": "One Stop Centre (OSC) Scheme",
        "rules": {
            "genders": [
                "Female"
            ]
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "women-helpline-scheme",
        "name": "Women Helpline Scheme",
        "rules": {
            "genders": [
                "Female"
            ]
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "ujjawala-scheme",
        "name": "Ujjawala Scheme",
        "rules": {
            "genders": [
                "Female"
            ]
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "palna-scheme",
        "name": "Palna Scheme",
        "rules": {
            "genders": [
                "Female"
            ]
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "mission-vatsalya",
        "name": "Mission Vatsalya",
        "rules": {
            "genders": [
                "Female"
            ]
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "pradhan-mantri-adarsh-gram-yojana--girl-child-convergence",
        "name": "Pradhan Mantri Adarsh Gram Yojana / girl-child convergence",
        "rules": {
            "genders": [
                "Female"
            ]
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "scheme-for-adolescent-girls",
        "name": "Scheme for Adolescent Girls",
        "rules": {
            "genders": [
                "Female"
            ]
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "pradhan-mantri-mudra-yojana-pmmy",
        "name": "Pradhan Mantri Mudra Yojana (PMMY)",
        "rules": {
            "startupOwnerOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "stand-up-india",
        "name": "Stand-Up India",
        "rules": {
            "startupOwnerOnly": True,
            "genders": [
                "Female"
            ]
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "startup-india-seed-fund-scheme-sisfs",
        "name": "Startup India Seed Fund Scheme (SISFS)",
        "rules": {
            "startupOwnerOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "credit-guarantee-fund-trust-for-micro-and-small-enterprises-cgtmse",
        "name": "Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)",
        "rules": {
            "startupOwnerOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "pm-formalisation-of-micro-food-processing-enterprises-pmfme",
        "name": "PM Formalisation of Micro Food Processing Enterprises (PMFME)",
        "rules": {
            "startupOwnerOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "sfurti",
        "name": "SFURTI",
        "rules": {
            "startupOwnerOnly": True,
            "artisanOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "raising-and-accelerating-msme-performance-ramp",
        "name": "Raising and Accelerating MSME Performance (RAMP)",
        "rules": {
            "startupOwnerOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "national-sc-st-hub",
        "name": "National SC-ST Hub",
        "rules": {
            "startupOwnerOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "adip-scheme",
        "name": "ADIP Scheme",
        "rules": {
            "disabilityOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "deendayal-divyangjan-rehabilitation-scheme-ddrs",
        "name": "Deendayal Divyangjan Rehabilitation Scheme (DDRS)",
        "rules": {
            "disabilityOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "scheme-for-implementation-of-rights-of-persons-with-disabilities-act-sipda",
        "name": "Scheme for Implementation of Rights of Persons with Disabilities Act (SIPDA)",
        "rules": {
            "disabilityOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "scholarship-for-students-with-disabilities--pre-matric",
        "name": "Scholarship for Students with Disabilities \u2013 Pre-Matric",
        "rules": {
            "disabilityOnly": True,
            "studentOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "post-matric-scholarship-for-students-with-disabilities",
        "name": "Post-Matric Scholarship for Students with Disabilities",
        "rules": {
            "disabilityOnly": True,
            "studentOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "top-class-education-scholarship-for-students-with-disabilities",
        "name": "Top Class Education Scholarship for Students with Disabilities",
        "rules": {
            "disabilityOnly": True,
            "studentOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "national-fellowship-for-persons-with-disabilities-nfpwd",
        "name": "National Fellowship for Persons with Disabilities (NFPwD)",
        "rules": {
            "disabilityOnly": True,
            "studentOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "national-overseas-scholarship-for-pwds",
        "name": "National Overseas Scholarship for PwDs",
        "rules": {
            "disabilityOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "free-coaching-scheme-for-students-with-disabilities",
        "name": "Free Coaching Scheme for Students with Disabilities",
        "rules": {
            "disabilityOnly": True,
            "studentOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "national-action-plan-for-skill-development-of-persons-with-disabilities-nap-sdp",
        "name": "National Action Plan for Skill Development of Persons with Disabilities (NAP-SDP)",
        "rules": {
            "disabilityOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "rashtriya-gokul-mission-rgm",
        "name": "Rashtriya Gokul Mission (RGM)",
        "rules": {
            "husbandryOrFisheriesOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "national-livestock-mission-nlm",
        "name": "National Livestock Mission (NLM)",
        "rules": {
            "husbandryOrFisheriesOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "livestock-health-and-disease-control-programme-lhdcp",
        "name": "Livestock Health and Disease Control Programme (LHDCP)",
        "rules": {
            "husbandryOrFisheriesOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "national-programme-for-dairy-development-npdd",
        "name": "National Programme for Dairy Development (NPDD)",
        "rules": {
            "husbandryOrFisheriesOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "animal-husbandry-infrastructure-development-fund-ahidf",
        "name": "Animal Husbandry Infrastructure Development Fund (AHIDF)",
        "rules": {
            "husbandryOrFisheriesOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "supporting-dairy-cooperatives--farmer-producer-organizations-sdcfpo",
        "name": "Supporting Dairy Cooperatives & Farmer Producer Organizations (SDCFPO)",
        "rules": {
            "husbandryOrFisheriesOnly": True,
            "incomeLimit": 250000,
            "farmerOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "pradhan-mantri-matsya-sampada-yojana-pmmsy",
        "name": "Pradhan Mantri Matsya Sampada Yojana (PMMSY)",
        "rules": {
            "husbandryOrFisheriesOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "pradhan-mantri-matsya-kisan-samridhi-sah-yojana-pm-mkssy",
        "name": "Pradhan Mantri Matsya Kisan Samridhi Sah-Yojana (PM-MKSSY)",
        "rules": {
            "husbandryOrFisheriesOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "fisheries-and-aquaculture-infrastructure-development-fund-fidf",
        "name": "Fisheries and Aquaculture Infrastructure Development Fund (FIDF)",
        "rules": {
            "husbandryOrFisheriesOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "kisan-credit-card-for-animal-husbandry--fisheries",
        "name": "Kisan Credit Card for Animal Husbandry & Fisheries",
        "rules": {
            "husbandryOrFisheriesOnly": True,
            "incomeLimit": 250000,
            "farmerOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "national-handicrafts-development-programme-nhdp",
        "name": "National Handicrafts Development Programme (NHDP)",
        "rules": {
            "artisanOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "ambedkar-hastshilp-vikas-yojana-ahvy",
        "name": "Ambedkar Hastshilp Vikas Yojana (AHVY)",
        "rules": {
            "artisanOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "marketing-support--services-mss--handicrafts",
        "name": "Marketing Support & Services (MSS) \u2013 Handicrafts",
        "rules": {
            "artisanOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "skill-development-in-handicrafts-sector-sdhs",
        "name": "Skill Development in Handicrafts Sector (SDHS)",
        "rules": {
            "artisanOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "design--technology-development--upgradation",
        "name": "Design & Technology Development / Upgradation",
        "rules": {
            "artisanOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "comprehensive-handicrafts-cluster-development-scheme-chcds",
        "name": "Comprehensive Handicrafts Cluster Development Scheme (CHCDS)",
        "rules": {
            "artisanOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "research--development--handicrafts",
        "name": "Research & Development \u2013 Handicrafts",
        "rules": {
            "artisanOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "national-handicrafts-awards--shilp-guru-awards",
        "name": "National Handicrafts Awards / Shilp Guru Awards",
        "rules": {
            "artisanOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "handicrafts-artisan-identity--pehchan-registration",
        "name": "Handicrafts Artisan Identity / Pehchan Registration",
        "rules": {
            "artisanOnly": True,
            "incomeLimit": 250000
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "atal-vayo-abhyuday-yojana-avyay",
        "name": "Atal Vayo Abhyuday Yojana (AVYAY)",
        "rules": {
            "minAge": 60,
            "seniorCitizenOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "integrated-programme-for-senior-citizens-ipsrc",
        "name": "Integrated Programme for Senior Citizens (IPSrC)",
        "rules": {
            "minAge": 60,
            "seniorCitizenOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "state-action-plan-for-senior-citizens-sapsrc",
        "name": "State Action Plan for Senior Citizens (SAPSrC)",
        "rules": {
            "minAge": 60,
            "seniorCitizenOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "rashtriya-vayoshri-yojana-rvy",
        "name": "Rashtriya Vayoshri Yojana (RVY)",
        "rules": {
            "minAge": 60,
            "seniorCitizenOnly": True,
            "disabilityOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "senior-citizen-opportunities-for-productive-engagement-scope",
        "name": "Senior Citizen Opportunities for Productive Engagement (SCOPE)",
        "rules": {
            "minAge": 60,
            "seniorCitizenOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "seniorcare-ageing-growth-engine-sage",
        "name": "Seniorcare Ageing Growth Engine (SAGE)",
        "rules": {
            "minAge": 60,
            "seniorCitizenOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "elderline--national-helpline-for-senior-citizens",
        "name": "Elderline \u2013 National Helpline for Senior Citizens",
        "rules": {
            "minAge": 60,
            "seniorCitizenOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "indira-gandhi-national-old-age-pension-scheme-ignoaps",
        "name": "Indira Gandhi National Old Age Pension Scheme (IGNOAPS)",
        "rules": {
            "minAge": 60,
            "seniorCitizenOnly": True
        },
        "featured": False,
        "popularity": 70
    },
    {
        "id": "annapurna-scheme",
        "name": "Annapurna Scheme",
        "rules": {
            "minAge": 60,
            "seniorCitizenOnly": True
        },
        "featured": False,
        "popularity": 70
    }
]

_DUMMY_SCHEMES: list[Scheme] = []


def get_scheme_by_id(scheme_id: str) -> Scheme | None:
    """Return a scheme by its id, or None if not found."""
    for scheme in SCHEMES:
        if scheme["id"] == scheme_id:
            return scheme
    return None
