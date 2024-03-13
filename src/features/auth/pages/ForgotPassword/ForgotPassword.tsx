import { Button } from "@/features/shared/components/Button";
import Input from "@/features/shared/components/Input";
import { FC } from "react";
import { useAuthStore } from "../../model/useAuthStore";
import { useForgotPasswordForm } from "../../model/useForgotPasswordForm";
import RequestStatus from "@/features/shared/data/entities/RequestStatus";

interface ForgotPasswordProps {}

export const ForgotPassword: FC<ForgotPasswordProps> = () => {
  const { resetPasswordStatus, resetPasswordError, passwordReset } =
    useAuthStore();

  const { email, emailError, isFormValid, onEmailChange, handleSubmit } =
    useForgotPasswordForm({
      email: "",
      // These messages should be passed through i18n
      emailErrorMessage: "Please provide a correct email",
      onSubmit: ({ email }) => passwordReset(email),
    });

  const isLoading = resetPasswordStatus == RequestStatus.processing;

  if (resetPasswordStatus === RequestStatus.success) {
    return (
      <h1 className="title mb-10 text-center">
        Email sent! Please follow instructions to change your password
      </h1>
    );
  }

  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit}
      onReset={() => {
        history.back();
      }}
    >
      <h1 className="title mb-10 text-center">Forgot Password?</h1>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        error={emailError}
        onChange={onEmailChange}
      />
      <Button type="submit" isDisabled={!isFormValid || isLoading} isFullWidth>
        {isLoading ? "..." : "Send"}
      </Button>
      <Button type="reset" colorsType="secondary" isFullWidth className="mt-5">
        Cancel
      </Button>
      {resetPasswordError && (
        <div className="error-message">{resetPasswordError}</div>
      )}
    </form>
  );
};
