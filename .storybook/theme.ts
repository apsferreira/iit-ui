import { create } from '@storybook/theming/create'

export const iitTheme = create({
  base: 'light',

  // Brand
  brandTitle: 'IIT Design System',
  brandUrl: 'https://institutoitinerante.com.br',
  brandImage: '/logo-iit.png',
  brandTarget: '_blank',

  // UI
  colorPrimary: '#0097D6',
  colorSecondary: '#0097D6',

  // App background
  appBg: '#F5F8FA',
  appContentBg: '#FFFFFF',
  appPreviewBg: '#FFFFFF',
  appBorderColor: '#D0DDE6',
  appBorderRadius: 8,

  // Text colors
  textColor: '#0D1B26',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#4A6070',

  // Toolbar default and active colors
  barTextColor: '#4A6070',
  barHoverColor: '#0097D6',
  barSelectedColor: '#0097D6',
  barBg: '#FFFFFF',

  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: '#D0DDE6',
  inputTextColor: '#0D1B26',
  inputBorderRadius: 6,

  // Buttons
  buttonBg: '#F5F8FA',
  buttonBorder: '#D0DDE6',

  // Boolean
  booleanBg: '#F5F8FA',
  booleanSelectedBg: '#0097D6',
})

export const iitThemeDark = create({
  base: 'dark',

  brandTitle: 'IIT Design System',
  brandUrl: 'https://institutoitinerante.com.br',
  brandImage: '/logo-iit-white.png',
  brandTarget: '_blank',

  colorPrimary: '#0097D6',
  colorSecondary: '#33ADE0',

  appBg: '#0A0F14',
  appContentBg: '#111820',
  appPreviewBg: '#111820',
  appBorderColor: '#1A2530',
  appBorderRadius: 8,

  textColor: '#F5F8FA',
  textInverseColor: '#0D1B26',
  textMutedColor: '#8A9FAF',

  barTextColor: '#8A9FAF',
  barHoverColor: '#33ADE0',
  barSelectedColor: '#0097D6',
  barBg: '#0A0F14',

  inputBg: '#111820',
  inputBorder: '#1A2530',
  inputTextColor: '#F5F8FA',
  inputBorderRadius: 6,
})
