# OpenDKG — Shared Project Policies

This repository contains **organization-wide contribution, governance and licensing guidance** for the volunteer developers collaborating through [OpenDKG](https://github.com/OpenDKG).

**Scope:** All current and future repositories owned by OpenDKG, with **NetPetra explicitly excluded** even if later transferred to OpenDKG (unless separately admitted with necessary permissions). This `.github` repository is itself a covered repository; third-party and previously licensed material retain their original rights.

## Documents

| File | Purpose |
| --- | --- |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Default contribution guidelines, DCO workflow and review expectations |
| [CONTRIBUTOR_AGREEMENT.md](CONTRIBUTOR_AGREEMENT.md) | Voluntary contributor copyright/license grant, adoption and pseudonymous acceptance |
| [DCO.md](DCO.md) | Verbatim Developer Certificate of Origin 1.1 and sign-off instructions |
| [GOVERNANCE.md](GOVERNANCE.md) | Three-maintainer decisions, succession, project assets and security |
| [LICENSE](LICENSE) | Apache License 2.0 for this repository's properly licensed materials |

> **Other repositories need their own `LICENSE` file.** GitHub's `.github` defaults can surface contribution guidelines but do not automatically distribute these policies or grant a license for another repository's code.

## Adoption — not automatic

These are **proposed model terms until explicitly adopted**. The three founders must separately record their agreement to the initial governance policy, and each contributor must expressly accept the [Contributor Agreement](CONTRIBUTOR_AGREEMENT.md), with a reference to its **exact commit SHA**, before its additional terms can be relied on for that person. Acceptance may be public under a pseudonymous GitHub identity; an alias alone is not identity verification.

Use a dedicated GitHub issue or pull request to record each founder's exact acceptance statement and link it as the founding roster. Do not assume a merge, issue reaction, `git commit -s`, or joining the GitHub organization constitutes contractual consent. Past contributions need separate, specific permission where not already properly licensed.

No company or LLC is created by these documents, and they do not provide automatic personal-liability protection or guarantee legal enforceability in every jurisdiction. Obtain legal review for the actual countries involved before relying on them as contracts.

### Automated membership validation

The [membership automation guide](MEMBERSHIP_AUTOMATION.md) explains the GitHub Actions intake checker, version-pinned consent receipts, and required human approval **before** an organization invitation. Form validation is not a legal-signature or membership approval. CLA checks for pull requests still require [separate configuration](CLA_SETUP.md).

## Joining and signing

OpenDKG uses a **manual pre-invitation membership gate** and a **separate pull-request CLA check**. These processes are not active solely because the templates are published.

- [Membership procedure](MEMBERSHIP.md) — applicant acceptance, founder adoption, reviewer evidence and permission rules.
- [Membership agreement form](.github/ISSUE_TEMPLATE/membership-agreement.yml) — required acknowledgments referencing a fixed v1.0 policy revision.
- [CLA Assistant setup](CLA_SETUP.md) — external GitHub authorization and required checks for contributions across covered repositories.
- [PR template](.github/PULL_REQUEST_TEMPLATE.md) — contributor checklist, not a binding signature.

**Activation requires** adoption by all three founding maintainers and a human owner review before sending invitations. A separate CLA Assistant setup is still needed to gate PR merges. Neither mechanism includes NetPetra.

### Source references

- [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)
- [Developer Certificate of Origin 1.1](https://developercertificate.org/)
- [GitHub default community health files](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file)
