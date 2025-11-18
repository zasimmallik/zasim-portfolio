/**
 * Validators
 * Form and data validation utilities
 */

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate required field
 * @param {string} value
 * @returns {boolean}
 */
export function validateRequired(value: string): boolean {
  return !!(value && value.trim().length > 0);
}

/**
 * Validate minimum length
 * @param {string} value
 * @param {number} minLength
 * @returns {boolean}
 */
export function validateMinLength(value: string, minLength: number): boolean {
  return !!(value && value.length >= minLength);
}

/**
 * Validate phone number (basic)
 * @param {string} phone
 * @returns {boolean}
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-+()]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Validate URL format
 * @param {string} url
 * @returns {boolean}
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitize text input (basic XSS prevention)
 * @param {string} text
 * @returns {string}
 */
export function sanitizeInput(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export default {
  validateEmail,
  validateRequired,
  validateMinLength,
  validatePhone,
  validateUrl,
  sanitizeInput,
};

