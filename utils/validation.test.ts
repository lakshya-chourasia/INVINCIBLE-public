
import {
  isValidName,
  isValidPhone,
  isValidEmail,
  isValidLinkedIn,
  isValidGitHub,
} from './validation.js';

// Helper to run tests
const runTest = (name: string, fn: () => boolean) => {
  try {
    if (fn()) {
      console.log(`✅ ${name} passed`);
    } else {
      console.error(`❌ ${name} failed`);
      process.exit(1);
    }
  } catch (e) {
    console.error(`❌ ${name} threw error:`, e);
    process.exit(1);
  }
};

console.log('--- Running Validation Tests ---');

// Name
runTest('Valid name', () => isValidName('John Doe'));
runTest('Valid name with accent', () => isValidName('José Pérez'));
runTest('Valid name short', () => isValidName('Bo'));
runTest('Invalid name empty', () => !isValidName(''));
runTest('Invalid name too short', () => !isValidName('A'));
runTest('Invalid name special chars', () => !isValidName('John@Doe'));

// Phone
runTest('Valid phone', () => isValidPhone('+1234567890'));
runTest('Valid phone no plus', () => isValidPhone('1234567890'));
runTest('Valid phone with spaces', () => isValidPhone('+1 234 567 890'));
runTest('Invalid phone too short', () => !isValidPhone('123'));
runTest('Invalid phone letters', () => !isValidPhone('123abc456'));

// Email
runTest('Valid email', () => isValidEmail('test@example.com'));
runTest('Invalid email no @', () => !isValidEmail('testexample.com'));
runTest('Invalid email no domain', () => !isValidEmail('test@'));

// LinkedIn
runTest('Valid LinkedIn', () => isValidLinkedIn('https://www.linkedin.com/in/johndoe'));
runTest('Valid LinkedIn no www', () => isValidLinkedIn('https://linkedin.com/in/johndoe'));
runTest('Invalid LinkedIn wrong domain', () => !isValidLinkedIn('https://facebook.com/in/johndoe'));
runTest('Invalid LinkedIn wrong path', () => !isValidLinkedIn('https://linkedin.com/jobs/123'));
runTest('Invalid LinkedIn not url', () => !isValidLinkedIn('not-a-url'));

// GitHub
runTest('Valid GitHub', () => isValidGitHub('https://github.com/johndoe'));
runTest('Valid GitHub empty (optional)', () => isValidGitHub(''));
runTest('Invalid GitHub wrong domain', () => !isValidGitHub('https://gitlab.com/johndoe'));
runTest('Invalid GitHub not url', () => !isValidGitHub('not-a-url'));

console.log('--- All Tests Passed ---');
