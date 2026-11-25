import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Nimbus Docs',
  tagline: 'A minimal documentation site built with Docusaurus',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://rafael-matos-igh.github.io',
  baseUrl: '/docusaurus-demo/',

  organizationName: 'rafael-matos-igh',
  projectName: 'docusaurus-demo',

  trailingSlash: false,
  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        // Docs-only mode: docs are served at the site root, no blog.
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Nimbus Docs',
      logo: {
        alt: 'Logo',
        src: 'img/brand-logo.svg',
      },
      items: [],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
