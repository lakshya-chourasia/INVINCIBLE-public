
import { describe, it, expect } from 'vitest';
import { validateJoinForm, JoinFormData } from '../../validation';

describe('validateJoinForm', () => {
  const validData: JoinFormData = {
    name: 'John Doe',
    phone: '1234567890',
    email: 'john@example.com',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
  };

  it('should validate correct data', () => {
    const result = validateJoinForm(validData);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should invalidate short names', () => {
    const result = validateJoinForm({ ...validData, name: 'J' });
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Name must be at least 2 characters');
  });

  it('should invalidate short phone numbers', () => {
    const result = validateJoinForm({ ...validData, phone: '123' });
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Phone number must be at least 5 characters');
  });

  it('should invalidate incorrect email format', () => {
    const result = validateJoinForm({ ...validData, email: 'invalid-email' });
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Invalid email address');
  });

  it('should invalidate incorrect LinkedIn URL', () => {
    const result = validateJoinForm({ ...validData, linkedin: 'https://example.com' });
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('LinkedIn URL must contain "linkedin.com"');
  });

  it('should invalidate incorrect GitHub URL if provided', () => {
    const result = validateJoinForm({ ...validData, github: 'https://gitlab.com/johndoe' });
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('GitHub URL must contain "github.com"');
  });

  it('should allow empty GitHub URL (optional)', () => {
    const result = validateJoinForm({ ...validData, github: '' });
    expect(result.isValid).toBe(true);
  });
});
