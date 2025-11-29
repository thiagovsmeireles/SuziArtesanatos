import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  variant?: "success" | "muted";
};

export default function Badge({ children, variant = "muted" }: Props) {
  const variants = {
    success: "badge badge-success",
    muted: "badge badge-muted",
  } as const;
  return <span className={clsx(variants[variant])}>{children}</span>;
}