import { Metadata } from "next";
import { getBlogs } from "@/utils/mdx";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Blog | Abhay Singh",
    description: "All my wisdom and shenanigans documented."
};

export default async function BlogsPage() {
    const allBlogs = await getBlogs();

    const truncate = (str: string, length: number) => {
        return str.length > length ? str.substring(0, length) + "..." : str;
    }

    return (
      <>

      <div  className="relative max-w-3xl px-4  min-h-screen mx-auto">
              <div className="absolute -left-4 -z-10">
            <Image src="/gif.gif" alt="cat-gif" height={50} width={200} />
        </div>
        <h1 className="text-6xl pt-40 font-semibold jp tracking-tighter">
          ブログ<span className="tracking-tighter">Blog.</span>
        </h1>
        <div className="mt-16 p-4 hover:bg-neutral-100 rounded-xl transition-colors duration-400">
          {allBlogs.map((blog) => (
                <Link className="" key={blog.title} href={`/blog/${blog.slug}`}>
                    <div className="flex items-center justify-between">
                        <h2 className='font-semibold tracking-tight'>
                            {blog.title}
                            </h2>
                        <p className="text-sm md:text-sm ">
                            {new Date(blog.date!).toLocaleDateString('en-us', {
                                weekday:"long", year:"numeric", month:"short", day:"numeric"
                            })}
                        </p>
                    </div>
                    <p className=" max-w-lg text-sm md:text-sm mt-2">
                        { truncate(blog.description || "", 150) }
                    </p>
                    
                </Link>
            ))}
        </div>
      </div>
      </>
  );
}
