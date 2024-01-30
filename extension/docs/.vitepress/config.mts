import idlJson from '../../language/syntaxes/idl.tmLanguage.json';
import idlLog from '../../language/syntaxes/idl-log.tmLanguage.json';

import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'IDL for VSCode',
  description: 'Documentation for how to use IDL within VSCode',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],

    logo: '/assets/idlicon-color.svg',
  },

  head: [['link', { rel: 'icon', href: '/assets/favicon-48x48.ico' }]],

  markdown: {
    /**
     * Register languages
     */
    languages: [idlJson as any, idlLog as any],
  },
});
