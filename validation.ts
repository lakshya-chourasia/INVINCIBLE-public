
export interface JoinFormData {
  name: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
}

export function validateJoinForm(data: JoinFormData): { isValid: boolean; error?: string } {
  const name = data.name.trim();
  const phone = data.phone.trim();
  const email = data.email.trim();
  const linkedin = data.linkedin.trim();
  const github = data.github.trim();

  // Validate Name
  if (name.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters.' };
  }

  // Validate Phone (allow for various formats, but check length)
  if (phone.length < 5) {
    return { isValid: false, error: 'Phone number must be at least 5 characters.' };
  }

  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Invalid email address.' };
  }

  // Validate LinkedIn
  if (!linkedin.toLowerCase().includes('linkedin.com')) {
    return { isValid: false, error: 'LinkedIn URL must contain "linkedin.com".' };
  }

  // Validate GitHub (optional, but if provided, must be valid)
  if (github && !github.toLowerCase().includes('github.com')) {
    return { isValid: false, error: 'GitHub URL must contain "github.com".' };
  }

  return { isValid: true };
}
