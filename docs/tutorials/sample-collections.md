# Sample Collections

To help new Stewards and Contributors understand how Impande works in practice, we maintain two reference collections. You can explore these collections in the staging environment to see how the Truth, Confidence, and Meaning layers interact.

## 1. The Chisali Family Heritage Collection
**Theme:** Exploring deeply personal, multi-generational family history across shifting borders.

**Key Concepts Demonstrated:**
- **Oral History Provenance:** Several claims trace back to `Oral Testimony: Babe George Amos Chisali`. The collection demonstrates how oral history is weighed confidently when corroborated by multiple family lines.
- **Handling Contradiction:** You will see a `Contradiction` resolved without deletion regarding the exact birth year of the patriarch. Two primary sources conflict; both remain in the `JournalEntry` log.
- **The Meaning Layer in Action:** The UI generates a beautiful, readable biography of the family's migration, while clearly allowing the user to click `[Examine Sources]` to see the underlying graph of evidence.

## 2. The Nkambule Archive
**Theme:** Institutional archiving of community leadership and land tenure.

**Key Concepts Demonstrated:**
- **Research Tasks:** The Stewardship dashboard for this collection highlights a high volume of `missingPrimarySources` tasks, showing how a community can crowdsource missing documentation for oral claims.
- **Strict Governance:** This collection utilizes the `AuthorizationService` heavily, demonstrating how `CONTRIBUTOR` submissions remain in an `UNPUBLISHED` state until an `OWNER` explicitly accepts the `JournalEntryRevision`.

We recommend exploring these collections before creating your own!
