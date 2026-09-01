import { promises as fs } from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';

type FrontMatter = {
    title: string;
    description: string;
    date: string;
    image: string;
    tags: string[];
}

// Helper to read the MDX file from disk
const readMdxFile = async (slug: string) => {
    try {
        return await fs.readFile(
            path.join(process.cwd(), "data", `${slug}.mdx`),
            "utf-8"
        );
    } catch (error) {
        return null;
    }
}

export const getAllSlugs = async () => {
    try {
        const files = await fs.readdir(path.join(process.cwd(), 'data'));
        return files.filter(file => file.endsWith('.mdx')).map(file => file.replace('.mdx', ''));
    } catch (error) {
        console.error("Error reading data directory:", error);
        return [];
    }
}

export const getSingleBlog = async (slug: string) => {
    try { 
        const singleBlog = await readMdxFile(slug);

        if (!singleBlog) {
            return null;
        }

        const { content, frontmatter } = await compileMDX<FrontMatter>({
            source: singleBlog,
            options: { parseFrontmatter: true }
        })

        return { content, frontmatter };
    } catch (error) {
        console.log(`error reading blog file for slug ${slug}:`, error);
        return null;
    }
}

export const getBlogs = async () => {
    const slugs = await getAllSlugs();

    const allBlogs = await Promise.all(slugs.map(async slug => {
        const frontmatter = await getBlogFrontMatterBySlug(slug);
        return {
            slug, 
            ...frontmatter
        }
    }))

    // Sort by date descending (newest first)
    return allBlogs
        .filter(blog => blog.title) // Ensure valid frontmatter
        .sort((a, b) => {
            const dateA = a.date ? new Date(a.date).getTime() : 0;
            const dateB = b.date ? new Date(b.date).getTime() : 0;
            return dateB - dateA;
        });
}

export const getBlogFrontMatterBySlug = async (slug: string) => {
    try {
        const singleBlog = await readMdxFile(slug);

        if (!singleBlog) {
            return null;
        }

        const { frontmatter } = await compileMDX<FrontMatter>({
            source: singleBlog,
            options: { parseFrontmatter: true },
        });

        return frontmatter;
    } catch (error) {
        console.log(`error reading frontmatter for slug ${slug}:`, error);
        return null;
    }
}