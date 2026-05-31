import type { Config } from "@react-router/dev/config";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

function getPrerenderedPaths(): string[] {
  const paths = ['/', '/writing'];
  const contentsDir = path.resolve('./contents');
  const tagSet = new Set<string>();

  for (const slugDir of fs.readdirSync(contentsDir)) {
    if (!fs.statSync(path.join(contentsDir, slugDir)).isDirectory()) continue;
    const mdPath = path.join(contentsDir, slugDir, `${slugDir}.md`);
    if (!fs.existsSync(mdPath)) continue;

    const raw = fs.readFileSync(mdPath, 'utf-8');
    const { data } = matter(raw);
    if (data.draft === true) continue;

    const tags: string[] = Array.isArray(data.tags) ? data.tags : [];
    tags.forEach(t => tagSet.add(t));
    tags.forEach(t => paths.push(`/writing/${t}/${slugDir}`));
  }

  tagSet.forEach(t => paths.push(`/writing/${t}`));
  return paths;
}

export default {
  ssr: false,
  ...(process.env.NODE_ENV === 'production' && { basename: '/blog' }),
  prerender: getPrerenderedPaths,
} satisfies Config;
