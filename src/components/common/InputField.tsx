import { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  errorMessage?: string;
};

const InputField = ({ errorMessage, className, ...props }: InputFieldProps) => {
  const hasError = !!errorMessage;

  return (
    <div className="relative flex w-full flex-col gap-1">
      <input
        {...props}
        className={cn(
          "text-caption2-m md:text-body2-m placeholder:text-gray-60 placeholder:text-caption2-m md:placeholder:text-body2-m text-gray-90 w-full border-b pb-1 transition-colors outline-none",
          className,
        )}
      />
      {hasError && (
        <p className="text-caption2-m md:text-body2-m text-point-1 absolute top-full mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;
