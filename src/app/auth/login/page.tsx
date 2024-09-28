
import { titleFont } from '@/config/fonts';
import { LoginForm } from '../../../components/forms/LoginForm';
import clsx from 'clsx';

export default function LoginPage() {
  return (
    <div className={clsx(
      "w-full sm:w-fit sm:min-w-[550px] h-fit px-10 rounded-2xl",
      " border border-zinc-300 dark:border-zinc-700 shadow-xl",
      "bg-zinc-50  dark:bg-zinc-800",
      "py-16 sm:px-16"
    )}>

      <h1 className={`${titleFont.className} whitespace-pre text-4xl mb-14`}>Iniciar sesión</h1>
      <LoginForm />
    </div>
  );
}