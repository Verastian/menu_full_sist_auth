import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';


export default async function ShopLayout({ children }: {
  children: React.ReactNode;
}) {

  const session = await auth();
  if (session?.user) {
    redirect('/');
  }

  return (

    <main className="min-h-screen flex justify-center items-center">
      {/* <div className="w-full sm:w-[550px] h-fit px-10 rounded-2xl border border-zinc-200 dark:border-zinc-700"> */}
      {children}
      {/* </div> */}
    </main>
  );
}