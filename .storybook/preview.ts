import type { Preview } from '@storybook/react'
import { iitTheme, iitThemeDark } from './theme'
import '../src/global.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    docs: {
      theme: iitTheme,
    },

    darkMode: {
      light: iitTheme,
      dark: iitThemeDark,
      defaultMode: 'light',
      stylePreview: true,
      classTarget: 'html',
      lightClass: 'light',
      darkClass: 'dark',
    },

    backgrounds: {
      default: 'IIT Surface Subtle',
      values: [
        { name: 'IIT Surface Subtle', value: '#F5F8FA' },
        { name: 'IIT Surface Base', value: '#FFFFFF' },
        { name: 'IIT Dark', value: '#0A0F14' },
        { name: 'IIT Dark Subtle', value: '#111820' },
      ],
    },

    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
      },
    },

    layout: 'centered',
  },

  tags: ['autodocs'],
}

export default preview
