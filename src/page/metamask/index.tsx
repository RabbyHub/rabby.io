import clsx from "clsx";
import React, { useRef, useState } from "react";
import style from "./style.module.css";
import Carousel from "nuka-carousel";

const privateKeysSteps = [
  "Click the address on the top",
  "Click the menu on the right side of your address and select “Account details”",
  "Click “Show private key”",
  'Enter your password',
  'View or copy the private key',
];

const privateKeysImages = Array(privateKeysSteps.length)
  .fill(1)
  .map((_, i) => `/assets/images/export/private-key-step-${i + 1}.png`);


const seedPhraseSteps = [
  "Click the menu on the top right, and select “Settings”",
  'Select “Security & privacy”',
  'Click “Reveal Secret Recovery Phrase”',
  'Enter your password',
  "Click “Hold to reveal SRP” and hold",
  "View or copy the secret recovery phrase",
];

const seedPhraseImages = Array(seedPhraseSteps.length)
  .fill(1)
  .map((_, i) => `/assets/images/export/seed-phrase-step-${i + 1}.png`);


const exportPrivateKeyLink =
  "https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key";
const exportSeedPhraseLink =
  "https://metamask.zendesk.com/hc/en-us/articles/360018766351-How-to-recover-your-Secret-Recovery-Phrase";

const autoplayInterval = 5000;

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

  return (
    <section className={clsx(style.tipSection, className)}>
      <div className={style.sectionTitle}>{title}</div>
      <div className={style.maxContent}>
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
