import { redirect } from "next/navigation";
import { useCurrentUser } from "./api/useUserApi";

type AuthenticateOptions = {
  redirectLink?: string;
};

type AuthenticateResult = {
  isLoadingUser: boolean;
  currentUser?: any;
};

const useAuthenticate = ({
  redirectLink = "",
}: AuthenticateOptions): AuthenticateResult => {
  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser();

  if (!isLoadingUser && !currentUser?.me) redirect(redirectLink);

  return { isLoadingUser, currentUser };
};

export default useAuthenticate;
