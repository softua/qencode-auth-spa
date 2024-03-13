import { ChangeEvent, FC, useId, useMemo, useState } from "react";
import "./style.css";
import EyeIcon from "@/assets/icons/eye.svg?react";

interface IProps {
  type: "email" | "password";
  name?: string;
  value?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
}

export const Input: FC<IProps> = ({
  name,
  value,
  placeholder,
  label,
  error,
  type,
  onChange,
}) => {
  const isEyeIconShown = type === "password";
  const hasError = Boolean(error && error?.length > 0);
  const [currentType, setCurrentType] = useState(type);
  const id = useId();
  const containerClasses = useMemo(() => {
    const value = ["input-container"];
    if (hasError) value.push("error");
    return value.join(" ");
  }, [hasError]);

  const handleEyeIconClick = () => {
    if (currentType === "password") {
      return setCurrentType("email");
    }

    setCurrentType(type);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={containerClasses}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className="input-wrapper">
        <input
          id={id}
          name={name}
          type={currentType}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
        {isEyeIconShown && <EyeIcon onClick={handleEyeIconClick} />}
      </div>
      {hasError && <div className="error">{error}</div>}
    </div>
  );
};
