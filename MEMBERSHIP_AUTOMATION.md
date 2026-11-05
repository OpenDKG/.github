# Automated OpenDKG membership review

The `OpenDKG/.github` repository has a GitHub Actions workflow that automatically validates the **structure** of a membership application, records a GitHub Actions comment with the acceptance version and body SHA-256, and adds either `intake:format-validated` or `intake:needs-correction`. It does **not** invite people, grant permissions, assert legal enforceability or certify identity.

## Who uses this automation

The **three original equal cofounders**, including `@a-51-50`, personally accept via [Issue #3](https://github.com/OpenDKG/.github/issues/3) even when they are not yet organization members. Their founding status does not depend on invite order. See [FOUNDER_ONBOARDING.md](FOUNDER_ONBOARDING.md).

This automated Issue Form validator is for **other future members and contributors**, not the original founding trio. It validates a form's content but does not approve or invite anyone.

## Applicant workflow

1. Read [Contributor Agreement v1.0](CONTRIBUTOR_AGREEMENT.md), [Governance v1.0](GOVERNANCE.md), [Contribution Guidelines](CONTRIBUTING.md), and [DCO](DCO.md).
2. Open the [membership form](https://github.com/OpenDKG/.github/issues/new?template=membership-agreement.yml) with your own GitHub account and check each required consent item. The form pins revision `2e429d904db1059a678085792ad44f1d732d7ea1`. NetPetra is expressly excluded.
3. GitHub Actions runs on an opened, edited or reopened Issue. It checks that the claimed GitHub handle equals the actual Issue author and that all required checked statements include the correct agreement version.
4. The workflow comments with a timestamp, exact pinned policy SHA and SHA-256 of the submitted issue body. If the format is incomplete, edit the form or submit a new one. Editing a request is revalidated and a new receipt is appended for changed content.
5. A maintainer **must manually review the request and approve it before anyone sends an organization invitation**. Even a valid-format label is not an invitation or contract verification. Preserve the recorded receipt and the approver's separate comment.

## Important conditions before admitting applicants

- **All three founders must personally and explicitly adopt** the relevant version in [Issue #3](https://github.com/OpenDKG/.github/issues/3). A merged policy PR does not mean the three have agreed.
- The applicant's acknowledgement must be genuine and personally authored under the GitHub identity they control. GitHub pseudonyms are accepted; GitHub does **not** verify legal identity.
- The organization owner must approve invitations and apply least-privilege repository access. Even after approval, a membership invitation is made manually and the person must accept GitHub's invitation.
- If the issue is edited after approval, **review it again**. The latest label can change, but an old recorded approval is not automatically rescinded by GitHub. A SHA-256 of an issue body is an integrity marker, not a qualified electronic signature or a complete immutable snapshot.
- Do not paste real names, identity documents, private emails, private keys or other sensitive information in public GitHub Issues.

## Implementation and cost

- Workflow: `.github/workflows/membership-intake.yml`.
- Pure code: `scripts/membership-validator.mjs` and `scripts/membership-intake.mjs`.
- Automated tests: `scripts/membership-validator.test.mjs`, checked by `.github/workflows/test-membership-intake.yml` during PRs.
- Uses GitHub-hosted runners, Node 22, the built-in `GITHUB_TOKEN` with **contents: read** and **issues: write** only. **No external SaaS, payment, personal-access token, custom GitHub App, or webhook server is needed** for this validation.
- Configure GitHub Actions to run on this public repo; check the Actions tab after merge to make sure workflows are enabled. The workflow does not run for Issues opened **before** the workflow exists, unless an Issue is subsequently edited or reopened.
- Contributors from outside the organization still need their own CLA acceptance when contributing code. See [CLA_SETUP.md](CLA_SETUP.md). This intake bot is **not** a CLA enforcement status check.
- Native GitHub organization invitations cannot be configured to force the applicant to complete a custom Issue Form. Administrators can technically invite members outside this procedure. Treat the policy as an admissions process followed by owners, not as an unbreakable platform restriction.
- New OpenDKG project repos do not automatically inherit the membership workflow as a functioning GitHub Action. Membership applications are centralized in this `.github` repo; future projects should link to it. Code-contribution CLA/DCO checks need separate repo enrollment or rulesets.
