import { SVGProps } from "react";

export const IconDanger = ({
  enableShadow,
  ...props
}: SVGProps<SVGSVGElement> & { enableShadow?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g filter={enableShadow ? "url(#IconDanger)" : undefined}>
      <rect width={16} height={16} x={4} y={4} fill="#EF5C48" rx={8} />
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.308}
        d="M12 12.577V8"
      />
      <path
        fill="#fff"
        d="M12 16.5a.98.98 0 1 0 0-1.961.98.98 0 0 0 0 1.962Z"
      />
    </g>
    <defs>
      <filter
        id="IconDanger"
        width={24}
        height={24}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.937255 0 0 0 0 0.360784 0 0 0 0 0.282353 0 0 0 1 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_93823_9193"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_93823_9193"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export const IconWarning = ({
  enableShadow,
  ...props
}: SVGProps<SVGSVGElement> & { enableShadow?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g filter={enableShadow ? "url(#IconWarning)" : undefined}>
      <rect width={16} height={16} x={4} y={4} fill="#FFC64A" rx={8} />
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.308}
        d="M12 12.577V8"
      />
      <path
        fill="#fff"
        d="M12 16.5a.98.98 0 1 0 0-1.961.98.98 0 0 0 0 1.962Z"
      />
    </g>
    <defs>
      <filter
        id="IconWarning"
        width={24}
        height={24}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.776471 0 0 0 0 0.290196 0 0 0 1 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_93823_9484"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_93823_9484"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export const IconNormal = ({
  enableShadow,
  ...props
}: SVGProps<SVGSVGElement> & { enableShadow?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    viewBox="0 0 24 25"
    {...props}
  >
    <g filter={enableShadow ? "url(#IconNormal)" : undefined}>
      <rect width={16} height={16} x={4} y={4.5} fill="#2ABB7F" rx={8} />
    </g>
    <defs>
      <filter
        id="IconNormal"
        width={24}
        height={24}
        x={0}
        y={0.5}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.164706 0 0 0 0 0.733333 0 0 0 0 0.498039 0 0 0 1 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1804_8157"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_1804_8157"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
