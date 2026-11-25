---
sidebar_position: 3
---

# Quickstart

Create a queue:

```bash
nimbus queue create emails
```

Enqueue a job:

```js
import { Nimbus } from '@nimbus/sdk';

const client = new Nimbus({ apiKey: process.env.NIMBUS_API_KEY });
await client.jobs.enqueue('emails', { to: 'user@example.com' });
```

Process it:

```js
import { Worker } from '@nimbus/sdk';

new Worker('emails', async (job) => {
  console.log('Sending to', job.data.to);
}).start();
```
