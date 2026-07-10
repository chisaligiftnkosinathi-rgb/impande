# API Versioning Policy

Impande is designed to be a long-lasting ecosystem. Because institutions and communities will build custom clients, mobile apps, and data integrations against our API, we must ensure that the API is stable, predictable, and safely versioned.

## 1. Versioning Scheme
All API routes MUST include the version in the URL path:
`/api/v1/collections/...`

We do not use header-based versioning, as path-based versioning is significantly easier for external researchers and institutions to cache, test, and trace.

## 2. What Constitutes a Breaking Change?
A new API version (e.g., `v2`) is ONLY required if a breaking change is made. Breaking changes include:
- Removing or renaming an existing resource or field.
- Changing the data type of an existing field (e.g., changing a string to an integer).
- Adding new **required** parameters to an existing endpoint.

## 3. What is NOT a Breaking Change?
You may safely add the following to `v1` without bumping the version:
- Adding new endpoints.
- Adding new **optional** parameters to an existing endpoint.
- Adding new fields to a response payload. External clients MUST be designed to ignore unrecognized fields.

## 4. Deprecation Lifecycle
If `v2` is released, `v1` enters a deprecation lifecycle.
1. **Announcement:** The deprecation is announced to all Collection Owners.
2. **Support Window:** `v1` will remain fully operational for no less than 12 months after the release of `v2`.
3. **Sunset:** After 12 months, `v1` requests will return a `410 Gone` HTTP status.
