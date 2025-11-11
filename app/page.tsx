import Head from 'next/head';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';

// 1. This function runs at build time on the server
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

// 2. Your component receives the posts as props
export default function Home({ allPostsData }) {
  return (
    <div>
      <Head>
        <title>My Blog</title>
      </Head>

      <section>
        <h1>My Blog</h1>
        <ul>
          {allPostsData.map(({ slug, date, title, snippet }) => (
            <li key={slug}>
              <Link href={`/blog/${slug}`}>
                <h2>{title}</h2>
              </Link>
              <small>{date}</small>
              <p>{snippet}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}