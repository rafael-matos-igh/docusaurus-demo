---
sidebar_position: 1
---

# Scheduling jobs

Nimbus supports delayed and recurring jobs.

## Delayed jobs

```js
await client.jobs.enqueue('emails', payload, { delay: '10m' });
```

## Recurring jobs

Use a cron expression:

```js
await client.schedules.create({
  queue: 'reports',
  cron: '0 8 * * MON-FRI',
  payload: { type: 'daily-summary' },
});
```

:::note
All schedules run in UTC unless a `timezone` is provided.
:::
