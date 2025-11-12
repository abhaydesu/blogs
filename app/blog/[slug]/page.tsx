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
    <div className="min-h-screen flex items-start justify-start">
      <div className="min-h-screen pt-8 px-8  md:pb-10">
        <Image
            src={frontmatter.image}
            alt={frontmatter.title}
            width={896} 
            height={384} 
            className="rounded-2xl object-cover mx-auto mb-20 max-h-96 max-w-2xl w-full h-auto "
/>
        <div className="prose dark:prose-invert mx-auto">{content}</div>
      </div>
    </div>
  );
}
