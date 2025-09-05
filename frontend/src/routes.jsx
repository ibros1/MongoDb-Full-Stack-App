import { createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/mainPage";

import HomePage from "./pages/homePage";
import RegisterPage from "./pages/auth/registerPage";
import Login from "./pages/auth/login";
import Dashboard from "./pages/Dashboard";
import PostDetail from "./pages/dashboard/post";

const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/posts/:postId",
        element: <PostDetail />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default mainRouter;
