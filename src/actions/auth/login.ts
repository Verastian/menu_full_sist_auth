'use server';
import { signIn } from '@/auth.config';


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  console.log('FORM DATA FROM AUTHENTICATE: ', formData)
  try {

    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'Success';

  } catch (error) {
    console.log(error);
    return 'CredentialsSignin'
  }
}

type LoginProp = {
  email: string, password: string
}
export const login = async ({ email, password }: LoginProp) => {
  console.log('FORM DATA FROM LOGIN: ', email, password)
  try {

    await signIn('credentials', { email, passwordHash: password })

    return { ok: true };

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo iniciar sesión'
    }
  }
}

