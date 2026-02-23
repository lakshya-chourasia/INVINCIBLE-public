
export const isValidName = (name: string): boolean => {
  if (!name) return false;
  // Allows letters, spaces, hyphens, and apostrophes. Min 2 chars.
  // /u flag for unicode support (e.g. accented characters)
  return /^[\p{L}\s'-]{2,50}$/u.test(name.trim());
};

export const isValidPhone = (phone: string): boolean => {
  if (!phone) return false;
  // Basic international phone regex: optional +, then 7-15 digits
  return /^\+?[\d\s-]{7,15}$/.test(phone.trim());
};

export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  // Standard email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

export const isValidLinkedIn = (url: string): boolean => {
  if (!url) return false;
  try {
    const parsedUrl = new URL(url);
    // Check hostname and path structure
    return (
      (parsedUrl.hostname === 'linkedin.com' || parsedUrl.hostname === 'www.linkedin.com') &&
      parsedUrl.pathname.startsWith('/in/')
    );
  } catch {
    return false;
  }
};

export const isValidGitHub = (url: string): boolean => {
  if (!url) return true; // Optional field
  try {
    const parsedUrl = new URL(url);
    return (
      parsedUrl.hostname === 'github.com' || parsedUrl.hostname === 'www.github.com'
    );
  } catch {
    return false;
  }
};
