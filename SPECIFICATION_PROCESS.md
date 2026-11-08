# OpenDKG Improvement Proposals and Specification Process — v1.1 Draft

**Status: proposed, not yet adopted. No TSC.** Inspired by the public Ethereum OASIS Open Project governance and Baseline Protocol improvement proposals, without claiming OASIS affiliation or official standards-body status.

## Scope

An **ODIP (OpenDKG Improvement Proposal)** may suggest a cross-project API, security interface, data schema, protocol interoperability rule, significant architecture change or governance improvement. Small fixes remain ordinary issues/PRs. Significant proposals are publicly discussed in the relevant repository or a dedicated specifications repo as the initiative grows.

## Stages

1. **Idea / Strawman:** state the problem, motivation and initial approach.
2. **Proposal:** designated author/editor, alternatives, impact, cross-project implications, review ownership and public discussion.
3. **Draft:** specification-shaped document with definitions, normative requirements, requirement IDs, threat model, privacy analysis, compatibility and conformance-test design.
4. **Candidate:** stable enough for independent implementation and interoperability testing; tests and implementation evidence attached.
5. **Adopted:** explicitly approved and versioned by the founders' Council; immutable commit/tag and a publication note. A PR merge on its own is **not** standard adoption.
6. **Superseded / Withdrawn:** retain stable links and reasons; do not erase historical normative requirements.

## Governance and review

- **Engineering & Security Lead** coordinates technical editors, issue triage, threat modeling, testability and reference implementations. There is **no Technical Steering Committee**.
- **Marketing & Partnerships Lead** checks external communication claims, trademarks and partner dependencies.
- **Community & Contributor Operations Lead** handles accessibility, contributor documentation and review participation.
- Major proposals must remain open for comment for **at least 7 working days**, unless all three founders document an urgent security exception with an explanation. Every objection must receive a reasoned response; silence is not evidence of independent technical validation.
- Ordinary specification advancement requires **2-of-3 founder approval** after technical and licensing checks; decisions affecting founding economic terms require unanimous individual assent and separate legal documentation.
- A founder/Lead must disclose conflicts and cannot unilaterally certify their own security-sensitive design. Use an independent reviewer.
- The Council records decision, dissent if any, issue/PR URLs, required checks, date, version and exact published Git SHA.

## Draft document checklist

Every Draft should have: title and unique ODIP ID; current stage; authors/editors; version/date; abstract; motivation; scope and non-goals; relevant terminology; architecture; **MUST/SHOULD/MAY** keywords interpreted under RFC 2119/8174; stable **ODKG-XXX-001** requirement identifiers; protocol data/API definitions; conformance tests; backwards compatibility/migration; security and privacy considerations; implementation experience; references; license and IPR review; change history.

For **Adopted** specifications, require a normative test for each applicable `MUST`, a reviewable release artifact, no known broken normative links, and a documented interoperability demonstration where multiple independent implementations are feasible. Do not mislabel a community draft as an OASIS, ISO or legally accredited standard.

Start new proposals from [templates/ODIP_TEMPLATE.md](templates/ODIP_TEMPLATE.md). The existing signed founder governance v1.0 remains operative until this v1.1 process is validly adopted.
