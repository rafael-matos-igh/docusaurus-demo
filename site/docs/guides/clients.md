---
sidebar_position: 1
---

# Clients

A client is the person or company that holds quotes and policies. Create the client first, then use its `id` on quotes, tasks and policies.

## Search before you create

Look for an existing client to avoid duplicates. At least one filter is required.

```bash
curl "https://conduit.example.com/v1/clients?email=alex.morgan@example.com" \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

## Create a client

Individuals need `dateOfBirth`. Companies need `registrationNumber`.

```bash
curl -X POST https://conduit.example.com/v1/clients \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Idempotency-Key: $(uuidgen)" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "individual",
    "legalName": "Alex Morgan",
    "dateOfBirth": "1988-04-12",
    "email": "alex.morgan@example.com",
    "phone": "+441632960123",
    "address": {
      "line1": "12 Harbour Road",
      "city": "Bristol",
      "postalCode": "BS1 4AB",
      "country": "GB"
    },
    "marketingConsent": false
  }'
```

If Meridian Core already holds a matching client, Conduit returns `409` with `duplicate_client`. The existing id is in `details.existingClientId`, so the caller can continue with that client.

## Change a client

`PATCH` applies a partial update. Only the fields you send change.

```bash
curl -X PATCH https://conduit.example.com/v1/clients/cli_2f7a \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Idempotency-Key: $(uuidgen)" \
  -H "Content-Type: application/json" \
  -d '{"phone": "+441632960999"}'
```

### Changes that need verification

Contact details apply straight away and return `200`. Identity fields, `legalName`, `dateOfBirth` and `registrationNumber`, are not applied immediately. Conduit raises a verification [task](tasks.md) and returns `202`:

```json
{
  "status": "pending_review",
  "taskId": "tsk_91c0",
  "message": "The change needs verification before it is applied."
}
```

The client keeps its current values until staff complete the task.

## Related endpoints

- [`POST /clients`](../api/create-client)
- [`PATCH /clients/{clientId}`](../api/update-client)
- [`GET /clients`](../api/search-clients)
