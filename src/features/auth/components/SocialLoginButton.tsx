import { Button, ButtonProps } from "@/features/shared/components/Button";
import { FC } from "react";
import { clsx } from "clsx/lite";

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
      className={clsx(
        "flex justify-center items-center text-[14px]/[1.43] space-x-[10px]",
        className
      )}
      {...rest}
    />
  );
};
