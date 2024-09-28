export const revalidate = 60; // 60 segundos
// import { redirect } from 'next/navigation';

interface Props {
  searchParams: {
    page?: string;
  }
}
export default async function Home({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <div className=''>
      <h1>Home page</h1>
    </div>
  );
}
