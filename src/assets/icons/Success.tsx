import { SVGProps } from 'react';

const Success = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="38"
    height="38"
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity="0.3">
      <path
        d="M6 19C6 11.8203 11.8203 6 19 6C26.1797 6 32 11.8203 32 19C32 26.1797 26.1797 32 19 32C11.8203 32 6 26.1797 6 19Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </g>
    <g opacity="0.1">
      <path
        d="M1 19C1 9.05888 9.05888 1 19 1C28.9411 1 37 9.05888 37 19C37 28.9411 28.9411 37 19 37C9.05888 37 1 28.9411 1 19Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </g>
    <g clipPath="url(#clip0_2880_11507)">
      <path
        d="M15.2503 18.9993L17.7503 21.4993L22.7503 16.4993M27.3337 18.9993C27.3337 23.6017 23.6027 27.3327 19.0003 27.3327C14.398 27.3327 10.667 23.6017 10.667 18.9993C10.667 14.397 14.398 10.666 19.0003 10.666C23.6027 10.666 27.3337 14.397 27.3337 18.9993Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2880_11507">
        <rect width="20" height="20" fill="white" transform="translate(9 9)" />
      </clipPath>
    </defs>
  </svg>
);

export default Success;
