import { DefaultTheme as DefaultTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';

const fontConfig = {
  default: {
    large: {
      fontSize: 30,
      fontFamily: 'sans-serif'
    },
    medium: {
      fontSize: 20,
      fontFamily: 'sans-serif'
    }
  }
}

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0CA3FF',
    secondary: 'white',
    largeLabelText: '#005285'
  },
  fonts: configureFonts(fontConfig)
};
