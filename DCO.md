# Developer Certificate of Origin (DCO)

**For contributions to OpenDKG covered repositories (NetPetra excluded).** The following is the **verbatim Developer's Certificate of Origin 1.1** published by the Linux Foundation at https://developercertificate.org/. The DCO records a contributor's certification of their right to submit work; it is **not itself a copyright assignment, a standalone software license, or acceptance of `CONTRIBUTOR_AGREEMENT.md`**.

## Official DCO 1.1 text (unaltered)

```text
Developer Certificate of Origin
Version 1.1

Copyright (C) 2004, 2006 The Linux Foundation and its contributors.

Everyone is permitted to copy and distribute verbatim copies of this
license document, but changing it is not allowed.


Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
    have the right to submit it under the open source license
    indicated in the file; or

(b) The contribution is based upon previous work that, to the best
    of my knowledge, is covered under an appropriate open source
    license and I have the right under that license to submit that
    work with modifications, whether created in whole or in part
    by me, under the same open source license (unless I am
    permitted to submit under a different license), as indicated
    in the file; or

(c) The contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and I have not modified
    it.

(d) I understand and agree that this project and the contribution
    are public and that a record of the contribution (including all
    personal information I submit with it, including my sign-off) is
    maintained indefinitely and may be redistributed consistent with
    this project or the open source license(s) involved.
```

## How to sign off

Configure a stable **pseudonymous** author name and an email you control (for example, a GitHub no-reply address where it is compatible with your verification workflow):

```bash
git config user.name "MyPublicAlias"
git config user.email "my-project-email@example.invalid"
git commit -s -m "Describe the change"
```

This adds a commit-message trailer such as:

```text
Signed-off-by: MyPublicAlias <my-project-email@example.invalid>
```

Replace the example address with one that is **actually yours**. The sign-off email should match the commit author email if you use a DCO GitHub App that enforces this requirement. `git commit -s` is **not** a cryptographic commit signature: configure Git signing (SSH or GPG) separately if signed commits are required.

Every human-authored commit should be signed off, including commits amended or rebased after review. Maintainers should run an automated DCO check and make it a required status check. A sign-off does not establish the signer's legal identity or remove the need to verify third-party licensing.
