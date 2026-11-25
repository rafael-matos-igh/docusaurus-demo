---
sidebar_position: 6
---

# Tasks

A task is a work item for back-office staff, created in Meridian Core's Workbench. Client applications raise tasks when a person needs to act, such as a callback request or a document review.

Conduit also raises tasks itself, for example when a [client change](clients.md) needs verification or a [policy mutation](policy-mutations.md) needs review. Those tasks come back as `taskId` in the response.

## Create a task

```bash
curl -X POST https://conduit.example.com/v1/tasks \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Idempotency-Key: $(uuidgen)" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "callback_request",
    "title": "Customer asked for a callback",
    "description": "Prefers mornings. Question about excess options.",
    "priority": "normal",
    "dueDate": "2026-03-02",
    "clientId": "cli_2f7a",
    "quoteId": "qte_8f2a1c"
  }'
```

`type` must be a task type configured in Meridian Core. An unknown type returns `422`. Link the task to the client, quote or policy it concerns so staff see the context.

## Task fields

| Field | Description |
| --- | --- |
| `status` | `open`, `in_progress`, `completed` or `cancelled`. Staff move it forward. |
| `priority` | `low`, `normal`, `high` or `urgent`. |
| `dueDate` | Optional target date. |
| `clientId`, `quoteId`, `policyId` | Optional links to related records. |

## Follow a task

```bash
curl https://conduit.example.com/v1/tasks/tsk_91c0 \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

## Update a task

Callers can add a comment, change the priority, or cancel their own task. Fields owned by staff, such as the assignee, cannot be changed through Conduit.

```bash
curl -X PATCH https://conduit.example.com/v1/tasks/tsk_91c0 \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Idempotency-Key: $(uuidgen)" \
  -H "Content-Type: application/json" \
  -d '{"comment": "Customer sent the missing documents.", "priority": "high"}'
```

A completed task cannot be changed, and returns `409`.

## Related endpoints

- [`POST /tasks`](../api/create-task)
- [`GET /tasks/{taskId}`](../api/get-task)
- [`PATCH /tasks/{taskId}`](../api/update-task)
