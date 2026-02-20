
export const sanitizeInput = (input: string): string => {
  return input.trim();
};

export const isValidName = (name: string): boolean => {
  // Allow unicode letters, numbers, spaces, hyphens, dots, and apostrophes.
  // Min 2, max 50 chars.
  const regex = /^[\p{L}\d\s\-\.'’]{2,50}$/u;
  return regex.test(name);
};

export const isValidPhone = (phone: string): boolean => {
  // Allows +, (), -, space, dots. Min 7, max 15 digits roughly.
  // Standard format check: (123) 456-7890 or 123-456-7890 or +1234567890
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return regex.test(phone);
};

export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidUrl = (url: string, allowedDomain: string): boolean => {
  if (!url) return false;
  try {
    // Prepend protocol if missing for URL parsing
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    return urlObj.hostname === allowedDomain || urlObj.hostname.endsWith(`.${allowedDomain}`);
  } catch {
    return false;
  }
};
