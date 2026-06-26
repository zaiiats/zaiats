"use client";

type ButtonStyleType = "main" | "secondary";

interface ButtonProps {
  text: string;
  style?: ButtonStyleType;
  onClick?: () => void;
}

function Button({ text, style = "main", onClick }: ButtonProps) {
  const baseClasses =
    "font-eurostyle text-base px-6 py-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out border-none";

  const variantClasses = {
    main: "bg-(--accent-color) text-white shadow-[0_0_13px_var(--accent-color)] hover:bg-(--accent-color-high) hover:shadow-[0_0_17px_var(--accent-color-high)]",
    secondary: "",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[style]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
