
import { isValidName, isValidPhone, isValidEmail, isValidLinkedIn, isValidGitHub } from './validation';

console.log('Running validation tests...');

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failed++;
  }
}

// Name Tests
assert(isValidName('John Doe'), 'Valid name');
assert(isValidName('0x_dev'), 'Valid handle');
assert(isValidName('Jean-Luc'), 'Valid name with hyphen');
assert(isValidName('O\'Connor'), 'Valid name with apostrophe');
assert(!isValidName('J'), 'Invalid name (too short)');
assert(!isValidName(''), 'Invalid name (empty)');
assert(!isValidName('a'.repeat(51)), 'Invalid name (too long)');
assert(!isValidName('<script>'), 'Invalid name (special chars)');

// Phone Tests
assert(isValidPhone('+1234567890'), 'Valid phone (plus)');
assert(isValidPhone('123-456-7890'), 'Valid phone (dashes)');
assert(isValidPhone('(123) 456-7890'), 'Valid phone (parens)');
assert(!isValidPhone('123'), 'Invalid phone (too short)');
assert(!isValidPhone('abc'), 'Invalid phone (letters)');

// Email Tests
assert(isValidEmail('test@example.com'), 'Valid email');
assert(!isValidEmail('test@'), 'Invalid email (no domain)');
assert(!isValidEmail('test'), 'Invalid email (no @)');
assert(!isValidEmail('test@.com'), 'Invalid email (empty domain part)');

// LinkedIn Tests
assert(isValidLinkedIn('https://linkedin.com/in/johndoe'), 'Valid LinkedIn');
assert(isValidLinkedIn('https://www.linkedin.com/in/johndoe'), 'Valid LinkedIn (www)');
assert(isValidLinkedIn('https://linkedin.com/company/acme'), 'Valid LinkedIn (company)');
assert(!isValidLinkedIn('https://google.com'), 'Invalid LinkedIn (wrong domain)');
assert(!isValidLinkedIn('http://evil-linkedin.com'), 'Invalid LinkedIn (phishing)');
assert(!isValidLinkedIn('just a string'), 'Invalid LinkedIn (not URL)');

// GitHub Tests
assert(isValidGitHub('https://github.com/johndoe'), 'Valid GitHub');
assert(isValidGitHub('https://www.github.com/johndoe'), 'Valid GitHub (www)');
assert(isValidGitHub(''), 'Valid GitHub (empty/optional)');
assert(!isValidGitHub('https://gitlab.com/johndoe'), 'Invalid GitHub (wrong domain)');

console.log(`\nTests completed: ${passed} passed, ${failed} failed.`);

if (failed > 0) {
  process.exit(1);
}
