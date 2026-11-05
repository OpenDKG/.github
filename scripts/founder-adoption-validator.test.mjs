import test from "node:test";
import assert from "node:assert/strict";
import {
  POLICY_COMMIT, DECLARATION, normalizeDeclaration,
  validateRoster, evaluateFounderAcceptance
} from "./founder-adoption-validator.mjs";

const configured = {
  issue_number: 3,
  policy_commit: POLICY_COMMIT,
  founder_logins: ["a-51-50", "founder-two", "founder-three"]
};
const people = {
  "a-51-50": { login: "a-51-50", id: 51213010, type: "User" },
  "founder-two": { login: "founder-two", id: 203, type: "User" },
  "founder-three": { login: "founder-three", id: 304, type: "User" }
};
function signingComment(login, id, body = DECLARATION) {
  const user = people[login];
  return { id, user, body, created_at: "2026-11-05T11:00:00Z",
    html_url: "https://github.com/OpenDKG/.github/issues/3#issuecomment-" + id };
}
const comments = [
  signingComment("a-51-50", 51),
  signingComment("founder-two", 52),
  signingComment("founder-three", 53)
];

test("unconfigured two founder seats are fail-closed", () => {
  const r = evaluateFounderAcceptance({
    ...configured, founder_logins: ["a-51-50", null, null]
  }, people, comments);
  assert.equal(r.configured, false);
  assert.equal(r.complete, false);
});

test("valid configured roster needs exactly three distinct account handles", () => {
  assert.equal(validateRoster(configured).ready, true);
  assert.equal(validateRoster({ ...configured, founder_logins: ["a-51-50", "founder-two", "FOUNDER-TWO"] }).ready, false);
  assert.equal(validateRoster({ ...configured, founder_logins: ["someone-else", "founder-two", "founder-three"] }).ready, false);
  assert.equal(validateRoster({ ...configured, founder_logins: ["a-51-50", "x"] }).ready, false);
});

test("rejects wrong policy revision or issue number", () => {
  assert.equal(validateRoster({ ...configured, policy_commit: "old" }).ready, false);
  assert.equal(validateRoster({ ...configured, issue_number: 4 }).ready, false);
});

test("three different human GitHub accounts signing the exact statement can complete", () => {
  const result = evaluateFounderAcceptance(configured, people, comments);
  assert.equal(result.complete, true);
  assert.deepEqual(result.missing, []);
  assert.deepEqual(result.records.map((x) => x.user_id), [51213010, 203, 304]);
  assert.ok(result.records.every((x) => x.declaration_sha256.length === 64));
});

test("current original custodian acceptance is accepted without forcing another signature", () => {
  const result = evaluateFounderAcceptance(configured, people, [comments[0]]);
  assert.equal(result.complete, false);
  assert.deepEqual(result.records.map((x) => x.login), ["a-51-50"]);
  assert.deepEqual(result.missing, ["founder-two", "founder-three"]);
});

test("not any three commenters: account mismatch never counts", () => {
  const bad = { ...comments[2], user: { login: "unlisted", id: 999, type: "User" } };
  const result = evaluateFounderAcceptance(configured, people, [comments[0], comments[1], bad]);
  assert.equal(result.complete, false);
  assert.deepEqual(result.missing, ["founder-three"]);
});

test("rejects fabricated GitHub identity with same login but different user ID", () => {
  const bad = { ...comments[2], user: { login: "founder-three", id: 900, type: "User" } };
  assert.equal(evaluateFounderAcceptance(configured, people, [comments[0], comments[1], bad]).complete, false);
});

test("rejects one account filling two founder seats, even if names differ", () => {
  const badAccounts = { ...people, "founder-three": { ...people["founder-three"], id: 203 } };
  const result = evaluateFounderAcceptance(configured, badAccounts, comments);
  assert.equal(result.complete, false);
  assert.ok(result.errors.some((x) => x.includes("same GitHub identity")));
});

test("edited or deleted declaration no longer counts", () => {
  const edited = { ...comments[2], body: DECLARATION.replace("affirmatively accept", "might accept") };
  const changed = evaluateFounderAcceptance(configured, people, [comments[0], comments[1], edited]);
  assert.equal(changed.complete, false);
  assert.equal(evaluateFounderAcceptance(configured, people, comments.slice(0, 2)).complete, false);
});

test("comment with older policy revision is not current acceptance", () => {
  const stale = { ...comments[1], body: DECLARATION.replace(POLICY_COMMIT, "2e429d904db1059a678085792ad44f1d732d7ea1") };
  assert.equal(evaluateFounderAcceptance(configured, people, [comments[0], stale, comments[2]]).complete, false);
});

test("the declaration may be quoted/formatting-wrapped but must be otherwise exact", () => {
  const normalized = normalizeDeclaration("> " + DECLARATION.replace(POLICY_COMMIT, "\x60" + POLICY_COMMIT + "\x60"));
  assert.equal(normalized, DECLARATION);
  assert.equal(normalizeDeclaration(DECLARATION + " extra"), DECLARATION + " extra");
});

test("bot accounts are not founding signers", () => {
  const badAccounts = { ...people, "founder-three": { ...people["founder-three"], type: "Bot" } };
  assert.equal(evaluateFounderAcceptance(configured, badAccounts, comments).complete, false);
});

test("wrong actor's comment never counts for another founding seat", () => {
  const impostor = { ...comments[1], user: people["founder-three"] };
  const result = evaluateFounderAcceptance(configured, people, [comments[0], impostor]);
  assert.equal(result.complete, false);
});
