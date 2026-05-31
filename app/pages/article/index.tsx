import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { getArticle, imageMap } from "~/server";
import ArticleTemplate from "~/templates/article";
import Base from "~/templates/base";

export function meta({ data }: { data: { article: { frontmatter: { title: string } } } }) {
  return [{ title: `${data.article.frontmatter.title.replace(/\b\w/g, c => c.toUpperCase())} | Rahul Ramesh` }];
}

export function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  const article = getArticle(slug ?? "");

  if (!article) throw new Response('Not Found', { status: 404 });

  const articleImageMap = Object.fromEntries(
    Object.entries(imageMap).filter(([key]) => key.startsWith(article.basePath))
  );

  return { article, imageMap: articleImageMap };
}

export default function Article() {
  const { article, imageMap: articleImageMap } = useLoaderData<typeof loader>();

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formatted = new Intl.DateTimeFormat('en-US', options).format(new Date(article.frontmatter.dateCreated));

  return (
    <Base
      body={
        <ArticleTemplate
          title={article.frontmatter.title}
          subtitle={formatted}
          content={article.content}
          basePath={article.basePath}
          imageMap={articleImageMap}
        />
      }
    />
  );
}
