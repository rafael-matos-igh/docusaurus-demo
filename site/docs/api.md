---
sidebar_position: 4
---

# API reference

Base URL: `https://api.nimbus.example/v1`. Authenticate with a bearer token:

```bash
curl https://api.nimbus.example/v1/queues -H "Authorization: Bearer $NIMBUS_API_KEY"
```

## Enqueue a job

`POST /queues/{queue}/jobs`

| Parameter | Type | Description |
| --- | --- | --- |
| `data` | object | Job payload. |
| `delay` | string | Optional delay, e.g. `10m`. |
| `retries` | integer | Max attempts. Default `3`. |

## Get a job

`GET /jobs/{id}`

Returns the job and its `status`: `scheduled`, `active`, `completed` or `failed`.
