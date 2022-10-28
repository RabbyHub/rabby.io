import clsx from "clsx";
import React, { useRef, useState } from "react";
import style from "./style.module.css";
import Carousel from "nuka-carousel";
import { useSearchParams } from "react-router-dom";

const privateKeysImages = Array(7)
  .fill(1)
  .map((_, i) => `/assets/images/private-key-step-${i + 1}.png`);

const privateKeysSteps = [
  "Click on the identicon in the top right",
  "Select the account you'd like to export",
  "Click on the menu (three dots) in the upper right corner",
  'Click on the "Account Details" button.',
  'Click on the "Export private key" button.',
  "Enter your wallet password and click “Confirm” button",
  "Copy your private key and save",
];

const seedPhraseImages = Array(6)
  .fill(1)
  .map((_, i) => `/assets/images/seed-phrase-step-${i + 1}.png`);

const seedPhraseSteps = [
  "Click on the identicon in the top right",
  'Click "Settings"',
  'Click "Security & Privacy"',
  'Click on the "Reveal Secret Recovery Phrase" button',
  "Enter your password to reveal your Seed Phrase",
  "Save your Seed Phrase",
];

const exportPrivateKeyLink =
  "https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key";
const exportSeedPhraseLink =
  "https://metamask.zendesk.com/hc/en-us/articles/360018766351-How-to-recover-your-Secret-Recovery-Phrase";

interface ArrowProps extends React.ComponentPropsWithoutRef<"img"> {
  isRight?: boolean;
  disable?: boolean;
}
const Arrow = ({ isRight, disable, className, ...other }: ArrowProps) => (
  <img
    src={`/assets/images/${disable ? "" : "active-"}arrow-left.png`}
    alt={"arrow"}
    className={clsx(style.arrow, isRight ? style.right : style.left, className)}
    {...other}
  />
);

interface TipsProps {
  title: string;
  steps: string[];
  images: string[];
  href: string;
  hrefText: string;
  className?: string;
}
const Tips = ({
  className,
  href,
  hrefText,
  title,
  steps: privateKeysSteps,
  images: privateKeysImages,
}: TipsProps) => {
  const [current, setCurrent] = useState(0);
  const gotoSlideRef = useRef<{ goToSlide?: (n: number) => void }>({});
  let [searchParams] = useSearchParams();

  const autoplayInterval = Number(searchParams.get("autoplayInterval")) || 3000;

  return (
    <section className={clsx(style.tipSection, className)}>
      <div className={style.sectionTitle}>{title}</div>
      <div
        className={style.maxContent}
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: 183,
            height: 308,
          }}
        >
          <Carousel
            autoplayInterval={autoplayInterval}
            autoplay={true}
            pauseOnHover
            wrapAround
            className={style.slide}
            renderCenterLeftControls={({ previousSlide, previousDisabled }) => (
              <Arrow disable={previousDisabled} onClick={previousSlide} />
            )}
            renderCenterRightControls={({ nextDisabled, nextSlide }) => (
              <Arrow isRight disable={nextDisabled} onClick={nextSlide} />
            )}
            renderBottomCenterControls={({
              currentSlide,
              goToSlide,
              pagingDotsIndices,
            }) => {
              gotoSlideRef.current = { goToSlide };

              if (currentSlide !== current) {
                setCurrent(currentSlide);
              }
              return (
                <div
                  className={clsx(style.dotContainer, "dotContainer")}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    top: 10,
                  }}
                >
                  {pagingDotsIndices.map((e, i) => (
                    <div
                      onClick={() => goToSlide(i)}
                      className={clsx(
                        style.dot,
                        currentSlide === i && style.active
                      )}
                    />
                  ))}
                </div>
              );
            }}
          >
            {privateKeysImages.map((e, i) => (
              <img
                style={{
                  width: "100%",
                  height: 308,
                }}
                src={e}
                alt=""
                key={e}
                data-slide={`Slide ${i + 1}`}
              />
            ))}
          </Carousel>
        </div>

        <div className={style.stepContainer}>
          {privateKeysSteps.map((e, i) => (
            <div
              className={clsx(style.stepBox, i === current && style.active)}
              onClick={() => {
                gotoSlideRef.current.goToSlide?.(i);
              }}
            >
              <span className={style.step}>Step {i + 1}: </span>
              <span className={style.stepContent}>{e}</span>
              {i === current && (
                <img
                  className={style.stepCurrentTag}
                  src="/assets/images/tag-arrow-right.svg"
                  alt=""
                />
              )}
            </div>
          ))}
          <div className={style.relLink}>
            Reference from MetaMask:{" "}
            <a href={href} target="_blank" rel="noreferrer">
              {hrefText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export const MetaMaskExport = () => {
  return (
    <div className={style.container}>
      <section className={clsx(style.header)}>
        <img
          className={style.metamask}
          src={"/assets/images/metamask.svg"}
          alt="metamask"
        />
        <div className={clsx(style.title, style.center)}>
          How to export the Private key and Seed Phrase from MetaMask
        </div>
      </section>

      <Tips
        title={"1. How to export Private key"}
        steps={privateKeysSteps}
        images={privateKeysImages}
        href={exportPrivateKeyLink}
        hrefText={"How to export an account's private key"}
      />
      <Tips
        className={style.seed}
        title={"2. How to export Seed Phrase"}
        steps={seedPhraseSteps}
        images={seedPhraseImages}
        href={exportSeedPhraseLink}
        hrefText={"How to reveal your Secret Recovery Phrase"}
      />
    </div>
  );
};
