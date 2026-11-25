---
sidebar_position: 3
---

# Idempotency and errors

## Idempotency

Networks fail. If a request to create a client or convert a quote times out, the caller cannot tell whether it succeeded. An `Idempotency-Key` makes the retry safe.

Send the header on every `POST` and `PATCH` that creates or changes data:

```bash
curl -X POST https://conduit.example.com/v1/quotes/qte_8f2a1c/convert \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Idempotency-Key: 7c9e6679-7425-40de-944b-e07fc1f90ae7" \
  -H "Content-Type: application/json" \
  -d '{"startDate":"2026-03-01","paymentFrequency":"annual","acceptedTerms":true}'
```

| Situation | Result |
| --- | --- |
| First request with a key | Processed normally. |
| Same key and same body, repeated | The stored response is returned. Nothing is processed twice. |
| Same key, different body | `409` with the code `idempotency_key_reused`. |
| Same key while the first request is still running | `409` with the code `request_in_progress`. Retry shortly. |

Keys are kept for 24 hours. Generate a new UUID for each distinct operation, and reuse it only to retry that operation.

## Error format

Every error uses the same envelope:

```json
{
  "code": "quote_expired",
  "message": "The premium has expired. Calculate it again before converting.",
  "requestId": "req_01HZX4",
  "details": {}
}
```

- `code` is stable and meant for programs to act on.
- `message` is meant for people and may change.
- `requestId` identifies the request in Conduit's logs. Include it when you contact support.
- `details` carries extra context, for example `fields` for validation errors.

## Status codes

| Status | Meaning | Retry? |
| --- | --- | --- |
| `400` | The request is malformed. | No, fix the request. |
| `401` | Missing, expired or insufficient credentials. | After getting a new token. |
| `404` | The resource does not exist. | No. |
| `409` | Conflict with current state, or an idempotency conflict. | Depends on the code. |
| `422` | Valid request that fails business rules. | No, change the data. |
| `429` | Rate limit reached. | Yes, after `Retry-After` seconds. |
| `502` | Meridian Core failed or timed out. | Yes, with the same idempotency key. |

## Common error codes

| Code | Status | Meaning |
| --- | --- | --- |
| `validation_failed` | `422` | One or more answers failed the journey rules. See `details.fields`. |
| `duplicate_client` | `409` | A matching client exists. See `details.existingClientId`. |
| `quote_expired` | `422` | The premium's `validUntil` has passed. |
| `quote_not_priced` | `422` | The quote has no premium yet. |
| `quote_already_converted` | `409` | The quote already became a policy. |
| `mutation_not_allowed` | `422` | The policy's status does not allow this change. |
| `backend_unavailable` | `502` | Meridian Core did not respond in time. |

## Pagination

List endpoints return `items` and an opaque `nextCursor`. Pass the cursor back as the `cursor` query parameter to get the next page. A `null` cursor means there are no more pages.

```bash
curl "https://conduit.example.com/v1/clients?email=alex@example.com&limit=25" \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```
