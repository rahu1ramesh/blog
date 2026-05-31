import classNames from 'classnames'
import styles from "./styles/index.module.scss";
import { useLocation, Link } from 'react-router';
import { APP_ASIDE_ITEMS } from './constants';
import { updateCurrentStatus } from './utils';

const Aside = () => {
    const location = useLocation();
    const asideItems = updateCurrentStatus(APP_ASIDE_ITEMS, location.pathname);
    return (
        <aside id="page-aside" data-testid="page-aside-test-id" aria-label="Aside" className={styles.aside}>
            <Link to="/" id="page-aside-logo" data-testid="page-aside-logo-test-id" aria-label="Logo" className={styles.logo}>
                <img id={`logo`} data-testid={`logo-test-id`} src={`${import.meta.env.BASE_URL}favicon.png`} alt={"Logo"} className={styles.img}/>
            </Link>
            <ul id="page-aside-list" data-testid="page-aside-list-test-id" aria-label="List">
                {asideItems.map((item) => (
                    <li key={item.id} id={`page-aside-${item.id}`} data-testid={`page-aside-${item.id}-test-id`} aria-label={item.label} className={styles.item}>
                        <Link id={`page-aside-${item.id}-link`} data-testid={`page-aside-${item.id}-link-test-id`} to={item.link} aria-label={`${item.label} Link`} className={classNames(styles.link, { [styles.active]: item.isCurrent })}>
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default Aside
