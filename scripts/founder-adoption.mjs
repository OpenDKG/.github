// GitHub Actions: close Issue #3 only after three pre-designated founders accept.
import { readFileSync } from "node:fs";
import { validateRoster, evaluateFounderAcceptance, POLICY_COMMIT, FOUNDER_ISSUE, COMPLETE_LABEL } from "./founder-adoption-validator.mjs";

if (process.env.GITHUB_REPOSITORY !== "OpenDKG/.github") throw new Error("Unexpected repository.");
const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));
const eventName = process.env.GITHUB_EVENT_NAME;
if ((eventName === "issue_comment" || eventName === "issues") &&
   (event.issue?.number !== FOUNDER_ISSUE || event.issue?.pull_request)) process.exit(0);
if (eventName === "issue_comment" && event.comment?.user?.type === "Bot") process.exit(0);

const roster = JSON.parse(readFileSync(new URL("../.github/founder-roster.json", import.meta.url), "utf8"));
const configuration = validateRoster(roster);
if (configuration.errors.length) throw new Error("Invalid founder roster: " + configuration.errors.join("; "));
if (!configuration.ready) {
  console.log("Two founder account handles are not yet configured; no issue state or labels changed.");
  process.exit(0);
}
const token = process.env.GITHUB_TOKEN;
if (!token) throw new Error("Missing GitHub Actions token.");
const prefix = "/repos/OpenDKG/.github";
async function api(method, path, body) {
  const res = await fetch("https://api.github.com" + path, {
    method,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: "Bearer " + token,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(body === undefined ? {} : { "Content-Type": "application/json" })
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) })
  });
  if (!res.ok) {
    const explanation = (await res.text()).slice(0, 500);
    const err = new Error(method + " " + path + ": HTTP " + res.status + " " + explanation);
    err.status = res.status;
    throw err;
  }
  return res.status === 204 ? null : res.json();
}

const issue = await api("GET", prefix + "/issues/" + FOUNDER_ISSUE);
if (issue.pull_request || !String(issue.body || "").includes("**Exact agreement revision:** " +
  String.fromCharCode(96) + POLICY_COMMIT + String.fromCharCode(96))) {
  throw new Error("Founding issue does not reference the expected immutable agreement revision.");
}

// Resolve each handle to a stable GitHub user ID. No wildcard acceptance.
const accounts = {};
for (const login of configuration.logins) {
  accounts[login.toLowerCase()] = await api("GET", "/users/" + encodeURIComponent(login));
}
const comments = [];
for (let page = 1; page <= 50; page++) {
  const results = await api("GET", prefix + "/issues/" + FOUNDER_ISSUE + "/comments?per_page=100&page=" + page);
  comments.push(...results);
  if (results.length < 100) break;
  if (page === 50) throw new Error("Too many issue comments; refusing to make an incomplete adoption decision.");
}
const result = evaluateFounderAcceptance(roster, accounts, comments);
if (result.errors.length) throw new Error("Founder verification error: " + result.errors.join("; "));

const labels = new Set((issue.labels || []).map((x) => x.name));
const hadCompletionLabel = labels.has(COMPLETE_LABEL);
const marker = "<!-- opendkg-founders-agreement-complete:" + POLICY_COMMIT + " -->";
const existingReceipt = comments.some((c) =>
  c.user?.login === "github-actions[bot]" && String(c.body || "").includes(marker)
);

if (!result.complete) {
  console.log("Not all three original founders have a currently valid acceptance.",
    JSON.stringify({ pending: result.missing, accepted: result.records.map((r) => r.login) }));
  if (hadCompletionLabel) {
    // Previously complete, but an acceptance was edited/deleted or roster changed.
    if (issue.state === "closed") await api("PATCH", prefix + "/issues/" + FOUNDER_ISSUE, { state: "open" });
    await api("DELETE", prefix + "/issues/" + FOUNDER_ISSUE + "/labels/" + encodeURIComponent(COMPLETE_LABEL));
    await api("POST", prefix + "/issues/" + FOUNDER_ISSUE + "/comments", {
      body: "### Founder acceptance requires renewed review\n\nA previously verified acceptance is now missing or no longer matches the recorded revision. The automation has reopened the issue and cleared its completion label. This does **not** revoke validly granted open-source licenses. Maintainers should review the remaining personal comments and verify all three identities again.\n\nPending accounts: " + result.missing.map((x) => "@" + x).join(", ")
    });
  }
  process.exit(0);
}

if (!existingReceipt) {
  const lines = [
    marker,
    "### Three original cofounders — adoption verified",
    "",
    "The three accounts recorded in the checked-in founder roster each publicly posted the prescribed statement accepting **Contributor Agreement v1.0** and **Governance v1.0** at the same immutable revision.",
    "",
    "- Policy commit: " + POLICY_COMMIT,
    "- Verification time (UTC): " + new Date().toISOString(),
    "- Founder acceptance records:",
    ...result.records.map((rec) =>
      "  - @" + rec.login + " (GitHub user ID " + rec.user_id + "): " +
      rec.comment_url + " — SHA-256 of current comment body: " + rec.declaration_sha256),
    "",
    "**Limitations:** The record verifies GitHub accounts and currently visible text, not civil identity, an uneditable qualified e-signature, a registered business, or an automatic assignment of copyrights. Repository access must still be granted separately by a GitHub organization owner. Historic open-source grants remain governed by their licenses."
  ];
  await api("POST", prefix + "/issues/" + FOUNDER_ISSUE + "/comments", { body: lines.join("\n") });
}
if (!hadCompletionLabel) {
  const color = "0e8a16";
  try {
    await api("GET", prefix + "/labels/" + encodeURIComponent(COMPLETE_LABEL));
  } catch (e) {
    if (e.status !== 404) throw e;
    try {
      await api("POST", prefix + "/labels", {
        name: COMPLETE_LABEL, color,
        description: "Three rostered original cofounders accepted the same policy revision."
      });
    } catch (createErr) { if (createErr.status !== 422) throw createErr; }
  }
  await api("POST", prefix + "/issues/" + FOUNDER_ISSUE + "/labels", { labels: [COMPLETE_LABEL] });
}
if (issue.state !== "closed") {
  await api("PATCH", prefix + "/issues/" + FOUNDER_ISSUE, { state: "closed", state_reason: "completed" });
  console.log("Founding acceptance complete: issue #3 closed.");
} else {
  console.log("Founding issue #3 already closed; completion confirmed.");
}
