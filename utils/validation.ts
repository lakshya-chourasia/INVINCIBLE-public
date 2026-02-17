export interface MemberFormData {
  name: string;
  email: string;
  linkedin: string;
  github?: string;
  number?: string;
}

export const validateMemberForm = (data: MemberFormData): string | null => {
  // Validate Name
  if (!data.name || data.name.trim().length < 2) {
    return "Name must be at least 2 characters long.";
  }
  if (data.name.length > 50) {
    return "Name cannot exceed 50 characters.";
  }
  // Basic XSS check (prevent HTML tags)
  if (/[<>]/g.test(data.name)) {
    return "Name contains invalid characters.";
  }

  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    return "Invalid email address.";
  }

  // Validate LinkedIn URL
  const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/.*$/;
  if (!data.linkedin || !linkedinRegex.test(data.linkedin)) {
    return "Invalid LinkedIn URL. Must start with http(s)://linkedin.com/";
  }

  // Validate GitHub URL (optional)
  if (data.github && data.github.trim() !== "") {
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/.*$/;
    if (!githubRegex.test(data.github)) {
      return "Invalid GitHub URL. Must start with http(s)://github.com/";
    }
  }

  return null; // Valid
};
