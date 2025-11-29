import clsx from "clsx";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({ label, className, ...props }: Props) {
  return (
    <div>
      {label ? <label className="label">{label}</label> : null}
      <input className={clsx("input", className)} {...props} />
    </div>
  );
}