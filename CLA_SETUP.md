# OpenDKG CLA Assistant setup

**Status: setup instructions only.** Adding this file does **not** install a GitHub App, activate checks, or collect any signatures. An authorized OpenDKG owner must finish the external setup and GitHub rules configuration.

## Purpose

The [CLA Assistant service](https://cla-assistant.io/) can prompt an external pull-request contributor to sign a contributor license agreement using their GitHub identity, record who accepted which version, and report a PR status. The software is [open-source](https://github.com/cla-assistant/cla-assistant) and the project describes its hosted service as free. Review the service's privacy and permission implications before authorization.

**Important distinction:** The [membership form](.github/ISSUE_TEMPLATE/membership-agreement.yml) is the **pre-invitation gate** for members. CLA Assistant is the **pre-merge gate** for submitted code, including outside contributors. Neither substitutes for the other.

## Configuration by a GitHub organization owner

1. First complete the **unanimous founding adoption** of the proposed [Contributor Agreement](CONTRIBUTOR_AGREEMENT.md) and [Governance](GOVERNANCE.md).
2. Prepare the complete, unchanged effective **Contributor Agreement v1.0** as a public GitHub Gist linked to the adopted exact revision. Do not silently rewrite substantive terms. The reference OpenDKG agreement revision in this initial package is `12b4e5bfb23285f66127cfb979ed1327eaab8e64`; if it changes before adoption, pin and review the actual adopted revision instead.
3. Sign in at **https://cla-assistant.io/** with an authorized GitHub account. Link OpenDKG or each of its covered repositories to that Gist, and approve the requested GitHub authorization/installation as required by the service. Install/use it only for **OpenDKG covered repositories**, not NetPetra.
4. Open a harmless test PR from a **different GitHub account that has not signed**. Check that the service requests explicit agreement and posts the expected pending/failing status. Sign once, verify it changes to success and that the recorded version matches the approved text. Confirm it does not silently exempt authors who should sign.
5. In each covered repository, configure **Settings → Rules → Rulesets** (or Branch protection) to **require the CLA check** before merging into the protected branch. Select the actual check name shown by your test PR, not a guessed name. Require at least one independent review and restrict bypass permissions. GitHub Free supports branch protection for public repositories; review plan limitations for private repos.
6. Repeat or automate repository **enrollment** for every existing and subsequently created OpenDKG project. A central `.github` repository alone **does not enforce CLA checks in other repositories**. Check each repository after setup.
7. For non-Apache-2.0 projects, the general Contributor Agreement explicitly requires **separate permission for the project's license** before merging contributions. The CLA status alone is insufficient.
8. For material Contributor Agreement amendments, version/pin the new agreement, update the service's Gist and verify that contributors are asked to **re-sign**. Do not retroactively revoke valid prior open-source licenses.

## GitHub PR template and DCO

This repository also contains `.github/PULL_REQUEST_TEMPLATE.md`, which prompts authors to link acceptance and confirm DCO `Signed-off-by:` trailers (`git commit -s`). **Checklists are not enforcement.** Independently configure a DCO check in each project and make it required if you wish to block unsigned commits; a cryptographic commit signature is separate from a DCO sign-off.

## Before enabling for the public

- Review CLA Assistant's data processing/privacy policy and permissions. Never enter private identity documents into public issues or a public Gist.
- Confirm the pinned agreement matches the text displayed to signers and that the actual acceptance record is recoverable.
- Make the protected-branch check mandatory after a successful test. Otherwise a contributor may bypass it through a direct merge.
- Note that GitHub org owners or authorized bypass users may be able to override controls; this is an operational compliance process, not an absolute guarantee of consent or enforceability.
