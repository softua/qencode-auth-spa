import { FC, PropsWithChildren, useMemo } from "react";
import "./style.css";

export type ButtonProps = PropsWithChildren<{
  colorsType?: "primary" | "secondary";
  type?: "submit" | "reset" | "button";
  isDisabled?: boolean;
  isFullWidth?: boolean;
  className?: string;
  onClick?: () => void;
}>;

export const Button: FC<ButtonProps> = ({
  children,
  type,
  colorsType = "primary",
  isDisabled = false,
  isFullWidth,
  className: externalClassName,
  onClick,
}) => {
  const className = useMemo(() => {
    const value = ["button", colorsType];
    if (isDisabled) value.push("disabled");
    if (isFullWidth) value.push("big");
    if (externalClassName && externalClassName.length > 0) {
      value.push(externalClassName);
    }
    return value.join(" ");
  }, [colorsType, externalClassName, isDisabled, isFullWidth]);

  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};
