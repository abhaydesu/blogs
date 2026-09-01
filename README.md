# Abhay Singh's Blog

Personal blog website built with [Next.js](https://nextjs.org) (App Router), MDX, and Tailwind CSS. Hosted at [blog.abhaydesu.dev](https://blog.abhaydesu.dev).

---

## 🚀 API Endpoints

The blog exposes programmatic endpoints for external clients (like portfolio sites or RSS readers) to fetch posts without scraping HTML.

### 1. JSON API Endpoint (`GET /api/posts`)
Returns the latest 5 blog posts formatted as JSON.

- **URL:** `https://blog.abhaydesu.dev/api/posts`
- **Cache:** Cached for 1 hour (`s-maxage=3600, stale-while-revalidate=86400`).
- **Response Format:**
  ```json
  [
    {
      "title": "Post Title",
      "href": "/blog/post-slug",
      "date": "2025-09-05",
      "description": "Short summary of the post..."
    }
  ]
  ```

### 2. RSS Feed (`GET /feed.xml`)
Returns the latest 10 blog posts in standard RSS 2.0 XML format.

- **URL:** `https://blog.abhaydesu.dev/feed.xml`
- **Content-Type:** `application/xml`

---

## 📝 Writing Blog Posts

All blog posts are stored in the [`data/`](./data) directory as `.mdx` files.

### Frontmatter Schema
Each `.mdx` file must include frontmatter at the top:

```markdown
---
title: "Your Post Title"
description: "A short summary of the post."
date: "YYYY-MM-DD"
image: "/images/cover.jpg"
tags: ["tech", "nextjs"]
---

Your post content here...
```

## Project Structure
- `app/`: Next.js App Router pages and API routes (`/api/posts`, `/feed.xml`).
- `data/`: MDX blog post files.
- `utils/mdx.ts`: MDX compilation and file reading utilities.
