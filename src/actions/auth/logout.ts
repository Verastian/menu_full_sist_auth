'use server';

import { signOut } from '@/auth.config';


export const logout = async () => {
  console.log('LOGOUT')
  // await signOut({ redirect: false, redirectTo: "/profile" });
  await signOut();


}