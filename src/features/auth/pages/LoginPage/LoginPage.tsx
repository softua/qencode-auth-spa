import { Button } from "@/features/shared/components/Button";
import Input from "../../../shared/components/Input";
import { useLoginForm } from "../../model/useLoginForm";
import { SocialLoginButton } from "../../components/SocialLoginButton";
import "./style.css";
import GoogleIcon from "@/assets/icons/google.svg?react";
import GithubIcon from "@/assets/icons/github.svg?react";
import { Separator } from "../../components/Separator";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../model/useAuthStore";
import RequestStatus from "@/features/shared/data/entities/RequestStatus";
import { useEffect } from "react";
import { isPrivateRouteState } from "../../hoc/AuthRequired";

export const LoginPage: React.FC = () => {
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
      <h1 className="title mb-10 text-center">Log in to your account</h1>
      <div className="social-login-buttons flex-col sm:flex-row">
        <SocialLoginButton className="mb-4 sm:mb-0 sm:mr-4">
          <GoogleIcon />
          Google
        </SocialLoginButton>
        <SocialLoginButton>
          <GithubIcon />
          Github
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
      <NavLink to="/forgot-password" className="link forgot-password-link">
        Forgot your password?
      </NavLink>
      <Button
        type="submit"
        isDisabled={!form.isFormValid || isLoading}
        isFullWidth
      >
        {isLoading ? "..." : "Log in to Qencode"}
      </Button>
      <div className="sign-up-container">
        <span>Is your company new to Qencode?</span>{" "}
        <NavLink className="link" to="/sign-up">
          Sign up
        </NavLink>
      </div>
      {store.loginError && (
        <div className="error-message">{store.loginError}</div>
      )}
    </form>
  );
};
