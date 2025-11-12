import { getSingleBlog, getBlogFrontMatterBySlug } from "@/utils/mdx";
import { redirect } from "next/navigation";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const frontmatter = await getBlogFrontMatterBySlug(slug);

  if (!frontmatter) {
    return {
      title: "Blog not found",
    };
  }

  return {
    title: frontmatter.title + " by Abhay Singh",
    description: frontmatter.description,
  };
}

export default async function SingleBlogPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getSingleBlog(slug);

  if (!blog) {
    redirect("/blog");
  }

  const { content, frontmatter } = blog;

  return (
    <div className="min-h-screen max-w-4xl w-full mx-auto flex items-start justify-start nunito">
      <div className="pt-8 px-4 sm:px-8 md:px-8 md:pb-10 w-full">
        {frontmatter.image && (
          <div className="mx-auto mb-20 max-w-2xl w-full overflow-hidden rounded-2xl shadow-2xl">
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
    </div>
  );
}
