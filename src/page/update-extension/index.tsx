import clsx from "clsx";
import { Tips } from "../../components/CarouselTips";
import style from "./style.module.scss";
const updateExtensionImages = Array(4)
  .fill(1)
  .map((_, i) => `/assets/images/update-extension-${i + 1}.png`);

const updateExtensionSteps = [
  `Click the "Extension" button on the Chrome toolbar and choose "Manage Extensions."`,
  `Click the "Details" button below the Rabby extension.`,
  `Turn on the "Developer Mode" on the right side of the header.`,
  `On the top left part of the screen, click on "Update."`,
];

export const UpdateExtension = () => {
  return (
    <div className={style.container}>
      <section
        className={clsx(style.header)}
        style={{
          backgroundImage: `url(/assets/logos/logo-transparent.svg)`,
        }}
      >
        <img
          className={style.logo}
          src={"/assets/images/info.svg"}
          alt="metamask"
        />
        <div className={clsx(style.title, style.center)}>
          Update to the latest Rabby Wallet version
        </div>
      </section>
      <div className={style.introBox}>
        <Tips
          className={style.intro}
          title={"How to manually update Rabby extensions in Chrome/Brave"}
          steps={updateExtensionSteps}
          images={updateExtensionImages}
          href={""}
          hrefText={""}
          carouselConfig={{
            wrapAround: false,
            autoplay: false,
          }}
        />
      </div>
    </div>
  );
};
