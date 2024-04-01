import style from "./style.module.scss";
export const DashboardHeader = () => {
  return (
    <div
      className={style.header}
      style={{
        backgroundImage: "url(/assets/chain-dashboard/header.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "1440px 140px",
        backgroundPosition: "right top",
      }}
    >
      Rabby Integrated Chains Dashboard
      {/* <img src="/assets/chain-dashboard/header.png" /> */}
    </div>
  );
};
