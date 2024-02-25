import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../Styles/Global.css'
import Header from "@/Components/Header";
import 'react-toastify/dist/ReactToastify.css';
import { Flip, Slide, ToastContainer, Zoom } from 'react-toastify';
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Gen",
  description: "the online AI Image Generator",
}; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthProvider>
        <ToastContainer
          position="top-center"
          autoClose={4000}
          newestOnTop={true}
          transition={Flip}
          theme="dark"
          className="text-base capitalize tracking-wide"
          />
          <Header/>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
