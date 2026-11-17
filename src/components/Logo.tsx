import Link from "next/link";
import styles from "./Logo.module.css";

function AsteriskPixel() {
  return (
    <svg
      viewBox="0 0 9 9"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={styles.asterisk}
    >
      {/* Row 0 */}
      <rect x="0" y="0" width="1" height="1" />
      <rect x="4" y="0" width="1" height="1" />
      <rect x="8" y="0" width="1" height="1" />
      {/* Row 1 */}
      <rect x="1" y="1" width="1" height="1" />
      <rect x="4" y="1" width="1" height="1" />
      <rect x="7" y="1" width="1" height="1" />
      {/* Row 2 */}
      <rect x="2" y="2" width="1" height="1" />
      <rect x="4" y="2" width="1" height="1" />
      <rect x="6" y="2" width="1" height="1" />
      {/* Row 3 */}
      <rect x="3" y="3" width="3" height="1" />
      {/* Row 4 */}
      <rect x="0" y="4" width="9" height="1" />
      {/* Row 5 */}
      <rect x="3" y="5" width="3" height="1" />
      {/* Row 6 */}
      <rect x="2" y="6" width="1" height="1" />
      <rect x="4" y="6" width="1" height="1" />
      <rect x="6" y="6" width="1" height="1" />
      {/* Row 7 */}
      <rect x="1" y="7" width="1" height="1" />
      <rect x="4" y="7" width="1" height="1" />
      <rect x="7" y="7" width="1" height="1" />
      {/* Row 8 */}
      <rect x="0" y="8" width="1" height="1" />
      <rect x="4" y="8" width="1" height="1" />
      <rect x="8" y="8" width="1" height="1" />
    </svg>
  );
}

export default function Logo() {
  return (
    <Link href="/" aria-label="Moira Andreoli, inicio" className={styles.root}>
      <AsteriskPixel />
      <span className={styles.text} aria-hidden="true">
        <span className={styles.bold}>Moira</span>
        <span className={styles.regular}> Andreoli</span>
      </span>
    </Link>
  );
}
