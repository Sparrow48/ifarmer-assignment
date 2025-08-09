import Link from 'next/link';

export default function NavItem({
  buttonTitle = 'Click Me',
  buttonLink = '/',
  buttonMainClass = 'flex items-center justify-center h-[62px] text-sx md:text-base font-medium rounded-[31px] bg-white text-black px-10 group overflow-hidden',
}: {
  buttonTitle?: string;
  buttonLink?: string;
  buttonMainClass?: string;
  movingDistance?: string;
}) {
  return (
    <div className="relative inline-flex items-center">
      <Link
        passHref
        href={buttonLink}
        className={`flex items-center justify-center group overflow-hidden ${buttonMainClass}`}
      >
        <span className={` opacity-100 `}>{buttonTitle}</span>
      </Link>
    </div>
  );
}
