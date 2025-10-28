'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/user';
import { generateUsers } from '@/utils/generateUsers';

interface UserContextType {
  users: User[];
  getUser: (id: string) => User | undefined;
  isUsingLocalData: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Helper arrays for missing fields
const jobTitles = [
  'Software Engineer', 'Product Manager', 'Designer', 'Data Scientist',
  'Marketing Manager', 'Sales Executive', 'HR Manager', 'Financial Analyst',
  'Operations Manager', 'Customer Success Manager', 'DevOps Engineer',
  'QA Engineer', 'Business Analyst', 'Project Manager', 'Content Writer'
];

const companies = [
  'Tech Corp', 'InnovateLabs', 'DataSystems Inc', 'CloudVentures',
  'Digital Solutions', 'NextGen Tech', 'Smart Analytics', 'Future Industries',
  'Global Dynamics', 'Alpha Systems', 'Beta Technologies', 'Gamma Enterprises',
  'Delta Innovations', 'Epsilon Corp', 'Zeta Solutions'
];

const bios = [
  'Passionate about technology and innovation.',
  'Experienced professional with a track record of success.',
  'Dedicated to delivering high-quality results.',
  'Creative problem solver with excellent communication skills.',
  'Team player committed to collaborative success.',
  'Results-driven professional with strong analytical skills.',
  'Innovative thinker with a passion for continuous improvement.',
  'Detail-oriented individual with strong organizational abilities.',
  'Enthusiastic about learning and professional growth.',
  'Strategic thinker focused on achieving business objectives.'
];

// Transform fakerapi.it person response to User interface
function transformPerson(person: any, index: number): User {
  const id = person.id?.toString() || index.toString();

  return {
    id,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
    firstName: person.firstname || '',
    lastName: person.lastname || '',
    fullName: `${person.firstname || ''} ${person.lastname || ''}`.trim(),
    email: person.email || '',
    phone: person.phone || '',
    jobTitle: jobTitles[parseInt(id) % jobTitles.length] || 'Professional',
    company: companies[parseInt(id) % companies.length] || 'Company',
    city: person.address?.city || '',
    state: person.address?.state || '',
    country: person.address?.country || '',
    location: person.address
      ? `${person.address.city || ''}, ${person.address.state || ''}, ${person.address.country || ''}`
          .replace(/, ,/g, ', ')
          .replace(/^, |, $/g, '')
      : '',
    bio: bios[parseInt(id) % bios.length] || 'Dedicated professional.',
    address: person.address?.street || '',
    zipCode: person.address?.zipcode || '',
  };
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [isUsingLocalData, setIsUsingLocalData] = useState(false);

  useEffect(() => {
    // Fetch persons from fakerapi.it
    async function fetchUsers() {
      try {
        const response = await fetch('https://fakerapi.it/api/v1/persons?_quantity=50');
        const data = await response.json();

        if (data.data && Array.isArray(data.data)) {
          const transformedUsers = data.data.map((person: any, index: number) =>
            transformPerson(person, index)
          );
          setUsers(transformedUsers);
          setIsUsingLocalData(false);
        } else {
          // Invalid response format, fallback to local generation
          console.warn('Invalid response from fakerapi.it, using local Faker.js');
          const localUsers = generateUsers(50);
          setUsers(localUsers);
          setIsUsingLocalData(true);
        }
      } catch (error) {
        console.error('Failed to fetch from fakerapi.it:', error);
        console.log('Falling back to local Faker.js library');
        // Fallback to local Faker.js library
        const localUsers = generateUsers(50);
        setUsers(localUsers);
        setIsUsingLocalData(true);
      }
    }

    fetchUsers();
  }, []);

  const getUser = (id: string) => {
    return users.find(user => user.id === id);
  };

  return (
    <UserContext.Provider value={{ users, getUser, isUsingLocalData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
}
