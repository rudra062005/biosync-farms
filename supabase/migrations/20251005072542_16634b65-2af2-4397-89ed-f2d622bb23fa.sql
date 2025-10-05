-- Update app_role enum to include all stakeholder types
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'government_officer';
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'policymaker';

-- Update the existing 'farmer' role name (rename later if needed)
-- Note: We'll keep 'farmer' and add new roles