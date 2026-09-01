import { NextResponse } from "next/server";
import { getBlogs } from "@/utils/mdx";

export const revalidate = 3600;

export async function GET() {
  try {
    const allPosts = await getBlogs();
    
    const formattedPosts = allPosts
      .sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 5)
      .map((post) => ({
        title: post.title,
        href: `/blog/${post.slug}`,
        date: post.date,
        description: post.description,
      }));

    return NextResponse.json(formattedPosts, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json({ error: "Failed to load posts" }, { status: 500 });
  }
}
