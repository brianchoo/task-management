import { ReactNode } from "react";

const Button: React.FC<{
  type?: "danger" | "default";
  children: ReactNode;
  onClick: () => void;
}> = ({ type = "default", children, ...props }) => {
  const buttonType: { [key: string]: string } = {
    danger: "bg-red-700 text-white hover:bg-red-600 hover:text-white",
    default: "bg-stone-700 text-white hover:bg-stone-600 hover:text-white",
  };
  return (
    <button
      className={`px-4 py-2 text-xs md:text-base rounded-md ml-3 ${buttonType[type]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
