import styles from "./styles/index.module.scss";

interface ListProps {
    title: string;
    items: { title: string; date: string; link: string }[];
}

const List = ({ items, title }: ListProps) => {
  return (
    <div id="list-template" data-testid="list-template-test-id" className={styles.list}>
        <h1 id="list-template-title" data-testid="list-template-title-test-id" className={styles.title}>{title}</h1>
      {items.map((item) => (
        <a
          key={item.link}
          href={item.link}
          id={`list-item-${item.link}`}
          data-testid="list-item-test-id"
          className={styles.item}
        >
          <span id="list-item-title" data-testid="list-item-title-test-id" className={styles.itemTitle}>{item.title}</span>
          <span id="list-item-date" data-testid="list-item-date-test-id" className={styles.date}>{item.date}</span>
        </a>
      ))}
    </div>
  );
};

export default List;
