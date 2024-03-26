import style from "./style.module.scss";

export function Search(
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  return (
    <div className={style.inputWrapper}>
      <input className={style.input} placeholder="Search" {...props} />
      <img
        className={style.searchIcon}
        src="/assets/chain-dashboard/search.svg"
        alt="search"
      />
    </div>
  );
}
