import { titleFont } from '@/config/fonts';
import clsx from 'clsx';

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
  isLine?: boolean;
  lineDark?: boolean;
}



export const Title = ({ title, subtitle, className, isLine = false, lineDark = false }: Props) => {
  return (
    <div className={clsx(" sm:p-0 text-center space-y-10 mt-10",
      { [`${className}`]: className }
    )}>
      <h1 className={`${titleFont.className} antialiased text-5xl font-semibold`}>
        {title}
      </h1>

      {
        subtitle && (
          <h3 className="text-xl ">{subtitle}</h3>
        )
      }
      <div className='pt-5'>
        {isLine &&
          <div className={clsx("border-b-2",
            { " border-b-gray-100": lineDark },
            { " border-b-gray-800": !lineDark },

          )} />
        }
      </div>
    </div>
  )
}