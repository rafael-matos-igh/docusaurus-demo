---
slug: /
sidebar_position: 1
title: Introduction
---

# Introduction

**Conduit** is an integration layer that sits between customer-facing applications and an insurance management backend. It gives every client application one consistent, documented API, and keeps the backend's internals out of sight.

In this documentation the backend is **Meridian Core**, a fictional policy administration system. Everything here is a demo: neither Conduit nor Meridian Core exists.

## What Conduit does

| Capability | What it covers |
| --- | --- |
| [Clients](guides/clients.md) | Create, search and change individual and company clients. |
| [Quote journeys](guides/quote-journeys.md) | Serve the form definition for a product, and validate answers. |
| [Quotes and premiums](guides/quotes-and-premiums.md) | Create quotes and calculate premiums. |
| [Quote conversion](guides/converting-quotes.md) | Turn an accepted quote into a policy. |
| [Policy mutations](guides/policy-mutations.md) | Change or cancel an in-force policy, with a premium preview. |
| [Tasks](guides/tasks.md) | Raise work items for back-office staff. |

## Why an integration layer?

- **One contract for every channel.** A mobile app, a broker system, an internal tool and a partner service all call the same API. Nothing in Conduit is specific to one of them.
- **Backend changes stay behind the layer.** Meridian Core's product rules, field names and workflows can change without every client application being rebuilt.
- **Consistent behaviour.** Authentication, idempotency, error shapes and pagination work the same way on every endpoint.

## Where to start

1. Read the [architecture](concepts/architecture.md) overview.
2. Set up [authentication](concepts/authentication.md).
3. Follow the guides in order: client, quote journey, quote, premium, conversion.
4. Use the [API reference](api/conduit-integration-api) for every field and response.

The API is described by an OpenAPI 3 specification, available as [YAML](pathname:///openapi/conduit.yaml) and [JSON](pathname:///openapi/conduit.json).
