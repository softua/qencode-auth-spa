import { Button, ButtonProps } from "@/features/shared/components/Button";
import { FC } from "react";
import "./style.css";

export type SocialLoginButtonProps = Pick<
  ButtonProps,
  "onClick" | "children" | "className"
>;

export const SocialLoginButton: FC<SocialLoginButtonProps> = ({
  className,
  ...rest
}) => {
  return (
    <Button
      type="button"
      colorsType="secondary"
      isFullWidth
      className={`social-login ${className}`}
      {...rest}
    />
  );
};
