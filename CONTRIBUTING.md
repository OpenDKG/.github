# Contributing to OpenDKG projects

Welcome to OpenDKG. These contribution guidelines are the **organization default** for repositories owned by **[OpenDKG](https://github.com/OpenDKG)** now or created later, **excluding NetPetra**. A project may have additional documented requirements, and the repository's own `LICENSE` determines its outbound software license.

**Default software license: Apache-2.0.** Each project must contain its **own** license file. Policies and the license in `OpenDKG/.github` do not automatically add a license to other repositories.

Read our [Contributor Agreement](https://github.com/OpenDKG/.github/blob/main/CONTRIBUTOR_AGREEMENT.md), [Governance](https://github.com/OpenDKG/.github/blob/main/GOVERNANCE.md) and [DCO](https://github.com/OpenDKG/.github/blob/main/DCO.md).

**Founders:** The three original equal OpenDKG cofounders, including `@a-51-50`, record their initial agreement through [Issue #3](https://github.com/OpenDKG/.github/issues/3), even before joining the organization. Ordinary future members use the [membership procedure](MEMBERSHIP.md). Founder status is not conferred by requesting membership.

## Before your first contribution

1. Check the specific repository's `LICENSE`, `README`, third-party notices, and any special rules. If its license differs from Apache-2.0, obtain explicit permission to submit under the stated license.
2. Explicitly accept the **current Contributor Agreement version** through an attributed GitHub acknowledgment referring to its exact commit SHA. One valid acceptance is intended to cover subsequent authorized contributions to current and future OpenDKG repositories, except NetPetra, until a material policy revision needs new acceptance. Acceptance is **not** automatic from joining an organization.
3. Use a stable GitHub account/pseudonym and an email you control; check that any employer, client or coauthor rights have been cleared.
4. Sign off each commit with the Developer Certificate of Origin: `git commit -s -m "Your change"`. This is separate from, and **does not replace**, the agreement acceptance. Use GPG/SSH signing additionally if your repository enforces verified cryptographic commits.
5. Submit a PR; wait for independent maintainer review, required checks and licensing/provenance verification.

For contributions created **before** the policy was adopted, the relevant rights-holders must separately and expressly identify the earlier commits/PRs they authorize; this policy does not retroactively convert older unlicensed work.

## Git setup example

```bash
git config user.name "YourPublicHandle"
git config user.email "your-own-address@example.invalid"
git switch -c feature/short-description
# Make and test changes
git add .
git commit -s -m "Explain the change"
git push -u origin feature/short-description
```

Replace the placeholder email with your **real controlled** email or suitable GitHub no-reply address. The `-s` switch adds a DCO trailer; it is **not** a cryptographic signature.

## Pull request checklist

- Describe the behavior change, motivation, tests and any user-visible limitations.
- Disclose and properly credit third-party code, documentation, icons, data, generated material, dependencies and AI-assisted work. AI assistance does not by itself establish that the contribution is lawful or reliable.
- Never commit private data, credentials, API keys, proprietary material, other people's identifying details or raw sensitive logs.
- Add tests and review security/privacy impact, especially where privileged system APIs, networking, cryptography, wallets, auto-updaters or file deletion are involved.
- Keep destructive operations reversible where possible; do not promise guaranteed protection from malware, fraud or data loss.
- Make sure each commit has a `Signed-off-by` trailer and the Contributor Agreement acceptance is recorded before merging.
- Follow the review requirements under [Governance](https://github.com/OpenDKG/.github/blob/main/GOVERNANCE.md).

### Suggested PR declaration

```text
License of the target repository: Apache-2.0 / other (specify)
Third-party sources and notices: none / listed
Tests and security/privacy impact: ...
DCO sign-offs included: yes / no
Contributor Agreement v1.0 accepted: [link to explicit acceptance]
Agreement revision (commit SHA): ...
Existing work included in the license grant: none / exact links
```

## Reporting issues or vulnerabilities

Use GitHub issues for ordinary bugs. If a repository enables **Private vulnerability reporting**, use that channel for security vulnerabilities; otherwise follow its `SECURITY.md` or contact the authorized maintainer privately through a documented project channel. Do not publish exploitable vulnerabilities or sensitive user data in an issue.

## Maintainer decisions and disagreements

Contribution review is independent of ownership. Founders must record their explicit adoption of governance and of the Contributor Agreement; developer departure does not withdraw previously valid public open-source licenses. Licensing disagreements require documentation and careful investigation, not automatic deletion of git history.
