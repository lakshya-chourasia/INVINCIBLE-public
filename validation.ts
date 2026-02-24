// Validation logic for user forms

export interface JoinFormData {
  name: string;
  number: string;
  email: string;
  linkedin: string;
  github: string;
}

export const validateJoinForm = (data: JoinFormData): string | null => {
  if (!data.name || data.name.trim().length < 2) {
    return 'Name must be at least 2 characters.';
  }

  // Phone: Allow +, space, -, (), and digits. Min length 10.
  // Example: +1 (555) 123-4567
  if (!/^[+]?[\d\s-()]{10,}$/.test(data.number)) {
    return 'Invalid phone number format.';
  }

  // Email: Standard email regex
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return 'Invalid email address.';
  }

  // LinkedIn: Must include "linkedin.com"
  if (!data.linkedin.includes('linkedin.com')) {
    return 'Invalid LinkedIn URL. Must be a linkedin.com profile.';
  }

  // GitHub: Optional, but if present must include "github.com"
  if (data.github && !data.github.includes('github.com')) {
    return 'Invalid GitHub URL. Must be a github.com profile.';
  }

  return null;
};
