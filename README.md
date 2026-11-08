# OpenDKG — Shared Project Policies

This repository contains **organization-wide contribution, governance and licensing guidance** for the volunteer developers collaborating through [OpenDKG](https://github.com/OpenDKG).

**Scope:** Current and future repositories owned by OpenDKG, subject to the published licensing and repository-adoption rules. This `.github` repository is itself a covered repository; third-party and previously licensed material retain their original rights.

> **Governance amendment in review:** the branch `policy/three-founders-equal-share-no-tsc-v1-1` proposes three equal 1/3 project economic shares and three functional Team Leads in place of a TSC. These are **draft amendments**. Existing v1.0 acceptance remains recorded at [Issue #3](https://github.com/OpenDKG/.github/issues/3) and its pinned commit; publishing a PR does not amend anyone's rights.

## New proposed operational documents (v1.1)

- [Founders' economic agreement — draft](FOUNDERS_ECONOMIC_AGREEMENT_DRAFT.md) — explicit inter-founder 1/3 arrangement and required personal approval.
- [Financial policy](FINANCIAL_POLICY.md) — restricted funds, net proceeds, receipt ledger and payment approvals.
- [Team roles](TEAM_ROLES.md) — three operational leads, no TSC.
- [Project admission](PROJECT_ADMISSION.md) — how repositories and rights holders become official OpenDKG projects.
- [Specification process](SPECIFICATION_PROCESS.md) — ODIP proposals, drafts, candidates and adopted specifications.
- [Brand & IP](BRAND_AND_IP_POLICY.md) — distinguish GitHub access, economic rights, copyright and branding.
- [Policy adoption checklist](POLICY_V1_1_ADOPTION_CHECKLIST.md) — new assent and migration gates.

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

## Three equal cofounders

OpenDKG was started as a joint effort of **three equal cofounders**. The fact that `@a-51-50` currently holds the initial GitHub Organization Owner role is technical setup, **not** sole-founder or sole-liability status. All three must personally accept the same versioned documents from their own GitHub accounts before the full council operates under this proposed governance. The other two can accept *before* accepting an organizational invitation.

- [Founding acceptance and onboarding](FOUNDER_ONBOARDING.md)
- [Founding adoption record (Issue #3)](https://github.com/OpenDKG/.github/issues/3)
- [Automated final verification and Issue closing](FOUNDER_ADOPTION_AUTOMATION.md) — checks the three registered founder accounts; closes Issue #3 only once all three have personally accepted the same version.

Future non-founder members use the separate membership form. No one is automatically promoted to admin/Owner based on a form or comment. Equal cofounder status does not automatically transfer assets or divide statutory liability.

## Joining and signing

OpenDKG uses a **manual pre-invitation membership gate** and a **separate pull-request CLA check**. These processes are not active solely because the templates are published.

- [Membership procedure](MEMBERSHIP.md) — applicant acceptance, founder adoption, reviewer evidence and permission rules.
- [Membership agreement form](.github/ISSUE_TEMPLATE/membership-agreement.yml) — required acknowledgments referencing a fixed v1.0 policy revision.
- [CLA Assistant setup](CLA_SETUP.md) — external GitHub authorization and required checks for contributions across covered repositories.
- [PR template](.github/PULL_REQUEST_TEMPLATE.md) — contributor checklist, not a binding signature.

**Activation requires** adoption by all three founding maintainers and a human owner review before sending invitations. A separate CLA Assistant setup is still needed to gate PR merges.

### Source references

- [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)
- [Developer Certificate of Origin 1.1](https://developercertificate.org/)
- [GitHub default community health files](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file)
