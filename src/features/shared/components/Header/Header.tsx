import "./style.css";
import logo from "@/assets/icons/logo.svg";

export const Header = () => (
  <header className="header">
    <a href="https://cloud.qencode.com/" target="_blank">
      <img src={logo} className="logo" alt="Qencode logo" />
    </a>
  </header>
);
