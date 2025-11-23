// Trim and collapse extra spaces
export const sanitizeString = (str: string): string => {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/\s+/g, ' ');
};

// Normalize and sanitize email
export const sanitizeEmail = (email: string): string => {
  if (typeof email !== 'string') return '';
  return email.trim().toLowerCase();
};

// Sanitize URL (basic)
export const sanitizeUrl = (url: string | null | undefined): string | null => {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  return trimmed === '' ? null : trimmed;
};