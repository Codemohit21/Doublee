import { faker } from "@faker-js/faker";

// Function to generate a single customer record
const createRandomCustomer = (id) => {
  return {
    id: id,
    avatar: faker.image.avatar(),
    name: faker.person.fullName(),
    phone: faker.phone.number(),
    email: faker.internet.email().toLowerCase(),
    score: faker.number.int({ min: 10, max: 100 }),
    lastMessageAt: faker.date.past({ years: 1 }),
    addedBy: faker.person.fullName(),
  };
};

// Generate 1 million customers
console.log("Generating 1,000,000 mock customer records... Please wait.");
const customers = Array.from({ length: 1_000_000 }, (_, i) =>
  createRandomCustomer(i + 1)
);
console.log("Data generation complete.");

export const allCustomers = customers;
