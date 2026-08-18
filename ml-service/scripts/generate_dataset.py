#!/usr/bin/env python3
"""
Step 2: Generate dataset.csv from existing SchemeAI eligibility rules.

Creates one row per (user profile × scheme) pair with ground-truth labels
produced by the rule engine (mirrors src/lib/eligibility-engine.ts).

Usage:
    python scripts/generate_dataset.py
    python scripts/generate_dataset.py --users 10000 --output data/dataset.csv
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

import pandas as pd

# Allow imports from ml-service
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from src.profile_generator import generate_profile, get_scheme_seed_profile  # noqa: E402
from src.rule_engine import evaluate_scheme  # noqa: E402
from src.schemes import SCHEMES  # noqa: E402

DEFAULT_NUM_USERS = 10_000
SEED_FRACTION = 0.15  # 15% of profiles biased toward rare schemes


def build_dataset(num_users: int, seed: int = 42) -> pd.DataFrame:
    """Generate labelled rows for every user × scheme combination."""
    import random

    random.seed(seed)
    rows: list[dict] = []

    scheme_ids = [s["id"] for s in SCHEMES]
    num_seeded = int(num_users * SEED_FRACTION)

    for profile_id in range(1, num_users + 1):
        # Every ~7th seeded profile targets a specific rare scheme
        if profile_id <= num_seeded:
            target_scheme = scheme_ids[(profile_id - 1) % len(scheme_ids)]
            seed_overrides = get_scheme_seed_profile(target_scheme)
            profile = generate_profile(profile_id, seed_profile=seed_overrides)
        else:
            profile = generate_profile(profile_id)

        for scheme in SCHEMES:
            result = evaluate_scheme(scheme, profile)

            rows.append(
                {
                    "profile_id": profile["profile_id"],
                    "fullName": profile["fullName"],
                    "age": profile["age"],
                    "gender": profile["gender"],
                    "maritalStatus": profile["maritalStatus"],
                    "disabilityStatus": int(profile["disabilityStatus"]),
                    "casteCategory": profile["casteCategory"],
                    "familyIncome": profile["familyIncome"],
                    "parentGuardianIncome": profile["parentGuardianIncome"],
                    "employmentStatus": profile["employmentStatus"],
                    "occupation": profile["occupation"],
                    "bplStatus": int(profile["bplStatus"]),
                    "isInHardship": int(profile["isInHardship"]),
                    "isGovernmentEmployee": int(profile["isGovernmentEmployee"]),
                    "isStudent": int(profile["isStudent"]),
                    "qualification": profile["qualification"],
                    "collegeType": profile["collegeType"],
                    "state": profile["state"],
                    "district": profile["district"],
                    "areaType": profile["areaType"],
                    "isFarmer": int(profile["isFarmer"]),
                    "isWidow": int(profile["isWidow"]),
                    "isSeniorCitizen": int(profile["isSeniorCitizen"]),
                    "isMinority": int(profile["isMinority"]),
                    "isStartupOwner": int(profile["isStartupOwner"]),
                    "skillDevelopmentInterest": int(profile["skillDevelopmentInterest"]),
                    "isArtisan": int(profile["isArtisan"]),
                    "isAnimalHusbandryOrFisheries": int(profile["isAnimalHusbandryOrFisheries"]),
                    "scheme_id": scheme["id"],
                    "scheme_name": scheme["name"],
                    "eligible": int(result.status == "eligible"),
                    "partial": int(result.status == "partial"),
                    "eligibility_score": result.score,
                    "status": result.status,
                    "matched_criteria": "|".join(result.matched_criteria),
                    "missed_criteria": "|".join(result.missed_criteria),
                }
            )

    return pd.DataFrame(rows)


def print_summary(df: pd.DataFrame) -> None:
    """Print dataset statistics for verification."""
    print("\n=== Dataset Summary ===")
    print(f"Total rows:        {len(df):,}")
    print(f"Unique profiles:   {df['profile_id'].nunique():,}")
    print(f"Schemes:           {df['scheme_id'].nunique()}")
    print(f"Eligible rows:     {df['eligible'].sum():,} ({df['eligible'].mean() * 100:.1f}%)")
    print(f"Partial rows:      {df['partial'].sum():,} ({df['partial'].mean() * 100:.1f}%)")
    print("\n--- Per-scheme eligible count ---")
    by_scheme = (
        df.groupby(["scheme_id", "scheme_name"])["eligible"]
        .agg(["sum", "count"])
        .rename(columns={"sum": "eligible", "count": "total"})
    )
    by_scheme["rate_%"] = (by_scheme["eligible"] / by_scheme["total"] * 100).round(1)
    print(by_scheme.to_string())
    print("\n--- Status distribution ---")
    print(df["status"].value_counts().to_string())


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate SchemeAI ML training dataset")
    parser.add_argument(
        "--users",
        type=int,
        default=DEFAULT_NUM_USERS,
        help=f"Number of synthetic user profiles (default: {DEFAULT_NUM_USERS})",
    )
    parser.add_argument(
        "--output",
        type=str,
        default=str(ROOT / "data" / "dataset.csv"),
        help="Output CSV path",
    )
    parser.add_argument("--seed", type=int, default=42, help="Random seed for reproducibility")
    args = parser.parse_args()

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    print(f"Generating dataset: {args.users:,} users × {len(SCHEMES)} schemes = {args.users * len(SCHEMES):,} rows...")
    df = build_dataset(args.users, seed=args.seed)

    df.to_csv(output_path, index=False)
    print(f"\nSaved: {output_path} ({output_path.stat().st_size / 1024 / 1024:.2f} MB)")

    # Save a small sample for quick inspection
    sample_path = output_path.parent / "dataset_sample.csv"
    df.head(100).to_csv(sample_path, index=False)
    print(f"Sample (100 rows): {sample_path}")

    # Save metadata
    meta = {
        "num_users": args.users,
        "num_schemes": len(SCHEMES),
        "total_rows": len(df),
        "eligible_rate": float(df["eligible"].mean()),
        "partial_rate": float(df["partial"].mean()),
        "columns": list(df.columns),
        "seed": args.seed,
    }
    meta_path = output_path.parent / "dataset_meta.json"
    meta_path.write_text(json.dumps(meta, indent=2), encoding="utf-8")
    print(f"Metadata:          {meta_path}")

    print_summary(df)


if __name__ == "__main__":
    main()
