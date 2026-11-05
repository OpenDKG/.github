# OpenDKG Governance

**Version:** 1.0 — proposed for adoption  
**Scope:** OpenDKG GitHub organization and its current and future organization-owned projects.

> OpenDKG is presently treated here as an **informal collaboration of individuals**, not a registered company, employer, partnership, or separate legal person. This document sets voluntary operating rules; it does not determine ownership of a personal domain, trademark, bank account, wallet, signing certificate or other asset. It cannot override GitHub's technical permissions or applicable law.

## 1. Three equal cofounders and staged technical onboarding

**OpenDKG was established as a collaboration of three equal cofounders from the outset.** All three founding seats have the same proposed governance status. The fact that `@a-51-50` created the GitHub organization first and is currently its only technical Organization Owner **does not grant superior founder status, extra votes, exclusive project copyright, a permanent veto, or unilateral ownership of other people's contributions**. GitHub's actual technical permissions remain effective until separately changed.

The founding group comprises `@a-51-50` and **two other original cofounders**, whose GitHub handles will be recorded only when those people personally confirm their involvement. Do not invent their handles, declare consent for them, or list an unconsenting person as contractually bound. The three founding seats are **reserved for this original group**; a later unrelated member cannot claim founder status by checking an application box.

**Each of the three cofounders must independently and affirmatively accept** the exact version of this Governance document and `CONTRIBUTOR_AGREEMENT.md`, using their **own GitHub accounts**, in the [founding adoption record](https://github.com/OpenDKG/.github/issues/3). They can read and comment on that public issue **before** joining the GitHub organization. The initial three-cofounder governance agreement takes effect **among those who have validly accepted**, and the council's collective operating rules are treated as fully adopted when **all three** have accepted the same pinned revision. A GitHub invitation, PR merge, checkbox submitted on another person's behalf, or existing membership is not acceptance.

### Bootstrap sequence (no founder has extra standing)

1. `@a-51-50` is **temporary technical custodian**, solely because GitHub requires an existing owner to create the organization and send invitations. This is not a legal designation of sole founder and is not an agreement imposing all project liabilities on that person.
2. All three cofounders review the same version-pinned documents and personally post their acceptance in **Issue #3**. Any substantive pre-adoption change requires acceptance of the final revision by all three. Pseudonymous public GitHub identities are permitted, but are not legal identity verification.
3. Once each candidate has personally accepted and confirmed that they are one of the **original three**, `@a-51-50` may send a GitHub invitation to that person. They may initially join with the **Member** role while the remaining acceptances or organizational setup are being completed. Signing is never replaced by accepting an invitation.
4. When all three have accepted, record the three comment URLs and the agreed **founder roster**. The initial unanimous adoption documents the group's equal standing, independently of invitation order. Subject to the founders' recorded decision and each account's consent, grant the agreed GitHub administrative permissions (ideally three distinct Organization Owners for equal platform administration, if all three intend that role). **Repository Admin is not the same as Organization Owner**. No privilege is granted automatically by a GitHub Issue.
5. From that point, ordinary majority or two-thirds council rules govern new appointments, according to the sections below. Ordinary members and external contributors **are not cofounders** and receive no council vote or Organization Owner access by default.

Each cofounder keeps their pre-existing personal assets and their own copyrights unless a separate, valid agreement says otherwise. A statement that there are three cofounders **does not automatically apportion all personal legal liability equally**, establish an LLC, or protect anyone from claims. Legal responsibility depends on actual conduct, contractual parties, and applicable law.

Public aliases may be used, but a GitHub handle is not proof of legal identity. Protect any privately verified identity information outside public git history. Never put passwords, recovery codes, or civil identity documents in an issue.

A cofounder may resign by a dated written message recorded in the governance log. Past validly granted licenses remain effective. Subsequent maintainers may be appointed by **two-thirds of active voting cofounders/maintainers, rounded up**, and must affirmatively accept applicable rules before receiving privileged access. Admission to GitHub membership alone does not provide a governance vote.

## 2. Approval rules

Once the three-cofounder council is constituted, the three equal cofounders use the following rules:

| Action | Required approval |
| --- | --- |
| Normal pull request | At least one other qualified maintainer reviewer, passing checks |
| Security-sensitive code, privileged code or update mechanism | At least two maintainers, including one other than the author |
| Publishing official executable releases or changing release-signing credentials | At least two maintainers and a documented release check |
| Adding organization owners after initial cofounder onboarding, changing account custody, or changing domain/service control | At least two active council members and a recorded handover plan |
| Changing governance, brand policy, accepted license defaults, or donations policy | Two of the three, documented in a public PR/issue where safe |
| Removing a maintainer for cause | Both other founders (when three are active), with notice and opportunity to respond unless security requires temporary suspension |
| Relicensing another contributor's copyrighted work | **Not authorized by a vote**; obtain the relevant rightsholders' permissions |

An interested maintainer must disclose conflicts. Emergency credential suspension may be done promptly to contain a compromise, but must be recorded and reviewed by the other maintainers as soon as safely practical. Do not confuse a policy requirement of 2/3 approval with a guaranteed GitHub technical enforcement mechanism: **organization owners may have platform privileges outside this voting policy**.

With two remaining active maintainers, require both for official releases and irreversible policy/asset decisions. With one remaining maintainer, pause irreversible actions and releases except narrowly necessary security notices or source-only containment while a successor is lawfully appointed. An inactive member can be considered for removal after reasonable documented attempts to contact them, but absence is never a copyright assignment or a license revocation.

## 3. Projects and license rules

- **Coverage:** All repositories owned by `github.com/OpenDKG` now or in the future, subject to a repository-specific written exception.
- **Default outbound software license:** Apache License 2.0; place an actual `LICENSE` in **each** repository. `OpenDKG/.github/LICENSE` does not license other repositories.
- If a repository uses another license, disclose it clearly **before** accepting contributions and obtain contributor approval for that repository's license. Existing third-party/copyleft or previously licensed material is not automatically relicensed by organizational policy.
- A newly transferred repository requires a provenance and governance review; this policy cannot retroactively bind its former contributors.
- Open-source licenses generally permit lawful forks; official brands, domains and trademarks are separate rights. The OpenDKG name does not establish trademark ownership or permission to use other organizations' marks.

## 4. Security and access control

- The three initial cofounders are intended to have **equal governance standing**. During setup one temporary technical custodian may remain the only GitHub Owner. After personal acceptance and an agreed handover, aim for **three distinct Organization Owners if all three cofounders approve that technical role**, each with separate MFA and recovery. GitHub Owners can technically act unilaterally despite voluntary two-thirds rules; use independent reviews and written asset-custody arrangements. Avoid shared passwords.
- Protect default and release branches where the GitHub plan allows: pull-request reviews, CI checks, no force-pushes or deletion, restricted bypass and required DCO sign-offs.
- Store CI credentials as scoped secrets, minimize permissions of automation, review all external dependencies and publish auditable releases.
- Record who actually owns each domain, trademark filing, signing certificate, hosting contract, payment account or wallet. An unincorporated GitHub organization is not itself automatically the legal owner.
- If a maintainer leaves, promptly remove their privileged access, rotate compromised/shared secrets, secure publishing paths, and preserve commit and acceptance evidence.

## 5. Decisions and amendments

Record significant votes and policy changes in GitHub issues/PRs, including participants, date, version, approvals and the resulting commit SHA. A change to this policy requires two of three active cofounders; after new maintainers join, two-thirds of active maintainers rounded up. A material change to the **Contributor Agreement** requires renewed affirmative acceptance by each contributor to whom the new terms are to apply; prior license grants remain intact.

Decisions about real-world contracts, personal property, taxes, jurisdiction, domain custody and trademarks require separate arrangements with identifiable parties where necessary. A governance vote cannot make someone else liable for a personal obligation or transfer their assets without legally effective consent.

## 6. Donations and finances

No shared project money should be collected until the council adopts a separate policy covering the actual receiving person, purpose, bookkeeping, refunds where relevant, tax reporting, transparency and separation of project and personal funds. Crypto wallet possession does not determine beneficial ownership or remove legal duties. Do not imply that sponsors purchase votes, guarantee support, or receive equity without separately reviewed lawful documentation.

## 7. Security reporting and conduct

Disclose vulnerabilities privately using a repo's enabled **Private vulnerability reporting** or its own `SECURITY.md`, if configured; do not post exploitable details publicly. Never promise absolute security. Contributors must respect relevant code of conduct and security requirements in `CONTRIBUTING.md`.

## 8. Disclaimer

These rules are operational governance, **not** a limited-liability shield and not a substitute for a jurisdiction-specific legal agreement among individuals. Public anonymity may complicate enforcement. They do not override licenses, non-waivable law, or GitHub's terms and permissions.
