/**
 * Global Test Configuration Constants
 */
export const TEST_CONFIG = {
  baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5173',
  defaultTimeout: 30000,
  actionTimeout: 10000,
};
