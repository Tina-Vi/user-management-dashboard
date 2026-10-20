import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/mainPage.tsx";
import UsersPage from "./pages/usersPage.tsx";
import AddUsersPage from "./pages/addUsersPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "users/new",
        element: <AddUsersPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
