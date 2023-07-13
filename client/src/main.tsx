import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux/es/exports";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "@/state/api";

/**
 * Create a Redux store using configureStore, specifying the root reducer and extending the middleware stack to include additional middleware related to API handling
 */
export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);
ReactDOM.createRoot(document.getElementById("root")!).render(
  // Provider component is a part of the react-redux library and allows the Redux store to be accessible by all components in the application. The store prop is passed to the Provider component, which refers to the Redux store created earlier using configureStore
  <Provider store={store}>
    <App />
  </Provider>
);
