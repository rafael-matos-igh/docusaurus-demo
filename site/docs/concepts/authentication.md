---
sidebar_position: 2
---

# Authentication

Conduit uses the OAuth 2.0 **client credentials** flow. Each client application is registered once and receives a client id and secret. It exchanges them for a short-lived access token and sends that token with every request.

## Get a token

```bash
curl -X POST https://auth.conduit.example.com/oauth/token \
  -d grant_type=client_credentials \
  -d client_id=$CLIENT_ID \
  -d client_secret=$CLIENT_SECRET \
  -d scope="clients quotes policies tasks"
```

```json
{
  "access_token": "eyJhbGciOi...",
  "token_type": "Bearer",
  "expires_in": 900,
  "scope": "clients quotes policies tasks"
}
```

## Call the API

```bash
curl https://conduit.example.com/v1/clients/cli_2f7a \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

## Scopes

Request only the scopes the application needs.

| Scope | Allows |
| --- | --- |
| `clients` | Read, search, create and change clients. |
| `quotes` | Quote journeys, quotes, premium calculation and quote conversion. |
| `policies` | Read policies and request mutations. |
| `tasks` | Create, read and update tasks. |

A request outside the token's scopes returns `401` with the code `insufficient_scope`.

:::warning
Keep the client secret on a server you control. Never embed it in an application that runs on a customer's device. Browser and mobile applications should call Conduit through their own backend.
:::

## Environments

| Environment | API base URL |
| --- | --- |
| Production | `https://conduit.example.com/v1` |
| Sandbox | `https://conduit.sandbox.example.com/v1` |

The sandbox is connected to a Meridian Core test instance with synthetic data. Credentials are not shared between environments.
