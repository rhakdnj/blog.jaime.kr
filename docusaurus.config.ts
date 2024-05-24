import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Jaime',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/penguin.png',

  // Set the production url of your site here
  url: 'https://blog.jaime.kr',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'jaime', // Usually your GitHub org/user name.
  projectName: 'blog.jaime.kr', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/rhakdnj/blog.jaime.kr/issues',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/rhakdnj/blog.jaime.kr/issues',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Jaime',
      logo: {
        alt: 'My Site Logo',
        src: 'img/penguin.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'beSidebar',
          position: 'left',
          label: 'BE',
        },
        {
          type: 'docSidebar',
          sidebarId: 'devopsSidebar',
          position: 'left',
          label: 'DevOps',
        },
        {
          type: 'docSidebar',
          sidebarId: 'reviewSidebar',
          position: 'left',
          label: 'Review',
        },
        {
          type: 'docSidebar',
          sidebarId: 'devtoolsSidebar',
          position: 'left',
          label: 'DevTools',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/rhakdnj/blog.jaime.kr',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'BE',
              to: '/docs/backend/intro',
            },
            {
              label: 'DevOps',
              to: '/docs/devops/intro',
            },
            {
              label: 'Review',
              to: '/docs/review/intro',
            }
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/rhakdnj/blog.jaime.kr',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Jaime.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
