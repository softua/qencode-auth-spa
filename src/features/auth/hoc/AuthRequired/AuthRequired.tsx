import { PropsWithChildren, ReactNode } from "react";
import { useAuthStore } from "../../model/useAuthStore";
import { Navigate, useLocation } from "react-router-dom";

export function AuthRequired({ children }: PropsWithChildren): ReactNode {
  const isAuthorized = useAuthStore((state) => state.isAuthorized);
  const { pathname, search } = useLocation();

  if (!isAuthorized)
    return <Navigate to="/login" state={{ privateRoute: pathname + search }} />;
  return children;
}
