export interface JoinFormData {
  name: string;
  email: string;
  number: string; // Phone number
  linkedin: string;
  github?: string;
}

export function validateJoinForm(data: JoinFormData): string | null {
  if (!data.name || data.name.trim().length < 2) {
    return 'Name must be at least 2 characters long.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return 'Please enter a valid email address.';
  }

  if (!data.number || data.number.trim().length < 5) {
    return 'Please enter a valid phone number.';
  }

  if (!data.linkedin.includes('linkedin.com/')) {
    return 'Please enter a valid LinkedIn URL.';
  }

  if (data.github && data.github.trim() !== '' && !data.github.includes('github.com/')) {
    return 'Please enter a valid GitHub URL.';
  }

  return null;
}
