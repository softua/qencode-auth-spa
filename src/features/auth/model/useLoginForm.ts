import { FormEvent, useCallback, useState } from "react";

interface IForm {
  email: string;
  password: string;
}

type IInitial = IForm & {
  emailErrorMessage: string;
  passwordErrorMessage: string;
  onSubmit?: (form: IForm) => void;
};

const EMAIL_PATTERN = RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

export default function useLoginForm(initial: IInitial) {
  const [email, setEmail] = useState(initial.email);
  const [password, setPassword] = useState(initial.password);
  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const isFormValid = Boolean(emailError && passwordError);

  const onEmailChange = useCallback(
    (value: IForm["email"]) => {
      const isValid = EMAIL_PATTERN.test(value);
      setEmail(value);
      setEmailError(isValid ? undefined : initial.emailErrorMessage);
    },
    [initial.emailErrorMessage]
  );

  const onPasswordChange = (value: IForm["password"]) => {
    const isValid = value.length >= 8;
    setPassword(value);
    setPasswordError(isValid ? undefined : initial.passwordErrorMessage);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !initial.onSubmit) return;
    initial.onSubmit({ email, password });
  };

  return {
    email,
    password,
    onEmailChange,
    onPasswordChange,
    emailError,
    passwordError,
    isFormValid,
    handleSubmit,
  };
}
