export const Empty = ({ text }: { text?: string }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: 400,
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
        borderRadius: 8,
        gap: 8,
        background: "var(--r-neutral-card1, rgba(255, 255, 255, 0.06))",
      }}
    >
      <img
        src="/assets/chain-dashboard/empty.svg"
        alt="empty"
        style={{
          width: 32,
          height: 32,
        }}
      />
      <span
        style={{
          color: "var(--r-neutral-foot, #BABEC5)",
          fontSize: 16,
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "normal",
        }}
      >
        {text || "No Supported Chain"}
      </span>
    </div>
  );
};
