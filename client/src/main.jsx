import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Layout } from "./components/index.js";
import {
  ErrorPage,
  Home,
  PostDetails,
  Register,
  Login,
  UserProfile,
  Authors,
  CreatePosts,
  CategoryPosts,
  Dashboard,
  EditPosts,
  DeletePosts,
} from "./page/index.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthorPosts from "./page/author-posts/AuthorPosts.jsx";
import { SnackbarProvider } from "notistack";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "posts/:id", element: <PostDetails /> },
      { path: "register", element: <Register /> },
      { path: "Login", element: <Login /> },
      { path: "profile/:id", element: <UserProfile /> },
      { path: "authors", element: <Authors /> },
      { path: "create", element: <CreatePosts /> },
      { path: "posts/categories/:category", element: <CategoryPosts /> },
      { path: "posts/users/:id", element: <AuthorPosts /> },
      { path: "myposts/:id", element: <Dashboard /> },
      { path: "posts/:id/edit", element: <EditPosts /> },
      { path: "posts/:id/delete", element: <DeletePosts /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider autoHideDuration={2500}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
