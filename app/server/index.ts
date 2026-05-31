import matter from "gray-matter";
import { markdownModules, imageMap } from "./constants";
import type { Article, Frontmatter } from "./models";

export { imageMap };

function buildArticles(): Article[] {
  return Object.entries(markdownModules)
    .map(([path, raw]) => {
      const { data, content } = matter(raw);
      const parts = path.split('/');
      const slug = parts[2];
      const basePath = `/contents/${slug}`;
      return {
        slug,
        tag: (data as Frontmatter).tags[0] ?? '',
        basePath,
        frontmatter: data as Frontmatter,
        content: content.trim(),
      };
    })
    .filter(a => !a.frontmatter.draft);
}

const articles = buildArticles();

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  articles.forEach(a => a.frontmatter.tags.forEach(t => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export function getArticlesByTag(tag: string): Article[] {
  return articles
    .filter(a => a.frontmatter.tags.includes(tag))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.dateCreated).getTime() -
        new Date(a.frontmatter.dateCreated).getTime()
    );
}

export function getArticle(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}
