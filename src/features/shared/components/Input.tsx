import { ChangeEvent, FC, useId, useState } from "react";
import { clsx } from "clsx/lite";
import EyeIcon from "@/assets/icons/eye.svg?react";

interface InputProps {
  type: "email" | "password";
  name?: string;
  value?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
}

export const Input: FC<InputProps> = ({
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
    <div className="flex flex-col items-stretch relative mb-6 text-[15px]/[20px] font-normal">
      {label && (
        <label htmlFor={id} className="text-left font-medium mb-2">
          {label}
        </label>
      )}
      <div
        className={clsx(
          "flex border-[1.2px] border-solid border-[#d3d8dc] rounded-md text-[#060e1e] py-[14px] px-3 transition-colors duration-300",
          hasError && "border-red-600"
        )}
      >
        <input
          className="border-none grow focus-visible:outline-none placeholder:text-[#a1abb5]"
          id={id}
          name={name}
          type={currentType}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
        {isEyeIconShown && (
          <EyeIcon onClick={handleEyeIconClick} className="ml-4" />
        )}
      </div>
      {hasError && (
        <div className="absolute -bottom-5 left-0 right-0 text-left text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};
