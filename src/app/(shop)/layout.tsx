
import { HeadTitle, Sidebar, TopMenu } from '@/components';
import { ReactNode } from 'react';
interface Props {
  children: ReactNode
}

export default function ShopLayout({ children }: Props) {


  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />
      <HeadTitle />
      <div className="">
        {children}
      </div>
    </main>
  );
}