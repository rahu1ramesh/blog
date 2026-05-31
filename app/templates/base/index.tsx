import Footer from "~/components/footer";
import Aside from "~/components/aside";
import styles from "./styles/index.module.scss";

interface BaseProps {
    body: React.ReactNode;
}
const Base = ({ body }: BaseProps) => {
  return (
    <div id="base-template" data-testid="base-template-test-id" className={styles.template}>
        <div id="content-area" data-testid="content-area-test-id" className={styles.content} >
            <div id="left-section" data-testid="left-section-test-id" >
                <div id="header-area" data-testid="header-area-test-id" ><Aside /></div>
            </div>
            <div id="right-section" data-testid="right-section-test-id" >
                <div id="body-area" data-testid="body-area-test-id" >{body}</div>
            </div>
        </div>
        <div id="footer-area" data-testid="footer-area-test-id" className={styles.footer} ><Footer /></div>
    </div>
  )
}

export default Base
