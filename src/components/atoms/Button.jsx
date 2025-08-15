import { Button as MaterialButton } from "@material-tailwind/react";

export default function Button({ children, className = "", ...props }) {
  return (
    <MaterialButton
      variant="filled"
      className={`flex items-center gap-1 text-white rounded-lg bg-primary  ${className}`}
      size="md"
      {...props}
    >
      {children}
    </MaterialButton>
  );
}
