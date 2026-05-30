import styles from "./styles/index.module.scss";
import Folder from "~/components/folder";

interface SectionProps {
    title: string;
    subtitle?: string;
    items: {
        title: string;
        link: string;
    }[]
}
const Section = ({ items, subtitle, title }: SectionProps) => {
  return (
    <div id="section-template" data-testid="section-template-test-id" className={styles.section}>
        <h1 id="section-template-title" data-testid="section-template-title-test-id" className={styles.title}>{title}</h1>
        {subtitle &&
            <p id="section-template-subtitle" data-testid="section-template-subtitle-test-id" className={styles.subtitle}>
                {subtitle}
            </p>
        }
        <div id="section-template-grid" data-testid="section-template-grid-test-id" className={styles.grid}>
            {
                items.map((item) =>
                    <Folder key={item.title} id={item.title} title={item.title} link={item.link} />
                )
            }
        </div>
    </div>
  )
}

export default Section
