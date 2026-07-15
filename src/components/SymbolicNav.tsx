"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SymbolicNav.module.css";

export default function SymbolicNav() {
  const pathname = usePathname();

  const productRoutes = [
    "/spaces",
    "/roots",
    "/journeys",
    "/truth",
    "/memories",
    "/stewardship",
    "/service",
    "/discovery",
    "/passport-demo",
    "/constitution",
    "/ecosystem",
  ];

  const isProductRoute = productRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (!isProductRoute) return null;

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/impande">
          <span className="voice-elder">Impande Platform</span>
        </Link>
      </div>
      <ul className={`${styles.menu} voice-steward`}>
        <li><Link href="/spaces" className={pathname.startsWith("/spaces") ? styles.active : ""}>Spaces</Link></li>
        <li><Link href="/roots" className={pathname.startsWith("/roots") ? styles.active : ""}>Roots</Link></li>
        <li><Link href="/journeys" className={pathname.startsWith("/journeys") ? styles.active : ""}>Journeys</Link></li>
        <li><Link href="/truth" className={pathname.startsWith("/truth") ? styles.active : ""}>Truth</Link></li>
        <li><Link href="/memories" className={pathname.startsWith("/memories") ? styles.active : ""}>Memories</Link></li>
        <li><Link href="/stewardship" className={pathname.startsWith("/stewardship") ? styles.active : ""}>Stewardship</Link></li>
        <li><Link href="/service" className={pathname.startsWith("/service") ? styles.active : ""}>Service</Link></li>
        <li><Link href="/discovery" className={pathname.startsWith("/discovery") ? styles.active : ""}>Discovery</Link></li>
      </ul>
    </nav>
  );
}
