import React from 'react';

export const ToothLocationIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50 15C42.3 15 36 21.3 36 29C36 36.7 42.3 43 50 43C57.7 43 64 36.7 64 29C64 21.3 57.7 15 50 15Z"
      stroke={color}
      strokeWidth="4"
      fill="none"
    />
    <circle cx="50" cy="29" r="4" fill={color} />
    <path
      d="M75 50C75 65 65 75 50 85C35 75 25 65 25 50C25 40 30 32 40 28C35 35 35 45 40 50C45 55 55 55 60 50C65 45 65 35 60 28C70 32 75 40 75 50Z"
      stroke={color}
      strokeWidth="4"
      fill="none"
    />
    <circle cx="30" cy="45" r="2" fill={color} />
    <circle cx="35" cy="50" r="2" fill={color} />
    <circle cx="40" cy="55" r="2" fill={color} />
    <circle cx="45" cy="60" r="2" fill={color} />
    <circle cx="55" cy="45" r="2" fill={color} />
    <circle cx="60" cy="50" r="2" fill={color} />
  </svg>
);

export const ToothSettingsIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M85 40L80 35H70L65 30H55L50 25L45 30H35L30 35H20L15 40V60L20 65H30L35 70H45L50 75L55 70H65L70 65H80L85 60V40Z"
      stroke={color}
      strokeWidth="4"
      fill="none"
    />
    <path
      d="M60 40C60 50 55 60 45 65C35 60 30 50 30 40C30 35 35 30 40 28C35 35 35 45 40 50C45 55 55 55 60 50C65 45 65 35 60 28C65 30 70 35 70 40"
      stroke={color}
      strokeWidth="4"
      fill="none"
    />
  </svg>
);

export const ToothKeyIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M75 50C75 65 65 75 50 85C35 75 25 65 25 50C25 40 30 32 40 28C35 35 35 45 40 50C45 55 55 55 60 50C65 45 65 35 60 28C70 32 75 40 75 50Z"
      stroke={color}
      strokeWidth="4"
      fill="none"
    />
    <circle cx="20" cy="35" r="8" stroke={color} strokeWidth="4" fill="none" />
    <circle cx="20" cy="35" r="3" fill={color} />
    <path d="M28 35H45" stroke={color} strokeWidth="4" />
    <path d="M38 30V40" stroke={color} strokeWidth="3" />
    <path d="M42 32V38" stroke={color} strokeWidth="3" />
    <path d="M55 65V75" stroke={color} strokeWidth="3" />
    <path d="M45 65V75" stroke={color} strokeWidth="3" />
  </svg>
);

export const ToothCareIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M65 50C65 60 60 68 50 75C40 68 35 60 35 50C35 45 38 40 42 38C40 42 40 48 42 52C45 55 55 55 58 52C60 48 60 42 58 38C62 40 65 45 65 50Z"
      stroke={color}
      strokeWidth="4"
      fill="none"
    />
    <path
      d="M15 65C15 70 20 75 25 75C30 75 35 70 35 65C35 60 30 55 25 55C20 55 15 60 15 65Z"
      stroke={color}
      strokeWidth="4"
      fill="none"
    />
    <path
      d="M65 65C65 70 70 75 75 75C80 75 85 70 85 65C85 60 80 55 75 55C70 55 65 60 65 65Z"
      stroke={color}
      strokeWidth="4"
      fill="none"
    />
    <path d="M25 65L35 55" stroke={color} strokeWidth="4" />
    <path d="M65 55L75 65" stroke={color} strokeWidth="4" />
  </svg>
);