import localFont from "next/font/local";

export const geist = localFont({
  src: [
    {
      path: "../public/fonts/geist/Geist-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/geist/Geist-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/geist/Geist-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/geist/Geist-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geist",
  display: "swap",
});