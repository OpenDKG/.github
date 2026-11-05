// GitHub Actions handler. Operates only in OpenDKG/.github; never sends invitations.
import { readFileSync } from "node:fs";
import { validateMembershipIssue, POLICY_SHA, FORM_PREFIX } from "./membership-validator.mjs";

const repo = process.env.GITHUB_REPOSITORY;
const token = process.env.GITHUB_TOKEN;
const eventFile = process.env.GITHUB_EVENT_PATH;
if (repo !== "OpenDKG/.github") throw new Error("Refusing to act outside OpenDKG/.github");
if (!token || !eventFile) throw new Error("GitHub Actions token/event file missing");

const event = JSON.parse(readFileSync(eventFile, "utf8"));
const issue = event.issue;
if (!issue || issue.pull_request) process.exit(0);
const presentLabels = new Set((issue.labels || []).map((label) => typeof label === "string" ? label : label.name));
if (!issue.title.startsWith(FORM_PREFIX) &&
    ![...presentLabels].some((label) => label.startsWith("intake:"))) {
  process.exit(0);
}
const outcome = validateMembershipIssue(issue);
const issueNumber = issue.number;
const prefix = "/repos/OpenDKG/.github";
async function api(method, path, data) {
  const response = await fetch("https://api.github.com" + path, {
    method,
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": "Bearer " + token,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(data === undefined ? {} : { "Content-Type": "application/json" })
    },
    ...(data === undefined ? {} : { body: JSON.stringify(data) })
  });
  if (!response.ok) {
    const reason = (await response.text()).slice(0, 600);
    const error = new Error(method + " " + path + " failed: " + response.status + " " + reason);
    error.status = response.status;
    throw error;
  }
  if (response.status === 204) return null;
  return response.json();
}
const goodLabel = "intake:format-validated";
const badLabel = "intake:needs-correction";
const targetLabel = outcome.valid ? goodLabel : badLabel;
const oldLabel = outcome.valid ? badLabel : goodLabel;
async function ensureLabel(name, description, color) {
  try {
    await api("GET", prefix + "/labels/" + encodeURIComponent(name));
  } catch (error) {
    if (error.status !== 404) throw error;
    try {
      await api("POST", prefix + "/labels", { name, color, description });
    } catch (createError) {
      if (createError.status !== 422) throw createError;
    }
  }
}
await ensureLabel(goodLabel, "Consent form structure validated; human review and founder adoption still required.", "bfdadc");
await ensureLabel(badLabel, "Missing, mismatched, or changed membership acceptance fields.", "f2b8b5");
if (presentLabels.has(oldLabel)) {
  await api("DELETE", prefix + "/issues/" + issueNumber + "/labels/" + encodeURIComponent(oldLabel));
}
if (!presentLabels.has(targetLabel)) {
  await api("POST", prefix + "/issues/" + issueNumber + "/labels", { labels: [targetLabel] });
}

// Append one hash-based audit receipt for each distinct submitted issue-body version.
const marker = "<!-- opendkg-intake:" + outcome.bodyHash + ":" + (outcome.valid ? "valid" : "invalid") + " -->";
let found = false;
let page = 1;
while (!found && page <= 20) {
  const comments = await api("GET", prefix + "/issues/" + issueNumber + "/comments?per_page=100&page=" + page);
  found = comments.some((comment) =>
    comment.user?.login === "github-actions[bot]" && String(comment.body || "").includes(marker)
  );
  if (comments.length < 100) break;
  page++;
}
if (!found) {
  const lines = [
    marker,
    "### OpenDKG automated membership intake — " + (outcome.valid ? "format validated" : "corrections required"),
    "",
    "**This is not a membership approval, legal-signature verification, or invitation.**",
    "",
    "- GitHub issue author: @" + (issue.user?.login || "unknown"),
    "- Version checked: Contributor Agreement v1.0 and Governance v1.0",
    "- Policy revision: " + POLICY_SHA,
    "- Submitted issue: #" + issueNumber,
    "- Issue creation timestamp (GitHub): " + issue.created_at,
    "- Verification timestamp (UTC): " + new Date().toISOString(),
    "- SHA-256 of issue body as checked: " + outcome.bodyHash,
    "- Requested role: " + (outcome.role || "Not validated"),
    ""
  ];
  if (outcome.valid) {
    lines.push(
      "The required versioned checkbox statements and matching GitHub username are present.",
      "**Next:** A maintainer must independently confirm the request, the three-founder adoption record in issue #3, and any required approval before manually inviting the applicant. GitHub administrators can bypass this procedural gate."
    );
  } else {
    lines.push("Problems to resolve:", ...outcome.errors.map((err) => "- " + err),
      "", "Please edit or recreate the issue using the official membership form. Do not disclose private identity data.");
  }
  await api("POST", prefix + "/issues/" + issueNumber + "/comments", { body: lines.join("\n") });
}
console.log(JSON.stringify({ issue: issueNumber, valid_form_structure: outcome.valid, status_label: targetLabel, errors: outcome.errors, body_sha256: outcome.bodyHash }));
