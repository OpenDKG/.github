import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { validateMembershipIssue, templateRequirements, POLICY_SHA, issueSections } from "./membership-validator.mjs";

const template = readFileSync(new URL("../.github/ISSUE_TEMPLATE/membership-agreement.yml", import.meta.url), "utf8")
  .replace(/\r\n/g, "\n");

const sampleBody = [
  "### Your GitHub username",
  "",
  "test-developer",
  "",
  "### Requested participation",
  "",
  "Developer / member",
  "",
  "### Contributor Agreement v1.0 — explicit acceptance",
  "",
  "- [X] I have read and affirmatively accept OpenDKG Contributor Agreement v1.0 at commit " + POLICY_SHA +
    " for my authorized contributions to present and future Covered Repositories. I understand that existing valid outbound open-source licenses remain effective if I leave.",
  "",
  "### Governance v1.0 — explicit acceptance",
  "",
  "- [X] I have read and accept OpenDKG Governance v1.0 at commit " + POLICY_SHA +
    " for my requested role, including contribution review, decision-making, access control, and departure.",
  "",
  "### Contribution rules and DCO",
  "",
  "- [X] I agree to follow the contribution guidelines and to certify the right to submit each commit using the DCO sign-off process when contributing. I understand the DCO is not a substitute for the Contributor Agreement.",
  "",
  "### Authority and public record",
  "",
  "- [X] To the best of my knowledge, I have or will obtain the rights needed for my contributions, including required employer, client or coauthor permission.",
  "- [X] I understand this public GitHub issue is an attributable record under my GitHub username and that the organization will record the version, date, and acceptance link. No private identity verification is implied.",
  "",
  "### Optional project interests",
  "",
  "Open-source contributions"
].join("\n");

function issue(body = sampleBody) {
  return { title: "[Membership request] test", body, user: { login: "test-developer" } };
}

test("accepts matching author and all pinned explicit checkboxes", () => {
  const result = validateMembershipIssue(issue());
  assert.equal(result.valid, true, result.errors.join("; "));
  assert.equal(result.author, "test-developer");
  assert.equal(result.bodyHash.length, 64);
});

test("rejects someone writing another GitHub handle", () => {
  const result = validateMembershipIssue({ ...issue(), user: { login: "different-user" } });
  assert.equal(result.valid, false);
  assert.match(result.errors.join(" "), /username/);
});

test("rejects missing or unchecked legal consent", () => {
  const result = validateMembershipIssue(issue(sampleBody.replace(
    "- [X] I have read and affirmatively accept", "- [ ] I have read and affirmatively accept"
  )));
  assert.equal(result.valid, false);
  assert.match(result.errors.join(" "), /Contributor Agreement/);
});

test("rejects an outdated version that a contributor may not have reviewed", () => {
  const result = validateMembershipIssue(issue(sampleBody.replaceAll(POLICY_SHA, "deadbeef")));
  assert.equal(result.valid, false);
  assert.match(result.errors.join(" "), /Governance/);
});

test("rejects missing second authority checkbox", () => {
  const result = validateMembershipIssue(issue(sampleBody.replace(
    "- [X] I understand this public GitHub issue", "- [ ] I understand this public GitHub issue"
  )));
  assert.equal(result.valid, false);
  assert.match(result.errors.join(" "), /Authority/);
});

test("rejects an unrelated issue with copied contents", () => {
  const result = validateMembershipIssue({ ...issue(), title: "Report a bug" });
  assert.equal(result.valid, false);
});

test("rejects checkbox lines modified with appended negating text", () => {
  const tampered = sampleBody.replace(
    "existing valid outbound open-source licenses remain effective if I leave.",
    "existing valid outbound open-source licenses remain effective if I leave. However, I grant no license."
  );
  const result = validateMembershipIssue(issue(tampered));
  assert.equal(result.valid, false);
  assert.match(result.errors.join(" "), /Contributor Agreement/);
});

test("rejects duplicate headings that could confuse review", () => {
  const result = validateMembershipIssue(issue(sampleBody + "\n\n### Governance v1.0 — explicit acceptance\n\n- [X] forged"));
  assert.equal(result.valid, false);
  assert.match(result.errors.join(" "), /Duplicate/);
});

