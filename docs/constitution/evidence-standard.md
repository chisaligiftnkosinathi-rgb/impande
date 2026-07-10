# Impande Evidence Standard

The core architectural promise of Impande is that **truth is tied to evidence**. This document defines the standard for what constitutes acceptable evidence on the platform.

## 1. What is Evidence?
Evidence is any media, document, or recorded testimony that supports a historical claim.
In the Impande schema, evidence is represented as a `MediaAttachment` combined with a `SourceReference`.

## 2. Types of Sources
We recognize three primary categories of sources:
1. **Primary Documentation:** Government records, birth certificates, original letters, dated photographs, census records.
2. **Secondary Documentation:** Biographies, newspaper articles, published historical accounts.
3. **Oral History:** Recorded audio, video, or transcribed testimony from individuals with direct or passed-down knowledge of an event.

## 3. The Requirement of Provenance
A piece of evidence is only as strong as its provenance. For a source to be fully compliant with the Impande Evidence Standard, it must include:
- **Origin:** Where did the source come from?
- **Date of Creation (if known):** When was the source created?
- **Chain of Custody:** Who possessed the source before it was uploaded to Impande?

## 4. Unverified Claims
A claim submitted without a `SourceReference` is categorized as `UNVERIFIED`. The platform accepts these claims as placeholders to spur future research, but the `MeaningService` will explicitly highlight them as lacking evidence in all generated narratives.
