import { AuthProvider } from "@/context/AuthContext";
import "@/app/globals.css";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

// export const metadata = {
//   title: {
//     template: "%s / داشبورد گالری تژاو",
//     default: "خوش‌آمدید / داشبورد گالری تژاو",
//   },
//   description: "داشبورد مدیریت ادمین وبسایت گالری تژاو ",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${josefin.className} antialiased mx-auto max-w-7xl`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
