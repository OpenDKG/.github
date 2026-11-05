import test from "node:test";
import assert from "node:assert/strict";
import { validateMembershipIssue, POLICY_SHA, issueSections } from "./membership-validator.mjs";

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
    " for my authorized contributions to present and future Covered Repositories. NetPetra is excluded. I understand that existing valid outbound open-source licenses remain effective if I leave.",
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
