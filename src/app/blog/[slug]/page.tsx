import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { blogArticles, getBlogArticle } from "@/data/blog";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

function headingId(heading: string) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) return {};
  return {
    title: article.seoTitle ?? article.title,
    description: article.description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.seoTitle ?? article.title,
      description: article.description,
      url: absoluteUrl(`/blog/${article.slug}`),
      type: "article",
      images: [{ url: article.image, alt: article.imageAlt }],
    },
  };
}

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Organization", name: "Smartiflix" },
    publisher: { "@type": "Organization", name: "Smartiflix" },
    mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`),
    image: absoluteUrl(article.image),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: article.title, item: absoluteUrl(`/blog/${article.slug}`) },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <article className="bg-[#081412] py-16">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <div className="container">
        <nav className="text-sm text-[#9CAEA6]" aria-label="Breadcrumb"><Link className="hover:text-[#D6A756]" href="/">Home</Link> / <Link className="hover:text-[#D6A756]" href="/blog">Blog</Link> / <span>{article.title}</span></nav>
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,760px)_320px] lg:items-start">
          <div className="min-w-0">
            <p className="eyebrow break-words">{article.primaryKeyword}</p>
            <h1 className="display mt-4 break-words text-4xl leading-tight text-[#F6EFE2] md:text-6xl">{article.title}</h1>
            <p className="mt-5 break-words text-lg leading-8 text-[#9CAEA6]">{article.intro ?? article.description}</p>
            <p className="mt-5 text-sm text-[#B8C7C0]">Updated {article.date} · {article.readingTime}</p>
            <figure className="mt-10">
              <Image src={article.image} alt={article.imageAlt} width={1200} height={630} priority loading="eager" sizes="(min-width: 1024px) 760px, 100vw" className="aspect-[1200/630] w-full object-cover brightness-75" />
              <figcaption className="mt-3 text-sm text-[#9CAEA6]">{article.imageAlt}</figcaption>
            </figure>
            <nav aria-label="Article sections" className="mt-8 border-y border-[#314942] py-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#D6A756]">On this page</h2>
              <ul className="mt-4 grid gap-2 text-sm text-[#B8C7C0] sm:grid-cols-2">
                {article.sections.slice(0, 8).map((section, index) => <li key={`${section.heading}-${index}`}><a className="hover:text-[#D6A756]" href={`#${headingId(section.heading)}-${index}`}>{section.heading}</a></li>)}
              </ul>
            </nav>
            {article.contextualLinks && (
              <div className="mt-8 grid gap-3 border border-[#233B35] bg-[#10231F] p-5 text-sm leading-6 text-[#AFC0B8] md:grid-cols-2">
                {article.contextualLinks.map((item) => <p key={item.href}>{item.text} <Link className="font-semibold text-[#D6A756] underline" href={item.href}>{item.label}</Link>.</p>)}
              </div>
            )}
            {article.table && (
              <div className="mt-10 max-w-full overflow-x-auto">
                <table className="w-full table-fixed border-collapse text-left text-sm text-[#AFC0B8]">
                  <caption className="mb-3 text-left text-base font-semibold text-[#F6EFE2]">{article.table.caption}</caption>
                  <thead>
                    <tr>{article.table.headers.map((header) => <th key={header} scope="col" className="break-words border border-[#314942] bg-[#10231F] p-3 text-[#F6EFE2]">{header}</th>)}</tr>
                  </thead>
                  <tbody>
                    {article.table.rows.map((row) => <tr key={row.join("|")}>{row.map((cell) => <td key={cell} className="break-words border border-[#314942] p-3 align-top">{cell}</td>)}</tr>)}
                  </tbody>
                </table>
              </div>
            )}
            <div className="mt-10 space-y-10">
              {article.sections.map((section, index) => (
                <section key={`${section.heading}-${index}`} id={`${headingId(section.heading)}-${index}`} className="scroll-mt-28">
                  <h2 className="display text-3xl leading-tight text-[#F6EFE2]">{section.heading}</h2>
                  <div className="mt-4 space-y-4 leading-8 text-[#AFC0B8]">
                    {section.body.map((paragraph, paragraphIndex) => <p key={`${section.heading}-${paragraphIndex}`}>{paragraph}</p>)}
                  </div>
                  {article.sectionImages?.filter((image) => image.afterHeading === section.heading).map((image) => (
                    <figure key={image.src} className="mt-6">
                      <Image src={image.src} alt={image.alt} width={800} height={500} loading="lazy" sizes="(min-width: 1024px) 760px, 100vw" className="aspect-[8/5] w-full object-cover brightness-75" />
                      <figcaption className="mt-3 text-sm text-[#9CAEA6]">{image.caption}</figcaption>
                    </figure>
                  ))}
                </section>
              ))}
              {article.cta && (
                <section className="border border-[#314942] bg-[#10231F] p-6">
                  <h2 className="display text-3xl leading-tight text-[#F6EFE2]">Next Step</h2>
                  <p className="mt-4 leading-8 text-[#AFC0B8]">{article.cta.text}</p>
                  <Link href={article.cta.href} className="mt-4 inline-block font-semibold text-[#D6A756] underline">{article.cta.label}</Link>
                </section>
              )}
              <section>
                <h2 className="display text-3xl leading-tight text-[#F6EFE2]">Common Questions</h2>
                <div className="mt-4 divide-y divide-[#314942] border-y border-[#314942]">
                  {article.faqs.map((faq) => (
                    <div key={faq.q} className="py-5">
                      <h3 className="font-semibold text-[#F6EFE2]">{faq.q}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#9CAEA6]">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h2 className="display text-3xl leading-tight text-[#F6EFE2]">Sources</h2>
                <ul className="mt-4 space-y-2 text-sm text-[#9CAEA6]">
                  {article.sources.map((source) => <li key={source.url}><a className="text-[#D6A756] underline" href={source.url}>{source.label}</a></li>)}
                </ul>
              </section>
            </div>
          </div>
          <aside className="min-w-0 border border-[#233B35] bg-[#10231F] p-5 lg:sticky lg:top-28">
            <h2 className="font-semibold text-[#F6EFE2]">Related Smartiflix guides</h2>
            <div className="mt-4 divide-y divide-[#314942] border-y border-[#314942]">
              {article.related.map((relatedSlug) => {
                const related = getBlogArticle(relatedSlug);
                if (!related) return null;
                return <Link key={related.slug} href={`/blog/${related.slug}`} className="block py-4 text-sm font-semibold leading-6 text-[#D6A756] hover:text-[#F6EFE2]">{related.title}</Link>;
              })}
            </div>
            <Link href="/devices" className="mt-5 block text-sm font-semibold text-[#F6EFE2] hover:text-[#D6A756]">Smartiflix device guidance ↗</Link>
            <Link href="/pricing" className="mt-3 block text-sm font-semibold text-[#F6EFE2] hover:text-[#D6A756]">Smartiflix pricing ↗</Link>
          </aside>
        </div>
      </div>
    </article>
  );
}
