// OpenDKG membership Issue Form validator. No dependencies or privileged token.
import { createHash } from "node:crypto";

export const POLICY_SHA = "d56279b4f3c25dd8f9e68699d61be23a0c7a6b07";
export const FORM_PREFIX = "[Membership request]";
export const VERSION = "1.0";

export function issueSections(body = "") {
  const headings = [...String(body).matchAll(/^### ([^\r\n]+)\r?$/gm)];
  const sections = new Map();
  for (let i = 0; i < headings.length; i++) {
    const start = headings[i].index + headings[i][0].length;
    const end = i + 1 < headings.length ? headings[i + 1].index : String(body).length;
    const name = headings[i][1].trim();
    if (sections.has(name)) throw new Error("Duplicate form heading: " + name);
    sections.set(name, String(body).slice(start, end).trim());
  }
  return sections;
}

function normalizeLine(text = "") {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function checkedLines(section) {
  return [...section.matchAll(/^- \[[xX]\] (.+)$/gm)].map((m) => normalizeLine(m[1]));
}

function matches(lines, expected) {
  const normalizedExpected = normalizeLine(expected);
  return lines.some((line) => line === normalizedExpected);
}

/**
 * Result is a check of the form's *current* submitted text, not proof of
 * civil identity, authority to contribute, or a legal signature.
 */
export function validateMembershipIssue(issue) {
  const errors = [];
  const author = issue?.user?.login || "";
  const title = issue?.title || "";
  const body = issue?.body || "";
  const bodyHash = createHash("sha256").update(body, "utf8").digest("hex");
  if (!title.startsWith(FORM_PREFIX)) errors.push("Membership request title prefix is missing.");
  if (!author) errors.push("Issue author's GitHub login is unavailable.");

  let fields;
  try {
    fields = issueSections(body);
  } catch (error) {
    return { valid: false, errors: [String(error.message)], author, bodyHash, role: null };
  }
  const handle = fields.get("Your GitHub username");
  if (!handle || handle.toLowerCase() !== author.toLowerCase()) {
    errors.push("Form username must exactly match the GitHub account that created the issue.");
  }

  const role = fields.get("Requested participation");
  const roles = new Set([
    "Developer / member",
    "Reviewer / maintainer candidate",
    "Documentation / community contributor"
  ]);
  if (!roles.has(role)) errors.push("Select a valid participation role.");

  const requirements = [
    {
      title: "Contributor Agreement v1.0 — explicit acceptance",
      count: 1,
      must: [
        "I have read and affirmatively accept OpenDKG Contributor Agreement v1.0 at commit " + POLICY_SHA +
          " for my authorized contributions to present and future Covered Repositories. I understand that existing valid outbound open-source licenses remain effective if I leave."
      ]
    },
    {
      title: "Governance v1.0 — explicit acceptance",
      count: 1,
      must: [
        "I have read and accept OpenDKG Governance v1.0 at commit " + POLICY_SHA +
          " for my requested role, including contribution review, decision-making, access control, and departure."
      ]
    },
    {
      title: "Contribution rules and DCO",
      count: 1,
      must: [
        "I agree to follow the contribution guidelines and to certify the right to submit each commit using the DCO sign-off process when contributing. I understand the DCO is not a substitute for the Contributor Agreement."
      ]
    },
    {
      title: "Authority and public record",
      count: 2,
      must: [
        "To the best of my knowledge, I have or will obtain the rights needed for my contributions, including required employer, client or coauthor permission.",
        "I understand this public GitHub issue is an attributable record under my GitHub username and that the organization will record the version, date, and acceptance link. No private identity verification is implied."
      ]
    }
  ];
  for (const requirement of requirements) {
    const content = fields.get(requirement.title);
    const lines = content ? checkedLines(content) : [];
    if (lines.length !== requirement.count ||
      !requirement.must.every((entry) => matches(lines, entry))) {
      errors.push("Required checkbox acknowledgment missing or changed: " + requirement.title);
    }
  }
  return { valid: errors.length === 0, errors, author, role: roles.has(role) ? role : null, bodyHash };
}
