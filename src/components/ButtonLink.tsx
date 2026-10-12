import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "plain";
};

export function ButtonLink({ href, children, variant = "primary", className = "", ...props }: Props) {
  const styles = {
    primary: "bg-[#D6A756] text-[#081412] hover:bg-[#E2B96E]",
    secondary: "border border-[#385149] bg-[#F6EFE2] text-[#081412] hover:border-[#D6A756]",
    plain: "text-[#D6A756] underline underline-offset-4 hover:text-[#F6EFE2]",
  };
  const classes = variant === "plain" ? styles.plain : `inline-flex min-h-10 items-center justify-center rounded-sm px-5 py-2.5 text-sm font-semibold transition ${styles[variant]}`;
  if (href.startsWith("http")) {
    return <a href={href} className={`${classes} ${className}`} {...props}>{children}</a>;
  }
  return <Link href={href} className={`${classes} ${className}`} {...props}>{children}</Link>;
}
