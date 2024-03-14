import { Button } from "@/features/shared/components/Button";
import { Input } from "@/features/shared/components/Input";
import { FC, useEffect, useRef } from "react";
import { useSetPasswordForm } from "../model/useSetPasswordForm";
import { useAuthStore } from "../model/useAuthStore";
import RequestStatus from "@/features/shared/data/entities/RequestStatus";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageTitle } from "@/features/shared/components/PageTitle";

export const SetPassword: FC = () => {
  const store = useAuthStore();
  const [searchParams] = useSearchParams();
  const form = useSetPasswordForm({
    password: "",
    passwordConfirm: "",
    passwordErrorMessage: "Password should be at least 8 characters long.",
    passwordConfirmErrorMessage: "Both passwords should match",
    onSubmit: ({ password, passwordConfirm }) =>
      store.passwordSet(
        searchParams.get("token") ?? "",
        searchParams.get("secret") ?? "",
        password,
        passwordConfirm
      ),
  });

  const navigate = useNavigate();
  const isLoading = store.setPasswordStatus === RequestStatus.processing;

  useEffect(() => {
    if (store.setPasswordStatus !== RequestStatus.success) return;
    navigate("/login", { replace: true });
  }, [navigate, store.setPasswordStatus]);

  const invalidSearchParamsRef = useRef(
    !searchParams.has("token") || !searchParams.has("secret")
  );

  if (invalidSearchParamsRef.current) {
    return (
      <PageTitle className="mb-10 text-center">
        Wrong link. Please check your email
      </PageTitle>
    );
  }

  return (
    <form className="flex flex-col" onSubmit={form.handleSubmit}>
      <PageTitle className="mb-10 text-center">Create new Password?</PageTitle>
      <Input
        type="password"
        name="password"
        placeholder="Password"
        label="Password"
        value={form.password}
        error={form.passwordError}
        onChange={form.onPasswordChange}
      />
      <Input
        type="password"
        name="passwordConfirm"
        placeholder="Password"
        label="Confirm Password"
        value={form.passwordConfirm}
        error={form.passwordConfirmError}
        onChange={form.onPasswordConfirmChange}
      />
      <Button
        type="submit"
        isDisabled={!form.isFormValid || isLoading}
        isFullWidth
      >
        {isLoading ? "..." : "Reset Password"}
      </Button>
      {store.setPasswordError && (
        <div className="error-message">{store.setPasswordError}</div>
      )}
    </form>
  );
};
