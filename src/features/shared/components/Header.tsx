import { FC } from "react";
import logo from "@/assets/icons/logo.svg";

export const Header: FC = () => (
  <header className="flex justify-center mb-20">
    <a href="https://cloud.qencode.com/" target="_blank">
      <img src={logo} className="logo" alt="Qencode logo" />
    </a>
  </header>
);
