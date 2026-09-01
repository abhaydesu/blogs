import { Metadata } from "next";
import { getBlogs } from "@/utils/mdx";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog | Abhay Singh",
  description: "All my wisdom and shenanigans documented.",
  openGraph: {
    title: "Blog | Abhay Singh",
    description: "All my wisdom and shenanigans documented.",
    url: "https://blog.abhaydesu.dev",
    siteName: "Abhay Singh's Blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Abhay Singh",
    description: "All my wisdom and shenanigans documented.",
  },
  alternates: {
    canonical: "https://blog.abhaydesu.dev",
  },
};

const truncate = (str: string, length: number) => {
  return str.length > length ? str.substring(0, length) + "..." : str;
};

export default async function BlogsPage() {
  const allBlogs = await getBlogs();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Abhay Singh's Blog",
    description: "All my wisdom and shenanigans documented.",
    url: "https://blog.abhaydesu.dev",
    author: {
      "@type": "Person",
      name: "Abhay Singh",
      url: "https://abhaydesu.dev",
    },
    blogPost: allBlogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.description,
      url: `https://blog.abhaydesu.dev/blog/${blog.slug}`,
      datePublished: blog.date,
    })),
  };

  return (
    <main className="relative max-w-3xl px-4 min-h-screen mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="absolute -left-4 -z-10">
        <Image src="/gif.gif" alt="cat-gif" height={50} width={200} priority />
      </div>
      <h1 className="text-6xl pt-40 font-semibold jp tracking-tighter" aria-label="My Blog">
        私の<span className="tracking-tighter"> Blog.</span>
      </h1>
      <section className="mt-16 space-y-4">
        {allBlogs.map((blog) => (
          <article
            key={blog.slug || blog.title}
            className="p-4 hover:bg-neutral-100 rounded-xl transition-colors duration-400"
          >
            <Link className="block" href={`/blog/${blog.slug}`}>
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-semibold tracking-tight text-lg">
                  {blog.title}
                </h2>
                {blog.date && (
                  <time dateTime={blog.date} className="text-sm text-neutral-500 shrink-0">
                    {new Date(blog.date).toLocaleDateString("en-us", {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                )}
              </div>
              <p className="max-w-lg text-sm mt-2 text-neutral-600">
                {truncate(blog.description || "", 150)}
              </p>
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

