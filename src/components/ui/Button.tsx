import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "destructive";
  size?: "sm" | "md";
};

export default function Button({ variant = "primary", size = "md", className, ...props }: Props) {
  const base = "btn";
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    destructive: "btn-destructive",
  } as const;
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
  } as const;
  return <button className={clsx(base, variants[variant], sizes[size], className)} {...props} />;
}