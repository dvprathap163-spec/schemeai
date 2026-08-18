"""
Rule-based eligibility engine â€” mirrors src/lib/eligibility-engine.ts.
Used to label synthetic training data with ground-truth eligibility outcomes.
"""

from __future__ import annotations

from typing import Any

try:
    from .schemes import Scheme, SchemeRules
except ImportError:
    from schemes import Scheme, SchemeRules


class EligibilityResult:
    """Result of evaluating one user profile against one scheme."""

    def __init__(
        self,
        scheme: Scheme,
        status: str,
        score: int,
        matched_criteria: list[str],
        missed_criteria: list[str],
    ) -> None:
        self.scheme = scheme
        self.status = status  # eligible | partial | not_eligible
        self.score = score
        self.matched_criteria = matched_criteria
        self.missed_criteria = missed_criteria


def check_rule(
    rule_key: str,
    rule_value: Any,
    profile: dict[str, Any],
    matched: list[str],
    missed: list[str],
) -> bool:
    """Evaluate a single rule against a user profile."""
    if rule_value is None:
        return True

    if rule_key == "minAge":
        if profile["age"] >= rule_value:
            matched.append(f"Age >= {rule_value}")
            return True
        missed.append(f"Minimum age {rule_value} required (you are {profile['age']})")
        return False

    if rule_key == "maxAge":
        if profile["age"] <= rule_value:
            matched.append(f"Age <= {rule_value}")
            return True
        missed.append(f"Maximum age {rule_value} required (you are {profile['age']})")
        return False

    if rule_key == "incomeLimit":
        if profile["familyIncome"] <= rule_value:
            matched.append(f"Income within Rs.{rule_value:,} limit")
            return True
        missed.append(f"Income must be <= Rs.{rule_value:,}")
        return False

    if rule_key == "categories":
        if profile["casteCategory"] in rule_value:
            matched.append(f"Category: {profile['casteCategory']}")
            return True
        missed.append(f"Category must be one of: {', '.join(rule_value)}")
        return False

    if rule_key == "studentOnly":
        if not rule_value or profile["isStudent"]:
            if rule_value:
                matched.append("Student status")
            return True
        missed.append("Must be a student")
        return False

    if rule_key == "bplOnly":
        if not rule_value or profile["bplStatus"]:
            if rule_value:
                matched.append("BPL status")
            return True
        missed.append("BPL status required")
        return False

    if rule_key == "farmerOnly":
        if not rule_value or profile["isFarmer"]:
            if rule_value:
                matched.append("Farmer status")
            return True
        missed.append("Must be a farmer")
        return False

    if rule_key == "widowOnly":
        if not rule_value or profile["isWidow"]:
            if rule_value:
                matched.append("Widow status")
            return True
        missed.append("Widow status required")
        return False

    if rule_key == "seniorCitizenOnly":
        if not rule_value or profile["isSeniorCitizen"] or profile["age"] >= 60:
            if rule_value:
                matched.append("Senior citizen")
            return True
        missed.append("Senior citizen status required")
        return False

    if rule_key == "minorityOnly":
        if not rule_value or profile["isMinority"]:
            if rule_value:
                matched.append("Minority community")
            return True
        missed.append("Minority community status required")
        return False

    if rule_key == "startupOwnerOnly":
        if not rule_value or profile["isStartupOwner"]:
            if rule_value:
                matched.append("Startup owner")
            return True
        missed.append("Startup owner status required")
        return False

    if rule_key == "skillDevelopmentOnly":
        if not rule_value or profile["skillDevelopmentInterest"]:
            if rule_value:
                matched.append("Skill development interest")
            return True
        missed.append("Skill development interest required")
        return False

    if rule_key == "disabilityOnly":
        if not rule_value or profile["disabilityStatus"]:
            if rule_value:
                matched.append("Disability status")
            return True
        missed.append("Disability status required")
        return False

    if rule_key == "artisanOnly":
        if not rule_value or profile["isArtisan"]:
            if rule_value:
                matched.append("Artisan status")
            return True
        missed.append("Must be an artisan / craftsman")
        return False

    if rule_key == "husbandryOrFisheriesOnly":
        if not rule_value or profile["isAnimalHusbandryOrFisheries"]:
            if rule_value:
                matched.append("Animal husbandry / fisheries status")
            return True
        missed.append("Must be involved in animal husbandry or fisheries")
        return False

    if rule_key == "genders":
        if profile["gender"] in rule_value:
            matched.append(f"Gender: {profile['gender']}")
            return True
        missed.append(f"Gender must be: {' or '.join(rule_value)}")
        return False

    if rule_key == "states":
        if profile["state"] in rule_value:
            matched.append(f"State: {profile['state']}")
            return True
        missed.append(f"Available in: {', '.join(rule_value)}")
        return False

    if rule_key == "areaTypes":
        if profile["areaType"] in rule_value:
            matched.append(f"Area: {profile['areaType']}")
            return True
        missed.append(f"Area type must be: {' or '.join(rule_value)}")
        return False

    if rule_key == "qualifications":
        if profile["qualification"] in rule_value:
            matched.append(f"Qualification: {profile['qualification']}")
            return True
        missed.append(f"Qualification must be: {', '.join(rule_value)}")
        return False

    if rule_key == "employmentStatuses":
        if profile["employmentStatus"] in rule_value:
            matched.append(f"Employment: {profile['employmentStatus']}")
            return True
        missed.append(f"Employment must be: {', '.join(rule_value)}")
        return False

    return True


def evaluate_scheme(scheme: Scheme, profile: dict[str, Any]) -> EligibilityResult:
    """Evaluate all rules for a scheme against a user profile."""
    matched_criteria: list[str] = []
    missed_criteria: list[str] = []
    rules: SchemeRules = scheme["rules"]
    rule_keys = list(rules.keys())
    passed = 0
    total = len(rule_keys)

    for key in rule_keys:
        if check_rule(key, rules[key], profile, matched_criteria, missed_criteria):
            passed += 1

    score = round((passed / total) * 100) if total > 0 else 100
    status = "not_eligible"

    if passed == total:
        status = "eligible"
    elif score >= 60:
        status = "partial"

    relevance_boost = 5 if scheme["featured"] else 0
    popularity_boost = scheme["popularity"] * 0.1
    final_score = min(100, round(score + relevance_boost + popularity_boost))

    return EligibilityResult(
        scheme=scheme,
        status=status,
        score=final_score,
        matched_criteria=matched_criteria,
        missed_criteria=missed_criteria,
    )
