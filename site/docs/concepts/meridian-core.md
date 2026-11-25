---
sidebar_position: 4
---

# Meridian Core

**Meridian Core** is the insurance management backend behind Conduit. It is the system of record for clients, quotes, policies, premiums and back-office work.

:::note
Meridian Core is fictional and is used here only to explain what Conduit integrates with.
:::

## Modules

| Meridian Core module | Responsibility | Conduit area |
| --- | --- | --- |
| Party Registry | Individuals and companies, contact details, consents. | Clients |
| Product Studio | Product definitions, questions, rules, covers. | Quote journeys |
| Rating Engine | Premium calculation from rating tables. | Premium calculations |
| Quote Desk | Quotes and their lifecycle. | Quotes |
| Policy Ledger | Policies, endorsements, cancellations, documents. | Policies and mutations |
| Workbench | Work queues and tasks for staff. | Tasks |

## How Conduit maps to Meridian Core

| Conduit operation | Meridian Core call |
| --- | --- |
| `POST /clients` | Party Registry `parties.create` |
| `GET /quote-journeys/{productCode}` | Product Studio `products.questionnaire` |
| `POST /quotes/{quoteId}/premium` | Rating Engine `ratings.calculate` |
| `POST /quotes/{quoteId}/convert` | Quote Desk `quotes.bind`, then Policy Ledger `policies.issue` |
| `POST /policies/{policyId}/mutations` | Policy Ledger `endorsements.create` |
| `POST /tasks` | Workbench `tasks.create` |

## Identifiers

Conduit uses its own prefixed identifiers (`cli_`, `qte_`, `pol_`, `mut_`, `tsk_`) and keeps a reference to the matching Meridian Core record. Client applications should only ever store Conduit identifiers.

## Behaviour to be aware of

- **Rating tables change.** Meridian Core publishes new rating tables on a schedule. A premium reports the `ratingVersion` it was calculated with, and is only valid until `validUntil`.
- **Referrals.** Some answers are acceptable but need an underwriter. Conduit reports them as `referrals` during validation and creates a review task when a quote or mutation is submitted.
- **Eventual consistency.** A newly issued policy can take a short time to appear in Meridian Core's document store. `documents` on a new policy may be empty for a few seconds.
- **Timeouts.** Conduit waits up to 10 seconds for Meridian Core and then returns `502`. The operation may still complete in the backend, which is why retries must reuse the same idempotency key.
