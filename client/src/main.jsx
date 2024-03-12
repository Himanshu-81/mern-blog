import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Layout, AuthLayout } from "./components/index.js";
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
import { UserProvider } from "./context/userContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "posts/:id",
        element: (
          <AuthLayout authentication={false}>
            <PostDetails />
          </AuthLayout>
        ),
      },
      {
        path: "register",
        element: (
          <AuthLayout authentication={false}>
            <Register />
          </AuthLayout>
        ),
      },
      {
        path: "Login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },

      {
        path: "profile/:id",
        element: (
          <AuthLayout authentication>
            <UserProfile />
          </AuthLayout>
        ),
      },
      {
        path: "authors",
        element: (
          <AuthLayout authentication={false}>
            <Authors />
          </AuthLayout>
        ),
      },
      {
        path: "create",
        element: (
          <AuthLayout authentication>
            <CreatePosts />
          </AuthLayout>
        ),
      },
      {
        path: "posts/categories/:category",
        element: (
          <AuthLayout authentication={false}>
            <CategoryPosts />/
          </AuthLayout>
        ),
      },
      {
        path: "posts/users/:id",
        element: (
          <AuthLayout authentication={false}>
            <AuthorPosts />
          </AuthLayout>
        ),
      },
      {
        path: "myposts/:id",
        element: (
          <AuthLayout authentication>
            <Dashboard />{" "}
          </AuthLayout>
        ),
      },
      {
        path: "posts/:id/edit",
        element: (
          <AuthLayout authentication>
            <EditPosts />
          </AuthLayout>
        ),
      },
      {
        path: "posts/:id/delete",
        element: (
          <AuthLayout authentication>
            <DeletePosts />
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <SnackbarProvider autoHideDuration={2500}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </SnackbarProvider>
    </UserProvider>
  </React.StrictMode>
);
