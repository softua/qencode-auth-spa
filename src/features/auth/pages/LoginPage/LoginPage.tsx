import { Input } from "../../../shared/components/Input";
import useLoginForm from "../../model/useLoginForm";

export const LoginPage: React.FC = () => {
  const {
    email,
    password,
    onEmailChange,
    onPasswordChange,
    emailError,
    passwordError,
    handleSubmit,
  } = useLoginForm({
    email: "",
    password: "",
    // These messages should be passed through i18n
    emailErrorMessage: "Please provide a correct email",
    passwordErrorMessage: "Password should be at least 8 characters long.",
  });

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="title mb-10">Log in to your account</h1>
      <div className="social-login-buttons flex"></div>
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
    </form>
  );
};
