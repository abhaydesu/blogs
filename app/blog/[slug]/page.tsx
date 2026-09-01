import { getSingleBlog, getBlogFrontMatterBySlug, getAllSlugs } from "@/utils/mdx";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const frontmatter = await getBlogFrontMatterBySlug(slug);

  if (!frontmatter) {
    return {
      title: "Blog not found",
    };
  }

  const url = `https://blog.abhaydesu.dev/blog/${slug}`;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    authors: [{ name: "Abhay Singh", url: "https://abhaydesu.dev" }],
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url,
      type: "article",
      publishedTime: frontmatter.date,
      authors: ["Abhay Singh"],
      images: frontmatter.image ? [
        {
          url: frontmatter.image,
          width: 896,
          height: 384,
          alt: frontmatter.title,
        },
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      images: frontmatter.image ? [frontmatter.image] : [],
    },
    alternates: {
      canonical: url,
    },
    other: {
      "citation_author": "Abhay Singh",
      "citation_date": frontmatter.date,
    }
  };
}

export default async function SingleBlogPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getSingleBlog(slug);

  if (!blog) {
    notFound();
  }

  const { content, frontmatter } = blog;
  const url = `https://blog.abhaydesu.dev/blog/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    image: frontmatter.image ? [frontmatter.image] : [],
    datePublished: frontmatter.date,
    author: {
      "@type": "Person",
      name: "Abhay Singh",
      url: "https://abhaydesu.dev"
    },
    publisher: {
      "@type": "Person",
      name: "Abhay Singh",
      url: "https://abhaydesu.dev"
    },
    url: url
  };

  return (
    <article className="min-h-screen max-w-4xl w-full mx-auto flex flex-col items-start justify-start nunito pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="w-full px-4 sm:px-8 md:px-8 pt-8 pb-4">
        <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-800 transition-colors">
          ← All posts
        </Link>
      </div>

      <div className="px-4 sm:px-8 md:px-8 md:pb-10 w-full">
        <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{frontmatter.title}</h1>
            {frontmatter.date && (
                <time dateTime={frontmatter.date} className="text-sm text-neutral-500">
                    {new Date(frontmatter.date).toLocaleDateString('en-us', {
                        weekday:"long", year:"numeric", month:"long", day:"numeric"
                    })}
                </time>
            )}
        </header>

        {frontmatter.image && (
          <div className="mx-auto mb-10 max-w-2xl w-full overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src={frontmatter.image}
              alt={frontmatter.title}
              width={896}
              height={384}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 896px"
              className="rounded-2xl object-cover mx-auto w-full h-auto block"
              style={{
                maxHeight: "60vh",
              }}
            />
          </div>
        )}

        <div className="prose prose-img prose-sm sm:prose md:prose-lg max-w-none mx-auto">
          {content}
        </div>
      </div>
    </article>
  );
}
