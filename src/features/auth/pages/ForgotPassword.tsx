import { Button } from "@/features/shared/components/Button";
import { Input } from "@/features/shared/components/Input";
import { FC } from "react";
import { useAuthStore } from "../model/useAuthStore";
import { useForgotPasswordForm } from "../model/useForgotPasswordForm";
import RequestStatus from "@/features/shared/data/entities/RequestStatus";
import { PageTitle } from "@/features/shared/components/PageTitle";

export const ForgotPassword: FC = () => {
  const authStore = useAuthStore();
  const form = useForgotPasswordForm({
    email: "",
    // These messages should be passed through i18n
    emailErrorMessage: "Please provide a correct email",
    onSubmit: ({ email }) =>
      authStore.passwordReset(email, `${location.origin}/set-password`),
  });

  const isLoading = authStore.resetPasswordStatus === RequestStatus.processing;

  if (authStore.resetPasswordStatus === RequestStatus.success) {
    return (
      <PageTitle className="mb-10 text-center">
        Email sent! Please follow instructions to change your password
      </PageTitle>
    );
  }

  return (
    <form
      className="flex flex-col"
      onSubmit={form.handleSubmit}
      onReset={() => {
        history.back();
      }}
    >
      <PageTitle className="mb-10 text-center">Forgot Password?</PageTitle>
      <Input
        type="email"
        placeholder="Enter your email"
        value={form.email}
        error={form.emailError}
        onChange={form.onEmailChange}
      />
      <Button
        type="submit"
        isDisabled={!form.isFormValid || isLoading}
        isFullWidth
      >
        {isLoading ? "..." : "Send"}
      </Button>
      <Button type="reset" colorsType="secondary" isFullWidth className="mt-5">
        Cancel
      </Button>
      {authStore.resetPasswordError && (
        <div className="error-message">{authStore.resetPasswordError}</div>
      )}
    </form>
  );
};
