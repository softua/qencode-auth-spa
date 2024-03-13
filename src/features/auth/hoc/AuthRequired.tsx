import { PropsWithChildren, ReactNode } from "react";
import useAuthStore from "../model/useAuthStore";
import { Navigate } from "react-router-dom";

export function AuthRequired({ children }: PropsWithChildren): ReactNode {
  const isAuthorized = useAuthStore((state) => state.isAuthorized);

  if (!isAuthorized) return <Navigate to="/login" />;
  return children;
}
