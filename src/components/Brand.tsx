import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" className="flex items-center gap-3 font-semibold" aria-label="Smartiflix home">
      <span className="text-lg font-semibold uppercase tracking-[0.12em] text-[#F6EFE2]">Smartiflix</span>
    </Link>
  );
}
