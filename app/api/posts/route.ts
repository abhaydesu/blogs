import { NextResponse } from "next/server";
import { getBlogs } from "@/utils/mdx";

export const revalidate = 3600;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    const allPosts = await getBlogs();
    
    const formattedPosts = allPosts
      .slice(0, 5)
      .map((post) => ({
        title: post.title,
        href: `/blog/${post.slug}`,
        date: post.date,
        description: post.description,
      }));

    return NextResponse.json(formattedPosts, {
      headers: {
        ...corsHeaders,
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { error: "Failed to load posts" },
      { status: 500, headers: corsHeaders }
    );
  }
}

