interface CardProps {
  headline?: string;
  children: React.ReactNode;
  hasLogo?: boolean;
}

export const Card: React.FC<CardProps> = ({ headline, children, hasLogo }) => {
  return (
    <div className="relative">
      <div className="bg-white border-line border rounded-lg px-6 py-[26px] text-left">
        {headline && (
          <h2 className="font-bold text-base text-text mb-4 mr-[110px]">
            {headline}
          </h2>
        )}
        {hasLogo && (
          <div className="absolute right-4 top-4">
            <img src="/logo.png" alt="Rabby" className="h-[34px]" />
          </div>
        )}
        <div className="text-text">{children}</div>
      </div>
    </div>
  );
};
