import { defineConfig } from 'vitepress'

import shared from './shared'

import { zh } from './locales/zh'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...shared,

  locales: {
    root: { label: '简体中文', ...zh },
    en: { label: 'English', lang: 'en' }
  }
})
