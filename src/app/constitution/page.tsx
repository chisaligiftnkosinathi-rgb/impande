"use client";

import styles from "./page.module.css";
import ArchivalCard from "@/components/ArchivalCard";

export default function Constitution() {
  return (
    <main className={styles.chamber}>
      <ArchivalCard className={styles.document}>
        <div className={styles.scroll}>
          <h1 className="voice-elder">The Impande Constitution</h1>
          <p className={styles.italic}>A living philosophy for the preservation of human continuity, truth, and memory.</p>
          
          <hr className={styles.divider} />
          
          <section className={styles.article}>
            <h2 className="voice-elder">Preamble</h2>
            <p className={`${styles.bold} voice-steward`}>Before there were books, there were voices. Before there were archives, there were elders. Before there were records, there was remembrance. Impande honors this inheritance by preserving truth with humility, memory with care, and service with love, so that no generation stands alone.</p>
            <p className="voice-steward">We are because those before us remembered. We endure because we choose to remember. We preserve so that those yet unborn may know where they come from and walk their path with understanding.</p>
          </section>

          <section className={styles.article}>
            <h2 className="voice-elder">Article I: The Right to Continuity</h2>
            <p className={`${styles.bold} voice-steward`}>Every person is born into a story that began long before their first breath. No one should inherit a silence where a history ought to be.</p>
            <p className="voice-steward">Continuity is the unbroken chain of human existence. It is not limited to individuals, but extends to families, villages, schools, churches, businesses, and nations. Impande preserves this continuity—the root system of who we are, where we come from, and the truth of the lives that laid the groundwork for our existence.</p>
          </section>

          <section className={styles.article}>
            <h2 className="voice-elder">Article II: Seeking Truth</h2>
            <p className={`${styles.bold} voice-steward`}>Truth is not owned. It is sought. Every generation receives only a portion of it and bears the responsibility to leave a clearer path for those who follow.</p>
            <p className="voice-steward">Truth is established through transparency and attribution rather than dogmatic certainty. Evidence is a first-class citizen. No claim exists without a source. We do not overwrite the truth when new voices emerge; we layer it, honoring oral traditions alongside the written record, so that confidence may grow naturally over time.</p>
          </section>

          <section className={styles.article}>
            <h2 className="voice-elder">Article III: Unanswered Questions</h2>
            <p className={`${styles.bold} voice-steward`}>We do not fear unanswered questions. They are not failures of remembrance but invitations for future generations to continue the journey.</p>
            <p className="voice-steward">Unknowns should never be erased or hidden. Future generations inherit not only our answers but also our unfinished work. Where memory fades, we leave an open door for those who come after us to seek what was lost.</p>
          </section>

          <section className={styles.article}>
            <h2 className="voice-elder">Article IV: The Sanctity of Memory and Service</h2>
            <p className={`${styles.bold} voice-steward`}>Memory is the vessel. Service is the act of filling it.</p>
            <p className="voice-steward">Memory encompasses the voices of elders, written testaments, photographs, and the stories passed down through generations. Documenting a life, recording an elder's voice, and preserving a community's history are profound acts of service. Impande provides the sanctuary to safeguard these acts of service for the future.</p>
          </section>

          <section className={styles.article}>
            <h2 className="voice-elder">Article V: Ownership and Protection</h2>
            <p className={`${styles.bold} voice-steward`}>The roots belong exclusively to the soil that grew them.</p>
            <p className="voice-steward">Families and communities are the sole guardians of their own history. They hold the absolute right to determine what is preserved and who has access to it. Impande provides the vessel, but the story belongs to the people. Private memories, quiet prayers, and internal matters must be protected by boundaries as strong as the community itself.</p>
          </section>

          <section className={styles.article}>
            <h2 className="voice-elder">Article VI: The Immutable Laws</h2>
            <ol className={`${styles.orderedList} voice-steward`}>
              <li><strong>The Law of Attribution:</strong> What is recorded must always remain attributable. The source of a claim, whether a verified historical document or a cherished oral tradition, must never be erased.</li>
              <li><strong>The Law of Distinction:</strong> Oral history and verified records must be clearly distinguished, yet equally honored. One does not diminish the other.</li>
              <li><strong>The Law of Preservation:</strong> We must never rewrite or erase a family's traditions. Memory can be appended, but the voices of the past must be preserved exactly as they were spoken.</li>
            </ol>
          </section>

          <section className={styles.article}>
            <h2 className="voice-elder">Article VII: Stewardship</h2>
            <p className={`${styles.bold} voice-steward`}>A steward is not the owner of history. A steward is entrusted with carrying memory across the river of time without allowing it to be lost.</p>
            <p className="voice-steward">Those who record history carry the responsibility to do so with honesty, humility, and respect. Where uncertainty exists, it must be acknowledged. Where disagreement exists, it must be preserved rather than concealed. The role of a steward is to faithfully preserve what is known and leave room for the future.</p>
          </section>

          <section className={styles.article}>
            <h2 className="voice-elder">Article VIII: Generational Responsibility</h2>
            <p className={`${styles.bold} voice-steward`}>The child receives a name. The elder leaves a memory. The steward keeps the path between them.</p>
            <p className="voice-steward">Every generation receives continuity as a gift and holds it in trust for the next. The purpose of Impande is not merely to remember the past, but to strengthen the future.</p>
            <div className={styles.indented}>
              <p className="voice-steward"><strong>Therefore every generation inherits three responsibilities:</strong></p>
              <p className="voice-steward"><strong>To remember faithfully.</strong></p>
              <p className="voice-steward"><strong>To seek truth humbly.</strong></p>
              <p className="voice-steward"><strong>To preserve both for those who come after.</strong></p>
            </div>
          </section>

          <section className={styles.article}>
            <h2 className="voice-elder">Article IX: Hospitality</h2>
            <p className={`${styles.bold} voice-steward`}>A steward welcomes every sincere seeker with patience, dignity, and respect, recognizing that every family and community carries a story worthy of remembrance.</p>
            <p className="voice-steward">The archive is not a fortress but an open door. We receive those who come seeking their roots with the same warmth we would offer a guest in our home.</p>
          </section>

          <section className={styles.article}>
            <h2 className="voice-elder">Article X: Reconciliation</h2>
            <p className={`${styles.bold} voice-steward`}>When memories differ, the steward preserves each testimony faithfully, seeking understanding before judgment.</p>
            <p className="voice-steward">Families sometimes disagree. Conflicting memories are not errors to be corrected but perspectives to be held. We preserve the complexity of the human experience without forcing an artificial consensus.</p>
          </section>

          <section className={styles.article}>
            <h2 className="voice-elder">Article XI: Gratitude</h2>
            <p className={`${styles.bold} voice-steward`}>We receive this inheritance with gratitude, preserve it with humility, and pass it on with hope.</p>
            <p className="voice-steward">Everything in Impande exists because someone shared. We owe our understanding to those who took the time to speak, to write, and to preserve.</p>
          </section>

          <hr className={styles.divider} />

          <section className={styles.article}>
            <h2 className="voice-elder">The Covenant of Impande</h2>
            <p className="voice-steward">We acknowledge that no generation possesses the whole truth, remembers every story, or preserves every voice. Therefore, we commit ourselves to the work of stewardship rather than ownership, truth rather than assumption, and continuity rather than forgetfulness.</p>
            <p className="voice-steward">We receive the roots entrusted to us with gratitude, preserve them with integrity, and pass them forward with hope.</p>
            <p className={`${styles.bold} voice-steward`}>May every Continuity Space be a faithful root for generations yet to come.</p>
          </section>

          <hr className={styles.divider} />

          <section className={styles.blessing}>
            <h2 className="voice-elder">A Blessing for the Stewards</h2>
            <blockquote className="voice-elder">
              <p>May every name entrusted here be remembered with dignity.</p>
              <p>May every truth be sought with humility.</p>
              <p>May every act of service inspire another.</p>
              <p>May every steward preserve faithfully.</p>
              <p>May every child yet unborn find their roots here and know they did not begin alone.</p>
            </blockquote>
          </section>
        </div>
      </ArchivalCard>
    </main>
  );
}
