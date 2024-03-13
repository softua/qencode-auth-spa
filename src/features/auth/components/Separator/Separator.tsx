import { FC } from "react";
import "./style.css";

interface SeparatorProps {}

export const Separator: FC<SeparatorProps> = () => {
  return (
    <div className="separator">
      <hr style={{ width: "100%" }} />
      <span>OR</span>
      <hr style={{ width: "100%" }} />
    </div>
  );
};
