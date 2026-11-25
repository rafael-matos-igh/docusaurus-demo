---
sidebar_position: 1
---

# Installation

## Requirements

- Node.js 18 or later
- A Nimbus account (free tier is fine)

## Install the CLI

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm install -g @nimbus/cli
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn global add @nimbus/cli
```

  </TabItem>
  <TabItem value="pnpm" label="pnpm">

```bash
pnpm add -g @nimbus/cli
```

  </TabItem>
</Tabs>

Verify the install:

```bash
nimbus --version
```

:::tip
Run `nimbus login` next to authenticate. Continue with the [quickstart](quickstart.md).
:::
