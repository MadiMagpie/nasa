import Link from "next/link"
import { useRouter } from "next/router"
import styles from "../../styles/NavBar.module.css"


export default function NavBar() {
       const r = useRouter();

       return(
              <div className={styles.base}>
                     <Link href={"/"} legacyBehavior>
                            <a className={r.pathname === "/" ? styles.active : styles.link}>Gallery</a>
                     </Link>
                     <Link href={"/polychromatic"} legacyBehavior>
                            <a className={r.pathname === "/polychromatic" ? styles.active : styles.link}>Polychromatic Viewer</a>
                     </Link>
              </div>
       )
}