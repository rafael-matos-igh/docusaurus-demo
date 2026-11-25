---
sidebar_position: 1
---

# API overview

Base URL: `https://api.nimbus.example/v1`

## Authentication

Send your API key as a bearer token:

```bash
curl https://api.nimbus.example/v1/queues \
  -H "Authorization: Bearer $NIMBUS_API_KEY"
```

## Rate limits

Requests are limited to **100 per minute** per key. Exceeding this returns `429 Too Many Requests`.
