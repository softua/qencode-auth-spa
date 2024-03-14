import { FC, PropsWithChildren } from "react";
import { clsx } from "clsx/lite";

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
  className,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={clsx(
        "text-[16px]/[1.3125] font-medium p-[13px] border-[1.2px] border-solid border-[#316fea] rounded-lg bg-[#316fea] text-white",
        colorsType === "secondary" &&
          "bg-transparent text-[#060E1E] border-[#d3d8dc]",
        isFullWidth && "w-full",
        isDisabled && "cursor-not-allowed",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
