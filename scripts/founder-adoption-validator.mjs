// OpenDKG three-founder adoption: pure, dependency-free checks.
import { createHash } from "node:crypto";

export const POLICY_COMMIT = "d56279b4f3c25dd8f9e68699d61be23a0c7a6b07";
export const FOUNDER_ISSUE = 3;
export const COMPLETE_LABEL = "founders:agreement-complete";

// Match the exact declaration displayed in Issue #3 at the pinned policy revision.
// Allow only Markdown quote/code styling and whitespace normalization.
export const DECLARATION =
  "I confirm that I am one of the three original equal cofounders of OpenDKG. " +
  "I have read and affirmatively accept OpenDKG Contributor Agreement v1.0 and Governance v1.0 at commit " +
  POLICY_COMMIT + ". " +
  "I accept the scope covering present and future OpenDKG repositories. " +
  "I understand that the sequence of GitHub invitations does not give one cofounder superior status; " +
  "my agreement does not transfer third-party assets or automatically allocate or eliminate personal legal liability. " +
  "I consent to this public GitHub acceptance record under my own account. " +
  "I understand prior code is not retroactively licensed without required permission.";

export function normalizeDeclaration(body) {
  if (typeof body !== "string") return "";
  return body.replace(/^\s*>\s?/gm, "").replace(/\x60/g, "").replace(/\s+/g, " ").trim();
}

const loginPattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;

export function validateRoster(config) {
  const errors = [];
  if (config?.issue_number !== FOUNDER_ISSUE) errors.push("Issue number must be exactly 3.");
  if (config?.policy_commit !== POLICY_COMMIT) errors.push("Policy commit mismatch.");
  const logins = config?.founder_logins;
  if (!Array.isArray(logins) || logins.length !== 3) {
    errors.push("Exactly three founder seats must exist.");
    return { ready: false, errors, logins: [] };
  }
  if (logins[0] !== "a-51-50") errors.push("Original custodian account must occupy the first founding seat.");
  const active = logins.filter((login) => typeof login === "string" && login.length > 0);
  for (const login of active) {
    if (!loginPattern.test(login)) errors.push("Invalid GitHub login in roster.");
  }
  if (new Set(active.map((login) => login.toLowerCase())).size !== active.length) {
    errors.push("Founding account logins must be distinct.");
  }
  // Null/empty handles are intentional placeholders. Do not close while any remain.
  const ready = errors.length === 0 && active.length === 3;
  return { ready, errors, logins: ready ? logins : [] };
}

export function evaluateFounderAcceptance(config, githubAccounts, issueComments) {
  const roster = validateRoster(config);
  if (!roster.ready) return { complete: false, configured: false, missing: [], records: [], errors: roster.errors };
  const errors = [];
  const records = [];
  const missing = [];
  const ids = new Set();
  for (const login of roster.logins) {
    const user = githubAccounts[login.toLowerCase()];
    if (!user || user.type !== "User" || !Number.isSafeInteger(user.id) || user.id <= 0) {
      errors.push("GitHub user not found or not a human user: " + login);
      missing.push(login);
      continue;
    }
    if (ids.has(user.id)) {
      errors.push("Two roster entries resolved to the same GitHub identity.");
      missing.push(login);
      continue;
    }
    ids.add(user.id);
    const valid = issueComments.filter((comment) =>
      Number.isSafeInteger(comment?.id) &&
      comment.user?.id === user.id &&
      comment.user?.type === "User" &&
      normalizeDeclaration(comment.body) === DECLARATION
    );
    if (!valid.length) {
      missing.push(login);
      continue;
    }
    const chosen = valid.sort((a, b) => a.id - b.id)[0];
    records.push({
      login: user.login,
      user_id: user.id,
      comment_id: chosen.id,
      comment_url: chosen.html_url || "https://github.com/OpenDKG/.github/issues/3#issuecomment-" + chosen.id,
      created_at: chosen.created_at || null,
      updated_at: chosen.updated_at || null,
      declaration_sha256: createHash("sha256").update(chosen.body, "utf8").digest("hex")
    });
  }
  return { complete: missing.length === 0 && errors.length === 0 && records.length === 3,
    configured: true, missing, records, errors };
}
