import { APP_FOOTER_TEXT, SOCIAL_MEDIA_LINKS } from "~/constants/app";
import styles from "./styles/index.module.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear().toString();
  return (
    <div id="page-footer" data-testid="page-footer-test-id" aria-label="Footer" className={styles.footer}>
      <div id="copy-right" data-testid="copy-right-test-id" aria-label="Copyright" >{APP_FOOTER_TEXT(currentYear)}</div>
      <div id="social-media" data-testid="social-media-test-id" aria-label="Social Media" >
        {SOCIAL_MEDIA_LINKS.map((item) => (
          <li key={item.id} id={`social-media-item-${item.id}`} data-testid={`social-media-item-${item.id}-test-id`} aria-label={item.label} className={styles.item}>
            <a id={`${item.id}-link`} data-testid={`${item.id}-link-test-id`} href={item.link} aria-label={item.label + " Link"}>
              <img id={`${item.id}-img`} data-testid={`${item.id}-img-test-id`} src={`${import.meta.env.BASE_URL}${item.icon}.svg`} alt={item.label} />
            </a>
          </li>
        ))}
      </div>
    </div>
  )
}

export default Footer
