import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiChevronRight } from 'react-icons/bi';

type BreadCrumbProps = {
  breadCrumbData: {
    pageName: string;
    pageHref: string;
  }[];
};

const BreadCrumb: React.FC<BreadCrumbProps> = ({ breadCrumbData }) => {
  const router = useRouter();

  return (
    <nav className="flex mt-3" aria-label="Breadcrumb">
      <ol className="flex items-center focus-visible:outline-none">
        {breadCrumbData.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              {index !== 0 && item.pageHref !== router.pathname && (
                <BiChevronRight className="w-6 h-6 text-gray-400" />
              )}

              <div
                className={`text-sm h-6 font-medium text-gray-700  ${
                  item.pageHref === ''
                    ? ''
                    : 'cursor-pointer hover:text-primary-140 active:text-primary-180'
                }`}
              >
                {item.pageHref === '' ? (
                  <p>{item.pageName}</p>
                ) : (
                  <Link href={item.pageHref} passHref>
                    <a className="focus:outline-none focus:text-primary-140">
                      {item.pageName}
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
