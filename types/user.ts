export interface User {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  company: string;
  city: string;
  state: string;
  country: string;
  location: string; // Combined location string for filtering
  bio: string;
  address: string;
  zipCode: string;
}
