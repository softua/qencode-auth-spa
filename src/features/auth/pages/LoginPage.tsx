import { Button } from "@/features/shared/components/Button";
import { Input } from "../../shared/components/Input";
import { useLoginForm } from "../model/useLoginForm";
import { SocialLoginButton } from "../components/SocialLoginButton";
import GoogleIcon from "@/assets/icons/google.svg?react";
import GithubIcon from "@/assets/icons/github.svg?react";
import { Separator } from "../components/Separator";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../model/useAuthStore";
import RequestStatus from "@/features/shared/data/entities/RequestStatus";
import { FC, useEffect } from "react";
import { isPrivateRouteState } from "../hoc/AuthRequired";
import { PageTitle } from "@/features/shared/components/PageTitle";

export const LoginPage: FC = () => {
  const store = useAuthStore();
  const { state } = useLocation();
  const navigate = useNavigate();
  const form = useLoginForm({
    email: "",
    password: "",
    // These messages should be passed through i18n
    emailErrorMessage: "Please provide a correct email",
    passwordErrorMessage: "Password should be at least 8 characters long.",
    onSubmit: ({ email, password }) => store.login(email, password),
  });

  const isLoading = store.status === RequestStatus.processing;

  useEffect(() => {
    if (!store.isAuthorized) return;
    const redirectPath =
      isPrivateRouteState(state) && state.privateRoute
        ? state.privateRoute
        : "/";

    navigate(redirectPath, { replace: true });
  }, [navigate, state, store.isAuthorized]);

  return (
    <form className="flex flex-col" onSubmit={form.handleSubmit}>
      <PageTitle className="mb-10 text-center">
        Log in to your account
      </PageTitle>
      <div className="flex flex-col sm:flex-row">
        <SocialLoginButton className="mb-4 sm:mb-0 sm:mr-4">
          <GoogleIcon />
          <span>Google</span>
        </SocialLoginButton>
        <SocialLoginButton>
          <GithubIcon />
          <span>Github</span>
        </SocialLoginButton>
      </div>
      <Separator />
      <Input
        type="email"
        placeholder="Work email"
        value={form.email}
        error={form.emailError}
        onChange={form.onEmailChange}
      />
      <Input
        type="password"
        placeholder="Password"
        value={form.password}
        error={form.passwordError}
        onChange={form.onPasswordChange}
      />
      <NavLink to="/forgot-password" className="link self-end mb-[30px]">
        Forgot your password?
      </NavLink>
      <Button
        type="submit"
        isDisabled={!form.isFormValid || isLoading}
        isFullWidth
      >
        {isLoading ? "..." : "Log in to Qencode"}
      </Button>
      <div className="mt-5 text-center">
        <span>Is your company new to Qencode?</span>{" "}
        <NavLink className="link" to="/sign-up">
          Sign up
        </NavLink>
      </div>
      {store.loginError && (
        <div className="text-red-600 text-[20px] font-semibold mt-5">
          {store.loginError}
        </div>
      )}
    </form>
  );
};
