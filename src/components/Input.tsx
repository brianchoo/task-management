import { forwardRef } from "react";

interface InputProps {
  label: string;
  textarea?: boolean;
  type?: string;
  min?: string;
}

const Input = forwardRef<HTMLTextAreaElement | HTMLInputElement, InputProps>(
  function Input({ label, textarea = false, ...props }, ref) {
    const classes =
      "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";

    return (
      <div className="flex flex-col gap-1 my-4">
        <label className="text-sm font-bold uppercase text-stone-500">
          {label}
        </label>
        {textarea ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={classes}
            {...props}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className={classes}
            {...props}
          />
        )}
      </div>
    );
  }
);

export default Input;
