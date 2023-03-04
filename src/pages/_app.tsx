import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavbarLayout from "../components/layouts/NavbarLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NavbarLayout>
      <Component {...pageProps} />
    </NavbarLayout>
  );
}
