---
sidebar_position: 2
---

# Quickstart

Create a queue, enqueue a job, and process it in under five minutes.

## 1. Create a queue

```bash
nimbus queue create emails
```

## 2. Enqueue a job

```js title="enqueue.js"
import { Nimbus } from '@nimbus/sdk';

const client = new Nimbus({ apiKey: process.env.NIMBUS_API_KEY });

await client.jobs.enqueue('emails', {
  to: 'user@example.com',
  template: 'welcome',
});
```

## 3. Process it

```js title="worker.js" {4-6}
import { Worker } from '@nimbus/sdk';

const worker = new Worker('emails', async (job) => {
  console.log('Sending', job.data.template);
  // do the work here
});

worker.start();
```

:::warning
Always make handlers idempotent. A job may be delivered more than once.
:::
