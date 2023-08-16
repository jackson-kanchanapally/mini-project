"use client";
//import { Comfortaa  } from 'next/font/google'
import { Poppins } from "next/font/google";
import React,{useEffect} from 'react'
const inter = Poppins({ subsets: ["latin"], weight: "400" });
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import { ResumeContextProvider } from "./context/ResumeContext";


// export const metadata = {
//   title: "CareerUp",
//   description: "Generated by create next app",
// };
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.300",
        color: "gray.800",
      },
    },
  },
});
export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <body className={inter.className}>
        <CacheProvider>
          <ChakraProvider theme={theme}>
            <AuthContextProvider>
              <ResumeContextProvider>
              <Navbar/>
              {children}
              </ResumeContextProvider>
            </AuthContextProvider>
          </ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
