/**
 * Sentinel Security - Input Validation Utilities
 *
 * Provides client-side validation for the Join Collective form.
 * Ensures data integrity and prevents malformed input.
 */

export const validateName = (name: string): string | null => {
  if (!name.trim()) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters';
  if (name.length > 50) return 'Name must be less than 50 characters';
  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!email.trim()) return 'Email is required';
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Invalid email format';
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) return 'Phone number is required';
  // Allow digits, spaces, dashes, parentheses, plus sign. Min 7 chars.
  const phoneRegex = /^[\d\s\-()+.]{7,}$/;
  if (!phoneRegex.test(phone)) return 'Invalid phone number format (min 7 digits)';
  return null;
};

export const validateUrl = (url: string, platform?: 'linkedin' | 'github'): string | null => {
  if (!url.trim()) {
    return platform === 'github' ? null : 'URL is required'; // Github is optional
  }

  try {
    const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    const hostname = parsedUrl.hostname.toLowerCase();

    if (platform === 'linkedin') {
      if (hostname !== 'linkedin.com' && !hostname.endsWith('.linkedin.com')) {
        return 'Must be a valid LinkedIn URL';
      }
    }

    if (platform === 'github') {
      if (hostname !== 'github.com' && !hostname.endsWith('.github.com')) {
        return 'Must be a valid GitHub URL';
      }
    }

    return null;
  } catch (e) {
    return 'Invalid URL format';
  }
};

export const validateForm = (data: {
  name: string;
  email: string;
  number: string;
  linkedin: string;
  github: string;
}): Record<string, string> => {
  const errors: Record<string, string> = {};

  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(data.number);
  if (phoneError) errors.number = phoneError;

  const linkedinError = validateUrl(data.linkedin, 'linkedin');
  if (linkedinError) errors.linkedin = linkedinError;

  const githubError = validateUrl(data.github, 'github');
  if (githubError) errors.github = githubError;

  return errors;
};