test("parses headings without treating unchecked text as acceptance", () => {
  const sections = issueSections(sampleBody);
  assert.equal(sections.get("Your GitHub username"), "test-developer");
  assert.equal(sections.get("Requested participation"), "Developer / member");
});

test("ordinary membership form does not recognize cofounder as an applicant role", () => {
  const result = validateMembershipIssue(issue(sampleBody.replace("Developer / member", "Original cofounder")));
  assert.equal(result.valid, false);
  assert.match(result.errors.join(" "), /participation role/);
});

test("policy revision in the public Issue Form matches the validator", async () => {
  const { readFileSync } = await import("node:fs");
  const form = readFileSync(new URL("../.github/ISSUE_TEMPLATE/membership-agreement.yml", import.meta.url), "utf8");
  assert.ok(form.includes("at commit " + POLICY_SHA));
  assert.ok(form.includes("This form is for other applicants"));
});

// sampleBody above is the tests' own copy of the adopted wording. "accepts matching author and all
// pinned explicit checkboxes" therefore fails if the form's wording changes, which needs review.
test("reads every required text from the Issue Form", () => {
  const requirements = templateRequirements(template);
  assert.deepEqual(requirements.map((r) => r.must.length), [1, 1, 1, 2]);
  for (const text of requirements.flatMap((r) => r.must)) {
    assert.ok(sampleBody.includes("- [X] " + text), text);
  }
});

test("follows a reworded form, so the validator keeps no second copy that can drift", () => {
  const reworded = template.replace("client or coauthor permission.", "client or co-author permission.");
  assert.notEqual(reworded, template);
  const newBody = sampleBody.replace("client or coauthor permission.", "client or co-author permission.");
  assert.equal(validateMembershipIssue(issue(newBody), reworded).valid, true);
  assert.equal(validateMembershipIssue(issue(sampleBody), reworded).valid, false);
});

test("stops when the form no longer pins the policy revision", () => {
  const other = "0".repeat(40);
  for (const changed of [
    template.replace("Contributor Agreement v1.0 at commit " + POLICY_SHA, "Contributor Agreement v1.0 at commit " + other),
    template.replace("Governance v1.0 at commit " + POLICY_SHA, "Governance v1.0 at the latest commit"),
    template.replace("for my requested role,", "for my requested role (see " + other + "),")
  ]) {
    assert.notEqual(changed, template);
    assert.throws(() => validateMembershipIssue(issue(), changed), /pinned policy revision/);
  }
});

test("stops when a required acknowledgment is removed, made optional, renamed or unquoted", () => {
  const authority = "I understand this public GitHub issue is an attributable record";
  const cases = {
    removed: template.replace(new RegExp('        - label: "' + authority + '[^\\n]*\\n          required: true\\n'), ""),
    optional: template.replace(/(DCO sign-off[^\n]*\n          required: )true/, "$1false"),
    renamedId: template.replace("    id: governance-v1\n", "    id: governance-v2\n"),
    renamedTitle: template.replace('label: "Contribution rules and DCO"', 'label: "Rules"'),
    unquoted: template.replace(/- label: "(I agree to follow[^\n]*)"\n/, "- label: $1\n"),
    emptied: template.replace(/- label: "I agree to follow[^\n]*"\n/, '- label: ""\n')
  };
  for (const [name, changed] of Object.entries(cases)) {
    assert.notEqual(changed, template, name);
    assert.throws(() => validateMembershipIssue(issue(), changed), /cannot be used for validation/, name);
  }
});

test("reads the form the same with Windows line endings", () => {
  assert.deepEqual(templateRequirements(template.replaceAll("\n", "\r\n")), templateRequirements(template));
});

test("is a format check only: negating text outside the checked lines is not detected", () => {
  const contradicted = sampleBody
    .replace("### Contribution rules and DCO", "I do not accept either agreement.\n\n### Contribution rules and DCO")
    .replace("Open-source contributions", "I withdraw every acknowledgment above.");
  // This documents a limit, not a goal. A person must read the whole issue.
  assert.equal(validateMembershipIssue(issue(contradicted)).valid, true);
});

