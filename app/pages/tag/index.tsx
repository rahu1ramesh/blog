import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { getArticlesByTag } from "~/server";
import Base from "~/templates/base";
import List from "~/templates/list";

export function meta({ data }: { data: { tag: string } }) {
  return [{ title: `${data.tag.replace(/\b\w/g, c => c.toUpperCase())} | Rahul Ramesh` }];
}

export function loader({ params }: LoaderFunctionArgs) {
  const tag = params.tag ?? "";
  return { tag, articles: getArticlesByTag(tag) };
}

export default function Tag() {
  const { tag, articles } = useLoaderData<typeof loader>();

  const items = articles.map(article => ({
    title: article.frontmatter.title,
    date: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(article.frontmatter.dateCreated)),
    link: `/writing/${tag}/${article.slug}`,
  }));

  return (
    <Base body={<List title={tag ?? ''} items={items} />} />
  );
}
