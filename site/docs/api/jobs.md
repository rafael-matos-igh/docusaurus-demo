---
sidebar_position: 2
---

# Jobs

## Enqueue a job

`POST /queues/{queue}/jobs`

| Parameter | Type | Description |
| --- | --- | --- |
| `data` | object | Job payload. |
| `delay` | string | Optional delay, e.g. `10m`. |
| `retries` | integer | Max attempts. Default `3`. |

**Request**

```json
{ "data": { "to": "user@example.com" }, "delay": "10m" }
```

**Response** `201 Created`

```json
{ "id": "job_8f2a1c", "status": "scheduled" }
```

## Get a job

`GET /jobs/{id}`

Returns the job, including its `status` (`scheduled`, `active`, `completed`, `failed`).
