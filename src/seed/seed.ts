

interface SeedUser {
  email: string;
  passwordHash: string;
  rol: 'admin' | 'user'
}


interface SeedData {
  users: SeedUser[];
}

export const initialData: SeedData = {

  users: [
    {
      email: 'admin@example.com',
      passwordHash: 'adminPassword123',
      rol: 'admin',
    },
    {
      email: 'user@example.com',
      passwordHash: 'userPassword123',
      rol: 'user',
    },


  ],

};