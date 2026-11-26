// OpenDKG membership Issue Form validator. No dependencies or privileged token.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

export const POLICY_SHA = "d56279b4f3c25dd8f9e68699d61be23a0c7a6b07";
export const FORM_PREFIX = "[Membership request]";
export const VERSION = "1.0";

const TEMPLATE_URL = new URL("../.github/ISSUE_TEMPLATE/membership-agreement.yml", import.meta.url);

// Which acknowledgments are required is fixed here, so editing the Issue Form cannot drop one. Only
// their wording is read from the form. `pinned` texts must name the policy revision POLICY_SHA.
const REQUIRED_ACKNOWLEDGMENTS = [
  { id: "contributor-agreement-v1", title: "Contributor Agreement v1.0 — explicit acceptance", count: 1, pinned: true },
  { id: "governance-v1", title: "Governance v1.0 — explicit acceptance", count: 1, pinned: true },
  { id: "contributing-dco-v1", title: "Contribution rules and DCO", count: 1, pinned: false },
  { id: "authority", title: "Authority and public record", count: 2, pinned: false }
];

/**
 * Reads the required checkbox texts from the Issue Form. This is not a general YAML parser: it
 * accepts only the layout the form uses, with double-quoted, required options. Anything else throws,
 * so a changed form stops the check instead of weakening it.
 */
export function templateRequirements(template = readFileSync(TEMPLATE_URL, "utf8")) {
  const fail = (reason) => {
    throw new Error("Membership Issue Form cannot be used for validation: " + reason);
  };
  const quoted = (text) => {
    try {
      return JSON.parse(text);
    } catch {
      return fail("unsupported quoted text " + text);
    }
  };
  // Each form element starts with "  - type: ..." and runs to the next one.
  const blocks = String(template).replace(/\r\n/g, "\n").split(/^(?=  - type: )/m);
  return REQUIRED_ACKNOWLEDGMENTS.map(({ id, title, count, pinned }) => {
    const found = blocks.filter((block) => block.split("\n").includes("    id: " + id));
    if (found.length !== 1) fail("expected one element with id " + id);
    const lines = found[0].split("\n").filter((line) => line.trim() !== "");
    const [type, idLine, attributes, label, options, ...rest] = lines;
    if (type !== "  - type: checkboxes" || idLine !== "    id: " + id || attributes !== "    attributes:" ||
      options !== "      options:" || !label?.startsWith("      label: ") ||
      quoted(label.slice("      label: ".length)) !== title) {
      fail("unexpected layout or title for " + id);
    }
    if (rest.length !== count * 2) fail(id + " must have exactly " + count + " required option(s)");
    const must = [];
    for (let i = 0; i < rest.length; i += 2) {
      if (!rest[i].startsWith("        - label: ") || rest[i + 1] !== "          required: true") {
        fail("every option of " + id + " must be a required, double-quoted label");
      }
      const text = quoted(rest[i].slice("        - label: ".length));
      if (typeof text !== "string" || !text.trim()) fail("empty option in " + id);
      if (pinned) {
        const revisions = text.match(/\b[0-9a-f]{40}\b/g) ?? [];
        if (!text.includes("at commit " + POLICY_SHA + " ") || revisions.some((sha) => sha !== POLICY_SHA)) {
          fail(id + " must name only the pinned policy revision " + POLICY_SHA);
        }
      }
      must.push(text);
    }
    return { title, count, must };
  });
}

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
 *
 * It checks format only. It confirms the title prefix, the username and role fields, and that each
 * required checkbox section has exactly the expected checked lines, unchanged apart from spacing.
 * The issue body is controlled by the applicant, and nothing else in it is examined: text that
 * contradicts or withdraws an acknowledgment can sit in a free-text field, on an unchecked or plain
 * line, or anywhere outside the checked lines, and the check does not look at how the body renders.
 * A person must read the whole issue before relying on it.
 */
export function validateMembershipIssue(issue, template) {
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

  const requirements = templateRequirements(template);
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
