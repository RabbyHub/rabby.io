interface ConfirmTableProps {
  headline: string;
  children: React.ReactNode;
}
export const ConfirmTable: React.FC<ConfirmTableProps> = ({
  headline,
  children
}) => {
  return (
    <div>
      <h2 className="mb-0 text-sm">{headline}</h2>
      {children}
    </div>
  );
};
