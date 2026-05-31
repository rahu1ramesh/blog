export interface Frontmatter {
    title: string;
    dateCreated: string;
    tags: string[];
    draft: boolean;
}

export interface Article {
    slug: string;
    tag: string;
    basePath: string;
    frontmatter: Frontmatter;
    content: string;
}