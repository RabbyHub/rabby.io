import { BASE_PATH } from '../utils/env';

interface CardProps {
  headline?: string;
  children: React.ReactNode;
  hasLogo?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  headline,
  children,
  hasLogo,
  className
}) => {
  return (
    <div className={'relative ' + className}>
      <div className="bg-white border-line border border-solid rounded-lg px-6 py-[26px] text-left">
        {headline && (
          <h2 className="font-bold text-base text-headline mb-4 mr-[110px] md:leading-none">
            {headline}
          </h2>
        )}
        {hasLogo && (
          <div className="absolute right-4 top-4">
            <a href="//rabby.io">
              <img
                src={`${BASE_PATH}/logo.png`}
                alt="Rabby"
                className="h-[34px]"
              />
            </a>
          </div>
        )}
        <div className="text-headline">{children}</div>
      </div>
    </div>
  );
};
