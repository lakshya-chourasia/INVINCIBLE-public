import { strict as assert } from 'node:assert';
import { validateJoinForm, isValidEmail, isValidPhone, isValidUrl } from './validation.js';

console.log('Running validation tests...');

// 1. Email Tests
console.log('Testing isValidEmail...');
assert.equal(isValidEmail('test@example.com'), true);
assert.equal(isValidEmail('test.name@example.co.uk'), true);
assert.equal(isValidEmail('invalid-email'), false);
assert.equal(isValidEmail('test@'), false);
assert.equal(isValidEmail('@example.com'), false);
assert.equal(isValidEmail('test@example'), false);

// 2. Phone Tests
console.log('Testing isValidPhone...');
assert.equal(isValidPhone('1234567'), true); // Minimum 7 digits
assert.equal(isValidPhone('+1-555-0199'), true);
assert.equal(isValidPhone('(123) 456-7890'), true);
assert.equal(isValidPhone('123'), false); // Too short
assert.equal(isValidPhone('abc1234567'), false); // Invalid chars

// 3. URL Tests
console.log('Testing isValidUrl...');
assert.equal(isValidUrl('https://google.com'), true);
assert.equal(isValidUrl('google.com'), true); // Should handle missing protocol
assert.equal(isValidUrl('https://linkedin.com/in/me', 'linkedin.com'), true);
assert.equal(isValidUrl('linkedin.com/in/me', 'linkedin.com'), true);
assert.equal(isValidUrl('https://www.linkedin.com/in/me', 'linkedin.com'), true);
assert.equal(isValidUrl('https://github.com/me', 'github.com'), true);
assert.equal(isValidUrl('https://evil.com', 'linkedin.com'), false); // Wrong domain
assert.equal(isValidUrl('javascript:alert(1)'), false); // Invalid protocol

// 4. Full Form Validation
console.log('Testing validateJoinForm...');
const validData = {
  name: 'John Doe',
  number: '+1234567890',
  email: 'john@example.com',
  linkedin: 'linkedin.com/in/johndoe',
  github: 'github.com/johndoe'
};

const result1 = validateJoinForm(validData);
assert.equal(result1.isValid, true);
assert.deepEqual(result1.errors, {});

const invalidData = {
  name: 'J', // Too short
  number: '123', // Too short
  email: 'invalid',
  linkedin: 'facebook.com/me', // Wrong domain
  github: 'gitlab.com/me' // Wrong domain
};

const result2 = validateJoinForm(invalidData);
assert.equal(result2.isValid, false);
assert.ok(result2.errors.name);
assert.ok(result2.errors.number);
assert.ok(result2.errors.email);
assert.ok(result2.errors.linkedin);
assert.ok(result2.errors.github);

console.log('All tests passed! ✅');
