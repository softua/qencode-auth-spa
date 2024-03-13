import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AuthRequired } from "../features/auth/hoc/AuthRequired/AuthRequired";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { HomePage } from "../features/home/pages/HomePage";
import { ReactElement, useEffect } from "react";
import { useAuthStore } from "../features/auth/model/useAuthStore";
import RequestStatus from "../features/shared/data/entities/RequestStatus";
import { Header } from "../features/shared/components/Header";
import { ForgotPassword } from "@/features/auth/pages/ForgotPassword";
import { SetPassword } from "@/features/auth/pages/SetPassword";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route
      path="/"
      element={
        <AuthRequired>
          <HomePage />
        </AuthRequired>
      }
    />,
    <Route path="/login" element={<LoginPage />} />,
    <Route path="/forgot-password" element={<ForgotPassword />} />,
    <Route path="/set-password" element={<SetPassword />} />,
    <Route path="*" element={<div>NOT FOUND</div>} />,
  ])
);

function App(): ReactElement {
  const { checkAuth, checkAuthstatus } = useAuthStore();
  const isLoading =
    checkAuthstatus === RequestStatus.initial ||
    checkAuthstatus == RequestStatus.processing;

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Header />
      {isLoading && <h1 className="title">Loading...</h1>}
      {!isLoading && <RouterProvider router={router} />}
    </>
  );
}

export default App;
