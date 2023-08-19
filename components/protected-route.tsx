import { ReactNode } from "react";
import useAuthenticate from "../app/hooks/useAuthenticate";

interface ProtectedRouteProps {
  redirectLink?: string;
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectLink = "",
}) => {
  const { isLoadingUser } = useAuthenticate({
    redirectLink,
  });

  if (isLoadingUser) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
