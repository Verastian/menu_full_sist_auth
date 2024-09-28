export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date | null;
  passwordHash: string;
  rol: string;
  image?: string | null;
}

export interface MenuItem {
  text: string;
  link?: string | undefined;
  icon: 'user' | 'logout' | 'customize' | 'login';
  rol: string[];
  order: number;
}
