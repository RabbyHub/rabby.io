interface ConfirmTableProps {
  headline: string;
  children: React.ReactNode;
}
export const ConfirmTable: React.FC<ConfirmTableProps> = ({
  headline,
  children
}) => {
  return (
    <div className="text-left">
      <h2 className="mb-5 text-sm">{headline}</h2>
      {children}
    </div>
  );
};
