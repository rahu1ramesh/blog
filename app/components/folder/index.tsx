import classNames from "classnames";
import styles from "./styles/index.module.scss";

interface FolderProps {
  id: string;
  title: string;
  link: string;
}

const Folder = ({id, title, link}: FolderProps) => {
  return (
    <a id={`${id}-folder-link`} data-testid={`${id}-folder-link-test-id`} className={styles.container} href={link}>
      <div id={`${id}-folder`} data-testid={`${id}-folder-test-id`} className={styles.folder}>
          <div className={styles.frontSide}>
            <div className={styles.tip} />
            <div className={styles.cover} />
          </div>
          <div className={classNames(styles.backSide, styles.cover)} />
      </div>
      <p id={`${id}-folder-title`} data-testid={`${id}-folder-title-test-id`} className={styles.name}>
        {title}
      </p>
    </a>

  )
}

export default Folder
