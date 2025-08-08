import Link from 'next/link';

export default function TextFadeOutNavButton({
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
        <span
          className={`absolute left-0 visible items-center transform transition-transform duration-300 ease-in-out -translate-y-[50%] group-hover:translate-y-0 group-hover:opacity-100
            opacity-0 pointer-events-none`}
        >
          {buttonTitle}
        </span>
        <span
          className={`transform transition-transform duration-300 ease-in-out group-hover:translate-y-[300%] translate-y-0 opacity-100 `}
        >
          {buttonTitle}
        </span>
      </Link>
    </div>
  );
}
