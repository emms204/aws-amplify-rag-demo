import { Theme } from '@aws-amplify/ui-react';

export const lightTheme: Theme = {
  name: 'forest-light-theme',
  tokens: {
    colors: {
      background: {
        primary: { value: '#F0FFF0' }, // Honeydew
        secondary: { value: '#E6FEE6' },
      },
      font: {
        primary: { value: '#004d00' }, // Dark green
        secondary: { value: '#006400' }, // Darker green
        tertiary: { value: '#2E8B57' }, // Sea green
      },
      border: {
        primary: { value: '#2E8B57' },
        secondary: { value: '#3CB371' },
      },
      brand: {
        primary: {
          '10': { value: '#E6FEE6' },
          '20': { value: '#CFFDCC' },
          '40': { value: '#B8FAB2' },
          '60': { value: '#A1F798' },
          '80': { value: '#8AF57E' },
          '90': { value: '#73F264' },
          '100': { value: '#5CEF4A' },
        },
      },
    },
  },
};

export const darkTheme: Theme = {
  name: 'forest-dark-theme',
  tokens: {
    colors: {
      background: {
        primary: { value: '#1C1C1C' },
        secondary: { value: '#2A2A2A' },
      },
      font: {
        primary: { value: '#FFFFFF' },
        secondary: { value: '#F0F0F0' },
        tertiary: { value: '#D3D3D3' },
      },
      border: {
        primary: { value: '#555555' },
        secondary: { value: '#777777' },
      },
      brand: {
        primary: {
          '10': { value: '#00331a' },
          '20': { value: '#004d29' },
          '40': { value: '#006637' },
          '60': { value: '#008045' },
          '80': { value: '#009954' },
          '90': { value: '#00b362' },
          '100': { value: '#00cc70' },
        },
      },
    },
  },
}; 