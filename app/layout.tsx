import { ReactNode } from "react";
import { Metadata } from "next";
import "./frontend/styles/variables.css";
import "./frontend/styles/global.css";
import NavBar from "./frontend/components/navbar/page";
import Footer from "./frontend/components/footer/page";
import {LocationProvider} from "./frontend/Context/LocationContext";

export const metadata: Metadata = {
  title: "ClimaSmart",
  description: "Aplicação de Meteorologia inteligente com sugestões de roupas e alertas",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="pt">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <LocationProvider>
        <NavBar />
        <main>
          {children}
        </main>
        <Footer />
        </LocationProvider>
      </body>
    </html>
  );
}

export default RootLayout;