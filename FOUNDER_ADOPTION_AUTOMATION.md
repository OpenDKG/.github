# Automatic closing of the three-cofounder adoption issue

## What it does

The GitHub Actions workflow `.github/workflows/founder-adoption.yml` watches comments on [Issue #3](https://github.com/OpenDKG/.github/issues/3), as well as edits/deletions, issue reopening, and changes to the roster.

It **only** marks the founding agreement adopted when **three specific, pre-registered, distinct personal GitHub accounts** have each publicly posted the **exact required declaration**, personally accepting the **same pinned** Contributor Agreement and Governance revision:

`d56279b4f3c25dd8f9e68699d61be23a0c7a6b07`.

The automation checks the stable GitHub **numeric account IDs** behind the roster handles, and the **currently visible** comment text. It will ignore an extra or impersonating comment, a GitHub bot, another policy revision, or a different Issue number. It does not claim to verify civil identities or the legal validity of a signature.

Once all three pass, it:
1. Writes a public completion receipt listing each acceptance comment permalink, GitHub user ID, SHA-256 comment-body fingerprint, policy revision, and UTC verification timestamp.
2. Adds label `founders:agreement-complete`.
3. **Closes Issue #3** as completed.

If a signature is **later edited or deleted**, the same workflow reassesses the three accounts. If a formerly completed issue no longer has all three currently valid declarations, it **reopens Issue #3**, removes the completed label, and writes a warning. A completion receipt is a *historical observation*, not an immutable or legally qualified e-signature; administrators can still change GitHub issue state manually. GitHub's API and Git history do not make comments undeletable.

## Initial configuration — required before it can auto-close

The committed configuration [`.github/founder-roster.json`](.github/founder-roster.json) starts with three reserved seats:

```json
{
  "issue_number": 3,
  "policy_commit": "d56279b4f3c25dd8f9e68699d61be23a0c7a6b07",
  "founder_logins": ["a-51-50", null, null]
}
```

The **two null entries intentionally prevent automatic closing**. Once the two other *original equal cofounders* give you their actual GitHub usernames, open a reviewed PR that replaces **only those two null values** with their handles, e.g., `"cofounder-two"` and `"cofounder-three"`. Do **not** invent account names, use GitHub profile display names, or fill the seats with a random contributor. Keep the three original persons' identities distinct.

After roster change merges into `main`, a `push` event automatically checks already-posted comments; a new or edited comment on Issue #3 also triggers it. The three founders **do not need to be members of OpenDKG to post** on the public Issue, and no additional acceptance is required from `@a-51-50` if the **existing exact-revision declaration remains valid**.

Do not edit the policy commit in the roster just to bypass missing consent. If substantive policy terms change, arrange a separate new version with each person's explicit approval; never auto-count an older acceptance as agreement to new terms.

## Access and permissions

The workflow **never sends GitHub organization invitations, grants Repository Admin/Owner roles, or assigns legal liability**. Those changes still require explicit authorized organizational action. The three original cofounders retain equal intended governance standing regardless of who created the GitHub organization, and ordinary future contributors do not acquire founder rights.

GitHub Actions uses the repository-scoped default `GITHUB_TOKEN` with `contents: read` and `issues: write`; no personal token, dedicated external server, subscription, or third-party service is required for this task. The workflow runs only on trusted `main` code; comment text is data and never executed as a shell command.

The main requirement is to keep the [Issue #3](https://github.com/OpenDKG/.github/issues/3) available and preserve the public acceptance records. For stronger proof, export the receipt and public evidence separately after completion, and obtain appropriate legal advice before relying on it as a binding cross-jurisdiction founder agreement.
