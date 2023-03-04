import store from "@/store/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import NavbarLayout from "../components/layouts/NavbarLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NavbarLayout>
        <Component {...pageProps} />
      </NavbarLayout>
    </Provider>
  );
}
