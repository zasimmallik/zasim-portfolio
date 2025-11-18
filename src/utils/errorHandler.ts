/**
 * Error Handler
 * Centralized error handling and logging
 */

/**
 * Error types
 */
export const ERROR_TYPES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  API_ERROR: 'API_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  SERVER_ERROR: 'SERVER_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};

/**
 * Custom Error class
 */
export class AppError extends Error {
  type: string;
  statusCode: number;
  timestamp: Date;

  constructor(message: string, type: string = ERROR_TYPES.UNKNOWN_ERROR, statusCode: number = 500) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.timestamp = new Date();
  }

  toJSON() {
    return {
      message: this.message,
      type: this.type,
      statusCode: this.statusCode,
      timestamp: this.timestamp,
    };
  }
}

/**
 * Handle and log errors
 * @param {Error} error
 * @param {string} context - Where error occurred
 * @returns {AppError}
 */
export function handleError(error: unknown, context: string = 'Unknown'): AppError {
  const appError = error instanceof AppError
    ? error
    : new AppError(error instanceof Error ? error.message : 'An unknown error occurred', ERROR_TYPES.UNKNOWN_ERROR);

  // Log in development
  if (import.meta.env.DEV) {
    console.error(`[${context}]`, appError);
  }

  // Send to error tracking in production
  if (import.meta.env.PROD && import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true') {
    // Example: sendToErrorTracking(appError);
  }

  return appError;
}

/**
 * Get user-friendly error message
 * @param {AppError} error
 * @returns {string}
 */
export function getErrorMessage(error: AppError | Error | unknown): string {
  const errorMessages: Record<string, string> = {
    [ERROR_TYPES.VALIDATION_ERROR]: 'Please check your input and try again.',
    [ERROR_TYPES.API_ERROR]: 'Something went wrong. Please try again later.',
    [ERROR_TYPES.NETWORK_ERROR]: 'Network error. Please check your connection.',
    [ERROR_TYPES.NOT_FOUND]: 'The requested resource was not found.',
    [ERROR_TYPES.UNAUTHORIZED]: 'You are not authorized to perform this action.',
    [ERROR_TYPES.FORBIDDEN]: 'Access denied.',
    [ERROR_TYPES.SERVER_ERROR]: 'Server error. Please try again later.',
    [ERROR_TYPES.UNKNOWN_ERROR]: 'An unexpected error occurred.',
  };

  const appError = error as AppError;
  return errorMessages[appError?.type] || appError?.message || 'An unexpected error occurred.';
}

/**
 * Retry async operation with exponential backoff
 * @param {Function} fn - Async function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Initial delay in ms
 * @returns {Promise}
 */
export async function retryAsync<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay * (2 ** i)));
      }
    }
  }

  throw handleError(lastError, 'retryAsync');
}

export default {
  ERROR_TYPES,
  AppError,
  handleError,
  getErrorMessage,
  retryAsync,
};

