import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import styles from "./styles/index.module.scss"

interface ArticleProps {
    title: string;
    subtitle?: string;
    content: string;
    basePath?: string;
    imageMap?: Record<string, string>;
}

const Article = ({title, subtitle, content, basePath, imageMap}: ArticleProps) => {
    const resolveImageSrc = (src: string | undefined): string | undefined => {
        if (!src || !basePath || !imageMap) return src;
        const key = src.startsWith('./')
            ? `${basePath}/${src.slice(2)}`
            : `${basePath}/${src}`;
        return imageMap[key] ?? src;
    };

    return (
        <div id="article-section" data-testid="article-section-test-id" aria-label="Article" className={styles.article}>
            <h1 id="artile-title" data-testid="artile-title-test-id" aria-label="Article Title" className={styles.title}>{title}</h1>
            {subtitle &&
                <p id="article-subtitle" data-testid="article-subtitle-test-id" aria-label="Article Subtitle" className={styles.subtitle}>
                    {subtitle}
                </p>
            }
            <Markdown
                data-testid="article-content-test-id"
                aria-label="Article Content"
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    img: ({ src, alt, title: imgTitle }) => (
                        <img src={resolveImageSrc(src)} alt={alt} title={imgTitle} />
                    ),
                }}
            >
                {content}
            </Markdown>
        </div>
    )
}

export default Article;
