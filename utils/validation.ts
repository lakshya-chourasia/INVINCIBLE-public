export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  // Allow international format (+123...) or just digits/dashes/spaces
  // Min 7 digits, max 20 chars including symbols
  // Must contain only allowed characters
  const allowedChars = /^[0-9+\-\s().]+$/;
  if (!allowedChars.test(phone)) return false;

  // Must have at least 7 digits
  const digitCount = (phone.match(/\d/g) || []).length;
  return digitCount >= 7 && phone.length <= 20;
};

export const isValidUrl = (url: string, domain?: string): boolean => {
  try {
    // If protocol is missing, try adding https://
    let urlToCheck = url;
    if (!/^https?:\/\//i.test(url)) {
      urlToCheck = 'https://' + url;
    }

    const parsedUrl = new URL(urlToCheck);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) return false;

    if (domain) {
      const hostname = parsedUrl.hostname.toLowerCase().replace(/^www\./, '');
      return hostname === domain || hostname.endsWith(`.${domain}`);
    }

    return true;
  } catch {
    return false;
  }
};

export const sanitizeInput = (input: string): string => {
  return input ? input.trim() : '';
};

export interface JoinFormData {
  name: string;
  number: string;
  email: string;
  linkedin: string;
  github: string;
}

export const validateJoinForm = (data: JoinFormData): ValidationResult => {
  const errors: Record<string, string> = {};

  const name = sanitizeInput(data.name);
  const number = sanitizeInput(data.number);
  const email = sanitizeInput(data.email);
  const linkedin = sanitizeInput(data.linkedin);
  const github = sanitizeInput(data.github);

  // Name Validation
  if (!name) {
    errors.name = 'Name is required';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (name.length > 100) {
    errors.name = 'Name must be under 100 characters';
  }

  // Phone Validation
  if (!number) {
    errors.number = 'Phone number is required';
  } else if (!isValidPhone(number)) {
    errors.number = 'Invalid phone number format';
  }

  // Email Validation
  if (!email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Invalid email address';
  } else if (email.length > 255) {
    errors.email = 'Email address is too long';
  }

  // LinkedIn Validation
  if (!linkedin) {
    errors.linkedin = 'LinkedIn URL is required';
  } else if (!isValidUrl(linkedin, 'linkedin.com')) {
    errors.linkedin = 'Invalid LinkedIn URL (must be linkedin.com)';
  }

  // GitHub Validation (Optional)
  if (github && !isValidUrl(github, 'github.com')) {
    errors.github = 'Invalid GitHub URL (must be github.com)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
