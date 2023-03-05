import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import store from "@/store/store";
import "@/styles/globals.css";

import NavbarLayout from "../components/layouts/NavbarLayout";
import PropertyCtxProvider from "@/context/create-property.ctx";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PropertyCtxProvider>
        <NavbarLayout>
          <Component {...pageProps} />
        </NavbarLayout>
      </PropertyCtxProvider>
    </Provider>
  );
}
