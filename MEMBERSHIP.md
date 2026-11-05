# OpenDKG membership and acceptance procedure

**Status: proposed until the three original equal cofounders each personally accept the v1.0 Governance and Contributor Agreement.** This procedure covers repositories owned by [OpenDKG](https://github.com/OpenDKG), **excluding NetPetra** even if it is transferred to this organization. It is not a legal-person registration or a guarantee of enforceable e-signatures.

## Automated intake checks

See [MEMBERSHIP_AUTOMATION.md](MEMBERSHIP_AUTOMATION.md). A GitHub Actions workflow validates form structure, matches the claimed username to the actual issue author, checks pinned acknowledgments, adds a validation label, and posts a timestamped body-hash receipt. **It never sends invitations or grants GitHub permissions.** The current three-founder adoption requirement remains mandatory.

## Original three cofounders — separate acceptance path

OpenDKG has **three equal cofounders from the outset**; the initial technical GitHub Organization Owner `@a-51-50` is not the sole founder. Each of the other two cofounders may **sign from their own GitHub account before joining** OpenDKG: visit [Founders' adoption Issue #3](https://github.com/OpenDKG/.github/issues/3), read the pinned exact revision, and personally post the prescribed acceptance. The same requirement applies to `@a-51-50`. Do not treat an invitation, membership, or this documentation as consent.

After each original cofounder accepts, the current technical owner can send that cofounder an organization invitation. Joining as Member is sufficient for onboarding. Once all three accept, the initial roster is documented and the agreed administrative roles can be assigned **manually**; no GitHub Action promotes accounts. These three founder seats do not become available to outside applicants. Refer to [GOVERNANCE.md](GOVERNANCE.md) and [FOUNDER_ONBOARDING.md](FOUNDER_ONBOARDING.md).

## For applicants (future non-founder contributors)

1. Read the **immutable v1.0 revision** of [Contributor Agreement](https://github.com/OpenDKG/.github/blob/2e429d904db1059a678085792ad44f1d732d7ea1/CONTRIBUTOR_AGREEMENT.md), [Governance](https://github.com/OpenDKG/.github/blob/2e429d904db1059a678085792ad44f1d732d7ea1/GOVERNANCE.md), [Contribution Guidelines](https://github.com/OpenDKG/.github/blob/2e429d904db1059a678085792ad44f1d732d7ea1/CONTRIBUTING.md), and [DCO](https://github.com/OpenDKG/.github/blob/2e429d904db1059a678085792ad44f1d732d7ea1/DCO.md). Version reference: `2e429d904db1059a678085792ad44f1d732d7ea1`.
2. From the account that will join OpenDKG, [open the membership form](https://github.com/OpenDKG/.github/issues/new?template=membership-agreement.yml) **in OpenDKG/.github** and complete all required consent checkboxes. Pseudonymous public GitHub accounts are allowed.
3. The membership request is a **public GitHub issue**. Never post legal names, identity documents, emails, tokens, or sensitive information. Do not impersonate another account or submit on somebody else's behalf.
4. A maintainer reviews the issue; if accepted, an organization owner sends an invitation **after** recording explicit approval. Until then, the applicant has no organization membership or privileged access.
5. GitHub membership does **not** automatically mean maintainer voting rights. Permission levels are granted separately and the Governance document controls who may approve them. People can contribute via ordinary PRs without organization membership, subject to repository licensing and CLA checks.

## For maintainers: manual admission gate

**Do not send invitations before a candidate's own consent.** For the original three cofounders follow the acceptance sequence above; for other applicants use the membership form below. GitHub's standard invitation flow does not natively force a candidate to execute this form before accepting an invite; organization owners can technically bypass this process. Accordingly, use the following operational policy, not a claim of platform enforcement.

1. For an **ordinary, non-founder application**, check the founding adoption record for affirmative acceptance by **all three equal cofounders** of the exact applicable revision. If that is not complete, do not treat the v1.0 agreement as effective.
2. Confirm the issue was created in **OpenDKG/.github** by the **same GitHub account** seeking access; confirm that all checkbox answers are affirmatively selected and that the agreement version is the pinned revision above. **Issue bodies can be edited**, so record the issue URL, current content and observation time at review. If material consent is ambiguous or was edited, obtain a new unambiguous confirmation from the applicant and preserve the evidence.
3. Record a maintainer review comment, for example:

   `Membership reviewed: @HANDLE; Agreement v1.0 at 2e429d904db1059a678085792ad44f1d732d7ea1; original issue #NUMBER; review UTC YYYY-MM-DDTHH:MM:SSZ; approval by @REVIEWER; approved role MEMBER; authorization for invite only. This comment does not certify civil identity or rights ownership.`

4. Obtain the minimum maintainer approvals required by [GOVERNANCE.md](GOVERNANCE.md) for the role/access being granted. In particular, adding owners requires at least two maintainers, per the proposed v1.0 rules.
5. Only then issue the GitHub invitation. Prefer a normal organization member with **no default write privilege**. Grant per-repository permissions using least privilege; promote to maintain or owner only via the documented governance approval.
6. Link the membership request and approval to the project's private access ledger (or a public issue index containing **only GitHub handles and publicly posted links**). Preserve the agreement revision, timestamp and author attribution. Retain an export or other separate evidence when stronger proof matters; an editable GitHub Issue alone is not an immutable signed contract.
7. If a member leaves, promptly remove access and rotate affected credentials. Do **not** delete historic valid licenses or consent evidence. Update the ledger.

## Founders and existing contributors

- The **three original equal cofounders** must each explicitly accept the original governance and Contributor Agreement at the same pinned revision, with a recorded link. The technical owner who created the organization has no extra governance vote or status. Their approval cannot be inferred merely from merging a PR or from existing GitHub membership.
- Existing OpenDKG members should follow this process before the organization relies on these terms for them.
- Code submitted **before** adoption needs a separate, traceable permission review; this process does not retroactively license third-party work.
- Material changes to the Contributor Agreement need **new affirmative acceptance** for the new version before relying on it for new submissions. Previous licenses are not revoked.
- Do not automatically use this workflow for a non-Apache-2.0 repository: the Contributor Agreement requires additional approval for contributions under a different license.

## Contributors who are not organization members

Open-source pull requests may come from external GitHub users. Requiring an organization membership application from every external PR author is usually unnecessary. Use a dedicated **CLA signing check** and the DCO for those contributions. Follow [CLA_SETUP.md](CLA_SETUP.md) to configure the independent check in **each** applicable repository.

## Legal and technical limitations

A checkbox is evidence of an affirmative action, not proof of civil identity or a universally enforceable electronic signature. GitHub organization owners may invite members without this form and may bypass some technical branch requirements. Policies and permissions must be periodically audited. For more stringent contracts, arrange privately verified identities and legally appropriate signatures, without publishing private documents in GitHub.
