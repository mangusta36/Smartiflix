"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="section bg-[#F6EFE2] text-[#081412]">
      <div className="container max-w-2xl">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-4 text-4xl font-semibold">This page could not be displayed.</h1>
        <p className="mt-4 leading-7 text-[#454B46]">Try loading the page again. If the problem continues, use the support page to contact Smartiflix with the route and device you were using.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="min-h-11 rounded-sm bg-[#D6A756] px-5 py-2.5 text-sm font-semibold text-[#081412] hover:bg-[#E2B96E]">Try again</button>
          <a href="/support" className="inline-flex min-h-11 items-center font-semibold text-[#174C3C] underline underline-offset-4">Open support</a>
        </div>
      </div>
    </section>
  );
}
