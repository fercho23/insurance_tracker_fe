import './globals.css';
import  "bootstrap/dist/css/bootstrap.min.css"

import MainHeader from '@/components/main-header/main-header'
import BootstrapClient from "@/components/BootstrapClient";

export const metadata = {
  title: 'Insurance Tracker',
  description: 'We help you obtain data on health insurance.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BootstrapClient />
        <MainHeader />
        <div className="container mt-2">
          {children}
        </div>
      </body>
    </html>
  );
}
