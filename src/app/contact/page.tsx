import styles from "../institute.module.css";

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Contact</p>
        <h1>Connect with AXIONYX Research Institute</h1>
        <p className={styles.lead}>
          Reach out for collaboration, research partnerships, publication enquiries, or
          software-related engagement.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Contact Channels</h2>
        <ul className={styles.list}>
          <li>info@axionyx.co.za</li>
          <li>research@axionyx.co.za</li>
          <li>publications@axionyx.co.za</li>
          <li>partnerships@axionyx.co.za</li>
          <li>admin@axionyx.co.za</li>
        </ul>
      </section>

      <p className={styles.notice}>
        Replace placeholder inboxes with your active mailbox provider records once DNS mail
        routing is configured.
      </p>
    </main>
  );
}
