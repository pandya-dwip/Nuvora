/**
 * Test User Credentials & Account Data (matching src/data/users.json)
 */
export const testUsers = {
  customer: {
    id: 1,
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'customer123',
    role: 'customer',
  },
  dwipCustomer: {
    id: 3,
    name: 'Dwip',
    email: 'dwip@gmail.com',
    password: 'password123',
    role: 'customer',
  },
  automationCustomer: {
    name: 'Automation User',
    email: 'automation.customer@example.com',
    password: 'password123',
    role: 'customer',
  },
  admin: {
    id: 2,
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
  },
  invalidUser: {
    email: 'nonexistent.user@example.com',
    password: 'wrongpassword',
  },
  newRegistration: {
    fullName: 'New Registered Customer',
    email: `newcustomer_${Date.now()}@example.com`,
    password: 'Password123!',
  },
};
