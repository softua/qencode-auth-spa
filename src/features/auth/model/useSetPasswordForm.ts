import { FormEvent, useState } from "react";

interface IForm {
  password: string;
  passwordConfirm: string;
}

type IInitial = IForm & {
  passwordErrorMessage: string;
  passwordConfirmErrorMessage: string;
  onSubmit?: (form: IForm) => void;
};

export function useSetPasswordForm(initial: IInitial) {
  const [password, setPassword] = useState(initial.password);
  const [passwordConfirm, setPasswordConfirm] = useState(
    initial.passwordConfirm
  );
  const [passwordError, setPasswordError] = useState<string>();
  const [passwordConfirmError, setPasswordConfirmError] = useState<string>();
  const isFormValid = Boolean(!passwordError && !passwordConfirmError);

  const onPasswordChange = (value: IForm["password"]) => {
    const isValid = value.length >= 8;
    setPassword(value);
    setPasswordError(isValid ? undefined : initial.passwordErrorMessage);
  };

  const onPasswordConfirmChange = (value: IForm["passwordConfirm"]) => {
    const isValid = value === password;
    setPasswordConfirm(value);
    setPasswordConfirmError(
      isValid ? undefined : initial.passwordConfirmErrorMessage
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !initial.onSubmit) return;
    initial.onSubmit({ password, passwordConfirm });
  };

  return {
    password,
    passwordError,
    passwordConfirm,
    passwordConfirmError,
    isFormValid,
    onPasswordChange,
    onPasswordConfirmChange,
    handleSubmit,
  };
}
