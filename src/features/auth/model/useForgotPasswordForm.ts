import { FormEvent, useCallback, useState } from "react";

interface IForm {
  email: string;
}

type IInitial = IForm & {
  emailErrorMessage: string;
  onSubmit?: (form: IForm) => void;
};

const EMAIL_PATTERN = RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

export function useForgotPasswordForm(initial: IInitial) {
  const [email, setEmail] = useState(initial.email);
  const [emailError, setEmailError] = useState<string>();
  const isFormValid = Boolean(!emailError);

  const onEmailChange = useCallback(
    (value: IForm["email"]) => {
      const isValid = EMAIL_PATTERN.test(value);
      setEmail(value);
      setEmailError(isValid ? undefined : initial.emailErrorMessage);
    },
    [initial.emailErrorMessage]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !initial.onSubmit) return;
    initial.onSubmit({ email });
  };

  return {
    email,
    emailError,
    isFormValid,
    onEmailChange,
    handleSubmit,
  };
}
