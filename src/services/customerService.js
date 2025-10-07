
import { faker } from "@faker-js/faker";

const createRandomCustomer = (id) => ({
  id,
  avatar: faker.image.avatar(),
  name: faker.person.fullName(),
  email: faker.internet.email().toLowerCase(),
  phone: faker.phone.number(),
  score: faker.number.int({ min: 0, max: 100 }),
  lastMessageAt: faker.date.past({ years: 1 }),
  addedBy: faker.person.fullName(),
});

console.log("Generating 1M records...");
const allCustomers = Array.from({ length: 1_000_000 }, (_, i) => createRandomCustomer(i + 1));
console.log("Records generated.");

const customerService = {
  /**
   * Fetches a paginated, sorted, and searched list of customers.
   * @param {object} options
   * @param {number} options.page - The page number to fetch (1-based).
   * @param {number} options.limit - The number of items per page (e.g., 30).
   * @param {string} options.searchTerm - The term to search for.
   * @param {object} options.sortConfig - { key: 'name', direction: 'asc' | 'desc' }.
   * @returns {Promise<{data: Array, hasMore: boolean, total: number}>}
   */
  async getCustomers({ page = 1, limit = 30, searchTerm = '', sortConfig = { key: 'name', direction: 'asc' } }) {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 50));

    let processedCustomers = allCustomers;

    // 1. Filter Logic (if a search term exists)
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      processedCustomers = allCustomers.filter(
        customer =>
          customer.name.toLowerCase().includes(lowercasedTerm) ||
          customer.email.toLowerCase().includes(lowercasedTerm) ||
          customer.phone.includes(lowercasedTerm)
      );
    }

    // 2. Sorting Logic
    processedCustomers.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    // 3. Pagination Logic
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = processedCustomers.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total: processedCustomers.length,
      hasMore: endIndex < processedCustomers.length,
    };
  },
};

export default customerService;