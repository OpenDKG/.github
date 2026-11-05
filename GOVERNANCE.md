# OpenDKG Governance

**Version:** 1.0 — proposed for adoption  
**Scope:** OpenDKG GitHub organization and its current and future organization-owned projects, **excluding NetPetra**.

> OpenDKG is presently treated here as an **informal collaboration of individuals**, not a registered company, employer, partnership, or separate legal person. This document sets voluntary operating rules; it does not determine ownership of a personal domain, trademark, bank account, wallet, signing certificate or other asset. It cannot override GitHub's technical permissions or applicable law.

## 1. Founding maintainers and effective date

The initial council consists of **three individual founders using their established GitHub handles**. They must identify themselves in one linked, publicly auditable **adoption issue or pull request** in `OpenDKG/.github`, explicitly accept `CONTRIBUTOR_AGREEMENT.md` and these governance rules at a pinned commit revision, and agree which accounts hold organization-owner permissions. Their three acceptance links form the **founder roster**, without public disclosure of legal names. **Until all three accept, this document is a proposal rather than an agreement among the three.**

Public aliases may be used, but a GitHub handle is not proof of legal identity. Protect any privately verified identity information outside public git history. Never put passwords, recovery codes or civil identity documents in an issue.

A founder may resign by a dated written message recorded in the governance log. Past validly granted licenses remain effective. New maintainers may be added by **2/3 of active maintainers, rounded up**, and must affirmatively accept the current rules before receiving privileged access. Admission to GitHub membership alone does not provide a governance vote.

## 2. Approval rules

For the initial three-maintainer council:

| Action | Required approval |
| --- | --- |
| Normal pull request | At least one other qualified maintainer reviewer, passing checks |
| Security-sensitive code, privileged code or update mechanism | At least two maintainers, including one other than the author |
| Publishing official executable releases or changing release-signing credentials | At least two maintainers and a documented release check |
| Adding organization owners, changing account custody, or changing domain/service control | At least two maintainers and a recorded handover plan |
| Changing governance, brand policy, accepted license defaults, or donations policy | Two of the three, documented in a public PR/issue where safe |
| Removing a maintainer for cause | Both other founders (when three are active), with notice and opportunity to respond unless security requires temporary suspension |
| Relicensing another contributor's copyrighted work | **Not authorized by a vote**; obtain the relevant rightsholders' permissions |

An interested maintainer must disclose conflicts. Emergency credential suspension may be done promptly to contain a compromise, but must be recorded and reviewed by the other maintainers as soon as safely practical. Do not confuse a policy requirement of 2/3 approval with a guaranteed GitHub technical enforcement mechanism: **organization owners may have platform privileges outside this voting policy**.

With two remaining active maintainers, require both for official releases and irreversible policy/asset decisions. With one remaining maintainer, pause irreversible actions and releases except narrowly necessary security notices or source-only containment while a successor is lawfully appointed. An inactive member can be considered for removal after reasonable documented attempts to contact them, but absence is never a copyright assignment or a license revocation.

## 3. Projects and license rules

- **Coverage:** All repositories owned by `github.com/OpenDKG` now or in the future, subject to a repository-specific written exception.
- **Permanent named exclusion:** **NetPetra** remains out of scope even if subsequently moved to this organization, until a separately documented agreement expressly includes it and rights-holders consent as needed.
- **Default outbound software license:** Apache License 2.0; place an actual `LICENSE` in **each** repository. `OpenDKG/.github/LICENSE` does not license other repositories.
- If a repository uses another license, disclose it clearly **before** accepting contributions and obtain contributor approval for that repository's license. Existing third-party/copyleft or previously licensed material is not automatically relicensed by organizational policy.
- A newly transferred repository requires a provenance and governance review; this policy cannot retroactively bind its former contributors.
- Open-source licenses generally permit lawful forks; official brands, domains and trademarks are separate rights. The OpenDKG name does not establish trademark ownership or permission to use other organizations' marks.

## 4. Security and access control

- At least **two distinct organization owners**, separate MFA, individual credentials and recovery methods. Avoid shared passwords.
- Protect default and release branches where the GitHub plan allows: pull-request reviews, CI checks, no force-pushes or deletion, restricted bypass and required DCO sign-offs.
- Store CI credentials as scoped secrets, minimize permissions of automation, review all external dependencies and publish auditable releases.
- Record who actually owns each domain, trademark filing, signing certificate, hosting contract, payment account or wallet. An unincorporated GitHub organization is not itself automatically the legal owner.
- If a maintainer leaves, promptly remove their privileged access, rotate compromised/shared secrets, secure publishing paths, and preserve commit and acceptance evidence.

## 5. Decisions and amendments

Record significant votes and policy changes in GitHub issues/PRs, including participants, date, version, approvals and the resulting commit SHA. A change to this policy requires two of three active founding maintainers; after new maintainers join, two-thirds of active maintainers rounded up. A material change to the **Contributor Agreement** requires renewed affirmative acceptance by each contributor to whom the new terms are to apply; prior license grants remain intact.

Decisions about real-world contracts, personal property, taxes, jurisdiction, domain custody and trademarks require separate arrangements with identifiable parties where necessary. A governance vote cannot make someone else liable for a personal obligation or transfer their assets without legally effective consent.

## 6. Donations and finances

No shared project money should be collected until the council adopts a separate policy covering the actual receiving person, purpose, bookkeeping, refunds where relevant, tax reporting, transparency and separation of project and personal funds. Crypto wallet possession does not determine beneficial ownership or remove legal duties. Do not imply that sponsors purchase votes, guarantee support, or receive equity without separately reviewed lawful documentation.

## 7. Security reporting and conduct

Disclose vulnerabilities privately using a repo's enabled **Private vulnerability reporting** or its own `SECURITY.md`, if configured; do not post exploitable details publicly. Never promise absolute security. Contributors must respect relevant code of conduct and security requirements in `CONTRIBUTING.md`.

## 8. Disclaimer

These rules are operational governance, **not** a limited-liability shield and not a substitute for a jurisdiction-specific legal agreement among individuals. Public anonymity may complicate enforcement. They do not override licenses, non-waivable law, or GitHub's terms and permissions.
