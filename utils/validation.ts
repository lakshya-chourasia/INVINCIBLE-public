
export const isValidName = (name: string): boolean => {
  if (!name) return false;
  // Allow Unicode characters, digits, spaces, hyphens, underscores, apostrophes
  // Length 2-50
  return /^[\p{L}\d\s\-_']{2,50}$/u.test(name);
};

export const isValidPhone = (phone: string): boolean => {
  if (!phone) return false;
  // Basic validation for phone numbers: allow digits, spaces, hyphens, plus, parentheses
  // Minimum length 7, max 20
  return /^[\d\s\-()+]{7,20}$/.test(phone);
};

export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  // Max length 254 per RFC 5321
  if (email.length > 254) return false;
  // Simple regex to avoid ReDoS
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidLinkedIn = (url: string): boolean => {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    // Allow linkedin.com, www.linkedin.com, and localized domains (though .com is standard for profile URLs usually)
    // Checking hostname ends with linkedin.com is safer for subdomains but exact match is stricter.
    return (parsed.hostname === 'linkedin.com' || parsed.hostname === 'www.linkedin.com');
  } catch {
    return false;
  }
};

export const isValidGitHub = (url: string): boolean => {
  if (!url) return true; // Optional field
  try {
    const parsed = new URL(url);
    return parsed.hostname === 'github.com' || parsed.hostname === 'www.github.com';
  } catch {
    return false;
  }
};
