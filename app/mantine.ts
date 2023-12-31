import { MantineProviderProps } from '@mantine/core';

import { typographyStyles } from '@/styles/typography';

export const theme: MantineProviderProps['theme'] = {
  fontFamily: 'Inter, sans-serif',
  spacing: {
    xl: '3.5em',
    lg: '2.5em',
    md: '2rem',
    sm: '1.5em',
    xs: '1em',
  },
  breakpoints: {
    xs: '36em',
    sm: '48em',
    md: '62em',
    lg: '75em',
    xl: '88em',
  },
  colors: {
    brand: [
      '#e6fcf5',
      '#c3fae8',
      '#96f2d7',
      '#63e6be',
      '#38d9a9',
      '#20c997',
      '#12b886',
      '#0ca678',
      '#099268',
      '#087f5b',
    ],
    warning: [
      '#FFF1D9',
      '#FFEAC6',
      '#FDD899',
      '#F8C56E',
      '#F59E0B',
      '#B37308',
      '#915D06',
      '#6B4605',
      '#442C04',
    ],
    destructive: [
      '#FFE6E6',
      '#FFBCBC',
      '#FF8585',
      '#FF6E6E',
      '#FF5B5B',
      '#EF4444',
      '#AE3232',
      '#8D2828',
      '#6A1C1C',
      '#4C1212',
    ],
    success: [
      '#D8FFE4',
      '#CFFFE1',
      '#B7F6CE',
      '#89EAAC',
      '#57D886',
      '#22C55E',
      '#199044',
      '#147437',
      '#0D5226',
      '#093D1C',
    ],
    secondary: [
      '#E3EBFF',
      '#AED6F9',
      '#52B0FF',
      '#2382FF',
      '#1D6CFF',
      '#1651E8',
      '#103BA9',
      '#0D3089',
      '#0B276F',
      '#081F5A',
    ],
    neutral: [
      '#EEEEEE',
      '#E6E7EC',
      '#CBCCD2',
      '#B2B3BA',
      '#92949C',
      '#6A6D77',
      '#555760',
      '#414349',
      '#292B2F',
      '#202225',
    ],
  },
  primaryColor: 'brand',
  fontSizes: {
    xs: '0.8rem',
    sm: '0.9rem',
    md: '1rem',
    lg: '1.1rem',
    xl: '1.2rem',
  },
  headings: {
    // properties for all headings
    fontWeight: 400,
    fontFamily: 'Inter, sans-serif',

    // properties for individual headings, all of them are optional
    sizes: {
      h1: { fontSize: '2rem' },
      h2: { fontSize: '1.6rem' },
      h3: { fontSize: '1.4rem' },
      h4: { fontSize: '1.2rem' },
      h5: { fontSize: '1rem' },
      h6: { fontSize: '0.9rem' },
    },
  },

  globalStyles: (theme) => ({
    ...typographyStyles(theme),
  }),
};
