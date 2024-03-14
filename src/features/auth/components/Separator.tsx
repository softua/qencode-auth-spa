import { FC } from "react";

export const Separator: FC = () => {
  return (
    <div className="flex items-center my-[30px] mx-0">
      <hr className="w-full text-[#e3e6e9]" />
      <span className="my-0 mx-[5px] text-[12px]/[1.33] font-medium text-[#bec5cc]">
        OR
      </span>
      <hr className="w-full text-[#e3e6e9]" />
    </div>
  );
};
