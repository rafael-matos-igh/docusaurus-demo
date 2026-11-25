---
sidebar_position: 2
---

# Error handling and retries

Failed jobs are retried automatically using exponential backoff.

| Attempt | Delay |
| --- | --- |
| 1 | 10s |
| 2 | 1m |
| 3 | 10m |

<details>
<summary>Customising the retry policy</summary>

```js
await client.jobs.enqueue('emails', payload, {
  retries: 5,
  backoff: { type: 'exponential', base: 5000 },
});
```

</details>

After the final attempt, a job moves to the **dead-letter queue** where it can be inspected and replayed:

```bash
nimbus dlq replay emails --all
```
