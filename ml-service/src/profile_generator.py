"""
Realistic synthetic user profile generator for SchemeAI training data.
Profiles respect form constraints and logical consistency rules from EligibilityForm.tsx.
"""

from __future__ import annotations

import random
from typing import Any

# Mirrors src/data/states.ts
INDIAN_STATES = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Puducherry",
    "Chandigarh",
]

DISTRICTS_BY_STATE: dict[str, list[str]] = {
    "Andhra Pradesh": ["Guntur", "Visakhapatnam", "Krishna", "East Godavari", "Nellore"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad"],
    "Karnataka": ["Bengaluru Urban", "Mysuru", "Mangaluru", "Hubballi", "Belagavi"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
    "Delhi": ["Central Delhi", "South Delhi", "North Delhi", "East Delhi", "West Delhi"],
    "West Bengal": ["Kolkata", "Howrah", "Darjeeling", "Siliguri", "Bardhaman"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
    "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
}

GENDERS = ["Male", "Female", "Other"]
MARITAL_STATUSES = ["Single", "Married", "Widowed", "Divorced"]
CASTE_CATEGORIES = ["General", "OBC", "PVTG", "SC", "ST", "DNT", "EWS"]
EMPLOYMENT_STATUSES = [
    "Employed",
    "Unemployed",
    "Self-Employed",
    "Student",
    "Retired",
    "Farmer",
    "Startup Owner",
]
QUALIFICATIONS = ["Below 10th", "10th", "12th", "Graduate", "Post Graduate", "PhD"]
COLLEGE_TYPES = ["Government", "Private", "NA"]
AREA_TYPES = ["Rural", "Urban"]

FIRST_NAMES = [
    "Ravi", "Priya", "Amit", "Sneha", "Rajesh", "Anita", "Suresh", "Lakshmi",
    "Vikram", "Meera", "Arjun", "Kavita", "Deepak", "Pooja", "Sanjay", "Rekha",
]

# Income tiers (annual family income in INR) with sampling weights
INCOME_TIERS = [
    (15_000, 120_000, 0.35),      # BPL / very low
    (120_001, 300_000, 0.30),     # Lower middle
    (300_001, 600_000, 0.20),     # Middle
    (600_001, 1_500_000, 0.10),   # Upper middle
    (1_500_001, 5_000_000, 0.05), # High
]

# Age buckets with weights (India demographic focus)
AGE_BUCKETS = [
    (1, 17, 0.12),
    (18, 25, 0.22),
    (26, 45, 0.38),
    (46, 59, 0.18),
    (60, 120, 0.10),
]


def _weighted_choice(items: list[tuple[Any, float]]) -> Any:
    values, weights = zip(*items)
    return random.choices(values, weights=weights, k=1)[0]


def _sample_age() -> int:
    bucket = random.choices(AGE_BUCKETS, weights=[b[2] for b in AGE_BUCKETS], k=1)[0]
    return random.randint(bucket[0], bucket[1])


def _sample_income(bpl: bool) -> int:
    if bpl:
        return random.randint(15_000, 120_000)
    tier = random.choices(INCOME_TIERS, weights=[t[2] for t in INCOME_TIERS], k=1)[0]
    return random.randint(tier[0], tier[1])


def _get_district(state: str) -> str:
    districts = DISTRICTS_BY_STATE.get(state, ["District 1", "District 2", "District 3"])
    return random.choice(districts)


def _apply_consistency(profile: dict[str, Any]) -> dict[str, Any]:
    """Enforce logical consistency — mirrors EligibilityForm auto-sync logic."""
    age = profile["age"]

    if age >= 60:
        profile["isSeniorCitizen"] = True

    if profile["maritalStatus"] == "Widowed":
        profile["isWidow"] = True
        profile["gender"] = "Female"  # Widow pension requires female

    if profile["employmentStatus"] == "Student":
        profile["isStudent"] = True

    if profile["employmentStatus"] == "Farmer":
        profile["isFarmer"] = True
        if random.random() < 0.75:
            profile["areaType"] = "Rural"

    if profile["employmentStatus"] == "Startup Owner":
        profile["isStartupOwner"] = True
        if age > 45:
            profile["age"] = random.randint(22, 45)

    if profile["bplStatus"]:
        profile["familyIncome"] = min(profile["familyIncome"], random.randint(15_000, 120_000))

    if profile["isStudent"] and profile["qualification"] in ("PhD", "Post Graduate"):
        if age < 22:
            profile["age"] = random.randint(22, 28)

    if profile["disabilityStatus"] and profile["bplStatus"] is False and random.random() < 0.4:
        profile["bplStatus"] = True

    return profile


def generate_profile(profile_id: int, *, seed_profile: dict[str, Any] | None = None) -> dict[str, Any]:
    """
    Generate one realistic user profile matching UserProfile / EligibilityFormData shape.
    Optionally pass seed_profile to bias generation toward specific scheme criteria.
    """
    if seed_profile:
        age = seed_profile.get("age", _sample_age())
        gender = seed_profile.get("gender", random.choice(GENDERS))
        marital_status = seed_profile.get("maritalStatus", random.choice(MARITAL_STATUSES))
        caste = seed_profile.get("casteCategory", random.choices(CASTE_CATEGORIES, weights=[0.25, 0.30, 0.05, 0.15, 0.10, 0.05, 0.10])[0])
        bpl = seed_profile.get("bplStatus", random.random() < 0.28)
        employment = seed_profile.get("employmentStatus", random.choice(EMPLOYMENT_STATUSES))
        is_farmer = seed_profile.get("isFarmer", employment == "Farmer" or random.random() < 0.12)
        is_student = seed_profile.get("isStudent", employment == "Student" or random.random() < 0.15)
        is_startup = seed_profile.get("isStartupOwner", employment == "Startup Owner" or random.random() < 0.05)
        is_widow = seed_profile.get("isWidow", marital_status == "Widowed")
        is_minority = seed_profile.get("isMinority", random.random() < 0.18)
        is_disabled = seed_profile.get("disabilityStatus", random.random() < 0.05)
        skill_interest = seed_profile.get("skillDevelopmentInterest", random.random() < 0.25)
        is_artisan = seed_profile.get("isArtisan", random.random() < 0.10)
        is_husbandry = seed_profile.get("isAnimalHusbandryOrFisheries", random.random() < 0.08)
        state = seed_profile.get("state", random.choice(INDIAN_STATES))
        area_type = seed_profile.get("areaType", random.choices(AREA_TYPES, weights=[0.65, 0.35])[0])
    else:
        age = _sample_age()
        gender = random.choice(GENDERS)
        marital_status = random.choice(MARITAL_STATUSES)
        caste = random.choices(CASTE_CATEGORIES, weights=[0.25, 0.30, 0.05, 0.15, 0.10, 0.05, 0.10])[0]
        bpl = random.random() < 0.28
        employment = random.choice(EMPLOYMENT_STATUSES)
        is_farmer = employment == "Farmer" or random.random() < 0.12
        is_student = employment == "Student" or random.random() < 0.15
        is_startup = employment == "Startup Owner" or random.random() < 0.05
        is_widow = marital_status == "Widowed"
        is_minority = random.random() < 0.18
        is_disabled = random.random() < 0.05
        skill_interest = random.random() < 0.25
        is_artisan = random.random() < 0.10
        is_husbandry = random.random() < 0.08
        state = random.choice(INDIAN_STATES)
        area_type = random.choices(AREA_TYPES, weights=[0.65, 0.35])[0]

    income = _sample_income(bpl)

    if is_student:
        qualification = random.choice(["10th", "12th", "Graduate", "Post Graduate"])
        college_type = random.choice(["Government", "Private"])
    elif age >= 60:
        qualification = random.choice(["Below 10th", "10th", "12th", "Graduate"])
        college_type = "NA"
    else:
        qualification = random.choice(QUALIFICATIONS)
        college_type = random.choice(COLLEGE_TYPES)

    profile: dict[str, Any] = {
        "profile_id": profile_id,
        "fullName": f"{random.choice(FIRST_NAMES)} Kumar",
        "age": age,
        "gender": gender,
        "maritalStatus": marital_status,
        "disabilityStatus": is_disabled,
        "casteCategory": caste,
        "familyIncome": income,
        "parentGuardianIncome": income if is_student else 0,
        "employmentStatus": employment,
        "occupation": (
            "Farmer / Agricultural Worker" if is_farmer else
            "Artisan / Craftsman / Weaver" if is_artisan else
            "Involved in Animal Husbandry / Fisheries" if is_husbandry else
            "Startup Owner / Entrepreneur" if is_startup else
            "Unemployed" if employment == "Unemployed" else
            "Private Sector Employee"
        ),
        "bplStatus": bpl,
        "isInHardship": bpl and random.random() < 0.2,
        "isGovernmentEmployee": employment == "Employed" and random.random() < 0.15,
        "isStudent": is_student,
        "qualification": qualification,
        "collegeType": college_type,
        "state": state,
        "district": _get_district(state),
        "areaType": area_type,
        "isFarmer": is_farmer,
        "isWidow": is_widow,
        "isSeniorCitizen": age >= 60,
        "isMinority": is_minority,
        "isStartupOwner": is_startup,
        "skillDevelopmentInterest": skill_interest,
        "isArtisan": is_artisan,
        "isAnimalHusbandryOrFisheries": is_husbandry,
    }

    return _apply_consistency(profile)


def get_scheme_seed_profile(scheme_id: str) -> dict[str, Any]:
    """Return seed overrides to boost positive examples for rare schemes."""
    seeds: dict[str, dict[str, Any]] = {
        "stand-up-india": {
            "casteCategory": random.choice(["SC", "ST"]),
            "gender": "Female",
            "isStartupOwner": True,
            "employmentStatus": "Startup Owner",
            "age": random.randint(25, 45),
        },
        "widow-pension": {
            "gender": "Female",
            "maritalStatus": "Widowed",
            "isWidow": True,
            "bplStatus": True,
            "age": random.randint(25, 70),
        },
        "disability-pension": {
            "disabilityStatus": True,
            "bplStatus": True,
            "age": random.randint(18, 70),
        },
        "pm-kisan": {
            "isFarmer": True,
            "employmentStatus": "Farmer",
            "familyIncome": random.randint(50_000, 180_000),
            "areaType": "Rural",
        },
        "pm-vaya-vandana": {
            "age": random.randint(60, 85),
            "isSeniorCitizen": True,
            "employmentStatus": "Retired",
        },
        "minority-scholarship": {
            "isMinority": True,
            "isStudent": True,
            "employmentStatus": "Student",
            "familyIncome": random.randint(20_000, 90_000),
            "age": random.randint(8, 16),
        },
        "ujwala": {
            "gender": "Female",
            "bplStatus": True,
            "familyIncome": random.randint(15_000, 100_000),
        },
    }
    return seeds.get(scheme_id, {})
