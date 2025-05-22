import { Button } from "@material-tailwind/react";

export default function MyButton({ children, className = "", ...props }) {
  return (
    <Button
      variant="filled"
      className={`flex items-center gap-1 text-white rounded-lg bg-primary  ${className}`}
      size="md"
      {...props}
    >
      {children}
    </Button>
  );
}
