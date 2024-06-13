export interface User {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  dob: string;
  gender: 'Male' | 'Female';
  city: string;
  state: string;
  country: string;
}
