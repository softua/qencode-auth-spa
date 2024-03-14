import { FC, PropsWithChildren } from "react";
import { clsx } from "clsx/lite";

interface PageTitleProps {
  className?: string;
}

export const PageTitle: FC<PropsWithChildren<PageTitleProps>> = ({
  children,
  className,
}) => (
  <h1 className={clsx("text-[30px]/[38px] font-bold", className)}>
    {children}
  </h1>
);
