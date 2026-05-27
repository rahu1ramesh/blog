import classNames from 'classnames'
import { APP_ASIDE_ITEMS } from '~/constants/app'
import styles from "./styles/index.module.scss";

const Aside = () => {
  return (
    <aside id="page-aside" data-testid="page-aside-test-id" aria-label="Aside" className={styles.aside}>
        <img id={`logo`} data-testid={`logo-test-id`} src={`/favicon.png`} alt={"Logo"} className={styles.img}/>
        <ul id="page-aside-list" data-testid="page-aside-list-test-id" aria-label="List">
            {APP_ASIDE_ITEMS.map((item) => (
                <li key={item.id} id={`page-aside-${item.id}`} data-testid={`page-aside-${item.id}-test-id`} aria-label={item.label} className={styles.item}>
                    <a id={`page-aside-${item.id}-link`} data-testid={`page-aside-${item.id}-link-test-id`} href={item.link} aria-label={`${item.label} Link`} className={classNames(styles.link, { [styles.active]: item.isCurrent })}>
                        {item.label}
                    </a>
                </li>
            ))}
        </ul>
    </aside>
  )
}

export default Aside
