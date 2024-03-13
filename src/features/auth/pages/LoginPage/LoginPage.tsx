import { Button } from "@/features/shared/components/Button";
import Input from "../../../shared/components/Input";
import { useLoginForm } from "../../model/useLoginForm";
import { SocialLoginButton } from "../../components/SocialLoginButton";
import "./style.css";
import GoogleIcon from "@/assets/icons/google.svg?react";
import GithubIcon from "@/assets/icons/github.svg?react";
import { Separator } from "../../components/Separator";
import { NavLink } from "react-router-dom";
import useAuthStore from "../../model/useAuthStore";
import RequestStatus from "@/features/shared/data/entities/RequestStatus";

export const LoginPage: React.FC = () => {
  const { login, status, loginError } = useAuthStore();
  const {
    email,
    password,
    emailError,
    passwordError,
    isFormValid,
    onEmailChange,
    onPasswordChange,
    handleSubmit,
  } = useLoginForm({
    email: "",
    password: "",
    // These messages should be passed through i18n
    emailErrorMessage: "Please provide a correct email",
    passwordErrorMessage: "Password should be at least 8 characters long.",
    onSubmit: ({ email, password }) => login(email, password),
  });

  const isLoading = status === RequestStatus.processing;

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
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
        value={email}
        error={emailError}
        onChange={onEmailChange}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        error={passwordError}
        onChange={onPasswordChange}
      />
      <NavLink to="/forgot-password" className="link forgot-password-link">
        Forgot your password?
      </NavLink>
      <Button type="submit" isDisabled={!isFormValid || isLoading} isFullWidth>
        {isLoading ? "..." : "Log in to Qencode"}
      </Button>
      <div className="sign-up-container">
        <span>Is your company new to Qencode?</span>{" "}
        <NavLink className="link" to="/sign-up">
          Sign up
        </NavLink>
      </div>
      {loginError && <div className="error-message">{loginError}</div>}
    </form>
  );
};
