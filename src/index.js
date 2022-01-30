import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./i18n";
import App from "app/App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { getChainOptions, WalletProvider } from "@terra-money/wallet-provider";
import { store } from "app/store";

getChainOptions().then((chainOptions) => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <WalletProvider {...chainOptions}>
            <App />
          </WalletProvider>
        </React.StrictMode>
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
