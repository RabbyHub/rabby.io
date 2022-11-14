import clsx from "clsx";
import Carousel, { CarouselProps } from "nuka-carousel";
import React, { useState, useRef } from "react";
import style from "./style.module.scss";
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
  carouselConfig?: CarouselProps;
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
}
export const Tips = ({
  width = 400,
  height = 346,
  className,
  href,
  hrefText,
  title,
  steps: privateKeysSteps,
  images: privateKeysImages,
  carouselConfig = {
    autoplayInterval: 3000,
    autoplay: true,
    pauseOnHover: true,
    wrapAround: true,
  },
}: TipsProps) => {
  const [current, setCurrent] = useState(0);
  const gotoSlideRef = useRef<{ goToSlide?: (n: number) => void }>({});

  return (
    <section className={clsx(style.tipSection, className)}>
      <div className={style.sectionTitle}>{title}</div>
      <div className={style.maxContent}>
        <div
          style={{
            maxWidth: width,
            height,
          }}
        >
          <Carousel
            autoplayInterval={3000}
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
                <div className={clsx(style.dotContainer, "dotContainer")}>
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
            {...carouselConfig}
          >
            {privateKeysImages.map((e, i) => (
              <img
                style={{
                  width: "100%",
                  height,
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
          {hrefText && (
            <div className={style.relLink}>
              Reference from MetaMask:{" "}
              <a href={href} target="_blank" rel="noreferrer">
                {hrefText}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
