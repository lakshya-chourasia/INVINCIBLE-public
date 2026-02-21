export const isValidName = (name: string): boolean => {
  // Allow letters (unicode), spaces, hyphens, apostrophes. Length 2-100.
  const nameRegex = /^[\p{L}\s\-']{2,100}$/u;
  return nameRegex.test(name.trim());
};

export const isValidEmail = (email: string): boolean => {
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const isValidPhone = (phone: string): boolean => {
  // Allow digits, spaces, +, -, (), length 7-20 (inclusive of formatting chars)
  // At least 7 digits to be somewhat valid.
  const phoneRegex = /^[\d\s+\-()]{7,20}$/;
  const digitCount = (phone.match(/\d/g) || []).length;
  return phoneRegex.test(phone.trim()) && digitCount >= 7;
};

export const isValidLinkedIn = (url: string): boolean => {
  // Must be a valid LinkedIn URL
  const linkedInRegex = /^https:\/\/(www\.)?linkedin\.com\/.*$/;
  return linkedInRegex.test(url.trim());
};

export const isValidGitHub = (url: string): boolean => {
  if (!url || !url.trim()) return true; // Optional
  // Must be a valid GitHub URL
  const githubRegex = /^https:\/\/(www\.)?github\.com\/.*$/;
  return githubRegex.test(url.trim());
};
