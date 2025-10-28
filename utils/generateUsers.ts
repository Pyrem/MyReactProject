import { faker } from '@faker-js/faker';
import { User } from '@/types/user';

export function generateUser(): User {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const city = faker.location.city();
  const state = faker.location.state();
  const country = faker.location.country();

  return {
    id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }),
    phone: faker.phone.number(),
    jobTitle: faker.person.jobTitle(),
    company: faker.company.name(),
    city,
    state,
    country,
    location: `${city}, ${state}, ${country}`,
    bio: faker.person.bio(),
    address: faker.location.streetAddress(true),
    zipCode: faker.location.zipCode(),
  };
}

export function generateUsers(count: number): User[] {
  return Array.from({ length: count }, () => generateUser());
}
