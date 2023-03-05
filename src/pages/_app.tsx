import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { Toaster } from "react-hot-toast";

import store from "@/store/store";
import "@/styles/globals.css";

import NavbarLayout from "../components/layouts/NavbarLayout";
import PropertyCtxProvider from "@/context/create-property.ctx";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PropertyCtxProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
        <NavbarLayout>
          <Component {...pageProps} />
        </NavbarLayout>
      </PropertyCtxProvider>
    </Provider>
  );
}
