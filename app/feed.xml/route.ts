import { NextResponse } from "next/server";
import { getBlogs } from "@/utils/mdx";

export const revalidate = 3600;

export async function GET() {
  const posts = await getBlogs();
  
  let xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Abhay Singh's Blog</title>
    <link>https://blog.abhaydesu.dev</link>
    <description>All my wisdom and shenanigans documented.</description>`;

  posts.slice(0, 10).forEach((post) => {
    const pubDate = post.date ? new Date(post.date).toUTCString() : new Date().toUTCString();
    xml += `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>https://blog.abhaydesu.dev/blog/${post.slug}</link>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
  });

  xml += `
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
