import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import styles from "./styles/index.module.scss"

interface ArticleProps {
    title: string;
    subtitle?: string;
    content: string;
}

const ArticleProps = ({title, subtitle, content}: ArticleProps) => {
    return (
        <div id="article-section" data-testId="article-section-test-id" aria-label="Article" className={styles.article}>
            <h1 id="artile-title" data-testId="artile-title-test-id" aria-label="Article Title" className={styles.title}>{title}</h1>
            {subtitle && 
                <p id="article-subtitle" data-testId="article-subtitle-test-id" aria-label="Article Subtitle" className={styles.subtitle}>
                    {subtitle}
                </p>
            }
            <Markdown data-testId="article-content-test-id" aria-label="Article Content" remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                {content}
            </Markdown>
        </div>
    )
}

export default ArticleProps
