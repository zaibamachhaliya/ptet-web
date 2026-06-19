# User Profiles Schema

## Table Name

user_profiles

## Fields

| Field | Type | Description |
|---------|---------|---------|
| user_id | UUID | Unique identifier of the user |
| target_score | INTEGER | Desired PTE score |
| test_date | DATE | Planned PTE exam date |
| country_applying_to | STRING | Country user is applying to |
| visa_type | STRING | Visa category |
| streak_days | INTEGER | Consecutive study days |
| last_active | DATE | Last activity timestamp |

## Purpose

Stores profile information and study progress metadata for users.

## Notes

- One profile belongs to one user.
- streak_days tracks learning consistency.
- last_active helps monitor engagement.