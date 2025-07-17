import { format, isValid } from 'date-fns';

interface SearchOptions {
  caseSensitive?: boolean;
  exactMatch?: boolean;
  ignoreDiacritics?: boolean;
  dateFormat?: string;
  maxDepth?: number;
  includeKeys?: string[];
  excludeKeys?: string[];
}

// Helper functions
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function removeDiacritics(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function applySortFilter<T extends Record<string, unknown>>(
  array: T[],
  query: string,
  options: SearchOptions = {}
): T[] {
  if (!query?.trim()) return array;

  const {
    caseSensitive = false,
    exactMatch = false,
    ignoreDiacritics = true,
    dateFormat = 'dd-MMM-yyyy',
    maxDepth = 10,
    includeKeys,
    excludeKeys = [],
  } = options;

  // Normalize the query once
  const normalizedQuery = caseSensitive ? query : query.toLowerCase();
  const exactQuery = exactMatch ? `\\b${escapeRegExp(normalizedQuery)}\\b` : escapeRegExp(normalizedQuery);
  const queryRegex = new RegExp(exactQuery, caseSensitive ? '' : 'i');

  // Helper function to normalize strings
  const normalizeString = (str: string): string => {
    let result = str;
    if (!caseSensitive) result = result.toLowerCase();
    if (ignoreDiacritics) result = removeDiacritics(result);
    return result;
  };

  // Helper function to normalize and format values
  const normalizeValue = (value: unknown, currentDepth = 0): string => {
    if (currentDepth > maxDepth) return '';

    if (value === null || value === undefined) return '';

    // Handle Date objects and date strings
    if (value instanceof Date || (typeof value === 'string' && value.includes('T'))) {
      const date = value instanceof Date ? value : new Date(value);
      if (isValid(date)) {
        return normalizeString(format(date, dateFormat));
      }
      return '';
    }

    // Handle arrays and objects recursively
    if (Array.isArray(value)) {
      return value.map((v) => normalizeValue(v, currentDepth + 1)).join(' ');
    }

    if (typeof value === 'object') {
      return Object.entries(value)
        .map(([k, v]) => `${k} ${normalizeValue(v, currentDepth + 1)}`)
        .join(' ');
    }

    // Handle primitive values
    return normalizeString(String(value));
  };

  // Check if a key should be included in search
  const shouldIncludeKey = (key: string): boolean => {
    if (excludeKeys.includes(key)) return false;
    if (includeKeys && !includeKeys.includes(key)) return false;
    return true;
  };

  // Main filter function
  return array.filter((item) => {
    return Object.entries(item).some(([key, value]) => {
      if (!shouldIncludeKey(key)) return false;

      const normalized = normalizeValue(value);
      return queryRegex.test(normalized);
    });
  });
}
