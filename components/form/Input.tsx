import React, { InputHTMLAttributes } from "react";
import { Path, UseFormRegister, FieldErrorsImpl } from "react-hook-form";
import { CheckoutFormTypes } from "types";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<CheckoutFormTypes>;
  label: string;
  type: "text" | "number" | "email" | "date";
  placeholder: string;
  register: UseFormRegister<CheckoutFormTypes>;
  errors: Partial<
    FieldErrorsImpl<{
      firstName: string;
      lastName: string;
      email: string;
      cardNumber: number;
      expiryDate: string;
      CVVNumber: number;
    }>
  >;
}

export const Input = ({
  name,
  label,
  type,
  placeholder,
  register,
  errors,
}: InputProps) => {
  const errorMsg: string | undefined = errors?.[name]?.message;
  const hasError = Boolean(errors && errorMsg);

  return (
    <div className="w-full px-3 mb-6 md:mb-0">
      <label
        htmlFor={name}
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...(register && register(name))}
        name={name}
        className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
          errorMsg && "border-red-500"
        }`}
      />
      {hasError && <p className="text-red-500 text-xs italic">{errorMsg}</p>}
    </div>
  );
};